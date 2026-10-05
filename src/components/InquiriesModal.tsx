import { useState, useEffect } from "react";
import { 
  Inbox, X, RefreshCw, Mail, Phone, Building2, Calendar, 
  Trash2, ExternalLink, CheckCircle2, Search, Filter, ShieldCheck
} from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";

export interface PublicInquiry {
  referenceId: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
  status: "New" | "In Review" | "Responded";
}

interface InquiriesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function InquiriesModal({ isOpen, onClose }: InquiriesModalProps) {
  const [inquiries, setInquiries] = useState<PublicInquiry[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<PublicInquiry | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/inquiries");
      if (res.ok) {
        const data = await res.json();
        setInquiries(data.inquiries || []);
        if (data.inquiries && data.inquiries.length > 0 && !selectedInquiry) {
          setSelectedInquiry(data.inquiries[0]);
        }
      } else {
        // Fallback to local storage if API is unreachable
        loadLocalInquiries();
      }
    } catch {
      loadLocalInquiries();
    } finally {
      setLoading(false);
    }
  };

  const loadLocalInquiries = () => {
    try {
      const saved = localStorage.getItem("nexora_inquiries_cache");
      if (saved) {
        const parsed = JSON.parse(saved);
        setInquiries(parsed);
        if (parsed.length > 0) setSelectedInquiry(parsed[0]);
      }
    } catch {
      // Ignored
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchInquiries();
    }
  }, [isOpen]);

  const handleDelete = async (refId: string) => {
    try {
      await fetch(`/api/inquiries/${refId}`, { method: "DELETE" });
      setInquiries((prev) => prev.filter((i) => i.referenceId !== refId));
      if (selectedInquiry?.referenceId === refId) {
        setSelectedInquiry(null);
      }
    } catch {
      setInquiries((prev) => prev.filter((i) => i.referenceId !== refId));
    }
  };

  const filtered = inquiries.filter((inq) => {
    const matchesSearch = 
      inq.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.businessName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.referenceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.projectType.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiries-panel-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-5xl h-[88vh] max-h-[820px] bg-[#0A0D15] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden text-neutral-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Inbox className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="inquiries-panel-title" className="text-base font-bold text-white tracking-tight">
                  Public Inquiries & Leads
                </h2>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  {inquiries.length} {inquiries.length === 1 ? "Inquiry" : "Inquiries"}
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Live client submissions from the website contact form
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={fetchInquiries}
              disabled={loading}
              title="Refresh inquiries"
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <button
              onClick={onClose}
              aria-label="Close inquiries view"
              className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Toolbar */}
        <div className="px-6 py-3 border-b border-neutral-800 bg-black/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="relative flex-1 min-w-[200px] max-w-sm">
            <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, business, email, or ref ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-neutral-900 border border-neutral-800 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-sky-500"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-neutral-400 font-medium">Filter Status:</span>
            {["All", "New", "In Review", "Responded"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                  statusFilter === status
                    ? "bg-sky-500 text-slate-950 font-semibold"
                    : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-12 overflow-hidden">
          {/* Inquiries List (Left Pane) */}
          <div className="md:col-span-5 border-r border-neutral-800 overflow-y-auto divide-y divide-neutral-800/80 bg-neutral-950/40">
            {filtered.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-400 space-y-2">
                <Inbox className="w-8 h-8 text-neutral-600 mx-auto" />
                <p>No inquiries found matching your filter.</p>
              </div>
            ) : (
              filtered.map((inq) => {
                const isSelected = selectedInquiry?.referenceId === inq.referenceId;
                return (
                  <div
                    key={inq.referenceId}
                    onClick={() => setSelectedInquiry(inq)}
                    className={`p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? "bg-sky-950/30 border-l-2 border-sky-400"
                        : "hover:bg-neutral-900/50"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="font-mono text-[11px] text-sky-400 font-semibold">
                        {inq.referenceId}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        inq.status === "New"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : inq.status === "In Review"
                          ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                          : "bg-neutral-800 text-neutral-400"
                      }`}>
                        {inq.status}
                      </span>
                    </div>

                    <div className="font-bold text-white text-xs truncate">
                      {inq.fullName}
                    </div>

                    <div className="text-[11px] text-neutral-300 truncate">
                      {inq.businessName}
                    </div>

                    <div className="text-[11px] text-neutral-400 truncate mt-1">
                      {inq.projectType}
                    </div>

                    <div className="flex items-center justify-between text-[10px] text-neutral-400 mt-2 font-mono">
                      <span>{inq.timestamp}</span>
                      <span>{inq.budget}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Inquiry Detail View (Right Pane) */}
          <div className="md:col-span-7 overflow-y-auto p-6 bg-[#080B11]/50 space-y-6">
            {selectedInquiry ? (
              <>
                <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
                  <div>
                    <span className="text-[11px] font-mono text-sky-400 uppercase tracking-wider">
                      Reference #{selectedInquiry.referenceId}
                    </span>
                    <h3 className="text-xl font-bold text-white font-['Syne']">
                      {selectedInquiry.businessName}
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Submitted on {selectedInquiry.timestamp}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Regarding your inquiry (${selectedInquiry.referenceId}) with ${SITE_CONFIG.brandName}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                      <span>Reply via Email</span>
                    </a>
                    <button
                      onClick={() => handleDelete(selectedInquiry.referenceId)}
                      title="Delete inquiry"
                      className="p-1.5 text-neutral-500 hover:text-rose-400 rounded-lg hover:bg-neutral-800 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">Client Name</span>
                    <div className="font-semibold text-white">{selectedInquiry.fullName}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">Email Address</span>
                    <div className="font-semibold text-white truncate">
                      <a href={`mailto:${selectedInquiry.email}`} className="text-sky-400 hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">Phone / WhatsApp</span>
                    <div className="font-semibold text-white">
                      {selectedInquiry.phone !== "Not provided" ? (
                        <a href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, "")}`} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">
                          {selectedInquiry.phone}
                        </a>
                      ) : (
                        <span className="text-neutral-500">Not provided</span>
                      )}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">Project Type</span>
                    <div className="font-semibold text-white">{selectedInquiry.projectType}</div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-1 sm:col-span-2">
                    <span className="text-[10px] text-neutral-400 uppercase font-mono">Approximate Budget</span>
                    <div className="font-semibold text-emerald-400">{selectedInquiry.budget}</div>
                  </div>
                </div>

                {/* Client Message */}
                <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800 space-y-2">
                  <span className="text-xs font-semibold text-neutral-300">Project Requirements & Notes:</span>
                  <p className="text-xs text-neutral-200 leading-relaxed whitespace-pre-wrap">
                    {selectedInquiry.message}
                  </p>
                </div>

                {/* Studio Quick Response Guide */}
                <div className="p-4 rounded-xl bg-sky-950/20 border border-sky-500/20 text-xs text-neutral-300 space-y-2">
                  <div className="font-semibold text-sky-300 flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>Inquiry Forwarding & Management</span>
                  </div>
                  <p className="text-[11px] text-neutral-300 leading-relaxed">
                    All inquiries are directly dispatched to your studio inbox at <strong className="text-white">{SITE_CONFIG.contactEmail}</strong> and can be responded to directly from this panel or by standard email client.
                  </p>
                </div>
              </>
            ) : (
              <div className="h-full flex items-center justify-center text-xs text-neutral-500">
                Select an inquiry from the list to view its complete specifications.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { 
  ArrowLeft, ExternalLink, Laptop, Tablet, Smartphone, Calendar, 
  Clock, MapPin, Phone, Check, ChevronRight, X, Sparkles, Send, Shield
} from "lucide-react";
import { ProjectItem } from "../data/projects";
import { SITE_CONFIG } from "../config/siteConfig";

interface LiveProjectViewProps {
  project: ProjectItem;
  onClose: () => void;
}

export function LiveProjectView({ project, onClose }: LiveProjectViewProps) {
  const [deviceScale, setDeviceScale] = useState<"desktop" | "tablet" | "mobile">("desktop");
  const [activeTab, setActiveTab] = useState("overview");

  // Specific state for Salon Website & Management Dashboard
  const [salonMode, setSalonMode] = useState<"storefront" | "dashboard">("storefront");
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [selectedService, setSelectedService] = useState("Signature Executive Haircut (₹450)");
  const [selectedStylist, setSelectedStylist] = useState("Rahul (Senior Barber)");
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("03:30 PM");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [appointmentsQueue, setAppointmentsQueue] = useState([
    { id: "APT-101", time: "11:00 AM", client: "Vikram Sen", service: "Executive Haircut + Beard Taper", stylist: "Rahul", status: "Completed", amount: "₹650" },
    { id: "APT-102", time: "01:30 PM", client: "Amitav Roy", service: "Keratin Protein Hair Spa", stylist: "Sneha", status: "In-Chair", amount: "₹1,200" },
    { id: "APT-103", time: "02:45 PM", client: "Kunal Chatterjee", service: "Beard Sculpting & Razor Finish", stylist: "Arjun", status: "In-Chair", amount: "₹300" },
    { id: "APT-104", time: "03:30 PM", client: "Rohan Mukherjee", service: "Haircut & Beard Combo", stylist: "Rahul", status: "Confirmed", amount: "₹750" },
    { id: "APT-105", time: "04:15 PM", client: "Debashis Pal", service: "Global Hair Color & Styling", stylist: "Sneha", status: "Confirmed", amount: "₹2,100" },
    { id: "APT-106", time: "05:00 PM", client: "Sanjay Sharma", service: "Walk-in: Classic Haircut", stylist: "Arjun", status: "Waiting Queue", amount: "₹400" },
  ]);

  // Specific state for Kaviar Bistro
  const [menuTab, setMenuTab] = useState<"brunch" | "dinner" | "coffee">("brunch");
  const [tableReserveOpen, setTableReserveOpen] = useState(false);
  const [tablePartySize, setTablePartySize] = useState("2 Guests");
  const [reserveSuccess, setReserveSuccess] = useState(false);

  // Specific state for Apex Logistics
  const [freightWeight, setFreightWeight] = useState("2,500 kg");
  const [freightType, setFreightType] = useState("Refrigerated Cold Chain");
  const [calcQuote, setCalcQuote] = useState<string | null>(null);

  // Specific state for PVC Smart Review Cards Demo
  const [cardColorTheme, setCardColorTheme] = useState<"classic" | "gradient" | "dark">("classic");
  const [cardBusinessName, setCardBusinessName] = useState("The Royal Salon & Spa");
  const [tapSimulationActive, setTapSimulationActive] = useState(false);
  const [cardOrderPack, setCardOrderPack] = useState("Store Pack (3 Cards + 1 Acrylic Stand) — ₹1,299");
  const [cardOrderSuccess, setCardOrderSuccess] = useState(false);
  const [resellerApplicationSuccess, setResellerApplicationSuccess] = useState(false);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
  };

  const handleReserveSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReserveSuccess(true);
  };

  const handleCalcQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setCalcQuote("₹18,400 – ₹22,000 (Estimated SLA 24-hr transit)");
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#06090F] flex flex-col text-neutral-200 overflow-hidden animate-in fade-in duration-200">
      {/* Top Staging Control Bar */}
      <header className="px-4 py-2.5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between gap-4 shrink-0 text-xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-700/80 text-white font-medium transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to {SITE_CONFIG.brandName}</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-neutral-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-semibold text-white">{project.name}</span>
            <span className="text-neutral-500">·</span>
            <span className="text-neutral-400 text-[11px]">Live Interactive Client Demo</span>
          </div>
        </div>

        {/* Viewport switchers */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-0.5 bg-neutral-900 border border-neutral-800 rounded-lg">
            <button
              onClick={() => setDeviceScale("desktop")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                deviceScale === "desktop" ? "bg-neutral-800 text-sky-400" : "text-neutral-400 hover:text-white"
              }`}
              title="Desktop View"
            >
              <Laptop className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceScale("tablet")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                deviceScale === "tablet" ? "bg-neutral-800 text-sky-400" : "text-neutral-400 hover:text-white"
              }`}
              title="Tablet View"
            >
              <Tablet className="w-4 h-4" />
            </button>
            <button
              onClick={() => setDeviceScale("mobile")}
              className={`p-1.5 rounded transition-colors cursor-pointer ${
                deviceScale === "mobile" ? "bg-neutral-800 text-sky-400" : "text-neutral-400 hover:text-white"
              }`}
              title="Mobile View"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-900 transition-colors cursor-pointer"
            aria-label="Close live view"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Canvas Area */}
      <div className="flex-1 overflow-y-auto bg-black/60 p-2 sm:p-6 flex justify-center items-start">
        <div
          className={`transition-all duration-300 w-full rounded-2xl border border-neutral-800 bg-[#090C15] shadow-2xl overflow-hidden my-auto ${
            deviceScale === "desktop"
              ? "max-w-6xl min-h-[85vh]"
              : deviceScale === "tablet"
              ? "max-w-[768px] min-h-[80vh]"
              : "max-w-[390px] min-h-[75vh]"
          }`}
        >
          {/* Simulated Browser Address Bar */}
          <div className="px-4 py-2 bg-neutral-900/90 border-b border-neutral-800 flex items-center justify-between text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
              <span className="w-2.5 h-2.5 rounded-full bg-neutral-700" />
            </div>
            <div className="px-3 py-0.5 bg-black/50 border border-neutral-800 rounded font-mono text-[11px] text-neutral-300 truncate max-w-[320px]">
              https://{project.id}.client-staging.nexorastudios.com
            </div>
            <span className="font-mono text-emerald-400 text-[10px] uppercase">
              SSL Verified
            </span>
          </div>

          {/* PROJECT-SPECIFIC FULL LIVE RENDER */}
          {project.id === "salon-dashboard" && (
            <div className="bg-[#0B0F19] text-neutral-200 min-h-screen">
              {/* Reference Header Banner */}
              <div className="bg-sky-950/50 border-b border-sky-500/20 px-6 py-3 text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                    Real Studio Project
                  </span>
                  <span className="font-semibold text-white">Salon Website & Booking Dashboard</span>
                  <span className="text-neutral-500 hidden sm:inline">·</span>
                  <span className="text-neutral-300 text-[11px] hidden sm:inline">
                    Live Address: {SITE_CONFIG.salonProjectLiveUrl ? (
                      <a href={SITE_CONFIG.salonProjectLiveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline ml-1">
                        {SITE_CONFIG.salonProjectLiveUrl}
                      </a>
                    ) : (
                      <span className="text-amber-300/90 font-mono italic ml-1">[Address will be added here once provided by owner]</span>
                    )}
                  </span>
                </div>

                {/* View Switcher: Client Storefront vs Salon Management Dashboard */}
                <div className="flex items-center gap-1.5 p-1 bg-black/60 rounded-lg border border-neutral-800 text-xs">
                  <button
                    onClick={() => setSalonMode("storefront")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      salonMode === "storefront" ? "bg-sky-500 text-slate-950 font-semibold shadow" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Client Website
                  </button>
                  <button
                    onClick={() => setSalonMode("dashboard")}
                    className={`px-3 py-1 rounded-md transition-all cursor-pointer font-medium ${
                      salonMode === "dashboard" ? "bg-sky-500 text-slate-950 font-semibold shadow" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    Salon Admin Dashboard
                  </button>
                </div>
              </div>

              {salonMode === "storefront" ? (
                /* Salon Client Storefront View */
                <div>
                  <nav className="border-b border-white/[0.08] px-6 py-4 flex items-center justify-between bg-[#0B0F19]/90 backdrop-blur sticky top-0 z-20">
                    <div className="flex items-center gap-2.5">
                      <div className="w-3.5 h-3.5 rounded bg-sky-400 flex items-center justify-center text-slate-950 font-black text-[10px]">
                        S
                      </div>
                      <span className="font-bold text-base tracking-wider text-white font-['Syne']">ELITE SALON & GROOMING</span>
                    </div>
                    <div className="hidden sm:flex items-center gap-6 text-xs text-neutral-400 font-medium">
                      <button onClick={() => setSalonMode("storefront")} className="text-white hover:text-sky-300 transition-colors cursor-pointer">Services & Rates</button>
                      <button onClick={() => setSalonMode("storefront")} className="hover:text-white transition-colors cursor-pointer">Our Stylists</button>
                      <button onClick={() => setSalonMode("dashboard")} className="text-sky-400 hover:underline cursor-pointer">Staff Dashboard ↗</button>
                    </div>
                    <button
                      onClick={() => setBookingOpen(true)}
                      className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-colors cursor-pointer shadow-md"
                    >
                      Book Appointment
                    </button>
                  </nav>

                  {/* Salon Hero */}
                  <div className="px-6 py-14 sm:py-20 max-w-4xl mx-auto text-center space-y-5">
                    <span className="text-xs uppercase tracking-widest text-sky-400 font-semibold font-mono">
                      Premium Haircuts · Beard Grooming · Hair Spa
                    </span>
                    <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight font-['Syne']">
                      Precision styling and grooming crafted for your signature look.
                    </h1>
                    <p className="text-sm text-neutral-300 max-w-xl mx-auto leading-relaxed">
                      Book your master stylist and preferred slot in under a minute with real-time schedule availability and automated WhatsApp reminders.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                      <button
                        onClick={() => setBookingOpen(true)}
                        className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-white hover:bg-neutral-100 transition-all cursor-pointer shadow-lg"
                      >
                        Book Appointment Now
                      </button>
                      <button
                        onClick={() => setSalonMode("dashboard")}
                        className="px-6 py-3 rounded-xl text-xs font-semibold text-sky-300 bg-sky-950/40 border border-sky-500/30 hover:bg-sky-900/40 transition-all cursor-pointer"
                      >
                        Inspect Staff Queue Dashboard ↗
                      </button>
                    </div>
                  </div>

                  {/* Salon Service Menu & Rates */}
                  <div className="px-6 py-12 max-w-5xl mx-auto border-t border-white/[0.08]">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                      <div>
                        <h2 className="text-xs font-mono uppercase tracking-widest text-sky-400 mb-1">Service Menu & Rates</h2>
                        <h3 className="text-xl sm:text-2xl font-bold text-white font-['Syne']">Popular Grooming & Hair Services</h3>
                      </div>
                      <span className="text-xs text-neutral-400">Walk-ins welcome & online booking guaranteed</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3 hover:border-neutral-700 transition-all">
                        <div className="text-base font-bold text-white">Signature Executive Haircut</div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Includes consultation, clarifying hair wash, precision shear cut, neck taper, and matte styling clay finish.
                        </p>
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-800">
                          <span className="text-sky-400 font-mono font-bold">45 Min · ₹450</span>
                          <button
                            onClick={() => {
                              setSelectedService("Signature Executive Haircut (₹450)");
                              setBookingOpen(true);
                            }}
                            className="text-xs font-semibold text-white hover:text-sky-300 underline cursor-pointer"
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3 hover:border-neutral-700 transition-all">
                        <div className="text-base font-bold text-white">Beard Sculpting & Hot Towel</div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Precision beard lineup, trimmer fade, hot towel steam prep, straight razor cheek contours, and organic beard oil treatment.
                        </p>
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-800">
                          <span className="text-sky-400 font-mono font-bold">30 Min · ₹300</span>
                          <button
                            onClick={() => {
                              setSelectedService("Beard Sculpting & Hot Towel (₹300)");
                              setBookingOpen(true);
                            }}
                            className="text-xs font-semibold text-white hover:text-sky-300 underline cursor-pointer"
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3 hover:border-neutral-700 transition-all">
                        <div className="text-base font-bold text-white">Keratin Hair Spa & Scalp Detox</div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Intense deep conditioning keratin infusion, stimulating scalp massage, steam infusion, and frizz-free blow dry.
                        </p>
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-800">
                          <span className="text-sky-400 font-mono font-bold">60 Min · ₹1,200</span>
                          <button
                            onClick={() => {
                              setSelectedService("Keratin Hair Spa & Scalp Detox (₹1,200)");
                              setBookingOpen(true);
                            }}
                            className="text-xs font-semibold text-white hover:text-sky-300 underline cursor-pointer"
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3 hover:border-neutral-700 transition-all">
                        <div className="text-base font-bold text-white">Total Grooming Combo</div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Complete package: Signature haircut, beard styling, exfoliating de-tan face scrub, and refreshing head massage.
                        </p>
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-800">
                          <span className="text-sky-400 font-mono font-bold">75 Min · ₹1,100</span>
                          <button
                            onClick={() => {
                              setSelectedService("Total Grooming Combo (₹1,100)");
                              setBookingOpen(true);
                            }}
                            className="text-xs font-semibold text-white hover:text-sky-300 underline cursor-pointer"
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3 hover:border-neutral-700 transition-all">
                        <div className="text-base font-bold text-white">Ammonia-Free Hair Color</div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Full root touchup, balayage, or global shade transformation with protective botanical oil shield.
                        </p>
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-800">
                          <span className="text-sky-400 font-mono font-bold">90 Min · from ₹1,800</span>
                          <button
                            onClick={() => {
                              setSelectedService("Ammonia-Free Hair Color (from ₹1,800)");
                              setBookingOpen(true);
                            }}
                            className="text-xs font-semibold text-white hover:text-sky-300 underline cursor-pointer"
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>

                      <div className="p-6 rounded-xl bg-neutral-900/50 border border-neutral-800 space-y-3 hover:border-neutral-700 transition-all">
                        <div className="text-base font-bold text-white">Keratin Smoothing Treatment</div>
                        <p className="text-xs text-neutral-400 leading-relaxed">
                          Professional long-lasting straightening and frizz elimination lasting up to 16 weeks with mirror shine.
                        </p>
                        <div className="flex items-center justify-between text-xs pt-3 border-t border-neutral-800">
                          <span className="text-sky-400 font-mono font-bold">120 Min · ₹3,500</span>
                          <button
                            onClick={() => {
                              setSelectedService("Keratin Smoothing Treatment (₹3,500)");
                              setBookingOpen(true);
                            }}
                            className="text-xs font-semibold text-white hover:text-sky-300 underline cursor-pointer"
                          >
                            Book Slot
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Salon Admin Management Dashboard View */
                <div className="p-6 sm:p-8 space-y-8">
                  {/* Dashboard Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-800">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>LIVE SALON MANAGEMENT DASHBOARD</span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-bold text-white font-['Syne'] mt-1">
                        Today's Client Queue & Stylist Schedule
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setBookingOpen(true)}
                        className="px-3.5 py-2 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs transition-colors cursor-pointer flex items-center gap-1.5"
                      >
                        <span>+ New Appointment / Walk-in</span>
                      </button>
                      <button
                        onClick={() => setSalonMode("storefront")}
                        className="px-3 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium text-xs transition-colors cursor-pointer"
                      >
                        View Client Storefront ↗
                      </button>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                      <div className="text-xs text-neutral-400">Total Bookings Today</div>
                      <div className="text-2xl font-bold text-white font-mono mt-1">{appointmentsQueue.length}</div>
                      <div className="text-[11px] text-emerald-400 mt-1">● 9 online + {appointmentsQueue.length - 9} walk-ins</div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                      <div className="text-xs text-neutral-400">In-Chair Now</div>
                      <div className="text-2xl font-bold text-sky-400 font-mono mt-1">2 Clients</div>
                      <div className="text-[11px] text-neutral-400 mt-1">Chairs 1 & 2 Active</div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                      <div className="text-xs text-neutral-400">Est. Day Revenue</div>
                      <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">₹11,450</div>
                      <div className="text-[11px] text-neutral-400 mt-1">Based on booked services</div>
                    </div>

                    <div className="p-4 rounded-xl bg-neutral-900/60 border border-neutral-800">
                      <div className="text-xs text-neutral-400">WhatsApp Notification</div>
                      <div className="text-2xl font-bold text-white font-mono mt-1">Active</div>
                      <div className="text-[11px] text-sky-400 mt-1">Automated reminders enabled</div>
                    </div>
                  </div>

                  {/* Appointments Live Queue Table */}
                  <div className="rounded-xl border border-neutral-800 bg-neutral-900/40 overflow-hidden">
                    <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
                      <div className="text-sm font-bold text-white">Live Appointment Queue</div>
                      <span className="text-xs text-neutral-400">Auto-refreshed in real time</span>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs text-neutral-300">
                        <thead className="bg-neutral-950/60 text-neutral-400 text-[11px] uppercase font-mono border-b border-neutral-800">
                          <tr>
                            <th className="p-3">Time</th>
                            <th className="p-3">Client</th>
                            <th className="p-3">Service</th>
                            <th className="p-3">Assigned Stylist</th>
                            <th className="p-3">Amount</th>
                            <th className="p-3">Status</th>
                            <th className="p-3">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800">
                          {appointmentsQueue.map((apt) => (
                            <tr key={apt.id} className="hover:bg-neutral-800/40 transition-colors">
                              <td className="p-3 font-mono font-medium text-white">{apt.time}</td>
                              <td className="p-3 font-semibold text-white">{apt.client}</td>
                              <td className="p-3 text-neutral-300">{apt.service}</td>
                              <td className="p-3 text-sky-400">{apt.stylist}</td>
                              <td className="p-3 font-mono text-emerald-400">{apt.amount}</td>
                              <td className="p-3">
                                <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                  apt.status === "In-Chair"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : apt.status === "Completed"
                                    ? "bg-neutral-800 text-neutral-400"
                                    : "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                }`}>
                                  {apt.status}
                                </span>
                              </td>
                              <td className="p-3">
                                <button
                                  onClick={() => alert(`WhatsApp reminder sent to ${apt.client} for their appointment at ${apt.time}`)}
                                  className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-[11px] font-medium transition-colors cursor-pointer"
                                >
                                  WhatsApp Alert
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Booking Modal */}
              {bookingOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-[#0F1420] border border-neutral-800 rounded-2xl p-6 text-xs text-neutral-300 space-y-4 shadow-2xl">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <div>
                        <span className="text-sm font-bold text-white">Book Salon Appointment</span>
                        <p className="text-[11px] text-neutral-400">Instant confirmation & slot reservation</p>
                      </div>
                      <button onClick={() => setBookingOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
                    </div>

                    {bookingSuccess ? (
                      <div className="text-center py-6 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto"><Check className="w-5 h-5" /></div>
                        <h4 className="text-sm font-bold text-white">Salon Appointment Confirmed!</h4>
                        <p className="text-neutral-400 text-xs">
                          Your slot for <span className="text-sky-300 font-semibold">{selectedService}</span> with <span className="text-sky-300 font-semibold">{selectedStylist}</span> at <span className="text-white font-mono">{selectedTimeSlot}</span> has been scheduled and added to the live salon dashboard.
                        </p>
                        <div className="pt-2 flex items-center justify-center gap-3">
                          <button
                            onClick={() => {
                              setBookingSuccess(false);
                              setBookingOpen(false);
                              setSalonMode("dashboard");
                            }}
                            className="px-4 py-2 bg-sky-500 text-slate-950 font-bold rounded-lg cursor-pointer"
                          >
                            View in Salon Dashboard
                          </button>
                          <button
                            onClick={() => {
                              setBookingSuccess(false);
                              setBookingOpen(false);
                            }}
                            className="px-4 py-2 bg-neutral-800 text-white rounded-lg cursor-pointer"
                          >
                            Done
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="space-y-3">
                        <div>
                          <label className="block text-neutral-400 mb-1">Select Service</label>
                          <select
                            value={selectedService}
                            onChange={(e) => setSelectedService(e.target.value)}
                            className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white"
                          >
                            <option>Signature Executive Haircut (₹450)</option>
                            <option>Beard Sculpting & Hot Towel (₹300)</option>
                            <option>Keratin Hair Spa & Scalp Detox (₹1,200)</option>
                            <option>Total Grooming Combo (₹1,100)</option>
                            <option>Ammonia-Free Hair Color (from ₹1,800)</option>
                            <option>Keratin Smoothing Treatment (₹3,500)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">Preferred Master Stylist</label>
                          <select
                            value={selectedStylist}
                            onChange={(e) => setSelectedStylist(e.target.value)}
                            className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white"
                          >
                            <option>Rahul (Senior Barber & Fades)</option>
                            <option>Sneha (Creative Stylist & Colorist)</option>
                            <option>Arjun (Senior Grooming Specialist)</option>
                            <option>Any Available Master Stylist</option>
                          </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-neutral-400 mb-1">Preferred Time Slot</label>
                            <select
                              value={selectedTimeSlot}
                              onChange={(e) => setSelectedTimeSlot(e.target.value)}
                              className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white font-mono"
                            >
                              <option>11:00 AM</option>
                              <option>01:30 PM</option>
                              <option>03:30 PM</option>
                              <option>05:00 PM</option>
                              <option>06:30 PM</option>
                              <option>08:00 PM</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-neutral-400 mb-1">Date</label>
                            <input
                              type="date"
                              required
                              defaultValue="2026-10-02"
                              className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">Your Name</label>
                          <input
                            required
                            placeholder="e.g. Vikram"
                            value={clientName}
                            onChange={(e) => setClientName(e.target.value)}
                            className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white"
                          />
                        </div>

                        <div>
                          <label className="block text-neutral-400 mb-1">WhatsApp / Phone Number</label>
                          <input
                            required
                            placeholder="+91 98765 43210"
                            value={clientPhone}
                            onChange={(e) => setClientPhone(e.target.value)}
                            className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white"
                          />
                        </div>

                        <button
                          type="submit"
                          className="w-full py-2.5 bg-sky-400 hover:bg-sky-300 font-bold text-slate-950 rounded-lg transition-colors cursor-pointer mt-2"
                        >
                          Confirm & Add to Live Schedule
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Studio Portfolio Live Render */}
          {project.id === "studio-portfolio" && (
            <div className="bg-[#080B11] text-neutral-200 min-h-screen">
              {/* Header Banner */}
              <div className="bg-sky-950/50 border-b border-sky-500/20 px-6 py-3 text-xs flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono text-[10px] font-bold uppercase tracking-wider">
                    Live Production Website
                  </span>
                  <span className="font-semibold text-white">NEXORA  Studios Portfolio</span>
                  <span className="text-neutral-500 hidden sm:inline">·</span>
                  <span className="text-neutral-300 text-[11px] hidden sm:inline font-mono">
                    Live Address: <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sky-400 underline">{project.liveUrl}</a>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-emerald-400 flex items-center gap-1 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active Online
                  </span>
                </div>
              </div>

              {/* Showcase Hero */}
              <div className="p-6 sm:p-12 max-w-4xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-mono">
                  <span>✦ Real Live Website Build</span>
                </div>
                <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-['Syne'] leading-tight">
                  High-converting digital craftsmanship for modern brands.
                </h1>
                <p className="text-sm sm:text-base text-neutral-300 leading-relaxed max-w-2xl">
                  You are actively navigating this live application. It features real-time light/dark theme shifting, interactive multi-scale staging viewports, transparent ₹1,200 setup + ₹300/mo maintenance pricing, and an appointment booking operational dashboard.
                </p>

                <div className="p-4 rounded-xl bg-neutral-900/70 border border-neutral-800 space-y-3 text-xs">
                  <div className="font-mono text-sky-400 uppercase tracking-wider text-[11px] font-semibold">
                    Live Production Web Address
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-black/60 rounded-lg border border-neutral-800">
                    <code className="text-emerald-400 font-mono text-xs break-all">
                      {project.liveUrl}
                    </code>
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-1.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-xs flex items-center justify-center gap-1.5 shrink-0 transition-colors"
                    >
                      <span>Open in New Tab</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-xs">
                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1">
                    <div className="text-white font-bold">🌓 Dark & Light Mode Support</div>
                    <div className="text-neutral-400">Integrated theme engine with crescent moon & sun toggling and local state persistence.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1">
                    <div className="text-white font-bold">📱 Interactive Viewport Simulator</div>
                    <div className="text-neutral-400">Desktop, tablet, and mobile device staging to test responsive fluid grids.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1">
                    <div className="text-white font-bold">💳 Transparent Indian Pricing</div>
                    <div className="text-neutral-400">Minimum ₹1,200 website development charge + ₹300/month ongoing maintenance.</div>
                  </div>
                  <div className="p-4 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-1">
                    <div className="text-white font-bold">💬 WhatsApp Concierge & Inquiry</div>
                    <div className="text-neutral-400">Direct lead capture with formatted WhatsApp inquiry generation.</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Kaviar Bistro Live Render */}
          {project.id === "kaviar-bistro" && (
            <div className="bg-[#100D0B] text-neutral-200 min-h-screen">
              <nav className="border-b border-amber-900/30 px-6 py-4 flex items-center justify-between bg-[#100D0B]/90 backdrop-blur sticky top-0 z-20">
                <span className="font-serif text-lg tracking-wider text-amber-200 font-bold">KAVIAR BISTRO</span>
                <div className="hidden sm:flex items-center gap-6 text-xs text-amber-100/70">
                  <span>Daily Menu</span>
                  <span>Natural Wines</span>
                  <span>Roastery</span>
                  <span>Hours</span>
                </div>
                <button
                  onClick={() => setTableReserveOpen(true)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-amber-950 bg-amber-400 hover:bg-amber-300 transition-colors cursor-pointer"
                >
                  Reserve Table
                </button>
              </nav>

              <div className="px-6 py-16 text-center space-y-4 max-w-3xl mx-auto">
                <span className="text-xs uppercase font-mono text-amber-400">Heirloom Produce · Single-Origin Micro Roasts</span>
                <h1 className="text-3xl sm:text-5xl font-serif text-amber-100 tracking-tight">
                  Slow seasonal dining in the heart of the city.
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                  Sourdough baked at 5 AM, local mountain greens, and artisanal pasta prepared by hand every afternoon.
                </p>
              </div>

              {/* Menu Tabs */}
              <div className="px-6 py-8 max-w-4xl mx-auto">
                <div className="flex justify-center gap-2 mb-8">
                  <button
                    onClick={() => setMenuTab("brunch")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${menuTab === "brunch" ? "bg-amber-400 text-amber-950 font-bold" : "bg-neutral-900 text-neutral-400"}`}
                  >
                    All-Day Brunch
                  </button>
                  <button
                    onClick={() => setMenuTab("dinner")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${menuTab === "dinner" ? "bg-amber-400 text-amber-950 font-bold" : "bg-neutral-900 text-neutral-400"}`}
                  >
                    Evening Tasting
                  </button>
                  <button
                    onClick={() => setMenuTab("coffee")}
                    className={`px-4 py-1.5 rounded-lg text-xs font-medium cursor-pointer ${menuTab === "coffee" ? "bg-amber-400 text-amber-950 font-bold" : "bg-neutral-900 text-neutral-400"}`}
                  >
                    Specialty Coffee
                  </button>
                </div>

                <div className="space-y-4">
                  {menuTab === "brunch" && (
                    <>
                      <div className="flex justify-between items-baseline border-b border-neutral-800 pb-3 text-xs">
                        <div>
                          <div className="font-semibold text-white">Wild Chanterelle Toast</div>
                          <div className="text-neutral-400 text-[11px]">Whipped ricotta, thyme, toasted sourdough</div>
                        </div>
                        <span className="font-mono text-amber-400">₹480</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-neutral-800 pb-3 text-xs">
                        <div>
                          <div className="font-semibold text-white">Poached Eggs & Smoked Trout</div>
                          <div className="text-neutral-400 text-[11px]">Hollaidaise, pickled shallots, sea herbs</div>
                        </div>
                        <span className="font-mono text-amber-400">₹560</span>
                      </div>
                    </>
                  )}
                  {menuTab === "dinner" && (
                    <>
                      <div className="flex justify-between items-baseline border-b border-neutral-800 pb-3 text-xs">
                        <div>
                          <div className="font-semibold text-white">Handmade Agnolotti al Plin</div>
                          <div className="text-neutral-400 text-[11px]">Braised short rib, brown butter, sage</div>
                        </div>
                        <span className="font-mono text-amber-400">₹720</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-neutral-800 pb-3 text-xs">
                        <div>
                          <div className="font-semibold text-white">Pan-Seared Sea Bass</div>
                          <div className="text-neutral-400 text-[11px]">Saffron emulsion, fennel, charred leeks</div>
                        </div>
                        <span className="font-mono text-amber-400">₹890</span>
                      </div>
                    </>
                  )}
                  {menuTab === "coffee" && (
                    <>
                      <div className="flex justify-between items-baseline border-b border-neutral-800 pb-3 text-xs">
                        <div>
                          <div className="font-semibold text-white">Ethiopia Yirgacheffe Pour-Over</div>
                          <div className="text-neutral-400 text-[11px]">Notes of bergamot, jasmine, and dried apricot</div>
                        </div>
                        <span className="font-mono text-amber-400">₹280</span>
                      </div>
                      <div className="flex justify-between items-baseline border-b border-neutral-800 pb-3 text-xs">
                        <div>
                          <div className="font-semibold text-white">Cortado & Cardamom Bun</div>
                          <div className="text-neutral-400 text-[11px]">Double espresso, steamed velvety milk, fresh pastry</div>
                        </div>
                        <span className="font-mono text-amber-400">₹340</span>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Table Reserve Modal */}
              {tableReserveOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
                  <div className="w-full max-w-md bg-[#16120E] border border-amber-900/40 rounded-2xl p-6 text-xs text-neutral-300 space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <span className="text-sm font-semibold text-amber-200">Table Reservation</span>
                      <button onClick={() => setTableReserveOpen(false)} className="text-neutral-400 hover:text-white cursor-pointer"><X className="w-4 h-4" /></button>
                    </div>
                    {reserveSuccess ? (
                      <div className="text-center py-6 space-y-3">
                        <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto"><Check className="w-5 h-5" /></div>
                        <h4 className="text-sm font-bold text-white">Table Requested</h4>
                        <p className="text-neutral-400 text-xs">We will confirm your table allocation shortly via SMS.</p>
                        <button onClick={() => { setReserveSuccess(false); setTableReserveOpen(false); }} className="px-4 py-2 bg-neutral-800 text-white rounded-lg cursor-pointer">Done</button>
                      </div>
                    ) : (
                      <form onSubmit={handleReserveSubmit} className="space-y-3">
                        <div>
                          <label className="block text-neutral-400 mb-1">Party Size</label>
                          <select value={tablePartySize} onChange={(e) => setTablePartySize(e.target.value)} className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white">
                            <option>1 Guest</option>
                            <option>2 Guests</option>
                            <option>4 Guests</option>
                            <option>6+ Guests</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-neutral-400 mb-1">Name</label>
                          <input required placeholder="Alex Turner" className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white" />
                        </div>
                        <div>
                          <label className="block text-neutral-400 mb-1">Phone</label>
                          <input required placeholder="+91 98765 43210" className="w-full p-2.5 rounded bg-black/60 border border-neutral-800 text-white" />
                        </div>
                        <button type="submit" className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 font-semibold text-amber-950 rounded-lg transition-colors cursor-pointer mt-2">
                          Request Table
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* PVC Smart Review Cards Live Interactive System */}
          {project.id === "pvc-nfc-review-cards" && (
            <div className="bg-[#080C16] text-neutral-200 min-h-screen">
              {/* Product Header */}
              <div className="bg-gradient-to-r from-blue-900/60 via-neutral-900 to-emerald-950/40 border-b border-blue-500/20 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center font-bold text-white text-xs shadow-md">
                    NFC
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base text-white tracking-tight font-['Syne']">
                        TapReview™ Smart PVC Google Cards
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 font-semibold">
                        NTAG215 Dual NFC + QR
                      </span>
                    </div>
                    <p className="text-xs text-neutral-400">
                      Print Manufacturing · Local Merchant Direct Sales · Reseller Recruiting
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const el = document.getElementById("reseller-section");
                      el?.scrollIntoView({ behavior: "smooth" });
                    }}
                    className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/30 cursor-pointer transition-all"
                  >
                    Reseller Program & Recruiting ↗
                  </button>
                </div>
              </div>

              {/* Interactive Card Customizer & Tap Simulator */}
              <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Interactive 3D/Card Viewport */}
                  <div className="lg:col-span-6 flex flex-col items-center">
                    <div className="text-xs font-mono uppercase tracking-wider text-sky-400 mb-3 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Live PVC Card Preview (Credit Card Spec: 85.6 × 54 mm)</span>
                    </div>

                    {/* The Rendered PVC Card */}
                    <div
                      className={`w-[320px] sm:w-[350px] h-[200px] sm:h-[220px] rounded-2xl p-5 relative overflow-hidden shadow-2xl transition-all duration-300 border ${
                        cardColorTheme === "classic"
                          ? "bg-gradient-to-br from-white via-slate-50 to-blue-50 text-slate-900 border-slate-300 shadow-blue-500/10"
                          : cardColorTheme === "gradient"
                          ? "bg-gradient-to-br from-blue-600 via-indigo-600 to-sky-500 text-white border-blue-400/40 shadow-indigo-500/20"
                          : "bg-gradient-to-br from-neutral-900 via-neutral-950 to-black text-white border-neutral-700 shadow-black/80"
                      }`}
                    >
                      {/* Top Brand & Google Logo */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-2">
                          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                          </svg>
                          <span className={`text-[11px] font-bold uppercase tracking-wider ${cardColorTheme === "classic" ? "text-slate-700" : "text-white/90"}`}>
                            Review Us On Google
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <span key={s} className="text-amber-400 text-sm">★</span>
                          ))}
                        </div>
                      </div>

                      {/* Center NFC Wave & Tap Graphic */}
                      <div className="my-3 text-center">
                        <div className="inline-flex items-center justify-center gap-2 p-2 rounded-xl bg-black/5 dark:bg-white/10">
                          <svg className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M6 18a10 10 0 0 1 0-12" strokeLinecap="round" />
                            <path d="M10 15a5 5 0 0 1 0-6" strokeLinecap="round" />
                            <path d="M14 18a10 10 0 0 0 0-12" strokeLinecap="round" />
                            <circle cx="12" cy="12" r="1.5" fill="currentColor" />
                          </svg>
                          <div className="text-left">
                            <div className="text-xs font-black tracking-tight uppercase">TAP PHONE HERE</div>
                            <div className="text-[9px] opacity-75 font-mono">Instant 5★ Review Link</div>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Business Name & Microchip Note */}
                      <div className="flex items-end justify-between pt-1">
                        <div>
                          <div className="text-[10px] opacity-60 uppercase font-mono">Registered Merchant</div>
                          <div className="text-xs font-bold truncate max-w-[200px]">
                            {cardBusinessName || "Your Business Name"}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[9px] opacity-70 font-mono">Dual NFC + QR</div>
                          <div className="text-[9px] font-semibold text-emerald-500">Tap or Scan</div>
                        </div>
                      </div>
                    </div>

                    {/* Tap Simulation Trigger */}
                    <div className="mt-5 w-full max-w-[350px]">
                      <button
                        onClick={() => setTapSimulationActive(!tapSimulationActive)}
                        className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
                      >
                        <Smartphone className="w-4 h-4" />
                        <span>{tapSimulationActive ? "Reset Tap Simulation" : "Simulate Customer Phone Tap"}</span>
                      </button>

                      {tapSimulationActive && (
                        <div className="mt-3 p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 animate-in fade-in zoom-in-95 duration-200">
                          <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs mb-1">
                            <Check className="w-4 h-4 text-emerald-400" />
                            <span>Phone NFC Handshake Triggered!</span>
                          </div>
                          <p className="text-[11px] text-neutral-300 leading-relaxed">
                            A browser sheet pops up on customer’s phone: <em>"Leave a review for {cardBusinessName} on Google Maps"</em> with 5 stars pre-selected.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right: Card Customization Controls */}
                  <div className="lg:col-span-6 p-6 rounded-2xl bg-neutral-900/60 border border-neutral-800 space-y-5 text-xs">
                    <div>
                      <h3 className="text-base font-bold text-white">Custom PVC Card Printing Specifications</h3>
                      <p className="text-neutral-400 mt-1">
                        Manufactured on premium rigid PVC plastic with matte or glossy UV lamination and embedded high-speed contactless microchips.
                      </p>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="block text-neutral-300 font-semibold mb-1">Business Name on Card</label>
                        <input
                          type="text"
                          value={cardBusinessName}
                          onChange={(e) => setCardBusinessName(e.target.value)}
                          placeholder="e.g. Urban Cuts Salon & Spa"
                          className="w-full p-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white"
                        />
                      </div>

                      <div>
                        <label className="block text-neutral-300 font-semibold mb-1">Card Finish & Palette</label>
                        <div className="grid grid-cols-3 gap-2">
                          <button
                            onClick={() => setCardColorTheme("classic")}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                              cardColorTheme === "classic"
                                ? "bg-white text-slate-900 border-sky-400 font-bold"
                                : "bg-neutral-950 text-neutral-400 border-neutral-800"
                            }`}
                          >
                            Classic Clean White
                          </button>
                          <button
                            onClick={() => setCardColorTheme("gradient")}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                              cardColorTheme === "gradient"
                                ? "bg-blue-600 text-white border-blue-400 font-bold"
                                : "bg-neutral-950 text-neutral-400 border-neutral-800"
                            }`}
                          >
                            Vibrant Studio Blue
                          </button>
                          <button
                            onClick={() => setCardColorTheme("dark")}
                            className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                              cardColorTheme === "dark"
                                ? "bg-neutral-800 text-white border-neutral-500 font-bold"
                                : "bg-neutral-950 text-neutral-400 border-neutral-800"
                            }`}
                          >
                            Matte Luxury Black
                          </button>
                        </div>
                      </div>

                      <div className="p-3.5 rounded-xl bg-black/40 border border-neutral-800 space-y-2">
                        <div className="font-semibold text-white">Technical Highlights:</div>
                        <ul className="space-y-1 text-neutral-300 text-[11px]">
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                            <span><strong>NFC Chip:</strong> NTAG213 / NTAG215 with 100,000+ read endurance</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            <span><strong>Dual QR Code:</strong> High-resolution vector print on rear for older devices</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                            <span><strong>Waterproof & Scratch-Resistant:</strong> Won’t fade on cash registers or salon desks</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Direct Order Form for Cards */}
                <div className="p-6 sm:p-8 rounded-2xl bg-neutral-900/40 border border-neutral-800 space-y-6">
                  <div className="max-w-2xl">
                    <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Order Dispatch</span>
                    <h3 className="text-xl font-bold text-white mt-1">Get Custom PVC Review Cards for Your Business</h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Choose your package. We encode your Google Maps place ID, verify the 5-star link, print, and courier directly to you.
                    </p>
                  </div>

                  {cardOrderSuccess ? (
                    <div className="p-6 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-center space-y-2">
                      <Check className="w-8 h-8 text-emerald-400 mx-auto" />
                      <h4 className="text-sm font-bold text-white">Card Order Request Received!</h4>
                      <p className="text-xs text-neutral-300">
                        We will message you on WhatsApp to confirm your Google Business Profile link and design mockup.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setCardOrderSuccess(true);
                      }}
                      className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs"
                    >
                      <div className="space-y-1">
                        <label className="text-neutral-300 font-semibold">Select Pack</label>
                        <select
                          value={cardOrderPack}
                          onChange={(e) => setCardOrderPack(e.target.value)}
                          className="w-full p-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white"
                        >
                          <option>Single Card (Standalone) — ₹499</option>
                          <option>Card + Clear Acrylic Counter Stand — ₹699</option>
                          <option>Store Pack (3 Cards + 1 Acrylic Stand) — ₹1,299</option>
                          <option>Bulk Merchant Pack (10 Cards + 3 Stands) — ₹3,499</option>
                          <option>Commercial Reseller Pack (25 Cards) — ₹5,999</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-neutral-300 font-semibold">Your WhatsApp / Phone</label>
                        <input
                          required
                          type="tel"
                          placeholder="+91 98765 43210"
                          className="w-full p-2.5 rounded-lg bg-black/60 border border-neutral-800 text-white placeholder-neutral-500"
                        />
                      </div>

                      <div className="flex items-end">
                        <button
                          type="submit"
                          className="w-full py-2.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold transition-all cursor-pointer shadow-md"
                        >
                          Submit Card Order
                        </button>
                      </div>
                    </form>
                  )}
                </div>

                {/* Recruiting & Reseller Program Section */}
                <div id="reseller-section" className="p-6 sm:p-10 rounded-2xl bg-gradient-to-br from-emerald-950/30 via-neutral-900 to-blue-950/20 border-2 border-emerald-500/30 space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                        Sales Partnership & Recruiting
                      </span>
                      <h3 className="text-2xl font-bold text-white font-['Syne'] mt-2">
                        Earn as a TapReview™ Field Sales Agent or Reseller
                      </h3>
                      <p className="text-xs sm:text-sm text-neutral-300 max-w-2xl mt-1 leading-relaxed">
                        Every salon, café, doctor clinic, and retail store wants more Google reviews. We recruit independent partners, freelancers, and students to sell custom PVC review cards in their local area with generous profit margins.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                    <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 space-y-2">
                      <div className="font-bold text-emerald-400 text-sm">1. High Margins per Card</div>
                      <p className="text-neutral-300 leading-relaxed">
                        Buy at distributor rates (~₹249/card in bulk) and sell to local merchants at ₹699 to ₹999 with setup and support.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 space-y-2">
                      <div className="font-bold text-sky-400 text-sm">2. Complete Sample Kit</div>
                      <p className="text-neutral-300 leading-relaxed">
                        We provide demo NFC cards, sample counter stands, and digital sales brochures to demonstrate tap-to-review live.
                      </p>
                    </div>

                    <div className="p-4 rounded-xl bg-black/40 border border-neutral-800 space-y-2">
                      <div className="font-bold text-amber-400 text-sm">3. Zero Technical Overhead</div>
                      <p className="text-neutral-300 leading-relaxed">
                        You pitch the merchant and collect their Google Maps link; we handle chip encoding, testing, printing, and delivery.
                      </p>
                    </div>
                  </div>

                  {resellerApplicationSuccess ? (
                    <div className="p-5 rounded-xl bg-emerald-950/50 border border-emerald-500/50 text-center space-y-1">
                      <Check className="w-6 h-6 text-emerald-400 mx-auto" />
                      <div className="font-bold text-white text-sm">Application Sent!</div>
                      <p className="text-xs text-neutral-300">
                        Our recruiting coordinator will reach out to you via WhatsApp with the reseller starter catalog.
                      </p>
                    </div>
                  ) : (
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setResellerApplicationSuccess(true);
                      }}
                      className="p-4 rounded-xl bg-black/50 border border-neutral-800/80 flex flex-col sm:flex-row gap-3 text-xs items-center"
                    >
                      <input
                        required
                        type="text"
                        placeholder="Your Full Name"
                        className="w-full sm:flex-1 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500"
                      />
                      <input
                        required
                        type="tel"
                        placeholder="WhatsApp Number"
                        className="w-full sm:flex-1 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500"
                      />
                      <input
                        required
                        type="text"
                        placeholder="Your City / Region"
                        className="w-full sm:flex-1 p-2.5 rounded-lg bg-neutral-900 border border-neutral-800 text-white placeholder-neutral-500"
                      />
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-6 py-2.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-all cursor-pointer whitespace-nowrap"
                      >
                        Apply as Reseller
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Solstice Travel Live Render */}
          {project.id === "solstice-travel" && (
            <div className="bg-[#09110E] text-neutral-200 min-h-screen">
              <nav className="border-b border-emerald-900/30 px-6 py-4 flex items-center justify-between bg-[#09110E]/90 backdrop-blur sticky top-0 z-20">
                <span className="font-serif text-lg tracking-wider text-emerald-200 font-bold">SOLSTICE EXPEDITIONS</span>
                <span className="text-xs px-3 py-1 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded">
                  2026 Calendar Open
                </span>
              </nav>

              <div className="px-6 py-16 text-center space-y-4 max-w-3xl mx-auto">
                <span className="text-xs uppercase font-mono text-emerald-400">Certified Wilderness Naturalists</span>
                <h1 className="text-3xl sm:text-5xl font-serif text-emerald-100 tracking-tight">
                  Untamed trails, intimate group expeditions.
                </h1>
                <p className="text-xs sm:text-sm text-neutral-400 max-w-lg mx-auto">
                  High Himalayan passes, private coastal sanctuaries, and leave-no-trace journeys with experienced local leaders.
                </p>
              </div>

              <div className="px-6 py-8 max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                  <div className="text-[11px] font-mono text-emerald-400">7 Days · Max 8 Travelers</div>
                  <div className="text-base font-bold text-white">Eastern Ridge Glacier Trek</div>
                  <p className="text-xs text-neutral-400">Traversing 4,200m pass, alpine lakes, high meadow glamping.</p>
                  <div className="text-xs text-white pt-2 border-t border-neutral-800 flex justify-between">
                    <span>Inclusions: Permits, Gear, Chef</span>
                    <span className="text-emerald-400 font-mono font-bold">₹34,500</span>
                  </div>
                </div>

                <div className="p-6 rounded-xl bg-neutral-900/40 border border-neutral-800 space-y-3">
                  <div className="text-[11px] font-mono text-emerald-400">5 Days · Max 6 Travelers</div>
                  <div className="text-base font-bold text-white">Andaman Coastal Sea Kayak</div>
                  <p className="text-xs text-neutral-400">Bioluminescent night paddles, coral reef mapping, remote camps.</p>
                  <div className="text-xs text-white pt-2 border-t border-neutral-800 flex justify-between">
                    <span>Inclusions: Sea Kayaks, Biologist</span>
                    <span className="text-emerald-400 font-mono font-bold">₹28,000</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Vanguard Advisory / Generic Live Render */}
          {project.id !== "salon-dashboard" && project.id !== "kaviar-bistro" && project.id !== "solstice-travel" && (
            <div className="bg-[#0B0E17] text-neutral-200 min-h-screen p-6 sm:p-12 space-y-8">
              <nav className="border-b border-neutral-800 pb-4 flex items-center justify-between">
                <span className="text-lg font-bold text-white tracking-tight font-['Syne']">{project.name}</span>
                <span className="text-xs text-neutral-400">{project.industry}</span>
              </nav>

              <div className="max-w-2xl space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-sky-400">Client Staging Architecture</span>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">{project.heroMockup.tagline}</h1>
                <p className="text-sm text-neutral-400 leading-relaxed">{project.fullDescription}</p>
              </div>

              {project.id === "apex-logistics" && (
                <div className="p-6 rounded-xl bg-neutral-900/60 border border-neutral-800 max-w-lg space-y-4 text-xs">
                  <h3 className="text-sm font-semibold text-white">Instant Route & Freight Rate Estimator</h3>
                  <form onSubmit={handleCalcQuote} className="space-y-3">
                    <div>
                      <label className="block text-neutral-400 mb-1">Cargo Weight</label>
                      <input value={freightWeight} onChange={(e) => setFreightWeight(e.target.value)} className="w-full p-2 rounded bg-black/60 border border-neutral-800 text-white" />
                    </div>
                    <div>
                      <label className="block text-neutral-400 mb-1">Equipment Type</label>
                      <select value={freightType} onChange={(e) => setFreightType(e.target.value)} className="w-full p-2 rounded bg-black/60 border border-neutral-800 text-white">
                        <option>Refrigerated Cold Chain</option>
                        <option>Standard Dry Van</option>
                        <option>Flatbed Heavy Haul</option>
                      </select>
                    </div>
                    <button type="submit" className="w-full py-2 bg-sky-500 hover:bg-sky-400 text-slate-950 font-semibold rounded cursor-pointer">
                      Calculate Instant Estimate
                    </button>
                    {calcQuote && (
                      <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded text-emerald-300 font-mono text-center">
                        {calcQuote}
                      </div>
                    )}
                  </form>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-neutral-800 text-xs">
                {project.keyFeatures.map((f) => (
                  <div key={f} className="p-3 rounded-lg bg-neutral-900/30 border border-neutral-800 flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                    <span>{f}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

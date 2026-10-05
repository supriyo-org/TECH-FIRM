import { ArrowUp, Mail, ShieldCheck, ExternalLink, Inbox } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";

interface FooterProps {
  onOpenLegal: (docId: string) => void;
  onNavigate: (sectionId: string) => void;
  onOpenInquiries?: () => void;
}

export function Footer({ onOpenLegal, onNavigate, onOpenInquiries }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-neutral-800 bg-[#06080E] text-neutral-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Col 1: Studio Wordmark & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("home");
              }}
              className="text-xl font-bold tracking-tight text-white font-['Syne'] hover:text-sky-400 transition-colors inline-block"
            >
              {SITE_CONFIG.brandName}
            </a>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm">
              {SITE_CONFIG.brandTagline} We create fast, responsive websites and manufacture Smart PVC Google Review NFC cards & stands for salons, restaurants, clinics, and local retail businesses.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-neutral-400">
              <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
              <span>Independent Web Design & Engineering Studio</span>
            </div>
          </div>

          {/* Col 2: Studio Navigation */}
          <div className="lg:col-span-2 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Studio
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate("home")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("work")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Selected Work
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("services")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("process")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Process
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("pricing")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Pricing
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("faq")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate("contact")}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Legal & Trust Center */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider">
              Legal & Trust
            </div>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onOpenLegal("privacy")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("terms")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("cookies")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Cookie Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("refund")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Refund & Cancellation Policy
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal("accessibility")}
                  className="hover:text-white transition-colors cursor-pointer text-left"
                >
                  Accessibility Statement
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Official Contact & Socials */}
          <div className="lg:col-span-3 space-y-3">
            <div className="text-xs font-semibold text-white uppercase tracking-wider flex items-center justify-between">
              <span>Inquiries</span>
              {onOpenInquiries && (
                <button
                  onClick={onOpenInquiries}
                  className="text-[11px] font-mono text-sky-400 hover:text-sky-300 flex items-center gap-1 cursor-pointer"
                >
                  <Inbox className="w-3 h-3" />
                  <span>View All Leads</span>
                </button>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <span className="text-[11px] text-neutral-400 block">General & Projects:</span>
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="text-white hover:text-sky-300 font-medium transition-colors"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>

              {onOpenInquiries && (
                <div className="pt-1">
                  <button
                    onClick={onOpenInquiries}
                    className="w-full py-1.5 px-3 rounded-lg bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/20 text-sky-400 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>Open Public Enquiries Dashboard</span>
                  </button>
                </div>
              )}
            </div>

            <div className="pt-2">
              <div className="text-[11px] text-neutral-400 mb-1.5">Social Profiles:</div>
              <div className="flex flex-wrap gap-2">
                {SITE_CONFIG.socialLinks.map((s) => (
                  <a
                    key={s.platform}
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-[11px] text-neutral-300 hover:text-white transition-colors"
                  >
                    <span>{s.platform}</span>
                    <ExternalLink className="w-2.5 h-2.5 text-neutral-400" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="mt-14 pt-6 border-t border-neutral-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {currentYear} {SITE_CONFIG.brandName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <span>Built with clean web standards</span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

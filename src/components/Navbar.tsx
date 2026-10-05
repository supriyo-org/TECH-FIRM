import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight, Moon, Sun, Inbox } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  onOpenContact?: () => void;
  onOpenInquiries?: () => void;
}

export function Navbar({ onOpenContact, onOpenInquiries }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Track active section
      const sections = ["home", "work", "services", "process", "pricing", "faq", "contact"];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "#home", id: "home" },
    { label: "Selected Work", href: "#work", id: "work" },
    { label: "Services", href: "#services", id: "services" },
    { label: "Process", href: "#process", id: "process" },
    { label: "Pricing", href: "#pricing", id: "pricing" },
    { label: "FAQ", href: "#faq", id: "faq" },
    { label: "Contact", href: "#contact", id: "contact" },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace("#", "");
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleCtaClick = () => {
    setMobileMenuOpen(false);
    if (onOpenContact) {
      onOpenContact();
    } else {
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-xl ${
        isScrolled
          ? "bg-[#080B11]/75 dark:bg-[#080B11]/75 border-b border-white/[0.08] dark:border-white/[0.08] shadow-lg shadow-black/25 py-3"
          : "bg-[#080B11]/45 dark:bg-[#080B11]/45 border-b border-white/[0.05] dark:border-white/[0.05] py-3.5 sm:py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* LEFT HEADER: 3 lines menu icon button */}
          <div className="flex-1 flex items-center justify-start">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 -ml-2 rounded-xl text-neutral-300 hover:text-white hover:bg-white/[0.08] transition-colors cursor-pointer flex items-center gap-2 group"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-sky-400" />
              ) : (
                <Menu className="w-5 h-5 group-hover:text-sky-400 transition-colors" />
              )}
              <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors">
                {mobileMenuOpen ? "Close" : "Menu"}
              </span>
            </button>
          </div>

          {/* CENTER HEADER: NEXORA Studios title */}
          <div className="flex-shrink-0 flex items-center justify-center text-center px-2">
            <a
              href="#home"
              className="text-base sm:text-xl font-extrabold tracking-tight text-white dark:text-white light:text-slate-900 font-['Syne'] hover:text-sky-500 transition-colors whitespace-nowrap"
              aria-label={`${SITE_CONFIG.brandName} Home`}
            >
              {SITE_CONFIG.brandName}
            </a>
          </div>

          {/* RIGHT HEADER: Dark mode & light mode toggle with Crescent moon & Sun */}
          <div className="flex-1 flex items-center justify-end gap-2 sm:gap-2.5">
            {/* View Inquiries Button */}
            {onOpenInquiries && (
              <button
                onClick={onOpenInquiries}
                className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.12] text-neutral-200 hover:text-white active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
                aria-label="View public enquiries and leads"
                title="View Public Enquiries & Lead Dashboard"
              >
                <Inbox className="w-4 h-4 text-sky-400" />
                <span className="text-[11px] font-semibold text-neutral-200 hidden lg:inline">
                  Inquiries
                </span>
              </button>
            )}

            {/* Theme toggle button */}
            <button
              onClick={toggleTheme}
              className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl border border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.12] text-neutral-200 hover:text-white active:scale-95 transition-all cursor-pointer flex items-center gap-1.5 shadow-sm"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
              title={theme === "dark" ? "Dark mode active (Crescent Moon). Click for Light mode" : "Light mode active (Sun). Click for Dark mode"}
            >
              {theme === "dark" ? (
                <Moon className="w-4 h-4 sm:w-4 sm:h-4 text-sky-400 fill-sky-400/20" />
              ) : (
                <Sun className="w-4 h-4 sm:w-4 sm:h-4 text-amber-500 fill-amber-500/20" />
              )}
              <span className="text-[11px] font-medium text-neutral-300 hidden md:inline">
                {theme === "dark" ? "Dark" : "Light"}
              </span>
            </button>

            {/* Start a Project Action */}
            <button
              onClick={handleCtaClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-neutral-100 active:scale-[0.98] transition-all whitespace-nowrap shadow-sm cursor-pointer group"
            >
              <span>Start Project</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Drawer (Opens when 3-lines menu on left is clicked) */}
      {mobileMenuOpen && (
        <div className="border-b border-white/[0.08] bg-[#080B11]/98 backdrop-blur-xl px-4 sm:px-6 pt-4 pb-6 space-y-4 animate-in fade-in slide-in-from-top-2 duration-200 shadow-2xl">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between pb-3 border-b border-white/[0.06] mb-3">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400">Navigation Menu</span>
              <span className="text-[11px] text-neutral-500">NEXORA Studios Direct Directory</span>
            </div>

            <nav className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className={`px-3.5 py-2.5 rounded-lg text-xs font-medium transition-all ${
                    activeSection === link.id
                      ? "bg-sky-500/15 text-sky-400 font-semibold border border-sky-500/30"
                      : "text-neutral-300 hover:bg-white/[0.06] hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <div className="pt-4 mt-2 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
                <div className="text-xs text-neutral-400 flex items-center gap-2">
                  <span>Inquiries:</span>
                  <a href={`mailto:${SITE_CONFIG.contactEmail}`} className="text-sky-400 hover:underline">
                    {SITE_CONFIG.contactEmail}
                  </a>
                </div>

                {onOpenInquiries && (
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenInquiries();
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 hover:bg-sky-500/20 text-xs font-semibold cursor-pointer"
                  >
                    <Inbox className="w-3.5 h-3.5" />
                    <span>View Public Enquiries</span>
                  </button>
                )}
              </div>

              <button
                onClick={handleCtaClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-white rounded-lg hover:bg-neutral-100 transition-all cursor-pointer shadow-sm"
              >
                <span>Start a Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-900" />
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

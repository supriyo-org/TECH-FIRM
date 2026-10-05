import { ArrowRight, Check, HelpCircle } from "lucide-react";
import { SITE_CONFIG, isPromotionalOfferActive } from "../config/siteConfig";

interface PricingProps {
  onRequestQuote: (tierName?: string) => void;
}

export function Pricing({ onRequestQuote }: PricingProps) {
  const isPromoActive = isPromotionalOfferActive();

  const pricingTiers = [
    {
      id: "starter",
      name: "Starter Business Site",
      priceLabel: `₹${SITE_CONFIG.standardStartingPrice.toLocaleString()} + ₹${SITE_CONFIG.standardMonthlyMaintenance}/mo`,
      subPriceHint: "Minimum website making charge: ₹1,200 setup with ongoing ₹300/month maintenance & support",
      promoNote: isPromoActive
        ? `Festive promotional offer: ₹${SITE_CONFIG.promotionalOffer.discountedPrice.toLocaleString()} setup + ₹${SITE_CONFIG.standardMonthlyMaintenance}/mo with domain assistance`
        : null,
      description: "Ideal for salons, local businesses, cafés, and professionals needing a high-speed, professional website with hands-free monthly maintenance.",
      deliverables: [
        "Full responsive website design & build",
        "₹300/month maintenance (content updates, security & hosting support)",
        "Mobile-first responsive architecture",
        "Business hours, address, and Google Maps",
        "Click-to-call & WhatsApp direct chat",
        "Contact & lead inquiry form",
        "Basic SEO setup & meta tags",
        "SSL certificate & domain connection"
      ],
      idealFor: "Salons & barbers, local shops, restaurants, personal portfolios"
    },
    {
      id: "commercial",
      name: "Commercial Growth Platform",
      priceLabel: "Custom Quote Based on Scope",
      subPriceHint: "Typically tailored around page volume and custom workflows",
      description: "Designed for established service businesses, clinics, and hospitality brands requiring multi-page depth and booking flows.",
      deliverables: [
        "Multi-page architecture (Up to 5–8 pages)",
        "Service catalog or dynamic food menu",
        "Interactive appointment / reservation intake",
        "Fast image galleries & case studies",
        "Advanced schema markup & OpenGraph cards",
        "Custom branded visual system",
        "Post-launch verification & support"
      ],
      featured: true,
      idealFor: "Boutique hotels, travel agencies, aesthetic clinics, consulting firms"
    },
    {
      id: "bespoke",
      name: "Bespoke Web Platform",
      priceLabel: "Tailored to Specifications",
      subPriceHint: "Engineered around custom interactive logic & integrations",
      description: "For startups, enterprise practices, and unique digital platforms needing specialized interfaces, calculators, or custom logic.",
      deliverables: [
        "Tailored web application interface",
        "Custom quote calculators / multi-step forms",
        "API & third-party service connections",
        "Performance optimization (< 0.8s LCP)",
        "Comprehensive accessibility audit (WCAG AA)",
        "Priority development turnaround",
        "Dedicated onboarding & handover"
      ],
      idealFor: "Logistics networks, corporate practices, tech startups, high-volume portals"
    }
  ];

  return (
    <section id="pricing" className="py-20 md:py-32 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
            Transparent Pricing Structure
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne'] tracking-tight mb-4">
            Clear, honest pricing with zero hidden surprises.
          </h2>
          <p className="text-sm text-neutral-300 leading-relaxed">
            Minimum website making charge starts from <span className="text-white font-semibold">₹1,200</span> plus <span className="text-sky-400 font-semibold">₹300/month</span> for ongoing maintenance, hosting management, and security updates. Custom commercial platforms are quoted based on specific scope.
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-14">
          {pricingTiers.map((tier) => (
            <div
              key={tier.id}
              className={`flex flex-col justify-between p-7 rounded-2xl transition-all duration-300 ${
                tier.featured
                  ? "bg-neutral-900/80 border-2 border-sky-500/40 shadow-xl shadow-sky-950/20 relative"
                  : "bg-neutral-900/40 border border-neutral-800/80 hover:border-neutral-700"
              }`}
            >
              {tier.featured && (
                <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-sky-500 text-slate-950">
                  Most Requested
                </div>
              )}

              <div>
                <div className="text-xs font-medium text-neutral-400 mb-1">
                  {tier.name}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white font-['Syne'] tracking-tight mb-2">
                  {tier.priceLabel}
                </div>

                {tier.promoNote && (
                  <div className="text-xs font-medium text-amber-300 mb-3 p-2 rounded bg-amber-500/10 border border-amber-500/20">
                    {tier.promoNote}
                  </div>
                )}

                {tier.subPriceHint && (
                  <div className="text-xs text-neutral-400 mb-3">
                    {tier.subPriceHint}
                  </div>
                )}

                <p className="text-xs text-neutral-300 leading-relaxed mb-6 pt-2 border-t border-neutral-800">
                  {tier.description}
                </p>

                <div className="space-y-2.5 mb-8">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                    Included Scope
                  </div>
                  {tier.deliverables.map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-xs text-neutral-200">
                      <Check className="w-3.5 h-3.5 text-sky-400 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <button
                  onClick={() => onRequestQuote(tier.name)}
                  className={`w-full flex items-center justify-center gap-2 px-5 py-3 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    tier.featured
                      ? "bg-white text-slate-950 hover:bg-neutral-100 shadow-md"
                      : "bg-neutral-800 text-white hover:bg-neutral-700 border border-neutral-700"
                  }`}
                >
                  <span>Request a Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
                <div className="text-center text-[11px] text-neutral-400 mt-2.5">
                  Best for: {tier.idealFor}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Smart PVC Google Review Cards Pricing & Reseller Box */}
        <div className="mb-14 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-950/30 via-neutral-900/60 to-emerald-950/20 border-2 border-sky-500/30 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  Hardware & Physical Print Service
                </span>
                <span className="text-[11px] font-semibold text-emerald-400 font-mono">
                  ● Active Production & Reseller Recruiting
                </span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Syne'] tracking-tight">
                Smart PVC Google Review Cards & Countertop Stands
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                Contactless NFC + high-contrast QR cards printed on durable, waterproof PVC credit-card grade plastic. Customers tap their phone to instantly leave a 5-star Google review. Ideal for salons, clinics, cafés, retail, and local service businesses.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <div className="p-2 rounded-lg bg-black/40 border border-neutral-800 text-neutral-200">
                  <div className="text-[10px] text-neutral-400">Starter Single Card</div>
                  <div className="font-bold text-white text-sm">₹499 <span className="text-[10px] font-normal text-neutral-400">/ card</span></div>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-neutral-800 text-neutral-200">
                  <div className="text-[10px] text-neutral-400">Card + Acrylic Stand</div>
                  <div className="font-bold text-white text-sm">₹699 <span className="text-[10px] font-normal text-neutral-400">/ set</span></div>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-neutral-800 text-neutral-200">
                  <div className="text-[10px] text-neutral-400">Store Pack (3 Cards)</div>
                  <div className="font-bold text-sky-400 text-sm">₹1,299 <span className="text-[10px] font-normal text-neutral-400">/ pack</span></div>
                </div>
                <div className="p-2 rounded-lg bg-black/40 border border-neutral-800 text-neutral-200">
                  <div className="text-[10px] text-neutral-400">Reseller / Bulk 20+</div>
                  <div className="font-bold text-emerald-400 text-sm">₹249 <span className="text-[10px] font-normal text-neutral-400">/ card (Bulk)</span></div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
              <button
                onClick={() => onRequestQuote("Smart PVC NFC Google Review Cards (Bulk / Single)")}
                className="px-6 py-3 rounded-xl text-xs font-bold text-slate-950 bg-sky-400 hover:bg-sky-300 transition-all cursor-pointer shadow-md text-center"
              >
                Order Custom Cards
              </button>
              <button
                onClick={() => onRequestQuote("Become a Sales Partner / Reseller for PVC Review Cards")}
                className="px-6 py-3 rounded-xl text-xs font-semibold text-emerald-300 bg-emerald-950/40 hover:bg-emerald-900/40 border border-emerald-500/40 transition-all cursor-pointer text-center"
              >
                Join as Sales Reseller / Agent
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Factors Explanatory Box */}
        <div className="p-6 sm:p-8 rounded-xl bg-neutral-900/30 border border-neutral-800/80">
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3">
            <HelpCircle className="w-4 h-4 text-sky-400" />
            <span>How Final Project Quotes Are Calculated</span>
          </div>

          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-4">
            We don't use arbitrary pricing. Because every business has unique scale and goals, your final proposal is estimated based on explicit technical factors:
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs text-neutral-300">
            <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400">Factor 1</div>
              <div className="font-semibold text-white mt-0.5">Page Volume</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400">Factor 2</div>
              <div className="font-semibold text-white mt-0.5">Custom Features</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400">Factor 3</div>
              <div className="font-semibold text-white mt-0.5">Content & Copy</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400">Factor 4</div>
              <div className="font-semibold text-white mt-0.5">3P Integrations</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400">Factor 5</div>
              <div className="font-semibold text-white mt-0.5">Domain Setup</div>
            </div>
            <div className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80">
              <div className="text-[10px] text-neutral-400">Factor 6</div>
              <div className="font-semibold text-white mt-0.5">Hosting Plan</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortDescription: string;
  deliverables: string[];
  idealFor: string;
  outcome: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "website-design",
    number: "01",
    title: "Website Design",
    shortDescription: "Tailored, modern website interfaces crafted specifically around your brand identity, business objectives, and customer journey.",
    deliverables: [
      "Custom layout and visual system",
      "Brand color and typography curation",
      "Mobile, tablet, and desktop prototypes",
      "Intuitive user navigation flows"
    ],
    idealFor: "Businesses looking for an unmistakable, polished visual identity that reflects their true quality.",
    outcome: "A distinct, elevated aesthetic that builds immediate credibility with visitors."
  },
  {
    id: "website-development",
    number: "02",
    title: "Website Development",
    shortDescription: "Clean, performant, and responsive engineering using modern web standards. Fast page loads, rock-solid stability, and zero bloat.",
    deliverables: [
      "Lightweight, semantic HTML5/CSS3/TypeScript",
      "Fully responsive across all screen sizes",
      "Fast Core Web Vitals and minimal bundle sizes",
      "Interactive components and clean state management"
    ],
    idealFor: "Brands that value swift load times, fluid responsiveness, and reliable code.",
    outcome: "A website that opens instantly and functions flawlessly on every device."
  },
  {
    id: "business-websites",
    number: "03",
    title: "Business Websites",
    shortDescription: "Comprehensive, multi-page or focused websites engineered for local businesses, service firms, clinics, and professional practices.",
    deliverables: [
      "Structured service pages and team profiles",
      "Direct inquiry and appointment capture forms",
      "Google Maps integration and operating hours",
      "Direct WhatsApp and call click-to-action triggers"
    ],
    idealFor: "Salons, dental clinics, consulting firms, contractors, and local service providers.",
    outcome: "A 24/7 digital storefront that converts local inquiries into booked customers."
  },
  {
    id: "landing-pages",
    number: "04",
    title: "Landing Pages",
    shortDescription: "High-focus, single-page experiences built to capture interest for specific marketing campaigns, product drops, or service promotions.",
    deliverables: [
      "Direct conversion-focused hierarchy",
      "Clear call-to-action placement",
      "Fast mobile load performance",
      "Form validation and lead routing"
    ],
    idealFor: "Ad campaigns, promotional launches, special event registrations, or single product showcases.",
    outcome: "Maximum attention directed toward one specific, measurable conversion goal."
  },
  {
    id: "portfolio-websites",
    number: "05",
    title: "Portfolio Websites",
    shortDescription: "Editorial, visually refined spaces for creative professionals, photographers, architects, executives, and personal brands.",
    deliverables: [
      "Curated project galleries with lightbox views",
      "Biography, press index, and monograph listings",
      "Private commission and booking forms",
      "Clean, distraction-free typography"
    ],
    idealFor: "Photographers, artists, architects, consultants, and independent specialists.",
    outcome: "An editorial portfolio that commands respect and showcases your body of work."
  },
  {
    id: "website-redesign",
    number: "06",
    title: "Website Redesign",
    shortDescription: "Modernizing clunky, outdated, slow, or template-bound websites into contemporary, mobile-first digital experiences.",
    deliverables: [
      "Audit of existing content and structural pain points",
      "Complete aesthetic and layout overhaul",
      "Mobile-responsiveness upgrade",
      "Preservation of existing domain authority and URLs"
    ],
    idealFor: "Businesses whose current website looks dated, doesn't work well on mobile, or no longer reflects their scale.",
    outcome: "A fresh, modern revival that re-energizes your brand perception."
  },
  {
    id: "seo-foundations",
    number: "07",
    title: "Basic SEO Foundation",
    shortDescription: "Search-engine-friendly foundations engineered directly into the code structure. Fast performance, semantic tags, and accurate metadata.",
    deliverables: [
      "Semantic HTML heading structures (H1-H6)",
      "Meta titles, descriptions, and OpenGraph social cards",
      "Schema.org structured data (JSON-LD)",
      "Image alt attributes, sitemap, and robots.txt readiness"
    ],
    idealFor: "Every business wanting search engines to properly index, understand, and display their content.",
    outcome: "A clean technical foundation that allows search engines to read your website accurately without technical hurdles."
  },
  {
    id: "pvc-review-cards-service",
    number: "08",
    title: "Smart PVC Google Review Cards & Reseller Network",
    shortDescription: "Custom printed NFC + QR PVC Google review collection cards, counter stands, client bulk selling, and sales partner recruiting.",
    deliverables: [
      "Custom branded PVC card design and UV-protected printing",
      "NFC chip encoding directly to your official Google Review link",
      "High-resolution scannable QR backup print on rear/front",
      "Countertop display acrylic stands & lanyards",
      "Bulk merchant order bundles & field sales agent recruitment"
    ],
    idealFor: "Salons, dental clinics, restaurants, retail shops, auto service hubs, and local entrepreneurs wanting to sell cards or collect 5-star Google reviews.",
    outcome: "Instant 5-star Google review growth at point of sale + a profitable recurring reseller/recruiting opportunity."
  }
];

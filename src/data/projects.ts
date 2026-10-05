import { SITE_CONFIG } from "../config/siteConfig";

export interface ProjectItem {
  id: string;
  name: string;
  category: string;
  industry: string;
  shortDescription: string;
  fullDescription: string;
  deliverables: string[];
  keyFeatures: string[];
  metricsOrHighlight?: string;
  liveUrl: string;
  featured: boolean;
  themeColor: string;
  isRealClientProject?: boolean;
  projectStatus: "completed" | "on_demand_potential";
  statusLabel: string;
  heroMockup: {
    tagline: string;
    subtext: string;
    ctaLabel: string;
    accentColor: string;
    navItems: string[];
    bannerHighlights: { label: string; value: string }[];
  };
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "studio-portfolio",
    name: "NEXORA  Studios – Agency & Portfolio Website",
    category: "Portfolio Websites",
    industry: "Web Design & Digital Agency",
    shortDescription: "A high-performance modern agency portfolio website featuring dark/light mode, real project showcases, interactive staging previews, and custom quotation flows.",
    fullDescription: "Designed and engineered as a comprehensive digital showroom for NEXORA Studios. Features a left-hand navigation drawer, centered branding, dual dark/light mode toggle with theme persistence, dedicated allocations for completed client work vs on-demand builds, interactive multi-device staging demos, and WhatsApp lead capture.",
    deliverables: [
      "Custom Responsive Portfolio Architecture",
      "Dynamic Light & Dark Mode Engine",
      "Interactive Multi-Device Staging Viewer",
      "Transparent Pricing & Add-on Calculator",
      "Direct WhatsApp & Contact Inquiries"
    ],
    keyFeatures: [
      "Live production website available directly at this web address",
      "Dark mode (crescent moon) and light mode (sun) toggle",
      "Interactive client project modal & viewport staging preview",
      "Project allocation separating delivered builds from on-demand prototypes",
      "Transparent minimum pricing structure (₹1,200 + ₹300/mo maintenance)",
      "Zero-bloat, responsive, mobile-first design with Tailwind CSS"
    ],
    metricsOrHighlight: "Live Production Website (You Are Here)",
    liveUrl: typeof window !== "undefined" ? window.location.href : "https://nexorastudios.com",
    featured: true,
    isRealClientProject: true,
    projectStatus: "completed",
    statusLabel: "Completed & Live Project",
    themeColor: "#38BDF8",
    heroMockup: {
      tagline: "Modern websites that make businesses look professional online",
      subtext: "Live digital studio portfolio with dual light/dark mode and transparent pricing.",
      ctaLabel: "Explore Live Site",
      accentColor: "#0EA5E9",
      navItems: ["Home", "Selected Work", "Services", "Pricing", "Contact"],
      bannerHighlights: [
        { label: "Live Address", value: "This Website" },
        { label: "Theme", value: "Dark / Light Mode" },
        { label: "Status", value: "Active Production" }
      ]
    }
  },
  {
    id: "pvc-nfc-review-cards",
    name: "TapReview™ – NFC & QR Smart PVC Google Review Cards",
    category: "Smart Cards & Review Systems",
    industry: "PVC Review Collection Cards & Business Growth Hardware",
    shortDescription: "Custom printed NFC + QR Google review collection cards on durable PVC plastic, complete with partner distribution and client recruiting.",
    fullDescription: "Our specialized physical-to-digital growth service: High-grade PVC review collection cards engineered with contactless NTAG213/215 NFC microchips and high-contrast dynamic QR codes. Customers simply tap their smartphone or scan the QR code to instantly open the business's direct 5-star Google Review submission page. We provide complete end-to-end design, custom branding, chip encoding, batch card printing, bulk distribution, and recruiting field agents/resellers to scale local business adoption.",
    deliverables: [
      "Custom Branded PVC Card Printing (Matte / Gloss UV Finish)",
      "High-Sensitivity Contactless NFC Microchip Encoding",
      "Dynamic Direct Google Review QR Code Generation",
      "Countertop Display Stands & Acrylic Holders",
      "Client Onboarding, Sales Recruiting & Reseller Program",
      "Online Batch Order & Customization Inquiry System"
    ],
    keyFeatures: [
      "One-tap review submission: Tap with iPhone or Android to immediately pop up Google review box",
      "Dual technology: Works with both Contactless NFC and camera QR scanning for 100% phone compatibility",
      "Premium waterproof & scratch-resistant PVC credit-card grade material (85.6mm x 54mm)",
      "No app download or battery required — powered passively by customer phone NFC field",
      "Custom business logo, brand color styling, and verified Google Business profile linking",
      "Active production service: On-demand printing, local business sales, and agent recruitment"
    ],
    metricsOrHighlight: "Active Manufacturing, Sales & Recruiting",
    liveUrl: "https://nexorastudios.com/#review-cards",
    featured: true,
    isRealClientProject: true,
    projectStatus: "completed",
    statusLabel: "Active Production & Service",
    themeColor: "#4285F4",
    heroMockup: {
      tagline: "Tap to Review on Google — Smart PVC Review Cards",
      subtext: "Turn walk-in customers into 5-star Google reviews in 3 seconds. Tap with phone or scan QR code.",
      ctaLabel: "Order Custom Cards / Join Reseller Team",
      accentColor: "#34A853",
      navItems: ["How NFC Works", "Card Designs", "Pricing & Packs", "Become a Reseller"],
      bannerHighlights: [
        { label: "Material", value: "Premium PVC + NFC" },
        { label: "Technology", value: "NFC Tap & QR Code" },
        { label: "Review Rate", value: "+340% More Reviews" }
      ]
    }
  },
  {
    id: "salon-dashboard",
    name: "Salon Website & Booking Dashboard",
    category: "Salons & Grooming",
    industry: "Hair Salon & Grooming Studio",
    shortDescription: "A custom responsive salon website and operational client appointment management dashboard.",
    fullDescription: "A real production website and operational management dashboard engineered for a hair salon and grooming studio. Features customer self-booking with stylist selection, service rate catalog (haircuts, styling, beard grooming, hair spa), and a real-time staff scheduling & walk-in queue dashboard. Built with mobile-first performance and direct WhatsApp booking confirmation.",
    deliverables: [
      "Custom Salon Website Design",
      "Client Appointment Self-Booking",
      "Real-Time Staff & Queue Dashboard",
      "Service Rate Catalog",
      "WhatsApp Booking Confirmation"
    ],
    keyFeatures: [
      "Real salon operational dashboard with active queue tracking",
      "Client appointment reservation with time-slot selection",
      "Service menu covering haircuts, styling, beard work, and treatments",
      "Staff allocation and chair availability scheduling",
      "Instant WhatsApp confirmation and direct inquiry link",
      "Live address slot reserved (ready for domain reference)"
    ],
    metricsOrHighlight: "Real Client Booking & Management System",
    liveUrl: SITE_CONFIG.salonProjectLiveUrl || "",
    featured: true,
    isRealClientProject: true,
    projectStatus: "completed",
    statusLabel: "Completed Client Project",
    themeColor: "#0EA5E9",
    heroMockup: {
      tagline: "Modern Haircuts, Styling & Client Management",
      subtext: "Custom salon website with real-time appointment booking, staff schedules, and WhatsApp alerts.",
      ctaLabel: "Book Appointment / Open Dashboard",
      accentColor: "#38BDF8",
      navItems: ["Services & Rates", "Stylists", "Book Appointment", "Staff Dashboard"],
      bannerHighlights: [
        { label: "Salon Appointments", value: "Online & Walk-ins" },
        { label: "Notification", value: "Instant WhatsApp" },
        { label: "Live Reference", value: "Address to be added" }
      ]
    }
  },
  {
    id: "kaviar-bistro",
    name: "Kaviar Artisan Bistro & Espresso",
    category: "Restaurants & Cafés",
    industry: "Hospitality & Specialty Coffee",
    shortDescription: "A rich, sensory dining portfolio featuring dynamic seasonal menus, table reservation requests, and location directions.",
    fullDescription: "Crafted for an artisanal neighbourhood bistro and micro-roastery. Highlights the seasonal menu with high-resolution culinary showcases, dietary filter tags, evening tasting reservation inquiries, and instant map routing.",
    deliverables: ["Visual Brand Identity Translation", "Digital Menu Experience", "Reservation Inquiry System", "Local SEO Setup"],
    keyFeatures: [
      "Dynamic seasonal food & beverage menus",
      "Table reservation request with party size selection",
      "Integrated location map with parking notes",
      "Dietary filters (Vegan, Gluten-Free, Organic)",
      "Accessible high-contrast typography"
    ],
    metricsOrHighlight: "Ready to Build on Request",
    liveUrl: "https://demo.nexorastudios.com/kaviar-bistro",
    featured: true,
    projectStatus: "on_demand_potential",
    statusLabel: "Available on Demand (Ready to Build)",
    themeColor: "#F59E0B",
    heroMockup: {
      tagline: "Artisan Slow Food & Micro-Roastery",
      subtext: "Handmade sourdough, heirloom produce, and single-origin pour-overs served from dawn to twilight.",
      ctaLabel: "View Daily Menu",
      accentColor: "#FBBF24",
      navItems: ["Daily Menu", "Wine & Coffee", "Reserve", "Hours"],
      bannerHighlights: [
        { label: "Cuisine", value: "Seasonal Modern" },
        { label: "Hours", value: "8 AM – 11 PM" },
        { label: "Reservations", value: "Available" }
      ]
    }
  },
  {
    id: "solstice-travel",
    name: "Solstice Expeditions & Tours",
    category: "Travel & Tourism",
    industry: "Adventure & Curated Getaways",
    shortDescription: "An immersive travel itinerary platform showcasing eco-treks, bespoke travel packages, and instant booking inquiries.",
    fullDescription: "Built for an experiential travel agency specializing in high-altitude treks and cultural retreats. Delivers comprehensive day-by-day itineraries, packing guides, transparent pricing breakdowns, and direct booking inquiries.",
    deliverables: ["Interactive Expedition Directory", "Custom Itinerary Builder", "Lead Ingestion System", "SEO Foundations"],
    keyFeatures: [
      "Interactive day-by-day expedition timelines",
      "Difficulty ratings, elevation charts, and inclusions",
      "Direct WhatsApp and inquiry dispatch",
      "Offline-first route maps and gear checklists",
      "Sub-second image loading and WebP compression"
    ],
    metricsOrHighlight: "Ready to Build on Request",
    liveUrl: "https://demo.nexorastudios.com/solstice-travel",
    featured: true,
    projectStatus: "on_demand_potential",
    statusLabel: "Available on Demand (Ready to Build)",
    themeColor: "#10B981",
    heroMockup: {
      tagline: "Untamed Horizons & Curated Expeditions",
      subtext: "Small-group journeys led by certified naturalists through the Eastern Himalayas and coastal sanctuaries.",
      ctaLabel: "Explore Itineraries",
      accentColor: "#34D399",
      navItems: ["Destinations", "Trek Calendar", "Custom Trips", "About"],
      bannerHighlights: [
        { label: "Group Size", value: "Max 8 Guests" },
        { label: "Guides", value: "Certified Locals" },
        { label: "Eco Standard", value: "Leave No Trace" }
      ]
    }
  },
  {
    id: "vanguard-advisory",
    name: "Vanguard Corporate & Advisory",
    category: "Business Websites",
    industry: "Corporate Legal & Strategic Consulting",
    shortDescription: "An authoritative, clean web presence for a corporate law firm and strategic business advisory practice.",
    fullDescription: "Designed for a boutique corporate law firm. Delivers a sophisticated, credible layout that highlights practice areas, attorney credentials, regulatory advisories, and confidential consultation scheduling.",
    deliverables: ["Corporate Web Architecture", "Practice Area Documentation", "Consultation Intake System", "WCAG AA Compliance"],
    keyFeatures: [
      "Practice area breakdowns (M&A, IP, Regulatory, Corporate)",
      "Secure confidential consultation intake form",
      "Publication repository for legal briefs and insights",
      "Rigorous contrast ratios and keyboard navigation",
      "Clean semantic structure tailored for search engines"
    ],
    metricsOrHighlight: "Ready to Build on Request",
    liveUrl: "https://demo.nexorastudios.com/vanguard-advisory",
    featured: true,
    projectStatus: "on_demand_potential",
    statusLabel: "Available on Demand (Ready to Build)",
    themeColor: "#6366F1",
    heroMockup: {
      tagline: "Precision Counsel for Complex Enterprise",
      subtext: "Cross-border corporate restructuring, commercial litigation, and regulatory compliance advisory.",
      ctaLabel: "Schedule Briefing",
      accentColor: "#818CF8",
      navItems: ["Practice Areas", "Attorneys", "Insights", "Contact"],
      bannerHighlights: [
        { label: "Jurisdictions", value: "Multi-State" },
        { label: "Practices", value: "12 Disciplines" },
        { label: "Ethics", value: "Strict Privilege" }
      ]
    }
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova Studio & Direction",
    category: "Personal Brands",
    industry: "Creative Direction & Industrial Design",
    shortDescription: "An editorial portfolio website showcasing limited-edition physical furniture and spatial design commissions.",
    fullDescription: "Engineered for an independent industrial designer and creative director. Focuses on generous whitespace, high-fidelity gallery viewports, bespoke project case studies, and direct private commission inquiries.",
    deliverables: ["Editorial Portfolio Design", "High-Resolution Gallery", "Press Archive", "Custom Domain Connection"],
    keyFeatures: [
      "Full-bleed visual case studies with material specs",
      "Lightweight image viewer with zoom capability",
      "Selected exhibition history and monograph press index",
      "Private commission inquiry flow with budget tiers",
      "Zero clutter, typography-first minimalism"
    ],
    metricsOrHighlight: "Ready to Build on Request",
    liveUrl: "https://demo.nexorastudios.com/elena-rostova",
    featured: false,
    projectStatus: "on_demand_potential",
    statusLabel: "Available on Demand (Ready to Build)",
    themeColor: "#EC4899",
    heroMockup: {
      tagline: "Spatial Form & Material Experiments",
      subtext: "Exploring the boundary between structural permanence and tactile silence through sculptural utility.",
      ctaLabel: "View Catalog",
      accentColor: "#F472B6",
      navItems: ["Objects", "Spaces", "Monographs", "Inquiries"],
      bannerHighlights: [
        { label: "Medium", value: "Stone & Bronze" },
        { label: "Editions", value: "Numbered (1/12)" },
        { label: "Studio", value: "By Appointment" }
      ]
    }
  },
  {
    id: "apex-logistics",
    name: "Apex Peak Freight & Supply Chain",
    category: "Service Businesses",
    industry: "Regional Logistics & Cold Chain Transport",
    shortDescription: "A high-clarity service platform providing quote calculators, fleet capabilities, and dispatch inquiries.",
    fullDescription: "Developed for a regional logistics provider operating temperature-controlled warehousing and fleet transport. Features a quick freight quote estimator, terminal route maps, compliance certifications, and 24/7 driver dispatch contacts.",
    deliverables: ["Service Platform Development", "Interactive Freight Quote Estimator", "Fleet Showcase", "Performance Tuning"],
    keyFeatures: [
      "Quick freight route quote request form",
      "Warehouse hub directory and route coverage maps",
      "Fleet capability specifications (Reefer, Dry Van, Flatbed)",
      "Emergency cargo dispatch hotline integration",
      "Ultra-fast loading on mobile handheld devices"
    ],
    metricsOrHighlight: "Ready to Build on Request",
    liveUrl: "https://demo.nexorastudios.com/apex-logistics",
    featured: false,
    projectStatus: "on_demand_potential",
    statusLabel: "Available on Demand (Ready to Build)",
    themeColor: "#14B8A6",
    heroMockup: {
      tagline: "Reliable Cold Chain & Regional Freight",
      subtext: "Precision-monitored refrigerated transport and synchronized distribution across 18 regional hubs.",
      ctaLabel: "Request Freight Quote",
      accentColor: "#2DD4BF",
      navItems: ["Services", "Fleet Specs", "Coverage", "Dispatch"],
      bannerHighlights: [
        { label: "Fleet Readiness", value: "99.4%" },
        { label: "Monitoring", value: "Live GPS & Temp" },
        { label: "Transit Time", value: "Guaranteed SLA" }
      ]
    }
  }
];

export const PROJECT_CATEGORIES = [
  "All",
  "Smart Cards & Review Systems",
  "Salons & Grooming",
  "Business Websites",
  "Restaurants & Cafés",
  "Travel & Tourism",
  "Personal Brands",
  "Service Businesses"
];

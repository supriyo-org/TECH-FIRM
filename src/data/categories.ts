export interface CategoryItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  commonFeatures: string[];
  sampleTypes: string;
}

export const WHAT_WE_BUILD_CATEGORIES: CategoryItem[] = [
  {
    id: "pvc-review-cards",
    title: "PVC Smart Review Cards",
    subtitle: "NFC Tap & QR Review Cards & Agent Recruiting",
    description: "Hardware & digital review collection: Custom printed PVC NFC cards and acrylic counter stands that instantly trigger Google 5-star reviews on tap. We handle custom card printing, chip encoding, bulk sales, and reseller recruitment.",
    commonFeatures: ["NFC Chip (NTAG213/215)", "Dynamic Google Review QR", "Waterproof PVC Finish", "Bulk Reseller Packs & Recruiting"],
    sampleTypes: "Salons, cafés, retail stores, clinics, restaurants, car wash & service centers"
  },
  {
    id: "business-websites",
    title: "Business Websites",
    subtitle: "Credibility & Lead Capture",
    description: "Multi-page corporate and commercial websites with structured service hierarchies, client intake systems, and clear company positioning.",
    commonFeatures: ["Practice / Service Catalog", "Intake Questionnaires", "Team Profiles", "Location Map"],
    sampleTypes: "Consultancies, financial advisory, legal practices, engineering firms, corporate offices"
  },
  {
    id: "travel-tourism",
    title: "Travel & Tourism",
    subtitle: "Immersive Itineraries & Inquiries",
    description: "Visually rich travel platforms that showcase destinations, multi-day expedition schedules, transparent pricing, and instant booking requests.",
    commonFeatures: ["Interactive Day Plans", "Trip Inclusions & Exclusions", "Direct WhatsApp Booking", "Gear & Packing Guides"],
    sampleTypes: "Tour operators, expedition guides, boutique resorts, eco-lodges, retreat centers"
  },
  {
    id: "restaurants-cafes",
    title: "Restaurants & Cafés",
    subtitle: "Sensory Dining & Table Booking",
    description: "Engaging digital menus and reservation gateways designed to make dishes look irresistible and get guests into your seats.",
    commonFeatures: ["Seasonal Food & Wine Menus", "Table Reservation Inquiries", "One-Tap Calling & Directions", "Dietary Badges"],
    sampleTypes: "Artisan bistros, specialty coffee roasters, fine dining, pizzerias, bakeries"
  },
  {
    id: "salons-grooming",
    title: "Salons & Grooming",
    subtitle: "Online Booking & Queue Management",
    description: "Dedicated websites and client appointment dashboards built for hair studios and grooming salons. Features service menus, stylist schedules, and instant WhatsApp booking.",
    commonFeatures: ["Client Self-Booking & Time Slots", "Stylist & Staff Schedules", "Service Rate Catalog", "Live Client Queue Dashboard"],
    sampleTypes: "Hair salons, barber studios, grooming parlours, styling lounges"
  },
  {
    id: "personal-brands",
    title: "Personal Brands",
    subtitle: "Authority & Speaker Showcase",
    description: "Clean, authoritative digital homepages for independent consultants, authors, keynotes, creators, and subject-matter experts.",
    commonFeatures: ["Press & Media Features", "Keynote Topic Outlines", "Newsletter Integration", "Direct Consultation Request"],
    sampleTypes: "Keynote speakers, executive coaches, independent advisors, published authors"
  },
  {
    id: "service-businesses",
    title: "Service Businesses",
    subtitle: "Transparent Quotes & Fast Dispatch",
    description: "Utility-focused websites built for home services, logistics, maintenance, and technical contractors seeking local phone and form inquiries.",
    commonFeatures: ["Quick Quote Calculator", "Service Area ZIP Check", "Emergency Call Buttons", "Warranty & License Badges"],
    sampleTypes: "Logistics operators, HVAC contractors, electrical specialists, plumbing firms"
  },
  {
    id: "portfolio-websites",
    title: "Portfolio Websites",
    subtitle: "Editorial Curation & Visual Depth",
    description: "Minimalist, distraction-free galleries built to let photography, architectural drawings, and creative projects speak for themselves.",
    commonFeatures: ["High-Res Lightbox Galleries", "Material Specifications", "Selected Exhibition Index", "Commission Inquiry"],
    sampleTypes: "Photographers, architects, interior designers, art directors, product designers"
  },
  {
    id: "landing-pages",
    title: "Landing Pages",
    subtitle: "Laser-Focused Campaigns",
    description: "Single-action campaign destinations engineered to maximize signups, bookings, or downloads for a specific product or event.",
    commonFeatures: ["Single Conversion Goal", "Rapid Above-the-Fold Value", "Direct Contact Capture", "Zero Navigation Leakage"],
    sampleTypes: "Workshop launches, promotional drops, webinar registrations, seasonal specials"
  }
];

/**
 * Centralized Site Configuration for NEXORA  Studios
 * 
 * Rules:
 * - Brand name must ALWAYS be written exactly as: NEXORA  Studios (with two spaces)
 * - Do NOT reveal personal names or identities of people behind the studio
 * - All pricing, contact details, promotional offer settings, and URLs are managed here.
 */

export interface SiteConfig {
  brandName: string;
  brandTagline: string;
  brandDescription: string;
  contactEmail: string;
  supportEmail: string;
  standardStartingPrice: number; // In INR (₹)
  standardMonthlyMaintenance: number; // In INR (₹/month)
  promotionalOffer: {
    enabled: boolean;
    title: string;
    subtitle: string;
    badgeText: string;
    discountedPrice: number; // e.g. 1500
    // Configurable end date string (YYYY-MM-DD). The offer auto-hides once current date passes this.
    endDate: string; 
    termsNotice: string;
  };
  socialLinks: {
    platform: string;
    url: string;
    label: string;
  }[];
  legalLastUpdated: string;
  // Live address for the real Salon Website & Dashboard project (user will provide address later)
  salonProjectLiveUrl: string;
  // Live address for this studio portfolio website itself
  portfolioProjectLiveUrl: string;
}

export const SITE_CONFIG: SiteConfig = {
  brandName: "NEXORA  Studios",
  brandTagline: "Modern websites & Smart PVC Google Review Cards that help businesses grow.",
  brandDescription: "We design and develop fast, responsive websites and manufacture custom NFC + QR Smart PVC Google Review Collection Cards with bulk merchant distribution and sales agent recruiting.",
  contactEmail: "productionsupriyo@gmail.com",
  supportEmail: "productionsupriyo@gmail.com",
  standardStartingPrice: 1200,
  standardMonthlyMaintenance: 300,
  // Slot for the real Salon Website & Dashboard live URL. Leave empty or update when address is provided:
  salonProjectLiveUrl: "",
  // Live address of this portfolio website:
  portfolioProjectLiveUrl: typeof window !== "undefined" ? window.location.origin : "https://nexorastudios.com",
  promotionalOffer: {
    enabled: true,
    title: "Durga Puja Special",
    subtitle: "Basic website setup at ₹1,200 with ongoing ₹300/month maintenance & domain setup.",
    badgeText: "Festive Offer",
    discountedPrice: 1200,
    endDate: "2026-10-31", // Until Durga Puja Dashami / Festive season
    termsNotice: "Domain extension and availability subject to qualifying terms and third-party registrar eligibility.",
  },
  socialLinks: [
    { platform: "X / Twitter", url: "https://x.com", label: "Follow on X" },
    { platform: "LinkedIn", url: "https://linkedin.com", label: "Connect on LinkedIn" },
    { platform: "GitHub", url: "https://github.com", label: "View Open Source on GitHub" },
  ],
  legalLastUpdated: "September 2026",
};

/**
 * Checks if the promotional offer is currently active and unexpired.
 */
export function isPromotionalOfferActive(): boolean {
  if (!SITE_CONFIG.promotionalOffer.enabled) return false;
  const endDate = new Date(SITE_CONFIG.promotionalOffer.endDate + "T23:59:59");
  const now = new Date();
  return now <= endDate;
}

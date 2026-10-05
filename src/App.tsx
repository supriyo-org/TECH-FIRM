import { useState, useEffect } from "react";
import { ThemeProvider } from "./context/ThemeContext";
import { ScrollProgress } from "./components/ScrollProgress";
import { PromotionalBanner } from "./components/PromotionalBanner";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { Portfolio } from "./components/Portfolio";
import { WhatWeBuild } from "./components/WhatWeBuild";
import { Services } from "./components/Services";
import { Process } from "./components/Process";
import { Pricing } from "./components/Pricing";
import { ContactForm } from "./components/ContactForm";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { ProjectModal } from "./components/ProjectModal";
import { LiveProjectView } from "./components/LiveProjectView";
import { LegalModal } from "./components/LegalModal";
import { CookieBanner } from "./components/CookieBanner";
import { Chatbot } from "./components/Chatbot";
import { NotFoundPage } from "./components/NotFoundPage";
import { InquiriesModal } from "./components/InquiriesModal";
import { PROJECTS_DATA, ProjectItem } from "./data/projects";

export default function App() {
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [liveViewingProject, setLiveViewingProject] = useState<ProjectItem | null>(null);
  const [activeLegalDoc, setActiveLegalDoc] = useState<string | null>(null);
  const [inquiriesModalOpen, setInquiriesModalOpen] = useState(false);
  const [contactInitialType, setContactInitialType] = useState<string>("Business Website");
  const [is404Route, setIs404Route] = useState(false);

  // Monitor simple hash-based or pathname-based routing for 404 & live demo testing
  useEffect(() => {
    const checkRoute = () => {
      if (window.location.hash.startsWith("#live/")) {
        const id = window.location.hash.replace("#live/", "");
        const found = PROJECTS_DATA.find((p) => p.id === id);
        if (found) {
          setLiveViewingProject(found);
          setIs404Route(false);
          return;
        }
      }
      if (window.location.hash === "#404" || window.location.pathname === "/404") {
        setIs404Route(true);
      } else {
        setIs404Route(false);
      }
    };
    checkRoute();
    window.addEventListener("hashchange", checkRoute);
    return () => window.removeEventListener("hashchange", checkRoute);
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIs404Route(false);
    setLiveViewingProject(null);
    if (window.location.hash === "#404" || window.location.hash.startsWith("#live/")) {
      window.location.hash = "";
    }
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleOpenLiveWebsite = (project: ProjectItem) => {
    setSelectedProject(null);
    setLiveViewingProject(project);
    window.location.hash = `#live/${project.id}`;
  };

  const handleCloseLiveView = () => {
    setLiveViewingProject(null);
    if (window.location.hash.startsWith("#live/")) {
      window.location.hash = "#work";
    }
  };

  const handleServiceSelect = (serviceTitle: string) => {
    setContactInitialType(serviceTitle);
    scrollToSection("contact");
  };

  const handlePricingQuote = (tierName?: string) => {
    if (tierName) {
      setContactInitialType(tierName);
    }
    scrollToSection("contact");
  };

  const handleCategorySelect = (categoryTitle: string) => {
    scrollToSection("work");
  };

  return (
    <ThemeProvider>
      <div className="relative min-h-screen bg-[#080B11] text-[#E2E8F0] selection:bg-sky-500 selection:text-white transition-colors duration-200">
        {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Dismissible Festive Banner */}
      <PromotionalBanner onClaimOffer={() => handlePricingQuote("Durga Puja Festive Offer")} />

      {/* Sticky Header Navigation */}
      <Navbar 
        onOpenContact={() => scrollToSection("contact")}
        onOpenInquiries={() => setInquiriesModalOpen(true)}
      />

      {is404Route ? (
        <main>
          <NotFoundPage onBackToHome={() => scrollToSection("home")} />
        </main>
      ) : (
        <main>
          {/* Hero Section */}
          <Hero
            onExploreWork={() => scrollToSection("work")}
            onStartProject={() => scrollToSection("contact")}
          />

          {/* Selected Work (Portfolio) */}
          <Portfolio
            onSelectProject={(project) => setSelectedProject(project)}
            onOpenLiveWebsite={handleOpenLiveWebsite}
            onRequestBuild={(projectName) => handlePricingQuote(projectName)}
          />

          {/* What We Build (Industry Categories) */}
          <WhatWeBuild onSelectCategory={handleCategorySelect} />

          {/* Capabilities & Services */}
          <Services onRequestService={handleServiceSelect} />

          {/* How We Work (Process Timeline) */}
          <Process />

          {/* Transparent Pricing Structure */}
          <Pricing onRequestQuote={handlePricingQuote} />

          {/* Frequently Asked Questions */}
          <FaqSection onContactClick={() => scrollToSection("contact")} />

          {/* Project Inquiry & Contact Form */}
          <ContactForm
            initialProjectType={contactInitialType}
            onOpenPrivacyPolicy={() => setActiveLegalDoc("privacy")}
            onOpenTerms={() => setActiveLegalDoc("terms")}
          />
        </main>
      )}

      {/* Multi-Column Footer */}
      <Footer
        onOpenLegal={(docId) => setActiveLegalDoc(docId)}
        onNavigate={scrollToSection}
        onOpenInquiries={() => setInquiriesModalOpen(true)}
      />

      {/* Public Enquiries & Lead Dashboard Modal */}
      <InquiriesModal
        isOpen={inquiriesModalOpen}
        onClose={() => setInquiriesModalOpen(false)}
      />

      {/* Project Preview Modal */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onRequestSimilarProject={(name) => {
          setSelectedProject(null);
          setContactInitialType(`Similar to ${name}`);
          scrollToSection("contact");
        }}
        onOpenLiveWebsite={handleOpenLiveWebsite}
      />

      {/* Full Live Project Interactive Showcase Viewer */}
      {liveViewingProject && (
        <LiveProjectView
          project={liveViewingProject}
          onClose={handleCloseLiveView}
        />
      )}

      {/* Trust Center / Legal Documents Modal */}
      <LegalModal
        documentId={activeLegalDoc}
        onClose={() => setActiveLegalDoc(null)}
      />

      {/* Privacy-Conscious Cookie Banner */}
      <CookieBanner onOpenCookiePolicy={() => setActiveLegalDoc("cookies")} />

      {/* Studio Concierge Chatbot */}
      <Chatbot
        onNavigateSection={scrollToSection}
        onOpenPricingQuote={() => handlePricingQuote("Starter Business Site (₹1,200 + ₹300/mo)")}
      />
    </div>
    </ThemeProvider>
  );
}

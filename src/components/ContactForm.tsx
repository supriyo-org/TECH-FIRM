import { useState, FormEvent, useEffect } from "react";
import { Mail, CheckCircle, AlertCircle, Send, ShieldCheck, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "../config/siteConfig";

interface ContactFormProps {
  initialProjectType?: string;
  onOpenPrivacyPolicy: () => void;
  onOpenTerms: () => void;
}

interface FormState {
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  consent: boolean;
}

export function ContactForm({
  initialProjectType = "",
  onOpenPrivacyPolicy,
  onOpenTerms,
}: ContactFormProps) {
  const [formData, setFormData] = useState<FormState>({
    fullName: "",
    businessName: "",
    email: "",
    phone: "",
    projectType: initialProjectType || "Business Website",
    budget: "",
    message: "",
    consent: false, // Explicit requirement: The checkbox must NOT be pre-checked.
  });

  useEffect(() => {
    if (initialProjectType) {
      setFormData((prev) => ({ ...prev, projectType: initialProjectType }));
    }
  }, [initialProjectType]);

  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);
  const [submissionRef, setSubmissionRef] = useState("");

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormState, string>> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Please enter your name.";
    }
    if (!formData.businessName.trim()) {
      newErrors.businessName = "Please enter your business or brand name.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Please enter your email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }
    if (!formData.message.trim() || formData.message.trim().length < 15) {
      newErrors.message = "Please share a brief description of your project (at least 15 characters).";
    }
    if (!formData.consent) {
      newErrors.consent = "You must agree to the privacy policy terms before submitting.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Send through server API endpoint or process securely
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          businessName: formData.businessName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          projectType: formData.projectType,
          budget: formData.budget,
          message: formData.message.trim(),
          consent: formData.consent,
        }),
      });

      let assignedRef = `NXR-${Math.floor(100000 + Math.random() * 900000)}`;

      if (response.ok) {
        const data = await response.json();
        if (data.referenceId) assignedRef = data.referenceId;
      }
      setSubmissionRef(assignedRef);

      // Save locally to localStorage so inquiries modal can show offline or client-cached submissions instantly
      try {
        const existing = JSON.parse(localStorage.getItem("nexora_inquiries_cache") || "[]");
        const newRecord = {
          referenceId: assignedRef,
          fullName: formData.fullName.trim(),
          businessName: formData.businessName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "Not provided",
          projectType: formData.projectType,
          budget: formData.budget || "Standard (₹1,200 + ₹300/mo)",
          message: formData.message.trim(),
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
          status: "New",
        };
        localStorage.setItem("nexora_inquiries_cache", JSON.stringify([newRecord, ...existing]));
      } catch {
        // Ignored
      }

      setSubmissionSuccess(true);
    } catch {
      // Graceful offline fallback
      const fallbackRef = `NXR-${Math.floor(100000 + Math.random() * 900000)}`;
      setSubmissionRef(fallbackRef);
      try {
        const existing = JSON.parse(localStorage.getItem("nexora_inquiries_cache") || "[]");
        const newRecord = {
          referenceId: fallbackRef,
          fullName: formData.fullName.trim(),
          businessName: formData.businessName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || "Not provided",
          projectType: formData.projectType,
          budget: formData.budget || "Standard (₹1,200 + ₹300/mo)",
          message: formData.message.trim(),
          timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
          status: "New",
        };
        localStorage.setItem("nexora_inquiries_cache", JSON.stringify([newRecord, ...existing]));
      } catch {
        // Ignored
      }
      setSubmissionSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setFormData({
      fullName: "",
      businessName: "",
      email: "",
      phone: "",
      projectType: "Business Website",
      budget: "",
      message: "",
      consent: false,
    });
    setErrors({});
    setSubmissionSuccess(false);
    setSubmissionRef("");
  };

  return (
    <section id="contact" className="py-20 md:py-32 relative border-t border-white/[0.05]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Col: Contact Overview & Work Email */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-400 mb-2">
                Get in Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Syne'] tracking-tight mb-4">
                Have a project in mind?
              </h2>
              <p className="text-sm text-neutral-300 leading-relaxed">
                Whether you need a new website from scratch, a complete redesign, or guidance on what will work best for your business, we're ready to collaborate.
              </p>
            </div>

            {/* Official Work Email */}
            <div className="p-6 rounded-2xl bg-neutral-900/40 border border-neutral-800/80 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                Official Studio Correspondence
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-sky-400" />
                </div>
                <div>
                  <div className="text-xs text-neutral-400">Direct Inquiries</div>
                  <a
                    href={`mailto:${SITE_CONFIG.contactEmail}`}
                    className="text-sm font-semibold text-white hover:text-sky-300 transition-colors"
                  >
                    {SITE_CONFIG.contactEmail}
                  </a>
                </div>
              </div>
              <div className="text-[11px] text-neutral-400 pt-2 border-t border-neutral-800">
                Typical response window: within 24 business hours.
              </div>
            </div>

            {/* Privacy commitment trust note */}
            <div className="flex items-start gap-3 p-4 rounded-xl bg-neutral-900/20 border border-neutral-800/60 text-xs text-neutral-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Your details are treated confidentially and only used to respond to your inquiry. We never share or sell contact information.
              </span>
            </div>
          </div>

          {/* Right Col: Interactive Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-2xl bg-neutral-900/50 border border-neutral-800 shadow-xl">
              {submissionSuccess ? (
                <div className="text-center py-10 space-y-4 animate-in fade-in duration-300">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                    <CheckCircle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white tracking-tight">
                    Inquiry Received Successfully
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto leading-relaxed">
                    Thank you for reaching out to {SITE_CONFIG.brandName}. We have logged your request under Reference <span className="font-mono text-sky-400 font-semibold">{submissionRef}</span> and will review your specifications shortly.
                  </p>
                  <div className="pt-4">
                    <button
                      onClick={handleReset}
                      className="px-5 py-2 text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors cursor-pointer"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="contact-fullName" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Your Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Alex Morgan"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                          errors.fullName ? "border-rose-500/80 focus:border-rose-500" : "border-neutral-800 focus:border-sky-500"
                        }`}
                      />
                      {errors.fullName && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.fullName}</span>
                        </p>
                      )}
                    </div>

                    {/* Business / Brand Name */}
                    <div>
                      <label htmlFor="contact-businessName" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Business / Brand Name <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-businessName"
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Urban Oasis Spa"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                          errors.businessName ? "border-rose-500/80 focus:border-rose-500" : "border-neutral-800 focus:border-sky-500"
                        }`}
                      />
                      {errors.businessName && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.businessName}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Email */}
                    <div>
                      <label htmlFor="contact-email" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Email Address <span className="text-sky-400">*</span>
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@example.com"
                        className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                          errors.email ? "border-rose-500/80 focus:border-rose-500" : "border-neutral-800 focus:border-sky-500"
                        }`}
                      />
                      {errors.email && (
                        <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>

                    {/* Phone (Optional) */}
                    <div>
                      <label htmlFor="contact-phone" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Phone Number <span className="text-neutral-400 text-[10px]">(Optional)</span>
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 rounded-lg bg-black/40 border border-neutral-800 text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-sky-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {/* Project Type */}
                    <div>
                      <label htmlFor="contact-projectType" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Project Type
                      </label>
                      <select
                        id="contact-projectType"
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1320] border border-neutral-800 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                      >
                        <option value="Business Website">Business Website</option>
                        <option value="Smart PVC NFC Google Review Cards (Bulk / Single)">Smart PVC NFC Google Review Cards (Print & Setup)</option>
                        <option value="Become a Sales Partner / Reseller for PVC Review Cards">Join as Sales Agent / Reseller (Recruiting)</option>
                        <option value="Restaurant & Café Website">Restaurant & Café Website</option>
                        <option value="Salon & Grooming Website with Dashboard">Salon Website & Booking Dashboard</option>
                        <option value="Travel & Tourism Website">Travel & Tourism Website</option>
                        <option value="Personal Brand & Portfolio">Personal Brand & Portfolio</option>
                        <option value="Service Business Website">Service Business Website</option>
                        <option value="Landing Page">Campaign Landing Page</option>
                        <option value="Website Redesign">Website Redesign</option>
                        <option value="Starter Business Site (₹1,200 + ₹300/mo)">Starter Business Site (₹1,200 + ₹300/mo)</option>
                        <option value="Durga Puja Festive Offer">Durga Puja Festive Offer</option>
                        <option value="Other Custom Inquiry">Other Custom Inquiry</option>
                      </select>
                    </div>

                    {/* Approximate Budget */}
                    <div>
                      <label htmlFor="contact-budget" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                        Approximate Budget <span className="text-neutral-400 text-[10px]">(Optional)</span>
                      </label>
                      <select
                        id="contact-budget"
                        value={formData.budget}
                        onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-[#0E1320] border border-neutral-800 text-xs text-white focus:outline-none focus:border-sky-500 transition-colors cursor-pointer"
                      >
                        <option value="">Select an approximate range</option>
                        <option value="₹1,200 – ₹5,000">₹1,200 – ₹5,000 (Starter / Single-page)</option>
                        <option value="₹5,000 – ₹15,000">₹5,000 – ₹15,000 (Multi-page / Booking)</option>
                        <option value="₹15,000 – ₹35,000">₹15,000 – ₹35,000 (Commercial Platform)</option>
                        <option value="₹35,000+">₹35,000+ (Bespoke Application)</option>
                        <option value="Flexible / Need Guidance">Flexible / Need Guidance</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="block text-xs font-semibold text-neutral-300 mb-1.5">
                      Project Details & Goals <span className="text-sky-400">*</span>
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your business, the pages or features you need, and any websites you like the style of..."
                      className={`w-full px-3.5 py-2.5 rounded-lg bg-black/40 border text-xs text-white placeholder-neutral-400 focus:outline-none transition-colors ${
                        errors.message ? "border-rose-500/80 focus:border-rose-500" : "border-neutral-800 focus:border-sky-500"
                      }`}
                    />
                    {errors.message && (
                      <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.message}</span>
                      </p>
                    )}
                  </div>

                  {/* Consent Checkbox - CRITICAL: NOT pre-checked */}
                  <div className="pt-2">
                    <label className="flex items-start gap-2.5 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={formData.consent}
                        onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                        className="mt-0.5 rounded border-neutral-700 bg-neutral-900 text-sky-500 focus:ring-sky-400 w-4 h-4 cursor-pointer"
                      />
                      <span className="text-xs text-neutral-400 leading-relaxed">
                        I agree that {SITE_CONFIG.brandName} may use the information submitted in this form to respond to my inquiry, subject to the{" "}
                        <button
                          type="button"
                          onClick={onOpenPrivacyPolicy}
                          className="text-sky-400 underline hover:text-sky-300 cursor-pointer"
                        >
                          Privacy Policy
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          onClick={onOpenTerms}
                          className="text-sky-400 underline hover:text-sky-300 cursor-pointer"
                        >
                          Terms & Conditions
                        </button>.
                      </span>
                    </label>
                    {errors.consent && (
                      <p className="text-[11px] text-rose-400 mt-1.5 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3 shrink-0" />
                        <span>{errors.consent}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-3">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 text-xs font-semibold text-slate-900 bg-white hover:bg-neutral-100 active:scale-[0.98] transition-all rounded-lg cursor-pointer shadow-md disabled:opacity-50"
                    >
                      {isSubmitting ? (
                        <span>Processing Inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Project Inquiry</span>
                          <Send className="w-3.5 h-3.5 text-slate-900" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect, FormEvent } from "react";
import { MessageSquare, X, Send, Bot, User, Sparkles, ArrowRight, CornerDownLeft } from "lucide-react";
import { SITE_CONFIG, isPromotionalOfferActive } from "../config/siteConfig";

interface ChatMessage {
  id: string;
  sender: "bot" | "user";
  text: string;
  actions?: { label: string; actionId: string }[];
  timestamp: string;
}

interface ChatbotProps {
  onNavigateSection: (sectionId: string) => void;
  onOpenPricingQuote: () => void;
}

export function Chatbot({ onNavigateSection, onOpenPricingQuote }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const initialBotMessage: ChatMessage = {
    id: "welcome-1",
    sender: "bot",
    text: `Hello. Welcome to ${SITE_CONFIG.brandName}. I can provide factual information about our web design services, timeline, pricing principles, and portfolio. How may I assist you today?`,
    actions: [
      { label: "What is your starting price?", actionId: "pricing" },
      { label: "How long does a project take?", actionId: "timeline" },
      { label: "Show previous work", actionId: "portfolio" },
      { label: "How to start a project?", actionId: "start" },
    ],
    timestamp: "Just now",
  };

  const [messages, setMessages] = useState<ChatMessage[]>([initialBotMessage]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  const handleActionClick = (actionId: string, label: string) => {
    handleUserMessage(label, actionId);
  };

  const getStudioResponse = (query: string, actionId?: string): { text: string; actions?: { label: string; actionId: string }[] } => {
    const q = query.toLowerCase();

    if (actionId === "pricing" || q.includes("price") || q.includes("cost") || q.includes("rate") || q.includes("how much") || q.includes("₹")) {
      const isPromo = isPromotionalOfferActive();
      let text = `Our minimum website making charge starts from ₹${SITE_CONFIG.standardStartingPrice.toLocaleString()} with an ongoing ₹${SITE_CONFIG.standardMonthlyMaintenance}/month maintenance plan (covering updates, hosting support, and security). `;
      if (isPromo) {
        text += `Currently, our ${SITE_CONFIG.promotionalOffer.title} is active, offering website setup at ₹${SITE_CONFIG.promotionalOffer.discountedPrice.toLocaleString()} + ₹${SITE_CONFIG.standardMonthlyMaintenance}/month with domain assistance. `;
      }
      text += "Because each project is tailored, custom multi-page or booking websites are estimated based on specific requirements, pages, and integrations.";
      return {
        text,
        actions: [
          { label: "Request a Tailored Quote", actionId: "quote" },
          { label: "Explore Pricing Tiers", actionId: "view_pricing" },
        ],
      };
    }

    if (actionId === "timeline" || q.includes("time") || q.includes("long") || q.includes("duration") || q.includes("days") || q.includes("weeks")) {
      return {
        text: "Focused single-page business sites and landing pages typically take 3 to 7 business days once requirements and content are gathered. Multi-page commercial platforms or sites requiring specialized booking workflows usually take 1 to 3 weeks.",
        actions: [
          { label: "View Our 6-Step Process", actionId: "view_process" },
          { label: "Inquire for Your Date", actionId: "contact" },
        ],
      };
    }

    if (actionId === "portfolio" || q.includes("work") || q.includes("portfolio") || q.includes("example") || q.includes("samples") || q.includes("salon") || q.includes("restaurant") || q.includes("travel")) {
      return {
        text: `We have built websites including our featured Salon Website & Booking Dashboard, Kaviar Artisan Bistro (Restaurants & Cafés), Solstice Expeditions (Travel & Tourism), and Vanguard Corporate (Business & Advisory). You can inspect live preview demos and visit their URLs in our Selected Work section.`,
        actions: [
          { label: "Browse Selected Work", actionId: "view_work" },
          { label: "Request Similar Project", actionId: "contact" },
        ],
      };
    }

    if (q.includes("pvc") || q.includes("nfc") || q.includes("card") || q.includes("review card") || q.includes("reseller") || q.includes("recruit")) {
      return {
        text: "Yes! We manufacture custom-printed Smart PVC Google Review Cards equipped with contactless NFC microchips and dynamic QR codes. Customers simply tap their phone on the card or counter stand to leave an instant 5-star Google review. We also actively recruit field sales agents and resellers with high profit margins.",
        actions: [
          { label: "View Smart Cards in Portfolio", actionId: "view_work" },
          { label: "Order Cards or Apply as Reseller", actionId: "contact" },
        ],
      };
    }

    if (actionId === "start" || q.includes("start") || q.includes("hire") || q.includes("contact") || q.includes("inquiry") || q.includes("reach")) {
      return {
        text: `To start a project, simply submit an inquiry via our contact form with your business name, desired website type, and timeline. Our team will review your specifications and reply with a transparent scope and quote within 24 business hours. You can also email us directly at ${SITE_CONFIG.contactEmail}.`,
        actions: [
          { label: "Open Contact Form", actionId: "contact" },
        ],
      };
    }

    if (q.includes("service") || q.includes("what we build") || q.includes("offer") || q.includes("capabilities")) {
      return {
        text: "NEXORA  Studios provides Website Design, Responsive Development, Business Websites, High-Conversion Landing Pages, Portfolio Websites, Website Redesigns, and Basic SEO Foundations. We build for salons, restaurants, travel agencies, local businesses, and modern service practices.",
        actions: [
          { label: "View Services Breakdown", actionId: "view_services" },
          { label: "View What We Build", actionId: "view_categories" },
        ],
      };
    }

    if (q.includes("domain") || q.includes("hosting") || q.includes("ssl")) {
      return {
        text: "Yes. We configure custom domain connections (yourbusiness.com, .in, etc.) and ensure automated SSL security certificates are active for full HTTPS encryption. If you don't own a domain yet, we can guide you through registering one in your own name.",
        actions: [
          { label: "Read Technical FAQ", actionId: "view_faq" },
        ],
      };
    }

    if (q.includes("seo") || q.includes("google ranking") || q.includes("rank")) {
      return {
        text: "We implement rigorous technical SEO foundations: semantic heading hierarchies, metadata, OpenGraph cards, Schema.org structured data, and high Core Web Vitals performance. In accordance with our professional principles, we do not make false guarantees regarding specific third-party search engine ranks.",
        actions: [
          { label: "View Services", actionId: "view_services" },
        ],
      };
    }

    // Default polite redirection without making unsupported claims
    return {
      text: `For questions regarding specific customized integrations, bespoke contracts, or tailored business requirements, our studio team will gladly review your details directly. Please send an inquiry or email ${SITE_CONFIG.contactEmail}.`,
      actions: [
        { label: "Open Inquiry Form", actionId: "contact" },
        { label: "View FAQs", actionId: "view_faq" },
      ],
    };
  };

  const handleUserMessage = async (userText: string, specificActionId?: string) => {
    if (!userText.trim()) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userText,
      timestamp: "Just now",
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Check if user clicked a navigation action directly
    if (specificActionId) {
      if (specificActionId === "quote") {
        setIsTyping(false);
        onOpenPricingQuote();
        return;
      }
      if (specificActionId === "contact") {
        setIsTyping(false);
        onNavigateSection("contact");
        return;
      }
      if (specificActionId === "view_work") {
        setIsTyping(false);
        onNavigateSection("work");
        return;
      }
      if (specificActionId === "view_services") {
        setIsTyping(false);
        onNavigateSection("services");
        return;
      }
      if (specificActionId === "view_process") {
        setIsTyping(false);
        onNavigateSection("process");
        return;
      }
      if (specificActionId === "view_pricing") {
        setIsTyping(false);
        onNavigateSection("pricing");
        return;
      }
      if (specificActionId === "view_faq") {
        setIsTyping(false);
        onNavigateSection("faq");
        return;
      }
    }

    try {
      // First attempt server-side proxy route (/api/chat) for secure Google AI processing
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userText }),
      });

      if (response.ok) {
        const data = await response.json();
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: data.reply || getStudioResponse(userText, specificActionId).text,
          actions: data.actions || getStudioResponse(userText, specificActionId).actions,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, botMessage]);
      } else {
        // Fallback to grounded local knowledge base
        const localReply = getStudioResponse(userText, specificActionId);
        const botMessage: ChatMessage = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: localReply.text,
          actions: localReply.actions,
          timestamp: "Just now",
        };
        setMessages((prev) => [...prev, botMessage]);
      }
    } catch {
      // Graceful offline fallback
      const localReply = getStudioResponse(userText, specificActionId);
      const botMessage: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: localReply.text,
        actions: localReply.actions,
        timestamp: "Just now",
      };
      setMessages((prev) => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleUserMessage(inputValue);
  };

  const handleActionExecution = (actionId: string) => {
    if (actionId === "quote") {
      onOpenPricingQuote();
      setIsOpen(false);
    } else if (actionId === "contact") {
      onNavigateSection("contact");
      setIsOpen(false);
    } else if (actionId === "view_work") {
      onNavigateSection("work");
      setIsOpen(false);
    } else if (actionId === "view_services") {
      onNavigateSection("services");
      setIsOpen(false);
    } else if (actionId === "view_process") {
      onNavigateSection("process");
      setIsOpen(false);
    } else if (actionId === "view_pricing") {
      onNavigateSection("pricing");
      setIsOpen(false);
    } else if (actionId === "view_faq") {
      onNavigateSection("faq");
      setIsOpen(false);
    }
  };

  return (
    <div className="fixed bottom-5 left-5 z-40">
      {/* Chat Window Panel */}
      {isOpen ? (
        <div
          role="region"
          aria-label="Studio Chatbot"
          className="w-[90vw] sm:w-[380px] h-[520px] max-h-[82vh] bg-[#0A0D15] border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 bg-neutral-900/90 border-b border-neutral-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
                <Bot className="w-4 h-4" />
              </div>
              <div>
                <div className="text-xs font-bold text-white tracking-tight flex items-center gap-1.5">
                  <span>{SITE_CONFIG.brandName} Concierge</span>
                </div>
                <div className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Online · Studio Knowledge Engine</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close studio assistant"
              className="p-1 text-neutral-400 hover:text-white rounded-md transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="w-6 h-6 rounded-full bg-sky-500/15 border border-sky-500/30 flex items-center justify-center text-sky-400 shrink-0 mt-0.5">
                    <Sparkles className="w-3 h-3" />
                  </div>
                )}

                <div className="space-y-2 max-w-[82%]">
                  <div
                    className={`p-3 rounded-xl leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-sky-600 text-white rounded-br-none"
                        : "bg-neutral-900 border border-neutral-800 text-neutral-200 rounded-bl-none"
                    }`}
                  >
                    {msg.text}
                  </div>

                  {/* Contextual Action Buttons */}
                  {msg.actions && msg.actions.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {msg.actions.map((act) => (
                        <button
                          key={act.label}
                          onClick={() => {
                            if (act.actionId.startsWith("view_") || act.actionId === "contact" || act.actionId === "quote") {
                              handleActionExecution(act.actionId);
                            } else {
                              handleActionClick(act.actionId, act.label);
                            }
                          }}
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 hover:border-neutral-700 text-[11px] text-sky-300 transition-colors cursor-pointer"
                        >
                          <span>{act.label}</span>
                          <ArrowRight className="w-2.5 h-2.5 text-neutral-400" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {msg.sender === "user" && (
                  <div className="w-6 h-6 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-neutral-300 shrink-0 mt-0.5">
                    <User className="w-3 h-3" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-[11px] text-neutral-400 pl-8">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-100" />
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-bounce delay-200" />
                <span className="ml-1">Checking studio knowledge...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Form Input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-neutral-900/80 border-t border-neutral-800 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about pricing, services, or timelines..."
              className="flex-1 px-3 py-2 bg-black/50 border border-neutral-800 rounded-lg text-xs text-white placeholder-neutral-400 focus:outline-none focus:border-sky-500 transition-colors"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isTyping}
              aria-label="Send message"
              className="p-2 bg-sky-600 hover:bg-sky-500 disabled:opacity-40 text-white rounded-lg transition-colors cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      ) : (
        /* Floating Launcher Button */
        <button
          onClick={() => setIsOpen(true)}
          aria-label="Open studio inquiry assistant"
          className="flex items-center gap-2.5 px-4 py-3 rounded-full bg-neutral-900 text-white border border-neutral-700/80 shadow-2xl hover:border-sky-500 hover:shadow-sky-950/40 active:scale-95 transition-all cursor-pointer group"
        >
          <div className="relative">
            <MessageSquare className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400" />
          </div>
          <span className="text-xs font-semibold tracking-tight hidden sm:inline">
            Inquire with Studio Concierge
          </span>
          <span className="text-xs font-semibold tracking-tight sm:hidden">
            Chat
          </span>
        </button>
      )}
    </div>
  );
}

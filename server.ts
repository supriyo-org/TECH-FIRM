import express, { Request, Response } from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import fs from "fs";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
const isProduction = process.env.NODE_ENV === "production";

app.use(express.json());

// API: Handle Chatbot Inquiries
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      try {
        const ai = new GoogleGenAI({ apiKey });
        const systemPrompt = `You are the official digital concierge for NEXORA  Studios (note the two spaces in the brand name).
NEXORA  Studios is a premium web design, digital development, and business hardware studio.
Studio Purpose: We design and develop fast, responsive websites for businesses, salons, restaurants, cafés, travel agencies, personal brands, and modern service practices. We also manufacture, print, encode, and sell Smart PVC Google Review Collection Cards (with contactless NFC + QR code) and recruit sales partners/resellers.

Core Guidelines:
1. Always write the brand name exactly as "NEXORA  Studios" (with two spaces).
2. Never reveal personal names or identities of people behind the studio.
3. Be professional, honest, concise, polite, and helpful.
4. Starting price: minimum website making charge is ₹1,200 plus ₹300/month ongoing maintenance costing (covering hosting support, uptime, and security). PVC Smart Review Cards start from ₹499/single card, ₹699 with acrylic counter stand, and wholesale reseller bulk packs from ₹249/card. Every project is tailored to its requirements.
5. Never invent fake awards, fake statistics, fake partner logos, or fake guarantees (like "guaranteed #1 Google ranking" or "guaranteed sales").
6. If asked about timelines: 3 to 7 business days for focused single-page landing pages/business sites, 1 to 3 weeks for multi-page commercial platforms. PVC card printing dispatched in 2 to 4 business days.
7. If asked how to start or join as a reseller: advise them to submit an inquiry through the contact form or email productionsupriyo@gmail.com.
8. Keep answers succinct (2-4 sentences max) and invite them to explore the portfolio or contact form.`;

        const response = await ai.models.generateContent({
          model: "gemini-2.5-flash",
          contents: message,
          config: {
            systemInstruction: systemPrompt,
            temperature: 0.3,
            maxOutputTokens: 250,
          },
        });

        const reply = response.text || "Thank you for inquiring with NEXORA  Studios. Our team is available to assist you with custom website design and development.";
        res.json({ reply });
        return;
      } catch {
        // Fall back to grounded response if AI call encounters quota or network error
      }
    }

    // Grounded studio fallback response
    res.json({
      reply: "Thank you for reaching out to NEXORA  Studios. Our minimum website making charge is ₹1,200 + ₹300/month maintenance costing. You can explore our Selected Work or submit an inquiry through our contact form.",
    });
  } catch (err) {
    console.error("Chat error:", err);
    res.status(500).json({ error: "Failed to process chat message" });
  }
});

// In-memory inquiry storage (with seed samples so user can review immediately)
interface StoredInquiry {
  referenceId: string;
  fullName: string;
  businessName: string;
  email: string;
  phone: string;
  projectType: string;
  budget: string;
  message: string;
  timestamp: string;
  status: "New" | "In Review" | "Responded";
}

const INQUIRIES_STORE: StoredInquiry[] = [
  {
    referenceId: "NXR-849102",
    fullName: "Rohan Mukherjee",
    businessName: "Mukherjee & Co. Tax Advisory",
    email: "rohan.mukherjee@advisorytax.in",
    phone: "+91 98301 23456",
    projectType: "Business Website",
    budget: "₹1,200 (Starter Setup + ₹300/mo)",
    message: "Looking for a clean 3-page professional corporate presence to showcase our audit, GST, and income tax filing services.",
    timestamp: "2026-09-28 14:22:10",
    status: "In Review",
  },
  {
    referenceId: "NXR-721904",
    fullName: "Priyanka Sen",
    businessName: "Velvet Bloom Hair & Nails",
    email: "priyanka@velvetbloom.com",
    phone: "+91 98310 98765",
    projectType: "Salon & Grooming Website with Dashboard",
    budget: "₹2,500 – ₹5,000",
    message: "Saw your salon website demo with the live queue dashboard. We need a similar booking portal with WhatsApp alerts for 4 stylists in South Kolkata.",
    timestamp: "2026-09-28 18:45:00",
    status: "New",
  }
];

// API: Handle Project Inquiries
app.post("/api/contact", (req: Request, res: Response) => {
  try {
    const { fullName, businessName, email, phone, projectType, budget, message, consent } = req.body;

    if (!fullName || !businessName || !email || !message || !consent) {
      res.status(400).json({ error: "Required fields missing or consent not granted." });
      return;
    }

    const referenceId = `NXR-${Date.now().toString().slice(-6)}`;

    const newInquiry: StoredInquiry = {
      referenceId,
      fullName: String(fullName).trim(),
      businessName: String(businessName).trim(),
      email: String(email).trim(),
      phone: phone ? String(phone).trim() : "Not provided",
      projectType: projectType || "Business Website",
      budget: budget || "Standard (₹1,200 + ₹300/mo)",
      message: String(message).trim(),
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      status: "New",
    };

    INQUIRIES_STORE.unshift(newInquiry);

    res.json({
      success: true,
      referenceId,
      message: "Inquiry received. NEXORA  Studios will review your project details promptly.",
    });
  } catch (err) {
    console.error("Contact error:", err);
    res.status(500).json({ error: "Failed to submit inquiry" });
  }
});

// API: Retrieve All Inquiries for Studio Owner / Management View
app.get("/api/inquiries", (_req: Request, res: Response) => {
  res.json({
    total: INQUIRIES_STORE.length,
    inquiries: INQUIRIES_STORE,
  });
});

// API: Clear or Delete Inquiries if needed
app.delete("/api/inquiries/:refId", (req: Request, res: Response) => {
  const { refId } = req.params;
  const index = INQUIRIES_STORE.findIndex(i => i.referenceId === refId);
  if (index !== -1) {
    INQUIRIES_STORE.splice(index, 1);
    res.json({ success: true, message: `Inquiry ${refId} removed.` });
  } else {
    res.status(404).json({ error: "Inquiry not found." });
  }
});

async function startServer() {
  if (!isProduction) {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: process.env.DISABLE_HMR !== "true",
      },
      appType: "custom",
    });

    app.use(vite.middlewares);

    app.use("*", async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(process.cwd(), "index.html");
        let template = fs.readFileSync(indexPath, "utf-8");
        template = await vite.transformIndexHtml(url, template);
        res.status(200).set({ "Content-Type": "text/html" }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    const distPath = path.resolve(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`NEXORA  Studios server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();

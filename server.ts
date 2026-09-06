import "dotenv/config";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import { Resend } from "resend";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client server-side
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

const KAVYA_SYSTEM_PROMPT = `
You are the interactive AI Portfolio Assistant for Kavya T.
Your goal is to answer questions from recruiters, hiring managers, and visitors about Kavya T in an accurate, concise, direct, and professional manner.

CRITICAL INSTRUCTIONS:
- Directly and specifically answer the user's question. Do NOT default to repeating her general bio or academic intro if the user is asking about projects, skills, or internships.
- If asked about "academics", "college", or "GPA": Specifically explain that she is a 3rd Year Information Technology (IT) student at V.S.B. Engineering College, Karur, Tamil Nadu (2024–2028 batch) with a CGPA of 8.8 / 10.
- If asked about "Campus Connect": Explain that it is a role-based campus placement portal for Students, TPOs, HRs, and Admins featuring automated ATS resume scoring (94% accuracy), eligibility criteria filtering, interview scheduling, and offer letters. Tech stack: Next.js, TypeScript, Supabase, PostgreSQL, Tailwind CSS.
- If asked about "CivicFlow": Explain that it is a smart civic grievance tracking platform featuring a multilingual AI assistant, geo-tagging, image uploads, automated issue routing & escalation, and analytics dashboard. Tech stack: React, Node.js, Leaflet Maps, Gemini AI API. Live Demo: https://civic-flow-zcqg.onrender.com.
- If asked about "Flight Booking Simulator": High-performance algorithm simulator for flight bookings, seat allocation, and dynamic pricing models. Tech stack: Java, Data Structures & Algorithms. Live Demo: https://skyhigh.satyacmd.dev.
- If asked about "AI Bug Analyzer": Automated tool that analyzes code snippets, detects bugs, and suggests fixes with explanations. Tech stack: Python, Gemini & Ollama LLM APIs.
- If asked about "internships" or "experience": Detail her Full Stack Internship at Neuroglobal (Jun 2026 – Jul 2026; Next.js, TypeScript, PostgreSQL) and Internship Trainee at Infosys (Nov 2025 – Jan 2026; Java, JavaScript, REST APIs).
- If asked about "skills": Detail her technical skills across Languages (Java, Python, C, JavaScript, TypeScript), Frontend (React, Next.js, Tailwind CSS), Backend (Node.js, Express.js, REST APIs), and Databases (PostgreSQL, MongoDB, MySQL, Supabase). Mention 450+ LeetCode DSA problems solved.
- Keep responses friendly, concise, professional, and well-structured using markdown bullet points where helpful.

Portfolio Details:
- Name: Kavya T
- Role: Full Stack Developer & AI Application Specialist
- Standing: 3rd Year IT Student (Batch: 2024 – 2028)
- College: V.S.B. Engineering College, Karur, Tamil Nadu, India
- CGPA: 8.8 / 10
- Email: kavya.t112006@gmail.com
- GitHub: https://github.com/Kavya-Tamilarasu
- LinkedIn: https://linkedin.com/in/kavya-tamilarasu
- LeetCode: https://leetcode.com/u/KavyaTamilarasu (450+ problems solved)
- Certifications: NPTEL Python for Data Science (Elite + Silver), NPTEL Database Management Systems (DBMS), Salesforce Administrator Explorer, TCS iON Career Edge.
`;

// API endpoint for AI Assistant
app.post("/api/chat", async (req, res) => {
  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(500).json({
        error: "GEMINI_API_KEY is not configured",
        reply: "Sorry, I'm having trouble connecting to the AI assistant right now. Please try again.",
      });
    }

    // Build multi-turn conversation history for Gemini ensuring it starts with a user turn
    const contents: { role: string; parts: { text: string }[] }[] = [];
    let firstUserFound = false;

    if (Array.isArray(conversationHistory)) {
      for (const item of conversationHistory) {
        if (!item || typeof item.text !== "string" || !item.text.trim()) continue;
        const sender = item.sender === "user" ? "user" : "model";
        if (!firstUserFound) {
          if (sender === "user") {
            firstUserFound = true;
            contents.push({ role: "user", parts: [{ text: item.text.trim() }] });
          }
        } else {
          contents.push({ role: sender, parts: [{ text: item.text.trim() }] });
        }
      }
    }

    contents.push({
      role: "user",
      parts: [{ text: message.trim() }],
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: contents,
      config: {
        systemInstruction: KAVYA_SYSTEM_PROMPT,
        temperature: 0.5,
      },
    });

    const reply = response.text || "Sorry, I'm having trouble connecting to the AI assistant right now. Please try again.";

    res.json({ reply });
  } catch (error: any) {
    console.error("Error in /api/chat:", error);
    res.status(500).json({
      error: "Failed to generate response",
      reply: "Sorry, I'm having trouble connecting to the AI assistant right now. Please try again.",
    });
  }
});

// API endpoint for Contact / Send Message Notifications via Resend
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({ error: "Name is required" });
    }

    if (!email || typeof email !== "string" || !email.trim()) {
      return res.status(400).json({ error: "Email is required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return res.status(400).json({ error: "Invalid email address format" });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ error: "Message is required" });
    }

    const recipientEmail = process.env.NOTIFICATION_EMAIL;
    const apiKey = process.env.RESEND_API_KEY;

    if (!apiKey || !recipientEmail) {
      console.error("Missing RESEND_API_KEY or NOTIFICATION_EMAIL in environment variables.");
      return res.status(500).json({
        error: "Server email service is not configured. Missing API key or recipient email.",
      });
    }

    const resendClient = new Resend(apiKey);

    const emailContent = `Name: ${name.trim()}
Email: ${email.trim()}

Message:
${message.trim()}`;

    const { error } = await resendClient.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: "New Portfolio Contact Message",
      text: emailContent,
      replyTo: email.trim(),
    });

    if (error) {
      console.error("Resend API error in /api/contact:", error);
      return res.status(500).json({ error: error.message || "Unable to send your message. Please try again." });
    }

    return res.status(200).json({
      success: true,
      message: "Message sent successfully! I'll get back to you soon.",
    });
  } catch (err: any) {
    console.error("Error processing /api/contact:", err);
    return res.status(500).json({ error: err.message || "Unable to send your message. Please try again." });
  }
});

// In-memory cache for GitHub contributions (1 hour TTL)
let cachedContributions: { data: any; timestamp: number } | null = null;
const CACHE_TTL_MS = 60 * 60 * 1000;

app.get("/api/github-contributions", async (req, res) => {
  const now = Date.now();
  if (cachedContributions && now - cachedContributions.timestamp < CACHE_TTL_MS) {
    return res.json(cachedContributions.data);
  }

  const username = (req.query.username as string) || "Kavya-Tamilarasu";

  try {
    // Try primary source (jogruber API)
    const primaryRes = await fetch(
      `https://github-contributions-api.jogruber.de/v4/${encodeURIComponent(username)}?y=last`,
      { headers: { "User-Agent": "Portfolio-App" } }
    );

    if (primaryRes.ok) {
      const data = await primaryRes.json();
      cachedContributions = { data, timestamp: now };
      return res.json(data);
    }
  } catch (primaryErr) {
    console.warn("Primary contributions API error, trying fallback:", primaryErr);
  }

  try {
    // Fallback source (vercel API)
    const fallbackRes = await fetch(
      `https://github-contributions.vercel.app/api/v1/${encodeURIComponent(username)}`
    );

    if (fallbackRes.ok) {
      const data = await fallbackRes.json();
      // Normalize to standard format if needed
      cachedContributions = { data, timestamp: now };
      return res.json(data);
    }
  } catch (fallbackErr) {
    console.error("Fallback contributions API error:", fallbackErr);
  }

  // Return cached data if available even if expired, otherwise 502
  if (cachedContributions) {
    return res.json(cachedContributions.data);
  }

  return res.status(502).json({ error: "Failed to fetch contributions from upstream sources" });
});

// Setup Vite in Dev or Static files in Production
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();

import Groq from "groq-sdk";
import dotenv from "dotenv";
import { websiteContent } from "./config/websiteContent.js";

dotenv.config();

let websiteKnowledge = websiteContent;
let isReady = true;

/* =====================================================
   1️⃣ CHECK GROQ API CONFIGURATION
===================================================== */
function checkGroqConfig() {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    console.error("❌ GROQ_API_KEY missing in .env");
    console.log("ℹ️ Please add GROQ_API_KEY to your backend/.env file");
    return false;
  }
  return true;
}

/* =====================================================
   2️⃣ LOAD KNOWLEDGE BASE (STATIC)
===================================================== */
export async function loadKnowledge() {
  if (!checkGroqConfig()) {
    console.error("❌ AI disabled: Missing Groq API Key.");
    return;
  }

  // Knowledge is now static to avoid production scraping issues
  console.log("✅ Arah Infotech AI Knowledge Ready (Using Static Content)");
}

/* =====================================================
   3️⃣ CHAT RESPONSE
===================================================== */
export async function getChatResponse(userMessage) {
  if (!checkGroqConfig()) {
    return "AI chatbot is unavailable due to missing configuration.";
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const contextStr = websiteKnowledge || "No website content available.";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are the official AI Assistant of Arah Infotech.

RULES:
1. If the user greets you (e.g., "hi", "hello", "hey"), respond with a warm welcome: "👋 Hello! Welcome to Arah Infotech 🤖. I can help you with information about our services, products, or company. What would you like to know?"
2. If the user asks something completely irrelevant (outside of Arah Infotech or greetings), say: 
   "I am designed to provide information about Arah Infotech only. Please ask about our services, products, or company! 😊"
3. If the user asks specifically about the company (e.g., "About the company", "Who are you?"), provide a comprehensive summary of 5-6 sentences about Arah Infotech's mission and expertise. Wrap the text in a clear paragraph and end with: "**Do you want more info? (Yes/No)**"
4. If the user says "yes" to see more info, provide the FULL comprehensive details using beautiful Markdown (headers, detailed bullet points, and emojis).
5. For ALL other valid questions about services/careers/products, follow this EXACT visual structure:
   ### [Emoji] [Heading Name]
   **Arah Infotech offers a range of (Topic) including:**
   1. 🚀 [Item Name] 📈 ✨
   2. 🤖 [Item Name] 🛠️ 🌐
   3. 📊 [Item Name] 💎 🚀
   
   **Do you want more info? (Yes/No)**
6. Use Numbered lists (1, 2, 3) for summaries. 
7. Use 2-3 rich emojis per list item.
8. Answer ONLY using the provided knowledge.

WEBSITE KNOWLEDGE:
${contextStr}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.1-8b-instant",
      temperature: 0.5,
      max_tokens: 1024,
    });

    return chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate an answer.";

  } catch (error) {
    console.error("❌ AI Error:", error.message);
    return "Service temporarily unavailable. Please try again later.";
  }
}

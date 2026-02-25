import puppeteer from "puppeteer";
import Groq from "groq-sdk";
import dotenv from "dotenv";

dotenv.config();

let websiteKnowledge = "";
let isReady = false;

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
   2️⃣ SCRAPE ARAH INFOTECH WEBSITE
===================================================== */
async function scrapeAllPages(urls) {
  let browser;

  try {
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      userDataDir: "./.puppeteer-profile"
    });

    const page = await browser.newPage();
    await page.setViewport({ width: 1280, height: 720 });

    let combinedText = "";

    for (const url of urls) {
      try {
        console.log("🌐 Scraping:", url);

        await page.goto(url, {
          waitUntil: "domcontentloaded",
          timeout: 60000
        });

        await new Promise(resolve => setTimeout(resolve, 1500));

        const content = await page.evaluate(() => {
          document
            .querySelectorAll("script, style, nav, footer, header, noscript, iframe")
            .forEach(el => el.remove());

          return document.body.innerText
            .replace(/\s+/g, " ")
            .trim();
        });

        if (content && content.length > 100) {
          combinedText += `\n\n[Source: ${url}]\n${content}`;
        }

      } catch (err) {
        console.error(`Error scraping ${url}:`, err.message);
      }
    }

    return combinedText;

  } catch (err) {
    console.error("Puppeteer Launch Error:", err.message);
    return "";

  } finally {
    if (browser) await browser.close();
  }
}

/* =====================================================
   3️⃣ LOAD KNOWLEDGE BASE
===================================================== */
export async function loadKnowledge() {

  if (!checkGroqConfig()) {
    console.error("❌ AI disabled: Missing Groq API Key.");
    return;
  }

  const urls = [
    "https://arahinfotech.net",
    "https://arahinfotech.net/about",
    "https://arahinfotech.net/services",
    "https://arahinfotech.net/products",
    "https://arahinfotech.net/services/website-designing",
    "https://arahinfotech.net/services/ai-solutions",
    "https://arahinfotech.net/services/digital-marketing",
    "https://arahinfotech.net/industries",
    "https://arahinfotech.net/careers",
    "https://arahinfotech.net/contact"
  ];

  const combinedText = await scrapeAllPages(urls);

  websiteKnowledge = combinedText;

  if (websiteKnowledge.length > 0) {
    isReady = true;
    console.log("✅ Arah Infotech AI Knowledge Ready (Using Groq API)");
  } else {
    console.log("⚠ No content scraped. AI will use generic knowledge.");
    // Fallback? Or just empty knowledge.
  }
}

/* =====================================================
   4️⃣ CHAT RESPONSE
===================================================== */
export async function getChatResponse(userMessage) {

  if (!checkGroqConfig()) {
    return "AI chatbot is unavailable due to missing configuration.";
  }

  if (!isReady && !websiteKnowledge) {
    return "Knowledge base is still loading. Please try again in 30 seconds.";
  }

  try {
    const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

    // Truncate if too huge, though LLaMA 70B has large context
    const contextStr = websiteKnowledge ? websiteKnowledge.substring(0, 25000) : "No website content available.";

    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are the official AI Assistant of Arah Infotech.

RULES:
1. Answer ONLY using the provided website knowledge below.
2. If the user asks for something not in the knowledge, say exactly:
   "I can only assist with information related to Arah Infotech."
3. VERY IMPORTANT: Keep your response EXTREMELY short and concise. Do NOT give long explanations. Limit your answer to 3-4 sentences maximum.
4. Format with emojis and bullet points for readability, but keep the content brief.

WEBSITE KNOWLEDGE:
${contextStr}`
        },
        {
          role: "user",
          content: userMessage
        }
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.5,
      max_tokens: 1024,
    });

    return chatCompletion.choices[0]?.message?.content || "I'm sorry, I couldn't generate an answer.";

  } catch (error) {
    console.error("❌ AI Error:", error.message);
    return "Service temporarily unavailable. Please try again later.";
  }
}

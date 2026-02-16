import puppeteer from "puppeteer";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();

let websiteKnowledge = "";
let workingModel = null;

/* =====================================================
   1️⃣ FIND WORKING GEMINI MODEL
===================================================== */
async function findWorkingModel() {
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!apiKey) {
    console.error("❌ GOOGLE_API_KEY missing in .env");
    return null;
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    const data = await response.json();

    if (!response.ok || !data.models?.length) {
      return null;
    }

    const preferredModels = [
      "gemini-2.5-flash",
      "gemini-1.5-pro",
      "gemini-pro"
    ];

    for (const pref of preferredModels) {
      const found = data.models.find(m => m.name.includes(pref));
      if (found) {
        return found.name.replace("models/", "");
      }
    }

    return data.models[0].name.replace("models/", "");

  } catch {
    return null;
  }
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

  } catch {
    return "";

  } finally {
    if (browser) await browser.close();
  }
}

/* =====================================================
   3️⃣ LOAD KNOWLEDGE BASE
===================================================== */
export async function loadKnowledge() {

  workingModel = await findWorkingModel();

  if (!workingModel) {
    console.error("❌ AI disabled.");
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
    console.log("✅ Arah Infotech AI Knowledge Ready");
  } else {
    console.log("⚠ No content scraped.");
  }
}

/* =====================================================
   4️⃣ CHAT RESPONSE
===================================================== */
export async function getChatResponse(userMessage) {

  if (!workingModel) {
    return "AI chatbot is unavailable.";
  }

  if (!websiteKnowledge) {
    return "Knowledge base is loading. Please wait.";
  }

  try {
    const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

    const model = genAI.getGenerativeModel({
      model: workingModel,
      systemInstruction: `
      You are the official AI Assistant of Arah Infotech.

      RULES:
      1. Answer ONLY using provided website knowledge.
      2. If answer not found say:
         "I can only assist with information related to Arah Infotech."
      3. Keep response professional and concise.
      `
    });

    const result = await model.generateContent(
      `${websiteKnowledge.substring(0, 12000)}

User Question:
${userMessage}`
    );

    return result.response.text();

  } catch (error) {
    console.error("❌ AI Error:", error.message);
    return "Service temporarily unavailable. Please try again later.";
  }
}

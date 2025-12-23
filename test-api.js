import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
dotenv.config();

const API_KEY = process.env.VITE_GEMINI_API_KEY || "AIzaSyBneeBnJu5EGqCmUhCkZtYSvD48a9teQjU";

console.log("Testing API Key...");

async function testWeb() {
  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Testing multiple models to find one that works freely
    const candidates = [
      "gemini-2.0-flash-lite-preview-02-05", // New lite model might be free
      "gemini-flash-latest",                // Stable alias
      "gemini-pro-latest",                  // Stable alias
      "gemini-2.0-flash-lite-001"           // Another potential
    ];

    for (const modelName of candidates) {
      console.log(`Testing model: ${modelName}...`);
      try {
        const model = genAI.getGenerativeModel({ model: modelName });
        const result = await model.generateContent("Test");
        const response = await result.response;
        console.log(`SUCCESS with ${modelName}:`, response.text());
        return; // Exit on first success
      } catch (err) {
        console.error(`FAILED ${modelName}:`, err.message.substring(0, 200)); 
      }
    }
    
    console.log("All candidates failed.");

  } catch (error) {
    console.error("Error connecting to Gemini:", error.message);
  }
}

testWeb();

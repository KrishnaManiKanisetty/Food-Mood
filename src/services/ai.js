import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("Missing Gemini API Key in .env");
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

export const getPrediction = async (mode, input) => {
  try {
    let prompt = "";
    if (mode === "food-to-mood") {
      prompt = `Using this food: "${input}", predict the user's current mood. Be creative, empathetic, and succinct. Return a JSON with { "mood": "Active/Happy/etc", "description": "Short explanation", "color": "#hexcolor" }.`;
    } else {
      prompt = `The user feels: "${input}". Suggest a comfort food or a meal to reset or enhance this mood. Be creative. Return a JSON with { "food": "Food Name", "description": "Why this matches", "color": "#hexcolor" }.`;
    }
    
    // Add instruction to return pure JSON
    prompt += " Respond ONLY with valid JSON.";

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Cleanup simple markdown code block formatting if present
    const jsonString = text.replace(/```json/g, "").replace(/```/g, "").trim();
    
    return JSON.parse(jsonString);
  } catch (error) {
    console.error("AI Error Details:", error);
    console.log("API Key present:", !!API_KEY);
    throw new Error(`Failed to get prediction: ${error.message}`);
  }
};

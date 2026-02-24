import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getBotAnalysis = async (market: string): Promise<string> => {
  if (!apiKey) {
    return "API_KEY not set. Simulation mode: Market volatility detected. Accumulating position.";
  }

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are TITAN, an advanced, emotionless high-frequency trading algorithm. 
      Generate a short, single-paragraph technical analysis log for: ${market}. 
      
      Style guide:
      - Tone: Cold, precise, machine-like.
      - Length: Max 40 words.
      - Jargon: Use terms like 'Liquidity void', 'Fibonacci retracement', 'RSI divergence', 'Order block', 'Volume delta'.
      - End with a "Confidence Score" (e.g., 98.4%).
      
      Do not include greetings. Just the log.`,
    });

    return response.text || "Analysis unavailable.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Connection to Neural Net unstable. Retrying analysis protocols...";
  }
};
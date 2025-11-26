import { GoogleGenAI } from "@google/genai";
import { GeminiSearchResponse } from '../types';

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const searchMedicineInfo = async (query: string): Promise<GeminiSearchResponse> => {
  if (!apiKey) {
    console.error("API Key is missing");
    return { text: "API Key is missing. Please check your configuration." };
  }

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Provide a comprehensive but concise summary about "${query}". 
      Include:
      1. Common uses
      2. Potential side effects
      3. Key warnings or interactions
      4. Any recent relevant news or shortage updates if applicable.
      
      Keep the tone professional and medical but accessible to a patient.`,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text || "No information available.";
    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks;

    return {
      text,
      groundingChunks: groundingChunks as any, 
    };
  } catch (error) {
    console.error("Error fetching from Gemini:", error);
    return { text: "Failed to retrieve information. Please try again later." };
  }
};

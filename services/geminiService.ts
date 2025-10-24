
import { GoogleGenAI, Type } from "@google/genai";
import { GeminiAnalysis } from '../types';

const getGeminiAnalysis = async (websiteName: string, websiteUrl: string): Promise<GeminiAnalysis> => {
    // This check is for the development environment.
    // In a real deployed environment, the API key would be set securely.
    if (!process.env.API_KEY) {
        console.warn("API_KEY environment variable not set. Using mock data.");
        return new Promise(resolve => setTimeout(() => resolve({
            analysis: "This is a mock analysis because the API key is not configured. In a real scenario, Gemini would provide insights on recent feature launches and market positioning to predict traffic trends.",
            prediction: Math.random() > 0.5 ? 'INCREASING' : 'DECREASING'
        }), 1500));
    }

    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: `Analyze the potential for the website '${websiteName}' (${websiteUrl}) to increase its traffic in the next month. Consider factors like recent news, industry trends, SEO efforts, marketing campaigns, and competitor landscape. Provide a concise, one-paragraph analysis.`,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        analysis: {
                            type: Type.STRING,
                            description: "A concise, one-paragraph analysis of the website's traffic potential for the next month."
                        },
                        prediction: {
                            type: Type.STRING,
                            description: "Your prediction for the traffic trend.",
                            enum: ["INCREASING", "DECREASING", "NEUTRAL"],
                        }
                    },
                    required: ["analysis", "prediction"]
                }
            }
        });

        const jsonString = response.text.trim();
        const result = JSON.parse(jsonString);
        return result as GeminiAnalysis;

    } catch (error) {
        console.error("Error fetching Gemini analysis:", error);
        throw new Error("Failed to get analysis from Gemini.");
    }
};

export default getGeminiAnalysis;

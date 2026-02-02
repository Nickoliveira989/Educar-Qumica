
import { GoogleGenAI, Type } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";
import { Substance, ReactionResult, HazardLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export async function analyzeReaction(substances: Substance[]): Promise<ReactionResult> {
  const model = ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `Analise a mistura das seguintes substâncias: ${substances.map(s => s.name + ' (' + s.formula + ')').join(', ')}`,
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          explanation: { type: Type.STRING },
          hazard: { type: Type.STRING, enum: Object.values(HazardLevel) },
          visualEffect: { type: Type.STRING, enum: ["bubbles", "explosion", "colorChange", "none"] },
          newColor: { type: Type.STRING }
        },
        required: ["title", "explanation", "hazard", "visualEffect"]
      }
    }
  });

  try {
    const result = await model;
    const jsonStr = result.text.trim();
    return JSON.parse(jsonStr) as ReactionResult;
  } catch (error) {
    console.error("Erro ao analisar reação:", error);
    return {
      title: "Erro na Simulação",
      explanation: "Não foi possível processar a reação química neste momento.",
      hazard: HazardLevel.WARNING,
      visualEffect: 'none'
    };
  }
}

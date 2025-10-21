import { GoogleGenAI, Type } from "@google/genai";
import { DrawnCard, Spread } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SPREAD_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    spreadName: {
      type: Type.STRING,
      description: "A creative name for the tarot spread, like 'Path to Clarity' or 'Heart of the Matter'."
    },
    positions: {
      type: Type.ARRAY,
      description: "An array of positions in the spread.",
      items: {
        type: Type.OBJECT,
        properties: {
          name: {
            type: Type.STRING,
            description: "The name of the card's position, e.g., 'The Situation', 'The Challenge', 'The Outcome'."
          },
          description: {
            type: Type.STRING,
            description: "A brief description of what this position represents in the reading."
          }
        },
        required: ["name", "description"]
      }
    }
  },
  required: ["spreadName", "positions"]
};


export const getSpreadForQuestion = async (question: string): Promise<Spread> => {
  const prompt = `Based on the user's question, determine the best tarot spread. The number of cards should be between 2 and 5.
Common spreads include 'Past, Present, Future', 'Situation-Action-Outcome', 'You-Your Path-Your Potential', or 'The Challenge'.
Create a simple, relevant spread with a creative name and clear positions.

User's question: "${question}"

Respond ONLY with the JSON object.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: SPREAD_SCHEMA,
      }
    });
    
    const jsonText = response.text.trim();
    const spread = JSON.parse(jsonText);

    if (spread.positions.length < 2 || spread.positions.length > 5) {
      throw new Error("Invalid number of cards in spread.");
    }

    return spread;

  } catch (error) {
    console.error("Error generating tarot spread:", error);
    throw new Error("The cosmos is clouded at the moment. Please try asking your question again.");
  }
};


export const getTarotReading = async (question: string, spread: Spread, cards: DrawnCard[]): Promise<string> => {
  const cardDetails = cards.map(c => `- ${c.position.name} (${c.position.description}): ${c.card.name} (${c.orientation})`).join('\n');

  const prompt = `
You are an expert tarot reader named 'Celeste' with a mystical, insightful, and empathetic tone. A user has asked a question and drawn cards for a custom spread.

User's Question: "${question}"

Spread Name: "${spread.spreadName}"

Here are the cards drawn:
${cardDetails}

Please provide a cohesive and insightful reading that connects the cards into a flowing narrative based on the user's question. Follow this structure precisely:
1.  **Introduction:** Begin with a mystical sentence that acknowledges the user's query.
2.  **Card-by-Card Analysis:** For each card, create a bolded heading with its position and name (e.g., **The Situation - The Magician (Upright):**). Then, explain its meaning as it relates to its specific position in the spread and the overall question.
3.  **Synthesis & Guidance:** Bring all the cards together to offer a summary of the narrative. Conclude with gentle, empowering advice for the user to help them navigate their path, directly addressing their original question.

The tone should be wise and slightly mysterious, focusing on guidance and self-reflection rather than making definitive, absolute predictions. Use Markdown for formatting.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating tarot reading:", error);
    throw new Error("The connection to the ethereal plane has been disrupted. Please clear your mind and try again.");
  }
};

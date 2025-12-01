import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize the Gemini AI client
// Note: In a real production app, ensure the API key is handled securely (e.g. backend proxy) 
// but for this demo environment we use process.env.API_KEY directly as instructed.
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
Tu es Zetsu AI, un assistant expert en cybersécurité intégré au site web de téléchargement du logiciel Zetsu.
Ton rôle est d'aider les utilisateurs à comprendre les menaces informatiques, à expliquer pourquoi Zetsu est utile, et à donner des conseils de sécurité.
Sois concis, professionnel, rassurant et utilise un ton légèrement technologique/futuriste.
Si on te demande de générer du code malveillant, refuse poliment et explique les risques.
Tu parles principalement français.

Fonctionnalités de Zetsu à mettre en avant si pertinent :
- Protection en temps réel (Real-time Shield)
- VPN intégré sans logs
- Analyse heuristique par IA
- Coffre-fort de mots de passe
- Pare-feu bidirectionnel
`;

let chatSession: Chat | null = null;

export const getChatSession = (): Chat => {
  if (!chatSession) {
    chatSession = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });
  }
  return chatSession;
};

export const sendMessageToZetsu = async (message: string): Promise<AsyncIterable<string>> => {
  const chat = getChatSession();
  
  try {
    const responseStream = await chat.sendMessageStream({ message });
    
    // Create an async generator to yield text chunks
    async function* textGenerator() {
      for await (const chunk of responseStream) {
        if (chunk.text) {
          yield chunk.text;
        }
      }
    }
    
    return textGenerator();
  } catch (error) {
    console.error("Erreur Gemini:", error);
    throw new Error("Désolé, je ne peux pas répondre pour le moment. Veuillez vérifier votre connexion.");
  }
};

export const resetChat = () => {
  chatSession = null;
};
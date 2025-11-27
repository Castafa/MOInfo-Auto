import { GoogleGenAI, Type } from "@google/genai";
import { Platform, SocialPost, PostStatus } from "../types";

// Initialize Gemini
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const modelName = "gemini-2.5-flash";

export const generateSinglePostContent = async (
  topic: string,
  platform: Platform,
  tone: string
): Promise<string> => {
  try {
    const prompt = `Write a ${tone} social media post for ${platform} about "${topic}". 
    Keep it engaging, concise, and optimized for the specific platform. 
    Include relevant hashtags. Do not include any preamble, just the post content.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
    });

    return response.text || "Failed to generate content.";
  } catch (error) {
    console.error("Error generating post:", error);
    return "Error generating content. Please check your API key.";
  }
};

export const generateAutoSchedule = async (
  topic: string,
  count: number,
  startDate: Date
): Promise<Partial<SocialPost>[]> => {
  try {
    const prompt = `Generate ${count} distinct social media posts about "${topic}". 
    Vary the platforms (mix of Twitter, LinkedIn, Instagram) and the content style.
    Return a raw JSON array.`;

    const response = await ai.models.generateContent({
      model: modelName,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              content: { type: Type.STRING, description: "The content of the post including hashtags" },
              platform: { type: Type.STRING, description: "One of: Twitter, LinkedIn, Instagram, Facebook" },
              dayOffset: { type: Type.INTEGER, description: "Number of days from start date to schedule this (0 to 7)" }
            },
            required: ["content", "platform", "dayOffset"]
          }
        }
      }
    });

    const generatedData = JSON.parse(response.text || "[]");
    
    // Map the raw data to our Partial<SocialPost> structure
    return generatedData.map((item: any) => ({
      content: item.content,
      platform: item.platform as Platform,
      // Calculate actual date based on offset
      scheduledDate: new Date(startDate.getTime() + item.dayOffset * 24 * 60 * 60 * 1000),
      status: PostStatus.Scheduled,
      topic: topic
    }));

  } catch (error) {
    console.error("Error auto-scheduling:", error);
    throw error;
  }
};
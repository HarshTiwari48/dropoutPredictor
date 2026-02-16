import { GoogleGenerativeAI } from "@google/generative-ai";
import { mentorSystemPrompt } from "../utils/mentorPrompt";
import { ApiError } from "../utils/ApiError";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY as string
);

const model = genAI.getGenerativeModel({
  model: "gemini-3-flash-preview",
});

export const generateMentorReply = async (
  userMessage: string
): Promise<string> => {
  try {
    if (!userMessage || userMessage.trim().length === 0) {
      throw new ApiError(400, "Message cannot be empty");
    }

    const prompt = `
${mentorSystemPrompt}

Student message:
"${userMessage}"

Mentor reply:
`;

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    if (!text) {
      throw new ApiError(500, "Empty response from AI");
    }

    return text.trim();
  } catch (error) {
    console.error("Gemini service error:", error);
    throw new ApiError(500, "AI mentor is currently unavailable");
  }
};

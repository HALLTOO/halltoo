import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";

export const runtime = "edge";

const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    if (!prompt) {
      return new Response("Prompt is required", { status: 400 });
    }

    const { text } = await generateText({
      model: deepseek("deepseek-chat"),
      prompt: `Generate a short, concise 3-5 word title for this conversation. Only return the title, nothing else. Conversation starts with: "${prompt.slice(0, 200)}"`,
      maxTokens: 20,
      temperature: 0.3,
    });

    // Clean up the title
    const title = text
      .replace(/^["']|["']$/g, '') // Remove quotes
      .replace(/^Title:\s*/i, '') // Remove "Title:" prefix
      .trim()
      .slice(0, 50); // Max 50 chars

    return Response.json({ title });
  } catch (error) {
    console.error("Error generating title:", error);
    return Response.json(
      { title: "新对话" },
      { status: 200 }
    );
  }
}

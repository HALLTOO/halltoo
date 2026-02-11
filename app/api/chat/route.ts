import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const SYSTEM_PROMPT = "你是 Halltoo，一个由 Halltoo 开发的智能 AI 助手。你的回答必须专业、简洁且富有洞察力。";

// 配置 DeepSeek
const deepseek = createOpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: "https://api.deepseek.com",
});

export async function POST(req: Request) {
  const { messages, model } = await req.json();

  let result;

  if (model === "gpt-4o") {
    result = await streamText({
      model: openai("gpt-4o"),
      system: SYSTEM_PROMPT,
      messages,
    });
  } else if (model === "claude-3-5-sonnet") {
    result = await streamText({
      model: anthropic("claude-3-5-sonnet-20241022"),
      system: SYSTEM_PROMPT,
      messages,
    });
  } else if (model === "deepseek-chat") {
    result = await streamText({
      model: deepseek("deepseek-chat"),
      system: SYSTEM_PROMPT,
      messages,
    });
  } else {
    // 默认使用 DeepSeek
    result = await streamText({
      model: deepseek("deepseek-chat"),
      system: SYSTEM_PROMPT,
      messages,
    });
  }

  return result.toDataStreamResponse();
}

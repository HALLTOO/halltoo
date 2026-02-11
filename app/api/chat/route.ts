import { openai } from "@ai-sdk/openai";
import { anthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { streamText } from "ai";

export const runtime = "edge";

const SYSTEM_PROMPT = `你是 Halltoo，一个由 Halltoo 开发的智能 AI 助手。你的回答必须专业、简洁且富有洞察力。

重要规则：在回答任何问题之前，你必须先在 <thinking>...</thinking> XML 标签内写出你的思考过程。思考过程应该包括：
1. 问题分析
2. 可能的解决方案
3. 最佳方案选择
4. 潜在问题考虑

在 </thinking> 标签之后，再给出你的最终回答。

示例格式：
<thinking>
用户问了关于X的问题。我需要考虑A、B、C三个方面...
最佳方案是...因为...
</thinking>

这是我的最终回答...`;

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

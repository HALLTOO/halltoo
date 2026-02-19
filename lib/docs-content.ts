export type Doc = {
  title: string
  content: string
  category: string
}

export const docs: Record<string, Doc> = {
  "quickstart": {
    category: "Getting Started",
    title: "Quickstart Guide",
    content: `
# Quickstart Guide

Get up and running with halltoo in less than 5 minutes.

## Prerequisites

Before you begin, ensure you have the following:

- A valid email address
- An API key (if using the Free plan with BYOK)

## 1. Create an Account

Navigate to the [Signup page](/signup) and create your account. You can use email/password or continue with Google/GitHub.

## 2. Choose Your Model

Once logged in, you'll land on the chat interface. Press \`Cmd+K\` (Mac) or \`Ctrl+K\` (Windows) to open the model selector.

Available models include:
- **GPT-4o**: Best for complex reasoning and coding tasks.
- **Claude 3.5 Sonnet**: Excellent for creative writing and nuance.
- **Gemini 1.5 Pro**: Ideal for long-context tasks (up to 1M tokens).
- **DeepSeek V3**: High performance, cost-effective reasoning.

## 3. Start Chatting

Type your first message. Try asking:

> "Compare the pros and cons of Next.js App Router vs Pages Router for a large-scale e-commerce site."

## 4. Manage Context

halltoo automatically saves your conversation history. You can rename threads, pin important ones, or share them with your team via the "Share" button in the top right.
    `
  },
  "api-keys": {
    category: "Configuration",
    title: "Managing API Keys",
    content: `
# Managing API Keys

For Free plan users, halltoo operates on a **Bring Your Own Key (BYOK)** model. This ensures you only pay for what you use directly to the providers.

## Adding Keys

1. Go to **Settings > API Keys**.
2. Select the provider (OpenAI, Anthropic, Google, etc.).
3. Paste your key starting with \`sk-...\`.
4. Click **Save & Encrypt**.

## Security

Your keys are encrypted using **AES-256-GCM** before being stored in our database. They are never exposed to the client-side browser except during the initial input validation.

> **Note:** We recommend setting usage limits on your provider accounts to prevent unexpected costs.

## Rotating Keys

If you suspect a key compromise:
1. Revoke the key immediately in the provider's dashboard.
2. Generate a new key.
3. Update it in halltoo Settings.
    `
  },
  "security": {
    category: "Core Concepts",
    title: "Security Architecture",
    content: `
# Security Architecture

Security is the foundation of halltoo. We employ a defense-in-depth strategy to protect your data.

## Data Encryption

- **At Rest**: All database volumes are encrypted. Sensitive fields (API keys, PII) are field-level encrypted.
- **In Transit**: All traffic is served over TLS 1.3.

## Zero Data Training

We explicitly **do not** use your data to train our models. We have signed Zero Data Retention (ZDR) agreements with enterprise model providers where applicable.

## Compliance

We are currently undergoing **SOC 2 Type II** auditing. Our infrastructure is hosted on AWS (US-East-1), which is ISO 27001, PCI-DSS, and HIPAA compliant.

## Vulnerability Disclosure

If you find a security issue, please email [security@halltoo.com](mailto:security@halltoo.com). We offer a bug bounty program for critical vulnerabilities.
    `
  },
  "models": {
    category: "Core Concepts",
    title: "Model Selection Strategy",
    content: `
# Model Selection Strategy

Choosing the right model for the task is crucial for optimal results and cost efficiency.

## GPT-4o
- **Best for**: Complex logic, coding, math, structured data extraction.
- **Cost**: High
- **Speed**: Fast

## Claude 3.5 Sonnet
- **Best for**: Writing, nuance, tone matching, creative brainstorming, large context comprehension.
- **Cost**: Medium
- **Speed**: Very Fast

## Gemini 1.5 Pro
- **Best for**: Massive context windows (up to 1M tokens). Upload entire books or codebases.
- **Cost**: Medium
- **Speed**: Medium

## DeepSeek V3
- **Best for**: Coding, reasoning, cost-sensitive batch processing.
- **Cost**: Low
- **Speed**: Very Fast

## Router Mode (Auto)
halltoo can automatically route your prompt to the best model based on complexity analysis. Enable this in **Settings > Model Routing**.
    `
  },
  "rate-limits": {
    category: "Usage",
    title: "Rate Limits & Quotas",
    content: `
# Rate Limits & Quotas

To ensure fair usage and system stability, we enforce the following limits.

## Free Plan
- **Requests**: 50 / day
- **Tokens**: 100k / day
- **Concurrency**: 1 request at a time

## Pro Plan
- **Requests**: Unlimited
- **Tokens**: Unlimited (subject to Fair Use Policy)
- **Concurrency**: 5 concurrent requests

## Team Plan
- **Requests**: Unlimited
- **Tokens**: Unlimited
- **Concurrency**: 20 concurrent requests per seat

## Handling 429 Errors

If you hit a rate limit, the API will respond with HTTP 429. The \`Retry-After\` header will indicate when you can make the next request.

\`\`\`json
{
  "error": {
    "code": "rate_limit_exceeded",
    "message": "You have exceeded your daily request quota.",
    "retry_after": 3600
  }
}
\`\`\`
    `
  }
}

export const docSlugs = Object.keys(docs)
export const docCategories = Array.from(new Set(Object.values(docs).map(d => d.category)))

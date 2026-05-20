export type GratacaModel = {
  /** OpenRouter model id, e.g. "anthropic/claude-3.5-sonnet" */
  id: string;
  name: string;
  provider: string;
  bestFor: string[];
  notes?: string;
};

// You can add/remove models here.
// OpenRouter model ids: https://openrouter.ai/models
export const GRATACA_MODELS: GratacaModel[] = [
  {
    id: "anthropic/claude-3.5-haiku",
    name: "Claude 3.5 Haiku",
    provider: "Anthropic",
    bestFor: ["fast coding", "iteration", "cost-effective"],
    notes: "Fast Claude model (works more reliably for many accounts).",
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    bestFor: ["general coding", "debugging", "fast iterations"],
  },
  {
    id: "~google/gemini-pro-latest",
    name: "Gemini Pro Latest",
    provider: "Google",
    bestFor: ["google pro", "general coding", "long context"],
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct",
    name: "Llama 3.1 70B Instruct",
    provider: "Meta",
    bestFor: ["open model", "coding", "cost-effective"],
  },
  {
    id: "deepseek/deepseek-chat-v3.1",
    name: "DeepSeek V3.1",
    provider: "DeepSeek",
    bestFor: ["coding", "autocomplete", "snippets"],
  },
];

export const DEFAULT_MODEL_ID = "openai/gpt-4o";

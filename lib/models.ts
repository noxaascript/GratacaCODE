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
    id: "anthropic/claude-3.5-sonnet",
    name: "Claude 3.5 Sonnet",
    provider: "Anthropic",
    bestFor: ["refactor", "architecture", "reasoning"],
    notes: "Excellent for complex coding tasks.",
  },
  {
    id: "openai/gpt-4o",
    name: "GPT-4o",
    provider: "OpenAI",
    bestFor: ["general coding", "debugging", "fast iterations"],
  },
  {
    id: "google/gemini-1.5-pro",
    name: "Gemini 1.5 Pro",
    provider: "Google",
    bestFor: ["large context", "multi-file reasoning"],
  },
  {
    id: "meta-llama/llama-3.1-70b-instruct",
    name: "Llama 3.1 70B Instruct",
    provider: "Meta",
    bestFor: ["open model", "coding", "cost-effective"],
  },
  {
    id: "deepseek/deepseek-coder",
    name: "DeepSeek Coder",
    provider: "DeepSeek",
    bestFor: ["coding", "autocomplete", "snippets"],
  },
];

export const DEFAULT_MODEL_ID = GRATACA_MODELS[0]?.id ?? "openai/gpt-4o";


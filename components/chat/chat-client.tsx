"use client";

import React from "react";
import { useSearchParams } from "next/navigation";

import { Markdown } from "@/components/markdown";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { DEFAULT_MODEL_ID, GRATACA_MODELS } from "@/lib/models";

type Role = "user" | "assistant" | "system";
type ChatMessage = { role: Role; content: string };

export function ChatClient() {
  const searchParams = useSearchParams();
  const initialModel =
    searchParams.get("model")?.trim() || DEFAULT_MODEL_ID;

  const [model, setModel] = React.useState(initialModel);
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    {
      role: "system",
      content:
        "You are GratacaAI. You help with coding only. Always provide code when asked, prefer concise explanations, and format code in markdown fenced blocks.",
    },
  ]);
  const [input, setInput] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const displayMessages = messages.filter((m) => m.role !== "system");

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    setError(null);
    setInput("");

    const nextMessages: ChatMessage[] = [...messages, { role: "user", content: text }];
    setMessages(nextMessages);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model,
          messages: nextMessages,
        }),
      });

      const data = (await res.json()) as
        | { ok: true; message: ChatMessage }
        | { ok: false; error: string };

      if (!res.ok || !data.ok) {
        throw new Error((data as any).error || `Request failed (${res.status})`);
      }

      setMessages((prev) => [...prev, data.message]);
    } catch (e: any) {
      setError(e?.message ?? "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void send();
    }
  }

  return (
    <Container className="py-8 sm:py-10">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Chat
        </h1>
        <p className="text-sm text-white/65">
          Choose a model, ask a coding question, and get code-focused answers.
        </p>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-[360px_1fr]">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
          <div className="flex flex-col gap-2">
            <label className="text-xs font-medium text-white/70">Model</label>
            <Select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              aria-label="Model"
            >
              {GRATACA_MODELS.map((m) => (
                <option key={m.id} value={m.id} className="bg-black">
                  {m.name} — {m.provider}
                </option>
              ))}
            </Select>
            <p className="text-xs leading-5 text-white/55">
              Tip: switch models for different coding styles (fast vs deep
              reasoning).
            </p>
          </div>

          <div className="mt-5 rounded-2xl border border-white/10 bg-black/40 p-4">
            <p className="text-xs text-white/60">
              Press <span className="font-mono text-white/80">Enter</span> to
              send,{" "}
              <span className="font-mono text-white/80">Shift+Enter</span> for a
              new line.
            </p>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5">
          <div className="flex max-h-[60vh] flex-col gap-4 overflow-auto p-6">
            {displayMessages.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-black/40 p-5 text-sm text-white/65">
                Ask for a function, refactor, bug fix, or explanation — GratacaAI
                is coding only.
              </div>
            ) : null}

            {displayMessages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.role === "user"
                    ? "ml-auto w-full max-w-[680px] rounded-3xl border border-white/10 bg-black/60 p-5"
                    : "mr-auto w-full max-w-[680px] rounded-3xl border border-white/10 bg-white/5 p-5"
                }
              >
                <div className="mb-2 text-xs font-medium text-white/55">
                  {m.role === "user" ? "You" : "GratacaAI"}
                </div>
                <Markdown content={m.content} />
              </div>
            ))}

            {loading ? (
              <div className="mr-auto w-full max-w-[680px] rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="mb-2 text-xs font-medium text-white/55">
                  GratacaAI
                </div>
                <div className="text-sm text-white/65">Thinking…</div>
              </div>
            ) : null}
          </div>

          <div className="border-t border-white/10 p-4">
            {error ? (
              <div className="mb-3 rounded-2xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white/80">
                Error: {error}
              </div>
            ) : null}

            <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
              <div className="flex-1">
                <Textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  placeholder="Ask for code… (e.g., “Write a TypeScript function to debounce an async call”)"
                />
              </div>
              <Button
                onClick={() => void send()}
                disabled={loading || !input.trim()}
                className="h-11"
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}


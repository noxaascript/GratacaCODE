import { NextResponse } from "next/server";

import { DEFAULT_MODEL_ID } from "@/lib/models";
import { openRouterChat, type OpenRouterChatMessage } from "@/lib/openrouter";

export const runtime = "nodejs";

type Body = {
  model?: string;
  messages?: OpenRouterChatMessage[];
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const model = (body.model || DEFAULT_MODEL_ID).trim();
    const messages = Array.isArray(body.messages) ? body.messages : [];

    if (!model) {
      return NextResponse.json(
        { ok: false, error: "Missing model." },
        { status: 400 },
      );
    }

    const last = messages[messages.length - 1];
    if (!last || last.role !== "user") {
      return NextResponse.json(
        { ok: false, error: "Last message must be a user message." },
        { status: 400 },
      );
    }

    // Basic hard-limit to avoid accidental huge payloads.
    if (JSON.stringify(messages).length > 60_000) {
      return NextResponse.json(
        { ok: false, error: "Message history is too large." },
        { status: 413 },
      );
    }

    const content = await openRouterChat({ model, messages });

    return NextResponse.json({
      ok: true,
      message: { role: "assistant", content },
    });
  } catch (e: any) {
    return NextResponse.json(
      { ok: false, error: e?.message ?? "Server error." },
      { status: 500 },
    );
  }
}


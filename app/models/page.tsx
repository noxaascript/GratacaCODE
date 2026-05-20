import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GRATACA_MODELS } from "@/lib/models";

export default function ModelsPage() {
  return (
    <Container className="py-10 sm:py-14">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-semibold tracking-tight text-white">
          Models
        </h1>
        <p className="max-w-2xl text-sm leading-6 text-white/65">
          Pick a model and jump straight into chat. You can edit the list in{" "}
          <code className="font-mono">lib/models.ts</code>.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {GRATACA_MODELS.map((m) => (
          <div
            key={m.id}
            className="rounded-3xl border border-white/10 bg-white/5 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-base font-semibold text-white">{m.name}</h2>
                <p className="mt-1 text-xs text-white/60">{m.provider}</p>
              </div>

              <ButtonLink
                href={`/chat?model=${encodeURIComponent(m.id)}`}
                variant="secondary"
                size="sm"
              >
                Use in Chat
              </ButtonLink>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {m.bestFor.map((t) => (
                <Badge key={t} className="font-mono">
                  {t}
                </Badge>
              ))}
            </div>

            {m.notes ? (
              <p className="mt-4 text-sm leading-6 text-white/70">{m.notes}</p>
            ) : null}

            <div className="mt-4 border-t border-white/10 pt-4">
              <p className="text-xs text-white/55">
                OpenRouter id:{" "}
                <Link
                  href="https://openrouter.ai/models"
                  target="_blank"
                  className="text-white underline underline-offset-4"
                  rel="noreferrer"
                >
                  {m.id}
                </Link>
              </p>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}


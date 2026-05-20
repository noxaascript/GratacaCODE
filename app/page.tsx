import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(255,255,255,0.16),transparent_65%)]" />

      <Container className="relative py-16 sm:py-24">
        <div className="flex flex-col gap-8">
          <div className="flex flex-wrap items-center gap-2">
            <Badge>Black & White</Badge>
            <Badge>AI for coding only</Badge>
            <Badge className="font-mono">OpenRouter models</Badge>
          </div>

          <h1 className="text-balance text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            GratacaAI
          </h1>

          <p className="max-w-2xl text-pretty text-lg leading-8 text-white/70">
            A clean, focused coding assistant with a built-in model picker. Ask
            for code, refactors, explanations, and debugging help — nothing
            else.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/chat" size="lg">
              Open Chat
            </ButtonLink>
            <ButtonLink href="/models" variant="secondary" size="lg">
              Browse Models
            </ButtonLink>
          </div>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white">
                Coding-first prompts
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Optimized UI for code blocks, markdown, and copy-to-clipboard.
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white">
                Model selection
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Choose the best model for your task (speed vs quality vs cost).
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <h3 className="text-sm font-semibold text-white">
                Simple to deploy
              </h3>
              <p className="mt-2 text-sm leading-6 text-white/65">
                Next.js + Tailwind + one environment variable for OpenRouter.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}

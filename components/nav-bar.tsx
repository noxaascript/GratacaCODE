import Link from "next/link";

import { Container } from "@/components/ui/container";

const links = [
  { href: "/", label: "Home" },
  { href: "/chat", label: "Chat" },
  { href: "/models", label: "Models" },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="group inline-flex items-baseline gap-2">
          <span className="text-lg font-semibold tracking-tight text-white">
            GratacaAI
          </span>
          <span className="rounded-full border border-white/15 bg-white/5 px-2 py-0.5 text-xs text-white/70">
            coding only
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full px-3 py-2 text-sm text-white/70 transition hover:bg-white/5 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}


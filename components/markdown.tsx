"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";

import { cn } from "@/lib/cn";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = React.useState(false);

  async function onCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 900);
    } catch {
      // ignore
    }
  }

  return (
    <button
      onClick={onCopy}
      className="rounded-full border border-white/15 bg-black/40 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
      type="button"
    >
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

export function Markdown({ content, className }: { content: string; className?: string }) {
  return (
    <div className={cn("prose-invert max-w-none text-sm leading-7", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ children, ...props }) => (
            <pre {...props} className={cn("relative", (props as any).className)}>
              {children}
            </pre>
          ),
          code: ({ className: codeClassName, children, ...props }) => {
            const code = String(children ?? "");
            const isBlock = (codeClassName ?? "").includes("language-");
            if (!isBlock) {
              return (
                <code className={codeClassName} {...props}>
                  {children}
                </code>
              );
            }

            // For block code, add a copy button.
            return (
              <div className="relative">
                <div className="absolute right-2 top-2">
                  <CopyButton text={code.replace(/\n$/, "")} />
                </div>
                <code className={codeClassName} {...props}>
                  {children}
                </code>
              </div>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}


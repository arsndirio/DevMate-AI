"use client";

/**
 * src/components/chat/MessageBubble.tsx
 * Tampilan pesan percakapan yang mengutamakan tipografi, keterbacaan kode,
 * dan hierarki visual bersih tanpa dekorasi berlebihan.
 */

import Markdown from "react-markdown";
import type { ChatMessage } from "@/types/chat";
import { CodeBlock } from "./CodeBlock";

export interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex flex-col items-end my-4 max-w-2xl ml-auto">
        <div className="flex items-center gap-1.5 mb-1 text-[11px] text-zinc-400">
          <span>Anda</span>
          <span>•</span>
          <span>{message.timestamp}</span>
        </div>

        <div className="bg-zinc-100 text-zinc-900 border border-zinc-200/80 px-4 py-3 rounded-lg text-xs sm:text-[13px] leading-relaxed w-full">
          <p className="whitespace-pre-wrap">{message.content}</p>

          {message.codeSnippet ? (
            <div className="mt-2">
              <CodeBlock
                language={message.codeSnippet.language}
                code={message.codeSnippet.code}
                filename={message.codeSnippet.filename}
              />
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  // Assistant Message (Natural reading flow)
  return (
    <div className="my-5 max-w-3xl mr-auto">
      {/* Header bar */}
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-semibold text-zinc-900">DevMate</span>
        <span className="text-[11px] text-zinc-400">•</span>
        <span className="text-[11px] text-zinc-400">{message.timestamp}</span>
        {message.isSample ? (
          <span className="text-[10px] text-zinc-400 bg-zinc-100 px-1.5 py-0.2 rounded border border-zinc-200/60 font-mono">
            contoh
          </span>
        ) : null}
      </div>

      {/* Structured Content */}
      <div className="text-xs sm:text-[13px] text-zinc-800 leading-relaxed space-y-2.5">
        <Markdown
          components={{
            h1: ({ children }) => (
              <h1 className="text-sm sm:text-base font-semibold text-zinc-900 mt-4 mb-2">
                {children}
              </h1>
            ),
            h2: ({ children }) => (
              <h2 className="text-xs sm:text-sm font-semibold text-zinc-900 mt-3.5 mb-1.5">
                {children}
              </h2>
            ),
            h3: ({ children }) => (
              <h3 className="text-xs font-semibold text-zinc-900 mt-3 mb-1">
                {children}
              </h3>
            ),
            p: ({ children }) => (
              <p className="my-1.5 leading-relaxed text-zinc-700">{children}</p>
            ),
            ul: ({ children }) => (
              <ul className="my-1.5 list-disc pl-4 space-y-1 text-zinc-700">{children}</ul>
            ),
            ol: ({ children }) => (
              <ol className="my-1.5 list-decimal pl-4 space-y-1 text-zinc-700">{children}</ol>
            ),
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            strong: ({ children }) => (
              <strong className="font-semibold text-zinc-900">{children}</strong>
            ),
            blockquote: ({ children }) => (
              <blockquote className="my-2 pl-3 border-l-2 border-zinc-300 text-zinc-600 italic">
                {children}
              </blockquote>
            ),
            hr: () => <hr className="my-3 border-zinc-200" />,
            code: ({ className, children, ...props }) => {
              const match = /language-(\w+)/.exec(className || "");
              const isBlock = Boolean(match) || String(children).includes("\n");

              if (isBlock) {
                const lang = match ? match[1] : "text";
                return (
                  <CodeBlock
                    language={lang}
                    code={String(children).replace(/\n$/, "")}
                  />
                );
              }

              return (
                <code
                  className="px-1 py-0.5 rounded bg-zinc-100 text-zinc-800 font-mono text-[11px] border border-zinc-200/80"
                  {...props}
                >
                  {children}
                </code>
              );
            },
          }}
        >
          {message.content}
        </Markdown>
      </div>
    </div>
  );
}

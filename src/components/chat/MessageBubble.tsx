"use client";

/**
 * src/components/chat/MessageBubble.tsx
 * Komponen pesan percakapan (user dan assistant) dengan render markdown,
 * syntax highlighting, dan penanda mode demo yang transparan.
 */

import Markdown from "react-markdown";
import type { ChatMessage } from "@/types/chat";
import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { CodeBlock } from "./CodeBlock";

export interface MessageBubbleProps {
  message: ChatMessage;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex gap-3 justify-end items-start group">
        <div className="flex flex-col items-end max-w-2xl sm:max-w-3xl">
          <div className="flex items-center gap-2 mb-1 text-xs text-zinc-500">
            <span className="font-medium text-zinc-700">Developer</span>
            <span>•</span>
            <span>{message.timestamp}</span>
          </div>

          <div className="bg-zinc-900 text-zinc-100 px-4 py-3 rounded-2xl rounded-tr-xs text-sm shadow-xs border border-zinc-800 leading-relaxed break-words w-full">
            <p className="whitespace-pre-wrap">{message.content}</p>

            {message.codeSnippet ? (
              <div className="mt-2.5">
                <CodeBlock
                  language={message.codeSnippet.language}
                  code={message.codeSnippet.code}
                  filename={message.codeSnippet.filename}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="w-8 h-8 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center text-zinc-700 shrink-0 select-none shadow-xs">
          <Icon name="user" size={16} />
        </div>
      </div>
    );
  }

  // Assistant bubble
  return (
    <div className="flex gap-3.5 items-start">
      <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white shrink-0 select-none shadow-xs mt-0.5 ring-2 ring-blue-100">
        <Icon name="bot" size={17} />
      </div>

      <div className="flex-1 max-w-3xl bg-white border border-zinc-200/90 rounded-2xl rounded-tl-xs p-5 shadow-xs text-sm text-zinc-800">
        {/* Header bar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-3 border-b border-zinc-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-zinc-900 text-sm">DevMate AI</span>
            <Badge variant="primary" size="sm" icon="sparkles">
              Gemini 2.5
            </Badge>
            {message.isSample ? (
              <Badge variant="outline" size="sm">
                Pratinjau Demo UI
              </Badge>
            ) : null}
          </div>
          <span className="text-xs text-zinc-400">{message.timestamp}</span>
        </div>

        {/* Markdown Content */}
        <div className="prose prose-zinc max-w-none text-zinc-800 space-y-3 leading-relaxed">
          <Markdown
            components={{
              h1: ({ children }) => (
                <h1 className="text-lg font-bold text-zinc-900 mt-4 mb-2 pb-1 border-b border-zinc-100">
                  {children}
                </h1>
              ),
              h2: ({ children }) => (
                <h2 className="text-base font-bold text-zinc-900 mt-3.5 mb-1.5">{children}</h2>
              ),
              h3: ({ children }) => (
                <h3 className="text-sm font-semibold text-zinc-900 mt-3 mb-1">{children}</h3>
              ),
              p: ({ children }) => <p className="my-2 leading-relaxed text-zinc-700">{children}</p>,
              ul: ({ children }) => <ul className="my-2 list-disc pl-5 space-y-1">{children}</ul>,
              ol: ({ children }) => <ol className="my-2 list-decimal pl-5 space-y-1">{children}</ol>,
              li: ({ children }) => <li className="text-zinc-700 leading-normal">{children}</li>,
              strong: ({ children }) => (
                <strong className="font-semibold text-zinc-900">{children}</strong>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-2 pl-3.5 border-l-2 border-blue-500 text-zinc-600 italic bg-blue-50/30 py-1 rounded-r">
                  {children}
                </blockquote>
              ),
              hr: () => <hr className="my-4 border-zinc-200" />,
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
                    className="px-1.5 py-0.5 rounded bg-zinc-100 text-blue-700 font-mono text-[12px] font-medium border border-zinc-200/80"
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
    </div>
  );
}

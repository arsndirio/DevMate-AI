"use client";

/**
 * src/components/chat/CodeBlock.tsx
 * Blok kode monokromatis bersih dengan syntax highlighting terfokus,
 * penomoran baris, dan tombol salin fungsional.
 */

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Icon } from "@/components/ui/Icon";

export interface CodeBlockProps {
  language?: string | undefined;
  code: string;
  filename?: string | undefined;
  showLineNumbers?: boolean;
}

export function CodeBlock({
  language = "typescript",
  code,
  filename,
  showLineNumbers = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const cleanCode = code.trim();
  const normalizedLanguage = language?.toLowerCase() || "typescript";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = cleanCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    }
  };

  return (
    <div className="my-3 rounded-md overflow-hidden border border-zinc-800 bg-[#0f0f11] text-xs">
      {/* Code Header Bar */}
      <div className="flex items-center justify-between px-3.5 py-1.5 bg-[#18181b] border-b border-zinc-800 text-zinc-400 select-none">
        <span className="font-mono text-[11px] text-zinc-300">
          {filename ?? normalizedLanguage}
        </span>

        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2 py-0.5 rounded text-[11px] text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors cursor-pointer"
          title="Salin kode"
        >
          <Icon name={copied ? "check" : "copy"} size={12} className={copied ? "text-emerald-400" : ""} />
          <span>{copied ? "Tersalin" : "Salin"}</span>
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-x-auto font-mono text-[12px] leading-relaxed">
        <SyntaxHighlighter
          language={normalizedLanguage}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "0.85rem 1rem",
            background: "transparent",
            fontSize: "12px",
            lineHeight: "1.55",
            fontFamily: "var(--font-mono, monospace)",
          }}
          lineNumberStyle={{
            minWidth: "2em",
            paddingRight: "1em",
            color: "#4b5563",
            userSelect: "none",
          }}
        >
          {cleanCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

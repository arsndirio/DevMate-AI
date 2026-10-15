"use client";

/**
 * src/components/chat/CodeBlock.tsx
 * Komponen blok kode dengan syntax highlighting, header nama file/bahasa,
 * dan tombol salin ke clipboard dengan feedback interaktif.
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
  const normalizedLanguage = language.toLowerCase() || "typescript";

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback copy jika clipboard API terbatas
      const textarea = document.createElement("textarea");
      textarea.value = cleanCode;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="my-3 rounded-lg overflow-hidden border border-zinc-700/80 bg-zinc-950 shadow-sm text-sm">
      {/* Code block header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800 text-xs text-zinc-400 select-none">
        <div className="flex items-center gap-2">
          <Icon name="code" size={14} className="text-blue-400" />
          <span className="font-mono text-zinc-300 font-medium">
            {filename ?? normalizedLanguage}
          </span>
          {filename ? (
            <span className="text-[10px] px-1.5 py-0.2 bg-zinc-800 text-zinc-400 rounded">
              {normalizedLanguage}
            </span>
          ) : null}
        </div>

        <button
          onClick={handleCopy}
          type="button"
          className="flex items-center gap-1.5 px-2 py-1 rounded text-zinc-300 hover:text-white hover:bg-zinc-800 active:bg-zinc-700 transition-colors cursor-pointer"
          title="Salin kode ke clipboard"
        >
          <Icon name={copied ? "check" : "copy"} size={13} className={copied ? "text-emerald-400" : ""} />
          <span className="text-[11px] font-medium">{copied ? "Tersalin!" : "Salin Kode"}</span>
        </button>
      </div>

      {/* Code body */}
      <div className="overflow-x-auto text-[13px] font-mono leading-relaxed">
        <SyntaxHighlighter
          language={normalizedLanguage}
          style={vscDarkPlus}
          showLineNumbers={showLineNumbers}
          customStyle={{
            margin: 0,
            padding: "1rem",
            background: "transparent",
            fontSize: "13px",
            lineHeight: "1.55",
            fontFamily: "var(--font-mono, monospace)",
          }}
          lineNumberStyle={{
            minWidth: "2.2em",
            paddingRight: "1em",
            color: "#52525b",
            userSelect: "none",
          }}
        >
          {cleanCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}

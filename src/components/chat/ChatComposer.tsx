"use client";

/**
 * src/components/chat/ChatComposer.tsx
 * Komponen input pertanyaan (composer) dengan textarea multi-line,
 * tombol sisipkan blok kode, bilah pengaturan analisis, dan tombol kirim responsif.
 */

import { useRef } from "react";
import type { AnalysisSettings } from "@/types/chat";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { AnalysisSettingsBar } from "./AnalysisSettingsBar";

export interface ChatComposerProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: (prompt: string) => void;
  settings: AnalysisSettings;
  onSettingsChange: (settings: AnalysisSettings) => void;
  isLoading?: boolean;
}

export function ChatComposer({
  prompt,
  onPromptChange,
  onSubmit,
  settings,
  onSettingsChange,
  isLoading = false,
}: ChatComposerProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (prompt.trim() && !isLoading) {
        onSubmit(prompt);
      }
    }
  };

  const handleInsertCodeSnippet = () => {
    const codeTemplate = `\n\`\`\`typescript\n// Tempelkan kode atau error trace di sini\nfunction contoh() {\n  \n}\n\`\`\`\n`;
    onPromptChange(prompt + codeTemplate);
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 50);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isLoading) {
      onSubmit(prompt);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-4">
      {/* Container Frame */}
      <div className="flex flex-col bg-white border border-zinc-300/90 rounded-2xl shadow-sm focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all duration-150 overflow-hidden">
        {/* Settings Bar */}
        <div className="px-3 pt-2.5 pb-1">
          <AnalysisSettingsBar settings={settings} onChange={onSettingsChange} />
        </div>

        {/* Form & Textarea */}
        <form onSubmit={handleSubmit} className="flex flex-col p-3">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Tanyakan error TypeScript, tempelkan stack trace, atau minta saran arsitektur kode..."
            className="w-full resize-none bg-transparent text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-hidden leading-relaxed min-h-[72px] max-h-[220px]"
          />

          {/* Composer Toolbar Bottom */}
          <div className="flex items-center justify-between pt-2 mt-1 border-t border-zinc-100">
            {/* Left helpers */}
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={handleInsertCodeSnippet}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 border border-zinc-200/80 transition-colors cursor-pointer select-none"
                title="Sisipkan format blok kode markdown"
              >
                <Icon name="code" size={13} className="text-blue-600" />
                <span className="font-medium text-[11px]">Sisipkan Kode</span>
              </button>

              {prompt.length > 0 ? (
                <button
                  type="button"
                  onClick={() => onPromptChange("")}
                  className="inline-flex items-center gap-1 px-2 py-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer text-[11px]"
                  title="Kosongkan teks"
                >
                  <Icon name="close" size={12} />
                  <span>Hapus</span>
                </button>
              ) : null}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-[11px] text-zinc-400">
                Tekan <kbd className="font-mono bg-zinc-100 px-1 py-0.5 rounded border border-zinc-200 text-zinc-600">Enter ↵</kbd> untuk kirim
              </span>

              <Button
                type="submit"
                variant="primary"
                size="sm"
                disabled={!prompt.trim() || isLoading}
                isLoading={isLoading}
                icon="arrow-up"
                className="rounded-lg px-3 py-1.5 cursor-pointer"
                title="Kirim pesan"
              >
                <span>Kirim</span>
              </Button>
            </div>
          </div>
        </form>
      </div>

      {/* Helper disclaimer */}
      <div className="flex items-center justify-between px-2 pt-2 text-[11px] text-zinc-400">
        <span>DevMate AI dapat membuat kekeliruan. Verifikasi kode penting sebelum deployment.</span>
        <span className="font-mono text-zinc-400 hidden md:inline">Mode Pratinjau UI • v0.1</span>
      </div>
    </div>
  );
}

"use client";

/**
 * src/components/chat/ChatComposer.tsx
 * Kolom input pertanyaan bersih dengan textarea yang nyaman,
 * kontrol sisipkan kode, pembuka modal pengaturan, dan tombol kirim presisi.
 */

import { useRef } from "react";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export interface ChatComposerProps {
  prompt: string;
  onPromptChange: (value: string) => void;
  onSubmit: (prompt: string) => void;
  onOpenSettings: () => void;
  isLoading?: boolean;
}

export function ChatComposer({
  prompt,
  onPromptChange,
  onSubmit,
  onOpenSettings,
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
    const codeTemplate = `\n\`\`\`typescript\n// Tempelkan kode atau error trace di sini\n\n\`\`\`\n`;
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
    <div className="w-full max-w-3xl mx-auto px-4 pb-4 select-none">
      <div className="flex flex-col bg-white border border-zinc-300 rounded-lg shadow-2xs focus-within:border-zinc-500 focus-within:ring-1 focus-within:ring-zinc-400 transition-colors p-2.5">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <textarea
            ref={textareaRef}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={2}
            placeholder="Tanyakan error atau tempelkan potongan kode... (Enter untuk kirim)"
            className="w-full resize-none bg-transparent text-xs sm:text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none leading-relaxed min-h-[56px] max-h-[160px]"
          />

          {/* Bottom toolbar */}
          <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={handleInsertCodeSnippet}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                title="Sisipkan format blok kode markdown"
              >
                <Icon name="code" size={13} className="text-zinc-500" />
                <span className="text-[11px] font-medium">Sisipkan Kode</span>
              </button>

              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
                title="Buka pengaturan parameter analisis"
              >
                <Icon name="sliders" size={13} className="text-zinc-500" />
                <span className="text-[11px] font-medium">Pengaturan</span>
              </button>
            </div>

            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={!prompt.trim() || isLoading}
              isLoading={isLoading}
              icon="arrow-up"
              className="rounded-md px-3 py-1 cursor-pointer"
              title="Kirim pesan"
            >
              <span>Kirim</span>
            </Button>
          </div>
        </form>
      </div>

      <p className="text-[11px] text-zinc-400 text-center mt-2">
        DevMate AI dapat membuat kekeliruan. Selalu verifikasi kode kritis sebelum produksi.
      </p>
    </div>
  );
}

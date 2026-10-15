"use client";

/**
 * src/components/chat/WelcomeState.tsx
 * Tampilan awal antarmuka saat belum ada percakapan aktif atau setelah klik New Chat.
 * Berisi sapaan, deskripsi tujuan sistem, dan 4 kartu saran interaktif.
 */

import type { SuggestionCard } from "@/types/chat";
import { SUGGESTION_CARDS } from "@/lib/data/sampleConversations";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";

export interface WelcomeStateProps {
  onSelectSuggestion: (suggestion: SuggestionCard) => void;
}

const categoryIcons: Record<string, IconName> = {
  error: "bug",
  review: "code",
  optimize: "lightbulb",
  refactor: "terminal",
};

const categoryLabels: Record<string, string> = {
  error: "Analisis Error",
  review: "Code Review",
  optimize: "Optimasi",
  refactor: "Konsep & Arsitektur",
};

export function WelcomeState({ onSelectSuggestion }: WelcomeStateProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-3xl mx-auto py-10 px-4 text-center select-none">
      {/* Brand Icon & Heading */}
      <div className="w-14 h-14 rounded-2xl bg-gradient-to-b from-blue-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-blue-500/10 mb-4 ring-4 ring-blue-50">
        <Icon name="terminal" size={28} />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <Badge variant="primary" size="sm" icon="sparkles">
          DevMate AI v0.1
        </Badge>
        <Badge variant="outline" size="sm">
          Google Gemini Powered
        </Badge>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900 mb-2">
        Halo, Rekan Developer! 👋
      </h1>
      <p className="text-sm sm:text-base text-zinc-600 max-w-xl leading-relaxed mb-8">
        Asisten AI coding untuk membantu Anda mendiagnosis runtime error, melakukan code review,
        mengoptimalkan performa, dan merancang arsitektur aplikasi yang bersih.
      </p>

      {/* Suggestion Cards Grid */}
      <div className="w-full text-left mb-8">
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-xs font-semibold text-zinc-500 uppercase tracking-wider">
            Mulai Dengan Contoh Topik Analisis
          </span>
          <span className="text-xs text-zinc-400">Klik kartu untuk pratinjau studi kasus</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {SUGGESTION_CARDS.map((card) => {
            const iconName = categoryIcons[card.category] ?? "message-square";
            const categoryLabel = categoryLabels[card.category] ?? card.category;

            return (
              <button
                key={card.id}
                onClick={() => onSelectSuggestion(card)}
                type="button"
                className="group relative flex flex-col p-4 rounded-xl border border-zinc-200/90 bg-white hover:border-blue-500/70 hover:shadow-md hover:shadow-blue-500/5 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-150 cursor-pointer text-left"
              >
                <div className="flex items-center justify-between w-full mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-zinc-100 group-hover:bg-blue-50 group-hover:text-blue-600 text-zinc-700 flex items-center justify-center transition-colors">
                      <Icon name={iconName} size={15} />
                    </div>
                    <span className="text-xs font-semibold text-zinc-900 group-hover:text-blue-600 transition-colors">
                      {card.title}
                    </span>
                  </div>
                  <span className="text-[11px] font-medium text-zinc-400 group-hover:text-blue-600 transition-colors">
                    {categoryLabel}
                  </span>
                </div>

                <p className="text-xs text-zinc-600 line-clamp-2 leading-relaxed">
                  {card.description}
                </p>

                <div className="mt-3 pt-2.5 border-t border-zinc-100 flex items-center justify-between text-[11px] text-zinc-400 group-hover:text-blue-600">
                  <span className="font-mono truncate mr-2">&ldquo;{card.prompt}&rdquo;</span>
                  <Icon
                    name="chevron-right"
                    size={12}
                    className="shrink-0 transform group-hover:translate-x-0.5 transition-transform"
                  />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Feature Badges Footer */}
      <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-zinc-500 pt-2 border-t border-zinc-200/60 w-full">
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700">
          <Icon name="code" size={13} className="text-blue-600" />
          Syntax Highlighting Lengkap
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700">
          <Icon name="bug" size={13} className="text-emerald-600" />
          Diagnosa Stack Trace
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-zinc-100 text-zinc-700">
          <Icon name="sparkles" size={13} className="text-indigo-600" />
          Penjelasan Bahasa Indonesia
        </span>
      </div>
    </div>
  );
}

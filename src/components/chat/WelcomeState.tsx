"use client";

/**
 * src/components/chat/WelcomeState.tsx
 * Tampilan pembuka yang tenang, fungsional, dan bebas dari ornamen marketing.
 */

import type { SuggestionCard } from "@/types/chat";
import { SUGGESTION_CARDS } from "@/lib/data/sampleConversations";

export interface WelcomeStateProps {
  onSelectSuggestion: (suggestion: SuggestionCard) => void;
}

export function WelcomeState({ onSelectSuggestion }: WelcomeStateProps) {
  return (
    <div className="flex flex-col items-center justify-center max-w-2xl mx-auto py-16 px-4 text-center select-none">
      {/* Title & Description */}
      <div className="mb-8">
        <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900">
          DevMate AI
        </h1>
        <p className="mt-2 text-xs sm:text-sm text-zinc-500 leading-relaxed max-w-md mx-auto">
          Asisten teknis untuk diagnosis runtime error, review kode, dan optimasi arsitektur program.
        </p>
      </div>

      {/* Suggested Actions Grid */}
      <div className="w-full text-left">
        <p className="text-[11px] font-medium text-zinc-400 mb-2.5 px-0.5">
          Contoh Kasus Analisis
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {SUGGESTION_CARDS.map((card) => (
            <button
              key={card.id}
              onClick={() => onSelectSuggestion(card)}
              type="button"
              className="flex flex-col p-3 rounded-md border border-zinc-200 bg-white hover:border-zinc-300 hover:bg-zinc-50 transition-colors text-left cursor-pointer"
            >
              <span className="text-xs font-medium text-zinc-900">{card.title}</span>
              <span className="text-[11px] text-zinc-500 mt-1 line-clamp-1 leading-normal">
                {card.description}
              </span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-[11px] text-zinc-400 mt-8">
        Pilih salah satu contoh di atas atau tuliskan pertanyaan teknis di bawah.
      </p>
    </div>
  );
}

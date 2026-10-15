"use client";

/**
 * src/components/chat/AnalysisSettingsBar.tsx
 * Bilah kontrol pengaturan analisis ringkas untuk menyesuaikan bahasa,
 * level developer, bahasa pemrograman, dan fokus analisis secara kontekstual.
 */

import { useState } from "react";
import type {
  AnalysisSettings,
  ResponseLanguage,
  ExperienceLevel,
  ProgrammingLanguage,
  AnalysisFocus,
} from "@/types/chat";
import { Icon } from "@/components/ui/Icon";

export interface AnalysisSettingsBarProps {
  settings: AnalysisSettings;
  onChange: (newSettings: AnalysisSettings) => void;
}

export function AnalysisSettingsBar({ settings, onChange }: AnalysisSettingsBarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const focusLabels: Record<AnalysisFocus, string> = {
    error: "Analisis Error",
    review: "Code Review",
    optimize: "Optimasi Performa",
    refactor: "Arsitektur & Refactor",
  };

  const levelLabels: Record<ExperienceLevel, string> = {
    beginner: "Pemula (Junior)",
    intermediate: "Menengah (Mid)",
    senior: "Senior / Lead",
  };

  const langLabels: Record<ProgrammingLanguage, string> = {
    auto: "Auto-detect",
    typescript: "TypeScript",
    javascript: "JavaScript",
    python: "Python",
    go: "Go",
    php: "PHP",
  };

  return (
    <div className="relative text-xs">
      {/* Compact Quick Bar */}
      <div className="flex flex-wrap items-center justify-between gap-1.5 px-3 py-1.5 bg-zinc-50 border border-zinc-200/90 rounded-lg text-zinc-600">
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 text-zinc-500 font-medium">
            <Icon name="sliders" size={13} className="text-blue-600" />
            <span className="hidden sm:inline">Pengaturan:</span>
          </div>

          {/* Bahasa Respons */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-zinc-200/90 hover:border-zinc-300 font-medium text-zinc-800 transition-colors cursor-pointer"
            title="Ubah Bahasa Respons"
          >
            <span>🇮🇩 {settings.responseLanguage === "id" ? "B. Indonesia" : "English"}</span>
          </button>

          {/* Fokus Analisis */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-zinc-200/90 hover:border-zinc-300 font-medium text-zinc-800 transition-colors cursor-pointer"
            title="Ubah Fokus Analisis"
          >
            <span>🎯 {focusLabels[settings.analysisFocus]}</span>
          </button>

          {/* Bahasa Pemrograman */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="hidden md:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-zinc-200/90 hover:border-zinc-300 font-medium text-zinc-800 transition-colors cursor-pointer"
            title="Bahasa Pemrograman Target"
          >
            <span>⚡ {langLabels[settings.programmingLanguage]}</span>
          </button>

          {/* Tingkat Pengalaman */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="hidden lg:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-white border border-zinc-200/90 hover:border-zinc-300 font-medium text-zinc-800 transition-colors cursor-pointer"
            title="Tingkat Pengalaman"
          >
            <span>👤 {levelLabels[settings.experienceLevel]}</span>
          </button>
        </div>

        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center gap-1 px-2 py-0.5 text-blue-600 hover:text-blue-700 hover:bg-blue-50/60 rounded font-medium transition-colors cursor-pointer ml-auto"
        >
          <span>{isOpen ? "Tutup" : "Kustomisasi"}</span>
          <Icon
            name="chevron-down"
            size={12}
            className={`transform transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
      </div>

      {/* Popover Settings Panel */}
      {isOpen ? (
        <div className="absolute bottom-full left-0 right-0 mb-2 p-4 bg-white border border-zinc-200 rounded-xl shadow-lg z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
          <div className="flex items-center justify-between pb-2 mb-3 border-b border-zinc-100">
            <span className="font-semibold text-zinc-900 text-xs uppercase tracking-wider">
              Parameter Analisis DevMate AI
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="text-zinc-400 hover:text-zinc-700 p-1 rounded"
              title="Tutup pengaturan"
            >
              <Icon name="close" size={14} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs">
            {/* 1. Bahasa Respons */}
            <div>
              <label className="block font-medium text-zinc-700 mb-1.5">Bahasa Respons</label>
              <select
                value={settings.responseLanguage}
                onChange={(e) =>
                  onChange({ ...settings, responseLanguage: e.target.value as ResponseLanguage })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 font-medium focus:outline-blue-600"
              >
                <option value="id">Bahasa Indonesia</option>
                <option value="en">English</option>
              </select>
            </div>

            {/* 2. Tingkat Pengguna */}
            <div>
              <label className="block font-medium text-zinc-700 mb-1.5">Tingkat Pengalaman</label>
              <select
                value={settings.experienceLevel}
                onChange={(e) =>
                  onChange({ ...settings, experienceLevel: e.target.value as ExperienceLevel })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 font-medium focus:outline-blue-600"
              >
                <option value="beginner">Pemula (Junior Developer)</option>
                <option value="intermediate">Menengah (Mid Developer)</option>
                <option value="senior">Senior / Software Architect</option>
              </select>
            </div>

            {/* 3. Bahasa Pemrograman */}
            <div>
              <label className="block font-medium text-zinc-700 mb-1.5">Bahasa Pemrograman</label>
              <select
                value={settings.programmingLanguage}
                onChange={(e) =>
                  onChange({
                    ...settings,
                    programmingLanguage: e.target.value as ProgrammingLanguage,
                  })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 font-medium focus:outline-blue-600"
              >
                <option value="auto">Auto-detect (Otomatis)</option>
                <option value="typescript">TypeScript</option>
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="go">Go</option>
                <option value="php">PHP</option>
              </select>
            </div>

            {/* 4. Fokus Analisis */}
            <div>
              <label className="block font-medium text-zinc-700 mb-1.5">Fokus Analisis</label>
              <select
                value={settings.analysisFocus}
                onChange={(e) =>
                  onChange({ ...settings, analysisFocus: e.target.value as AnalysisFocus })
                }
                className="w-full px-2.5 py-1.5 rounded-lg border border-zinc-300 bg-white text-zinc-800 font-medium focus:outline-blue-600"
              >
                <option value="error">Diagnosa Error & Root Cause</option>
                <option value="review">Code Review & Security</option>
                <option value="optimize">Optimasi Kinerja / Algoritma</option>
                <option value="refactor">Arsitektur & Refactoring</option>
              </select>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

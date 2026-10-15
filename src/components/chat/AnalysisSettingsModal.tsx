"use client";

/**
 * src/components/chat/AnalysisSettingsModal.tsx
 * Panel dialog pengaturan analisis ringkas menggunakan kontrol form standar.
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
import { Button } from "@/components/ui/Button";

export interface AnalysisSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  settings: AnalysisSettings;
  onSave: (settings: AnalysisSettings) => void;
}

export function AnalysisSettingsModal({
  isOpen,
  onClose,
  settings,
  onSave,
}: AnalysisSettingsModalProps) {
  const [localSettings, setLocalSettings] = useState<AnalysisSettings>(settings);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localSettings);
    onClose();
  };

  const handleReset = () => {
    const defaultSettings: AnalysisSettings = {
      responseLanguage: "id",
      experienceLevel: "intermediate",
      programmingLanguage: "typescript",
      analysisFocus: "error",
    };
    setLocalSettings(defaultSettings);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-900/30 backdrop-blur-2xs"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-white border border-zinc-200 rounded-lg shadow-lg p-5 text-zinc-900 animate-in fade-in duration-100"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="settings-modal-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-zinc-100">
          <div>
            <h3 id="settings-modal-title" className="text-sm font-semibold text-zinc-900">
              Pengaturan Analisis
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Sesuaikan preferensi respons untuk kebutuhan analisa kode.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 transition-colors"
            title="Tutup dialog"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* Form Fields */}
        <div className="py-4 space-y-3.5 text-xs">
          {/* Bahasa Respons */}
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Bahasa Respons</label>
            <select
              value={localSettings.responseLanguage}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  responseLanguage: e.target.value as ResponseLanguage,
                })
              }
              className="w-full px-2.5 py-1.5 rounded-md border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
            >
              <option value="id">Bahasa Indonesia</option>
              <option value="en">English</option>
            </select>
          </div>

          {/* Tingkat Pengalaman */}
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Tingkat Pengalaman</label>
            <select
              value={localSettings.experienceLevel}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  experienceLevel: e.target.value as ExperienceLevel,
                })
              }
              className="w-full px-2.5 py-1.5 rounded-md border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
            >
              <option value="beginner">Pemula (Junior)</option>
              <option value="intermediate">Menengah (Mid-level)</option>
              <option value="senior">Senior / Software Architect</option>
            </select>
          </div>

          {/* Bahasa Pemrograman */}
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Bahasa Pemrograman Utama</label>
            <select
              value={localSettings.programmingLanguage}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  programmingLanguage: e.target.value as ProgrammingLanguage,
                })
              }
              className="w-full px-2.5 py-1.5 rounded-md border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
            >
              <option value="auto">Deteksi Otomatis (Auto-detect)</option>
              <option value="typescript">TypeScript</option>
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="go">Go</option>
              <option value="php">PHP</option>
            </select>
          </div>

          {/* Fokus Analisis */}
          <div>
            <label className="block font-medium text-zinc-700 mb-1">Fokus Analisis</label>
            <select
              value={localSettings.analysisFocus}
              onChange={(e) =>
                setLocalSettings({
                  ...localSettings,
                  analysisFocus: e.target.value as AnalysisFocus,
                })
              }
              className="w-full px-2.5 py-1.5 rounded-md border border-zinc-300 bg-white text-zinc-900 focus:outline-none focus:border-zinc-500 focus:ring-1 focus:ring-zinc-400"
            >
              <option value="error">Diagnosa Error & Solusi (Root Cause)</option>
              <option value="review">Code Review & Keamanan</option>
              <option value="optimize">Optimasi Performa & Memory</option>
              <option value="refactor">Arsitektur & Refactoring Bersih</option>
            </select>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between pt-3 border-t border-zinc-100">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-zinc-500 hover:text-zinc-800 transition-colors"
          >
            Reset Default
          </button>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={onClose}>
              Batal
            </Button>
            <Button variant="primary" size="sm" onClick={handleSave}>
              Terapkan
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

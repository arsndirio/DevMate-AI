"use client";

/**
 * src/components/layout/Sidebar.tsx
 * Sidebar navigasi kiri dengan branding DevMate AI, tombol Chat Baru,
 * daftar riwayat percakapan yang dikelompokkan, dan informasi status model.
 */

import type { ChatConversation } from "@/types/chat";
import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onResetToDefault: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onResetToDefault,
}: SidebarProps) {
  // Kelompokkan riwayat percakapan berdasarkan kategori waktu
  const todayChats = conversations.filter((c) => c.category === "today");
  const yesterdayChats = conversations.filter((c) => c.category === "yesterday");
  const earlierChats = conversations.filter((c) => c.category === "earlier");

  if (!isOpen) {
    return null;
  }

  return (
    <>
      {/* Mobile Backdrop */}
      <div
        className="fixed inset-0 bg-zinc-900/30 z-30 md:hidden backdrop-blur-2xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside className="fixed inset-y-0 left-0 z-40 w-72 bg-zinc-50/95 border-r border-zinc-200/90 flex flex-col md:static md:z-auto transition-all duration-200 ease-in-out select-none">
        {/* Brand Header */}
        <div className="h-14 px-4 border-b border-zinc-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white shadow-xs">
              <Icon name="terminal" size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold text-sm tracking-tight text-zinc-900">DevMate AI</span>
                <span className="text-[10px] font-mono px-1 py-0.2 rounded bg-blue-100 text-blue-700 font-medium">
                  v0.1
                </span>
              </div>
              <p className="text-[11px] text-zinc-500 -mt-0.5">Asisten Coding Gemini</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="md:hidden p-1.5 rounded-lg text-zinc-500 hover:text-zinc-800 hover:bg-zinc-200"
            title="Tutup Menu"
          >
            <Icon name="close" size={16} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-b border-zinc-200/60">
          <Button
            variant="primary"
            size="md"
            icon="plus"
            onClick={onNewChat}
            className="w-full justify-center shadow-xs text-xs font-semibold"
          >
            <span>Percakapan Baru</span>
          </Button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4 text-xs">
          {/* Hari Ini */}
          {todayChats.length > 0 ? (
            <div>
              <span className="block px-2 mb-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Hari Ini
              </span>
              <div className="space-y-1">
                {todayChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectConversation(chat.id)}
                    type="button"
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer group ${
                      activeConversationId === chat.id
                        ? "bg-blue-50/80 text-blue-700 font-medium border border-blue-200/70"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon
                      name="message-square"
                      size={14}
                      className={activeConversationId === chat.id ? "text-blue-600" : "text-zinc-400 group-hover:text-zinc-600"}
                    />
                    <span className="truncate flex-1">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Kemarin */}
          {yesterdayChats.length > 0 ? (
            <div>
              <span className="block px-2 mb-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Kemarin
              </span>
              <div className="space-y-1">
                {yesterdayChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectConversation(chat.id)}
                    type="button"
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer group ${
                      activeConversationId === chat.id
                        ? "bg-blue-50/80 text-blue-700 font-medium border border-blue-200/70"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon
                      name="message-square"
                      size={14}
                      className={activeConversationId === chat.id ? "text-blue-600" : "text-zinc-400 group-hover:text-zinc-600"}
                    />
                    <span className="truncate flex-1">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {/* Sebelumnya */}
          {earlierChats.length > 0 ? (
            <div>
              <span className="block px-2 mb-1.5 text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">
                Sebelumnya
              </span>
              <div className="space-y-1">
                {earlierChats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => onSelectConversation(chat.id)}
                    type="button"
                    className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg text-left transition-colors cursor-pointer group ${
                      activeConversationId === chat.id
                        ? "bg-blue-50/80 text-blue-700 font-medium border border-blue-200/70"
                        : "text-zinc-700 hover:bg-zinc-100"
                    }`}
                  >
                    <Icon
                      name="message-square"
                      size={14}
                      className={activeConversationId === chat.id ? "text-blue-600" : "text-zinc-400 group-hover:text-zinc-600"}
                    />
                    <span className="truncate flex-1">{chat.title}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer Area: Model Status & Reset */}
        <div className="p-3 border-t border-zinc-200/80 bg-white/70 space-y-2">
          {/* Engine Info Box */}
          <div className="p-2.5 rounded-lg border border-zinc-200/80 bg-zinc-50 text-[11px] space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-zinc-800">Model AI</span>
              <Badge variant="primary" size="sm">
                Gemini 2.5
              </Badge>
            </div>
            <p className="text-zinc-500">Mode Pratinjau Antarmuka • SDK @google/genai siap dihubungkan.</p>
          </div>

          {/* Reset button */}
          <button
            onClick={onResetToDefault}
            type="button"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 text-[11px] text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
            title="Reset riwayat ke contoh awal"
          >
            <Icon name="refresh" size={12} />
            <span>Muat Ulang Contoh Data</span>
          </button>
        </div>
      </aside>
    </>
  );
}

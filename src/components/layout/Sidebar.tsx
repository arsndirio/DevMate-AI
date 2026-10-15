"use client";

/**
 * src/components/layout/Sidebar.tsx
 * Bilah navigasi samping yang tenang, fungsional, dan rapi.
 */

import type { ChatConversation } from "@/types/chat";
import { Icon } from "@/components/ui/Icon";

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  conversations: ChatConversation[];
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
  onResetToDefault: () => void;
  onOpenSettings: () => void;
}

export function Sidebar({
  isOpen,
  onClose,
  conversations,
  activeConversationId,
  onSelectConversation,
  onNewChat,
  onResetToDefault,
  onOpenSettings,
}: SidebarProps) {
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
        className="fixed inset-0 bg-zinc-900/20 z-30 md:hidden backdrop-blur-2xs"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar Panel */}
      <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-zinc-50 border-r border-zinc-200/90 flex flex-col md:static md:z-auto transition-all duration-150 select-none">
        {/* Brand Header */}
        <div className="h-12 px-3.5 border-b border-zinc-200/80 flex items-center justify-between">
          <span className="text-xs font-semibold tracking-tight text-zinc-900 font-mono">
            DevMate AI
          </span>

          <button
            onClick={onClose}
            className="md:hidden p-1 rounded-md text-zinc-400 hover:text-zinc-700"
            title="Tutup Menu"
          >
            <Icon name="close" size={15} />
          </button>
        </div>

        {/* New Chat Button */}
        <div className="p-3 border-b border-zinc-200/60">
          <button
            onClick={onNewChat}
            type="button"
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-3 text-xs font-medium text-zinc-800 bg-white hover:bg-zinc-100/80 border border-zinc-200/90 rounded-md transition-colors cursor-pointer shadow-2xs"
          >
            <Icon name="plus" size={13} className="text-zinc-600" />
            <span>Percakapan Baru</span>
          </button>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3.5 text-xs">
          {/* Hari Ini */}
          {todayChats.length > 0 ? (
            <div>
              <span className="block px-2 mb-1 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Hari Ini
              </span>
              <div className="space-y-0.5">
                {todayChats.map((chat) => {
                  const isActive = activeConversationId === chat.id;
                  return (
                    <button
                      key={chat.id}
                      onClick={() => onSelectConversation(chat.id)}
                      type="button"
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                        isActive
                          ? "bg-zinc-200/70 text-zinc-900 font-medium"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                      }`}
                    >
                      <Icon
                        name="message-square"
                        size={13}
                        className={isActive ? "text-zinc-800" : "text-zinc-400"}
                      />
                      <span className="truncate flex-1 text-xs">{chat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Kemarin */}
          {yesterdayChats.length > 0 ? (
            <div>
              <span className="block px-2 mb-1 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Kemarin
              </span>
              <div className="space-y-0.5">
                {yesterdayChats.map((chat) => {
                  const isActive = activeConversationId === chat.id;
                  return (
                    <button
                      key={chat.id}
                      onClick={() => onSelectConversation(chat.id)}
                      type="button"
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                        isActive
                          ? "bg-zinc-200/70 text-zinc-900 font-medium"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                      }`}
                    >
                      <Icon
                        name="message-square"
                        size={13}
                        className={isActive ? "text-zinc-800" : "text-zinc-400"}
                      />
                      <span className="truncate flex-1 text-xs">{chat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}

          {/* Sebelumnya */}
          {earlierChats.length > 0 ? (
            <div>
              <span className="block px-2 mb-1 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                Sebelumnya
              </span>
              <div className="space-y-0.5">
                {earlierChats.map((chat) => {
                  const isActive = activeConversationId === chat.id;
                  return (
                    <button
                      key={chat.id}
                      onClick={() => onSelectConversation(chat.id)}
                      type="button"
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-md text-left transition-colors cursor-pointer ${
                        isActive
                          ? "bg-zinc-200/70 text-zinc-900 font-medium"
                          : "text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100/70"
                      }`}
                    >
                      <Icon
                        name="message-square"
                        size={13}
                        className={isActive ? "text-zinc-800" : "text-zinc-400"}
                      />
                      <span className="truncate flex-1 text-xs">{chat.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : null}
        </div>

        {/* Footer actions */}
        <div className="p-3 border-t border-zinc-200/80 bg-zinc-50 space-y-1.5">
          <button
            onClick={onOpenSettings}
            type="button"
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
          >
            <Icon name="sliders" size={13} className="text-zinc-500" />
            <span>Pengaturan Analisis</span>
          </button>

          <button
            onClick={onResetToDefault}
            type="button"
            className="w-full flex items-center gap-2 px-2 py-1.5 text-xs text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 rounded-md transition-colors cursor-pointer"
          >
            <Icon name="refresh" size={13} className="text-zinc-400" />
            <span>Muat Contoh Awal</span>
          </button>

          <div className="pt-1 text-center">
            <span className="text-[10px] font-mono text-zinc-400">DevMate v0.1 • Pratinjau UI</span>
          </div>
        </div>
      </aside>
    </>
  );
}

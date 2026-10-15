"use client";

/**
 * src/components/layout/Header.tsx
 * Header area utama yang bersih dan profesional dengan konteks percakapan,
 * label status sistem, dan kontrol navigasi.
 */

import { Icon } from "@/components/ui/Icon";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export interface HeaderProps {
  conversationTitle?: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
}

export function Header({
  conversationTitle = "Percakapan Baru",
  isSidebarOpen,
  onToggleSidebar,
  onNewChat,
}: HeaderProps) {
  return (
    <header className="h-14 border-b border-zinc-200/90 bg-white/95 backdrop-blur-xs flex items-center justify-between px-4 sticky top-0 z-20 select-none">
      {/* Left: Sidebar Toggle & Context Title */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          type="button"
          className="p-1.5 rounded-lg text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          title={isSidebarOpen ? "Sembunyikan Sidebar" : "Tampilkan Sidebar"}
          aria-label="Toggle Sidebar"
        >
          <Icon name="sidebar" size={18} />
        </button>

        <div className="flex items-center gap-2.5 min-w-0">
          <h2 className="text-sm font-semibold text-zinc-900 truncate max-w-[200px] sm:max-w-md">
            {conversationTitle}
          </h2>

          <div className="hidden sm:flex items-center gap-1.5">
            <Badge variant="primary" size="sm">
              AI Coding Assistant
            </Badge>
            <Badge variant="outline" size="sm">
              Mode Demo UI
            </Badge>
          </div>
        </div>
      </div>

      {/* Right: Quick Actions & Status */}
      <div className="flex items-center gap-2.5">
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-xs font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Lokal • Siap</span>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon="plus"
          onClick={onNewChat}
          className="hidden sm:inline-flex text-xs"
        >
          <span>Chat Baru</span>
        </Button>
      </div>
    </header>
  );
}

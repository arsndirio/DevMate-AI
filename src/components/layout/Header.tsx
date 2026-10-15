"use client";

/**
 * src/components/layout/Header.tsx
 * Header ringkas dan fungsional tanpa badge dekoratif yang mengalihkan perhatian.
 */

import { Icon } from "@/components/ui/Icon";
import { Button } from "@/components/ui/Button";

export interface HeaderProps {
  conversationTitle?: string;
  isSidebarOpen: boolean;
  onToggleSidebar: () => void;
  onNewChat: () => void;
  onOpenSettings: () => void;
}

export function Header({
  conversationTitle = "Percakapan Baru",
  isSidebarOpen,
  onToggleSidebar,
  onNewChat,
  onOpenSettings,
}: HeaderProps) {
  return (
    <header className="h-12 border-b border-zinc-200/90 bg-white/95 backdrop-blur-2xs flex items-center justify-between px-3.5 sticky top-0 z-20 select-none">
      {/* Left Context */}
      <div className="flex items-center gap-2.5 min-w-0">
        <button
          onClick={onToggleSidebar}
          type="button"
          className="p-1 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          title={isSidebarOpen ? "Sembunyikan bilah samping" : "Tampilkan bilah samping"}
          aria-label="Toggle Sidebar"
        >
          <Icon name="sidebar" size={16} />
        </button>

        <h2 className="text-xs sm:text-sm font-medium text-zinc-800 truncate max-w-[220px] sm:max-w-md">
          {conversationTitle}
        </h2>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          icon="plus"
          onClick={onNewChat}
          className="text-xs py-1"
        >
          <span>Chat Baru</span>
        </Button>

        <button
          onClick={onOpenSettings}
          type="button"
          className="p-1.5 rounded-md text-zinc-500 hover:text-zinc-900 hover:bg-zinc-100 transition-colors cursor-pointer"
          title="Buka pengaturan analisis"
          aria-label="Pengaturan"
        >
          <Icon name="sliders" size={15} />
        </button>
      </div>
    </header>
  );
}

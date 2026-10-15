"use client";

/**
 * src/app/page.tsx
 * Layar utama DevMate AI yang bersih, profesional, dan berorientasi pada kebutuhan developer.
 */

import { useState } from "react";
import type {
  ChatConversation,
  ChatMessage,
  AnalysisSettings,
  SuggestionCard,
} from "@/types/chat";
import { SAMPLE_CONVERSATIONS } from "@/lib/data/sampleConversations";
import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { WelcomeState } from "@/components/chat/WelcomeState";
import { MessageBubble } from "@/components/chat/MessageBubble";
import { ChatComposer } from "@/components/chat/ChatComposer";
import { AnalysisSettingsModal } from "@/components/chat/AnalysisSettingsModal";

export default function HomePage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(SAMPLE_CONVERSATIONS);
  const [activeConversationId, setActiveConversationId] = useState<string | null>("conv-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState<AnalysisSettings>({
    responseLanguage: "id",
    experienceLevel: "intermediate",
    programmingLanguage: "typescript",
    analysisFocus: "error",
  });

  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  const handleNewChat = () => {
    setActiveConversationId(null);
    setPrompt("");
  };

  const handleSelectSuggestion = (suggestion: SuggestionCard) => {
    if (suggestion.sampleConversationId) {
      setActiveConversationId(suggestion.sampleConversationId);
    } else {
      setPrompt(suggestion.prompt);
    }
  };

  const handleSubmitMessage = (text: string) => {
    if (!text.trim()) return;

    const currentTime = new Date().toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
    });

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: "user",
      content: text,
      timestamp: currentTime,
    };

    setIsLoading(true);
    setPrompt("");

    // Respons simulasi mode demo yang transparan
    setTimeout(() => {
      const demoAssistantReply: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: "assistant",
        isSample: true,
        timestamp: currentTime,
        content: `Pertanyaan teknis Anda telah diterima dalam sesi aktif:

> **Catatan Mode Pratinjau:** Integrasi langsung dengan **Google Gemini API (@google/genai)** akan dihubungkan pada **Tahap 3**. Contoh struktur penjelasan error dan blok solusi kode dapat dilihat pada contoh kasus di bilah samping.`,
      };

      if (activeConversationId) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === activeConversationId
              ? {
                  ...c,
                  messages: [...c.messages, userMessage, demoAssistantReply],
                  updatedAt: "Baru saja",
                }
              : c
          )
        );
      } else {
        const newConvId = `conv-${Date.now()}`;
        const newConversation: ChatConversation = {
          id: newConvId,
          title: text.slice(0, 32) + (text.length > 32 ? "..." : ""),
          updatedAt: "Baru saja",
          preview: text.slice(0, 48) + "...",
          category: "today",
          messages: [userMessage, demoAssistantReply],
        };
        setConversations((prev) => [newConversation, ...prev]);
        setActiveConversationId(newConvId);
      }

      setIsLoading(false);
    }, 450);
  };

  const handleResetToDefault = () => {
    setConversations(SAMPLE_CONVERSATIONS);
    setActiveConversationId("conv-1");
    setPrompt("");
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-white font-sans text-zinc-900 antialiased">
      {/* Sidebar Navigasi Kiri */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={setActiveConversationId}
        onNewChat={handleNewChat}
        onResetToDefault={handleResetToDefault}
        onOpenSettings={() => setIsSettingsOpen(true)}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full min-w-0 bg-white overflow-hidden">
        {/* Header */}
        <Header
          conversationTitle={activeConversation ? activeConversation.title : "Percakapan Baru"}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onNewChat={handleNewChat}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        {/* Chat / Welcome Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto px-4 py-5 md:px-8">
          {activeConversation ? (
            <div className="max-w-3xl mx-auto space-y-4">
              {/* Context header */}
              <div className="pb-3 border-b border-zinc-100 flex items-center justify-between text-xs text-zinc-500">
                <span className="font-medium text-zinc-700">{activeConversation.title}</span>
                <span className="text-[11px] text-zinc-400">{activeConversation.updatedAt}</span>
              </div>

              {/* Message List */}
              {activeConversation.messages.map((message) => (
                <MessageBubble key={message.id} message={message} />
              ))}
            </div>
          ) : (
            <WelcomeState onSelectSuggestion={handleSelectSuggestion} />
          )}
        </main>

        {/* Bottom Composer */}
        <footer className="pt-2 bg-white">
          <ChatComposer
            prompt={prompt}
            onPromptChange={setPrompt}
            onSubmit={handleSubmitMessage}
            onOpenSettings={() => setIsSettingsOpen(true)}
            isLoading={isLoading}
          />
        </footer>
      </div>

      {/* Modal Pengaturan Analisis */}
      <AnalysisSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        onSave={setSettings}
      />
    </div>
  );
}

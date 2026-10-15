"use client";

/**
 * src/app/page.tsx
 * Halaman utama DevMate AI — AI Coding Assistant.
 * Mengintegrasikan Sidebar, Header, Area Percakapan (Welcome State & Message List),
 * Bilah Pengaturan Analisis, dan Composer interaktif.
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
import { Icon } from "@/components/ui/Icon";

export default function HomePage() {
  const [conversations, setConversations] = useState<ChatConversation[]>(SAMPLE_CONVERSATIONS);
  // Default menampilkan percakapan aktif pertama agar siap untuk screenshot seketika
  const [activeConversationId, setActiveConversationId] = useState<string | null>("conv-1");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [demoNotice, setDemoNotice] = useState<string | null>(null);

  const [settings, setSettings] = useState<AnalysisSettings>({
    responseLanguage: "id",
    experienceLevel: "intermediate",
    programmingLanguage: "typescript",
    analysisFocus: "error",
  });

  // Cari percakapan yang sedang aktif
  const activeConversation = conversations.find((c) => c.id === activeConversationId);

  // Handler: Mulai percakapan baru (kembali ke Welcome State)
  const handleNewChat = () => {
    setActiveConversationId(null);
    setPrompt("");
    setDemoNotice(null);
  };

  // Handler: Memilih saran dari Welcome State
  const handleSelectSuggestion = (suggestion: SuggestionCard) => {
    if (suggestion.sampleConversationId) {
      setActiveConversationId(suggestion.sampleConversationId);
      setDemoNotice(null);
    } else {
      setPrompt(suggestion.prompt);
    }
  };

  // Handler: Kirim pesan
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

    // Simulasi respons interaktif lokal tanpa backend eksternal (transparan mode demo)
    setTimeout(() => {
      const demoAssistantReply: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        role: "assistant",
        isSample: true,
        timestamp: currentTime,
        content: `Pertanyaan Anda: **"${text}"** telah tercatat dalam sesi aktif.

> [!NOTE]
> **Mode Pratinjau UI Aktif:** Integrasi langsung dengan **Google Gemini API (@google/genai)** akan dihubungkan pada **Tahap 3** sesuai blueprint implementasi.
> Anda dapat melihat contoh format respons terstruktur lengkap pada contoh percakapan di bilah samping (*sidebar*).`,
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
        // Buat percakapan baru di sidebar jika dikirim dari Welcome State
        const newConvId = `conv-${Date.now()}`;
        const newConversation: ChatConversation = {
          id: newConvId,
          title: text.slice(0, 35) + (text.length > 35 ? "..." : ""),
          updatedAt: "Baru saja",
          preview: text.slice(0, 50) + "...",
          category: "today",
          messages: [userMessage, demoAssistantReply],
        };
        setConversations((prev) => [newConversation, ...prev]);
        setActiveConversationId(newConvId);
      }

      setIsLoading(false);
      setDemoNotice(
        "Pesan demo berhasil ditambahkan ke percakapan. Koneksi live Gemini API dijadwalkan pada Tahap 3."
      );
    }, 600);
  };

  const handleResetToDefault = () => {
    setConversations(SAMPLE_CONVERSATIONS);
    setActiveConversationId("conv-1");
    setPrompt("");
    setDemoNotice(null);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-zinc-100 font-sans text-zinc-900 antialiased">
      {/* Sidebar Navigasi Kiri */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        conversations={conversations}
        activeConversationId={activeConversationId}
        onSelectConversation={(id) => {
          setActiveConversationId(id);
          setDemoNotice(null);
        }}
        onNewChat={handleNewChat}
        onResetToDefault={handleResetToDefault}
      />

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 h-full min-w-0 bg-white overflow-hidden">
        {/* Header */}
        <Header
          conversationTitle={activeConversation ? activeConversation.title : "Percakapan Baru"}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          onNewChat={handleNewChat}
        />

        {/* Demo Notice Banner (bila ada) */}
        {demoNotice ? (
          <div className="bg-blue-50/90 border-b border-blue-200/80 px-4 py-2 flex items-center justify-between text-xs text-blue-800 animate-in fade-in duration-150">
            <div className="flex items-center gap-2">
              <Icon name="info" size={14} className="text-blue-600 shrink-0" />
              <span>{demoNotice}</span>
            </div>
            <button
              onClick={() => setDemoNotice(null)}
              className="text-blue-600 hover:text-blue-900 font-semibold px-1 rounded cursor-pointer"
            >
              ✕
            </button>
          </div>
        ) : null}

        {/* Chat / Welcome Area (Scrollable) */}
        <main className="flex-1 overflow-y-auto px-4 py-6 md:px-8">
          {activeConversation ? (
            <div className="max-w-4xl mx-auto space-y-6">
              {/* Context bar header */}
              <div className="text-center pb-4 mb-2 border-b border-zinc-100">
                <span className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Sesi Percakapan Aktif
                </span>
                <h2 className="text-base font-bold text-zinc-800 mt-0.5">
                  {activeConversation.title}
                </h2>
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
        <footer className="bg-gradient-to-t from-white via-white to-transparent pt-2">
          <ChatComposer
            prompt={prompt}
            onPromptChange={setPrompt}
            onSubmit={handleSubmitMessage}
            settings={settings}
            onSettingsChange={setSettings}
            isLoading={isLoading}
          />
        </footer>
      </div>
    </div>
  );
}

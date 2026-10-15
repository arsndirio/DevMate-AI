/**
 * src/types/chat.ts
 * Type definitions untuk domain chat, percakapan, dan pengaturan analisis DevMate AI.
 */

export type MessageRole = "user" | "assistant";

export interface CodeSnippet {
  language: string;
  code: string;
  filename?: string;
}

export interface ChatMessage {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: string;
  codeSnippet?: CodeSnippet;
  isSample?: boolean;
}

export type ConversationCategory = "today" | "yesterday" | "earlier";

export interface ChatConversation {
  id: string;
  title: string;
  updatedAt: string;
  preview: string;
  category: ConversationCategory;
  messages: ChatMessage[];
}

export type ResponseLanguage = "id" | "en";
export type ExperienceLevel = "beginner" | "intermediate" | "senior";
export type ProgrammingLanguage = "auto" | "typescript" | "javascript" | "python" | "go" | "php";
export type AnalysisFocus = "error" | "review" | "optimize" | "refactor";

export interface AnalysisSettings {
  responseLanguage: ResponseLanguage;
  experienceLevel: ExperienceLevel;
  programmingLanguage: ProgrammingLanguage;
  analysisFocus: AnalysisFocus;
}

export interface SuggestionCard {
  id: string;
  title: string;
  description: string;
  prompt: string;
  category: AnalysisFocus;
  sampleConversationId?: string;
}

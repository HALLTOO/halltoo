import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Message } from 'ai/react';

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}

interface ChatStore {
  sessions: ChatSession[];
  currentSessionId: string | null;
  
  // Actions
  createSession: () => string;
  deleteSession: (id: string) => void;
  setCurrentSession: (id: string) => void;
  updateSessionMessages: (id: string, messages: Message[]) => void;
  updateSessionTitle: (id: string, title: string) => void;
  getCurrentSession: () => ChatSession | null;
  clearAllSessions: () => void;
}

export const useChatStore = create<ChatStore>()(
  persist(
    (set, get) => ({
      sessions: [],
      currentSessionId: null,

      createSession: () => {
        const newSession: ChatSession = {
          id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          title: '新对话',
          messages: [],
          createdAt: Date.now(),
          updatedAt: Date.now(),
        };

        set((state) => ({
          sessions: [newSession, ...state.sessions],
          currentSessionId: newSession.id,
        }));

        return newSession.id;
      },

      deleteSession: (id: string) => {
        set((state) => {
          const newSessions = state.sessions.filter((s) => s.id !== id);
          const newCurrentId =
            state.currentSessionId === id
              ? newSessions[0]?.id || null
              : state.currentSessionId;

          return {
            sessions: newSessions,
            currentSessionId: newCurrentId,
          };
        });
      },

      setCurrentSession: (id: string) => {
        set({ currentSessionId: id });
      },

      updateSessionMessages: (id: string, messages: Message[]) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id
              ? {
                  ...session,
                  messages,
                  updatedAt: Date.now(),
                  // Auto-generate title from first user message
                  title:
                    session.title === '新对话' && messages.length > 0
                      ? messages[0].content.slice(0, 30) + (messages[0].content.length > 30 ? '...' : '')
                      : session.title,
                }
              : session
          ),
        }));
      },

      updateSessionTitle: (id: string, title: string) => {
        set((state) => ({
          sessions: state.sessions.map((session) =>
            session.id === id ? { ...session, title } : session
          ),
        }));
      },

      getCurrentSession: () => {
        const state = get();
        return state.sessions.find((s) => s.id === state.currentSessionId) || null;
      },

      clearAllSessions: () => {
        set({ sessions: [], currentSessionId: null });
      },
    }),
    {
      name: 'chat-history-storage',
    }
  )
);

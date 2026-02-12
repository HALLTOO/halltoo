import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = 'system' | 'light' | 'dark';
export type ModelProvider = 'openai' | 'anthropic' | 'deepseek';

interface SettingsStore {
  // Appearance
  theme: Theme;
  
  // Model Configuration
  provider: ModelProvider;
  model: string;
  temperature: number;
  systemPrompt: string;
  
  // API Keys (stored locally, never sent to server except for inference)
  apiKeys: {
    openai: string;
    anthropic: string;
    deepseek: string;
  };
  
  // Actions
  setTheme: (theme: Theme) => void;
  setProvider: (provider: ModelProvider) => void;
  setModel: (model: string) => void;
  setTemperature: (temperature: number) => void;
  setSystemPrompt: (prompt: string) => void;
  setApiKey: (provider: ModelProvider, key: string) => void;
  resetSettings: () => void;
}

const defaultSettings = {
  theme: 'system' as Theme,
  provider: 'deepseek' as ModelProvider,
  model: 'deepseek-chat',
  temperature: 0.7,
  systemPrompt: '你是 Halltoo，一个由 Halltoo 开发的智能 AI 助手。你的回答必须专业、简洁且富有洞察力。',
  apiKeys: {
    openai: '',
    anthropic: '',
    deepseek: '',
  },
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      ...defaultSettings,

      setTheme: (theme) => set({ theme }),
      
      setProvider: (provider) => {
        const modelMap: Record<ModelProvider, string> = {
          openai: 'gpt-4o',
          anthropic: 'claude-3-5-sonnet-20241022',
          deepseek: 'deepseek-chat',
        };
        set({ provider, model: modelMap[provider] });
      },
      
      setModel: (model) => set({ model }),
      
      setTemperature: (temperature) => set({ temperature }),
      
      setSystemPrompt: (systemPrompt) => set({ systemPrompt }),
      
      setApiKey: (provider, key) =>
        set((state) => ({
          apiKeys: {
            ...state.apiKeys,
            [provider]: key,
          },
        })),
      
      resetSettings: () => set(defaultSettings),
    }),
    {
      name: 'settings-storage',
    }
  )
);

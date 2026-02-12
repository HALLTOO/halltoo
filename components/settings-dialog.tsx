"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Sun, Moon, Monitor, Key } from "lucide-react";
import { useSettingsStore, Theme, ModelProvider } from "@/store/settings-store";
import { useState } from "react";

interface SettingsDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SettingsDialog({ isOpen, onClose }: SettingsDialogProps) {
  const {
    theme,
    provider,
    model,
    temperature,
    systemPrompt,
    apiKeys,
    setTheme,
    setProvider,
    setTemperature,
    setSystemPrompt,
    setApiKey,
    resetSettings,
  } = useSettingsStore();

  const [showApiKeys, setShowApiKeys] = useState(false);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
  };

  const handleProviderChange = (newProvider: ModelProvider) => {
    setProvider(newProvider);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[100]"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-2xl glass-strong shadow-apple-lg z-[101]"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-200/50 px-6 py-4">
              <h2 className="text-xl font-semibold text-gray-900 tracking-tight">
                设置
              </h2>
              <motion.button
                onClick={onClose}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 transition-colors btn-press"
              >
                <X className="h-5 w-5" />
              </motion.button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto max-h-[calc(90vh-80px)] p-6 space-y-6">
              {/* Appearance */}
              <section>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 tracking-tight">
                  外观
                </h3>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { value: 'system' as Theme, label: '跟随系统', icon: Monitor },
                    { value: 'light' as Theme, label: '浅色', icon: Sun },
                    { value: 'dark' as Theme, label: '深色', icon: Moon },
                  ].map(({ value, label, icon: Icon }) => (
                    <motion.button
                      key={value}
                      onClick={() => handleThemeChange(value)}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex flex-col items-center gap-2 rounded-xl border-2 px-4 py-3 transition-all ${
                        theme === value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                    >
                      <Icon className={`h-5 w-5 ${theme === value ? 'text-blue-600' : 'text-gray-600'}`} />
                      <span className={`text-sm font-medium tracking-tight ${theme === value ? 'text-blue-900' : 'text-gray-700'}`}>
                        {label}
                      </span>
                    </motion.button>
                  ))}
                </div>
              </section>

              {/* Model Configuration */}
              <section>
                <h3 className="text-sm font-semibold text-gray-900 mb-3 tracking-tight">
                  模型配置
                </h3>
                
                {/* Provider Selection */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                    AI 提供商
                  </label>
                  <select
                    value={provider}
                    onChange={(e) => handleProviderChange(e.target.value as ModelProvider)}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all tracking-tight"
                  >
                    <option value="deepseek">DeepSeek</option>
                    <option value="openai">OpenAI</option>
                    <option value="anthropic">Anthropic (Claude)</option>
                  </select>
                </div>

                {/* Temperature Slider */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                    温度 (Temperature): {temperature.toFixed(1)}
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={temperature}
                    onChange={(e) => setTemperature(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1 tracking-tight">
                    <span>精确</span>
                    <span>平衡</span>
                    <span>创造</span>
                  </div>
                </div>

                {/* System Prompt */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                    系统提示词
                  </label>
                  <textarea
                    value={systemPrompt}
                    onChange={(e) => setSystemPrompt(e.target.value)}
                    rows={4}
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none tracking-tight"
                    placeholder="输入系统提示词..."
                  />
                </div>
              </section>

              {/* API Keys */}
              <section>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-sm font-semibold text-gray-900 tracking-tight">
                    API 密钥
                  </h3>
                  <motion.button
                    onClick={() => setShowApiKeys(!showApiKeys)}
                    whileTap={{ scale: 0.95 }}
                    className="text-xs text-blue-600 hover:text-blue-700 font-medium tracking-tight"
                  >
                    {showApiKeys ? '隐藏' : '显示'}
                  </motion.button>
                </div>
                
                <AnimatePresence>
                  {showApiKeys && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="space-y-3 overflow-hidden"
                    >
                      {[
                        { key: 'openai' as ModelProvider, label: 'OpenAI API Key' },
                        { key: 'anthropic' as ModelProvider, label: 'Anthropic API Key' },
                        { key: 'deepseek' as ModelProvider, label: 'DeepSeek API Key' },
                      ].map(({ key, label }) => (
                        <div key={key}>
                          <label className="block text-sm font-medium text-gray-700 mb-2 tracking-tight">
                            {label}
                          </label>
                          <div className="relative">
                            <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <input
                              type="password"
                              value={apiKeys[key]}
                              onChange={(e) => setApiKey(key, e.target.value)}
                              placeholder={`输入 ${label}`}
                              className="w-full rounded-lg border border-gray-300 bg-white pl-10 pr-4 py-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all tracking-tight"
                            />
                          </div>
                        </div>
                      ))}
                      <p className="text-xs text-gray-500 tracking-tight">
                        💡 API 密钥仅存储在浏览器本地，不会上传到服务器
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </section>

              {/* Reset Button */}
              <section className="pt-4 border-t border-gray-200/50">
                <motion.button
                  onClick={() => {
                    if (confirm('确定要重置所有设置吗？')) {
                      resetSettings();
                    }
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors btn-press tracking-tight"
                >
                  重置所有设置
                </motion.button>
              </section>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

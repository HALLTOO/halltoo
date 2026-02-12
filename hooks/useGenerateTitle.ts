import { useState } from 'react';

export function useGenerateTitle() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateTitle = async (prompt: string): Promise<string> => {
    if (!prompt || prompt.trim().length === 0) {
      return '新对话';
    }

    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-title', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate title');
      }

      const data = await response.json();
      return data.title || '新对话';
    } catch (error) {
      console.error('Error generating title:', error);
      // Fallback: use first 30 chars of prompt
      return prompt.slice(0, 30) + (prompt.length > 30 ? '...' : '');
    } finally {
      setIsGenerating(false);
    }
  };

  return { generateTitle, isGenerating };
}

import { useState, useEffect } from 'react';

interface ParsedContent {
  thinking: string;
  content: string;
  isThinking: boolean;
}

export function useStreamParser(rawContent: string, isStreaming: boolean): ParsedContent {
  const [parsed, setParsed] = useState<ParsedContent>({
    thinking: '',
    content: '',
    isThinking: false,
  });

  useEffect(() => {
    // State machine for parsing
    const thinkingStartTag = '<thinking>';
    const thinkingEndTag = '</thinking>';

    const startIndex = rawContent.indexOf(thinkingStartTag);
    const endIndex = rawContent.indexOf(thinkingEndTag);

    if (startIndex === -1) {
      // No thinking tags, treat everything as content
      setParsed({
        thinking: '',
        content: rawContent,
        isThinking: false,
      });
      return;
    }

    if (endIndex === -1) {
      // Thinking tag opened but not closed yet
      const thinkingContent = rawContent.substring(startIndex + thinkingStartTag.length);
      setParsed({
        thinking: thinkingContent.trim(),
        content: '',
        isThinking: isStreaming,
      });
      return;
    }

    // Both tags present
    const thinkingContent = rawContent.substring(
      startIndex + thinkingStartTag.length,
      endIndex
    );
    const mainContent = rawContent.substring(endIndex + thinkingEndTag.length);

    setParsed({
      thinking: thinkingContent.trim(),
      content: mainContent.trim(),
      isThinking: false,
    });
  }, [rawContent, isStreaming]);

  return parsed;
}

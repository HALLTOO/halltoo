"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Brain } from "lucide-react";

interface ThoughtProcessProps {
  thought: string;
  isStreaming?: boolean;
}

export function ThoughtProcess({ thought, isStreaming = false }: ThoughtProcessProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!thought) return null;

  return (
    <div className="mb-4">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex w-full items-center gap-2 rounded-lg bg-gray-50 px-4 py-2 text-left text-sm transition-all hover:bg-gray-100"
      >
        <div className="flex items-center gap-2 flex-1">
          <Brain className={`h-4 w-4 text-purple-500 ${isStreaming ? "animate-pulse" : ""}`} />
          <span className="font-medium text-gray-700">
            {isStreaming ? "思考中..." : "思考过程"}
          </span>
        </div>
        {isExpanded ? (
          <ChevronUp className="h-4 w-4 text-gray-500" />
        ) : (
          <ChevronDown className="h-4 w-4 text-gray-500" />
        )}
      </button>

      {isExpanded && (
        <div className="mt-2 rounded-lg border border-gray-200 bg-gray-50/50 p-4">
          <pre className="whitespace-pre-wrap font-mono text-xs text-gray-600 leading-relaxed">
            {thought}
          </pre>
        </div>
      )}
    </div>
  );
}

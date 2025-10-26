"use client";

import { useState } from "react";

interface ImprovedPrompt {
  version: string;
  prompt: string;
  improvements: string[];
  explanation: string;
}

interface ImprovedPromptsProps {
  improvedPrompts: ImprovedPrompt[];
}

export function ImprovedPrompts({ improvedPrompts }: ImprovedPromptsProps) {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const getVersionColor = (index: number) => {
    const colors = [
      "border-blue-500 bg-blue-50 dark:bg-blue-900/20",
      "border-green-500 bg-green-50 dark:bg-green-900/20",
      "border-purple-500 bg-purple-50 dark:bg-purple-900/20",
    ];
    return colors[index] || colors[0];
  };

  const getVersionBadgeColor = (index: number) => {
    const colors = [
      "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    ];
    return colors[index] || colors[0];
  };

  if (!improvedPrompts || improvedPrompts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Improved Prompt Samples
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Here are 3 progressively improved versions of your prompt, each addressing different weaknesses
          identified in the evaluation.
        </p>
      </div>

      <div className="space-y-6">
        {improvedPrompts.map((sample, index) => (
          <div
            key={index}
            className={`border-l-4 rounded-lg p-6 ${getVersionColor(index)}`}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <span className={`inline-block px-3 py-1 rounded-full text-sm font-semibold mb-2 ${getVersionBadgeColor(index)}`}>
                  {sample.version}
                </span>
                <p className="text-gray-700 dark:text-gray-300 mt-2">
                  {sample.explanation}
                </p>
              </div>
            </div>

            {/* Improvements Applied */}
            {sample.improvements && sample.improvements.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm">
                  Improvements Applied:
                </h4>
                <ul className="space-y-1">
                  {sample.improvements.map((improvement, i) => (
                    <li key={i} className="flex items-start text-sm">
                      <span className="text-indigo-600 dark:text-indigo-400 mr-2">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Improved Prompt */}
            <div className="relative">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                  Improved Prompt:
                </h4>
                <button
                  onClick={() => copyToClipboard(sample.prompt, index)}
                  className="text-sm px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded transition-colors duration-200"
                >
                  {copiedIndex === index ? "Copied!" : "Copy"}
                </button>
              </div>
              <div className="bg-white dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-700">
                <pre className="whitespace-pre-wrap font-mono text-sm text-gray-800 dark:text-gray-200 overflow-x-auto">
                  {sample.prompt}
                </pre>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg border border-indigo-200 dark:border-indigo-800">
        <h4 className="font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
          How to Use These Samples:
        </h4>
        <ul className="space-y-1 text-sm text-indigo-800 dark:text-indigo-100">
          <li className="flex items-start">
            <span className="mr-2">1.</span>
            <span>Review each version and understand what improvements were made</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">2.</span>
            <span>Choose the version that best fits your needs (Version 3 is most comprehensive)</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">3.</span>
            <span>Click "Copy" to use the improved prompt in your AI applications</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">4.</span>
            <span>Adapt and customize the prompt further for your specific use case</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

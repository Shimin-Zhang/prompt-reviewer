"use client";

import { useState } from "react";
import { EvaluationResult } from "./components/EvaluationResult";
import { ImprovedPrompts } from "./components/ImprovedPrompts";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [evaluation, setEvaluation] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleEvaluate = async () => {
    if (!prompt.trim()) {
      setError("Please enter a prompt to evaluate");
      return;
    }

    setLoading(true);
    setError("");
    setEvaluation(null);

    try {
      const response = await fetch("/api/evaluate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to evaluate prompt");
      }

      const data = await response.json();
      setEvaluation(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Prompt Reviewer
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Evaluate and improve your AI prompts using a comprehensive 8-dimension scoring rubric
          </p>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8 mb-8">
          <div className="mb-6">
            <label
              htmlFor="prompt"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
              Enter your prompt to evaluate
            </label>
            <textarea
              id="prompt"
              rows={10}
              className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-y"
              placeholder="Paste your AI prompt here..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}

          <button
            onClick={handleEvaluate}
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
          >
            {loading ? "Evaluating..." : "Evaluate Prompt"}
          </button>
        </div>

        {evaluation && (
          <div className="space-y-8">
            <EvaluationResult evaluation={evaluation} />
            {evaluation.improvedPrompts && (
              <ImprovedPrompts improvedPrompts={evaluation.improvedPrompts} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}

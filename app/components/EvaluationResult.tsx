interface Dimension {
  name: string;
  score: number;
  maxScore: number;
  feedback: string;
  improvements: string[];
}

interface EvaluationData {
  totalScore: number;
  maxScore: number;
  rating: string;
  dimensions: Dimension[];
  overallFeedback: string;
  priorityImprovements: string[];
}

interface EvaluationResultProps {
  evaluation: EvaluationData;
}

export function EvaluationResult({ evaluation }: EvaluationResultProps) {
  const getScoreColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "text-green-600 dark:text-green-400";
    if (percentage >= 75) return "text-blue-600 dark:text-blue-400";
    if (percentage >= 60) return "text-yellow-600 dark:text-yellow-400";
    if (percentage >= 45) return "text-orange-600 dark:text-orange-400";
    return "text-red-600 dark:text-red-400";
  };

  const getRatingBadgeColor = (rating: string) => {
    if (rating.includes("Excellent")) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
    if (rating.includes("Good")) return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
    if (rating.includes("Adequate")) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
    if (rating.includes("Weak")) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
    return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
  };

  const getProgressBarColor = (score: number, maxScore: number) => {
    const percentage = (score / maxScore) * 100;
    if (percentage >= 90) return "bg-green-500";
    if (percentage >= 75) return "bg-blue-500";
    if (percentage >= 60) return "bg-yellow-500";
    if (percentage >= 45) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-8">
      {/* Overall Score */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Overall Score
          </h2>
          <div className={`text-6xl font-bold mb-4 ${getScoreColor(evaluation.totalScore, evaluation.maxScore)}`}>
            {evaluation.totalScore}/{evaluation.maxScore}
          </div>
          <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${getRatingBadgeColor(evaluation.rating)}`}>
            {evaluation.rating}
          </span>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300">{evaluation.overallFeedback}</p>
        </div>
      </div>

      {/* Priority Improvements */}
      {evaluation.priorityImprovements && evaluation.priorityImprovements.length > 0 && (
        <div className="bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-500 rounded-lg shadow-lg p-6">
          <h3 className="text-xl font-bold text-amber-900 dark:text-amber-200 mb-4">
            Priority Improvements
          </h3>
          <ul className="space-y-2">
            {evaluation.priorityImprovements.map((improvement, index) => (
              <li key={index} className="flex items-start">
                <span className="text-amber-600 dark:text-amber-400 mr-2">•</span>
                <span className="text-amber-800 dark:text-amber-100">{improvement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dimension Scores */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
          Dimension Breakdown
        </h2>
        <div className="space-y-6">
          {evaluation.dimensions.map((dimension, index) => (
            <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-b-0">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {dimension.name}
                </h3>
                <span className={`text-xl font-bold ${getScoreColor(dimension.score, dimension.maxScore)}`}>
                  {dimension.score}/{dimension.maxScore}
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-4">
                <div
                  className={`h-2.5 rounded-full ${getProgressBarColor(dimension.score, dimension.maxScore)}`}
                  style={{ width: `${(dimension.score / dimension.maxScore) * 100}%` }}
                ></div>
              </div>

              <p className="text-gray-700 dark:text-gray-300 mb-4">{dimension.feedback}</p>

              {dimension.improvements && dimension.improvements.length > 0 && (
                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    How to Improve:
                  </h4>
                  <ul className="space-y-2">
                    {dimension.improvements.map((improvement, i) => (
                      <li key={i} className="flex items-start">
                        <span className="text-indigo-600 dark:text-indigo-400 mr-2">→</span>
                        <span className="text-gray-700 dark:text-gray-300">{improvement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";

const EVALUATION_RUBRIC = `You are an expert prompt engineer evaluating AI prompts using a comprehensive 8-dimension scoring rubric.

Your task is to evaluate the provided prompt and return a structured JSON response with scores, feedback, and improvement suggestions.

## Scoring Framework (Total: 100 points)

### Dimension 1: Clarity and Specificity (20 points)
- Exceptional (18-20): Zero ambiguous terms; specific quantified constraints; all technical terms defined
- Strong (14-17): Minimal ambiguity; mostly specific with some quantified constraints
- Adequate (10-13): Some ambiguous phrasing; mix of specific and vague instructions
- Weak (6-9): Significant ambiguity in key instructions; mostly vague
- Poor (0-5): Highly ambiguous; no specific constraints

### Dimension 2: Structure and Organization (15 points)
- Exceptional (14-15): Logical hierarchical organization; consistent separators; clear sections
- Strong (11-13): Good organization; regular separators
- Adequate (8-10): Basic organization; some separators
- Weak (5-7): Poor organization; minimal separators
- Poor (0-4): No clear organization; wall of text

### Dimension 3: Context and Background (10 points)
- Exceptional (9-10): All necessary context; appropriate depth; relevant background
- Strong (7-8): Most necessary context included
- Adequate (5-6): Basic context provided
- Weak (3-4): Minimal context; key background missing
- Poor (0-2): No meaningful context

### Dimension 4: Examples and Demonstrations (10 points, or N/A)
- Exceptional (9-10): 2-8 highly relevant examples; perfect format consistency
- Strong (7-8): 2-8 relevant examples; good format consistency
- Adequate (5-6): 1-2 examples; some format inconsistency
- Weak (3-4): Single poor example or excessive examples
- Poor (0-2): No examples when clearly needed

### Dimension 5: Task Decomposition (10 points)
- Exceptional (9-10): Complex tasks broken into optimal subtasks; clear dependencies
- Strong (7-8): Good task breakdown; dependencies mostly clear
- Adequate (5-6): Basic task breakdown
- Weak (3-4): Poor task breakdown; still too complex
- Poor (0-2): No task breakdown; overwhelming complexity

### Dimension 6: Output Format Specification (10 points)
- Exceptional (9-10): Explicit format requirements; structure fully specified
- Strong (7-8): Clear format requirements; structure well specified
- Adequate (5-6): Basic format indication
- Weak (3-4): Unclear format requirements
- Poor (0-2): No format specification

### Dimension 7: Instruction Effectiveness (15 points)
- Exceptional (14-15): Optimal technique selection; CoT when needed; positive framing
- Strong (11-13): Good technique selection; mostly positive framing
- Adequate (8-10): Acceptable technique selection
- Weak (5-7): Suboptimal technique selection
- Poor (0-4): Wrong technique for task

### Dimension 8: Safety and Robustness (10 points)
- Exceptional (9-10): Explicit error handling; uncertainty handling defined
- Strong (7-8): Good error handling; uncertainty handling present
- Adequate (5-6): Basic error handling
- Weak (3-4): Minimal error handling
- Poor (0-2): No error handling

## Response Format

You must respond with a valid JSON object following this exact structure:

{
  "totalScore": <number>,
  "maxScore": 100,
  "rating": "<rating string>",
  "overallFeedback": "<2-3 sentence summary>",
  "priorityImprovements": ["<improvement 1>", "<improvement 2>", ...],
  "dimensions": [
    {
      "name": "Clarity and Specificity",
      "score": <number>,
      "maxScore": 20,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", "<specific improvement 2>", ...]
    },
    {
      "name": "Structure and Organization",
      "score": <number>,
      "maxScore": 15,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", ...]
    },
    {
      "name": "Context and Background",
      "score": <number>,
      "maxScore": 10,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", ...]
    },
    {
      "name": "Examples and Demonstrations",
      "score": <number>,
      "maxScore": 10,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", ...]
    },
    {
      "name": "Task Decomposition and Complexity Management",
      "score": <number>,
      "maxScore": 10,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", ...]
    },
    {
      "name": "Output Format Specification",
      "score": <number>,
      "maxScore": 10,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", ...]
    },
    {
      "name": "Instruction Effectiveness and Technique Selection",
      "score": <number>,
      "maxScore": 15,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", ...]
    },
    {
      "name": "Safety, Robustness, and Error Handling",
      "score": <number>,
      "maxScore": 10,
      "feedback": "<1-2 sentence assessment>",
      "improvements": ["<specific improvement 1>", ...]
    }
  ],
  "improvedPrompts": [
    {
      "version": "Version 1: <brief title>",
      "prompt": "<the complete improved prompt text>",
      "improvements": ["<specific improvement applied>", "<another improvement applied>", ...],
      "explanation": "<2-3 sentences explaining why this version is better, referencing specific rubric dimensions and scores it would improve>"
    },
    {
      "version": "Version 2: <brief title>",
      "prompt": "<the complete improved prompt text>",
      "improvements": ["<specific improvement applied>", "<another improvement applied>", ...],
      "explanation": "<2-3 sentences explaining why this version is better, referencing specific rubric dimensions and scores it would improve>"
    },
    {
      "version": "Version 3: <brief title>",
      "prompt": "<the complete improved prompt text>",
      "improvements": ["<specific improvement applied>", "<another improvement applied>", ...],
      "explanation": "<2-3 sentences explaining why this version is better, referencing specific rubric dimensions and scores it would improve>"
    }
  ]
}

Rating ranges:
- 90-100: "Excellent - Ready for production with minor refinements"
- 75-89: "Good - Needs targeted improvements in specific areas"
- 60-74: "Adequate - Requires substantial enhancement"
- 45-59: "Weak - Needs significant restructuring"
- Below 45: "Poor - Requires complete redesign"

## Improved Prompt Samples

You must provide 3 improved versions of the original prompt. Each version should:
1. Address different priority weaknesses identified in your evaluation
2. Demonstrate specific improvements based on the rubric dimensions
3. Show progressive enhancement (Version 1: basic fixes, Version 2: intermediate, Version 3: advanced)
4. Be complete, working prompts that could be used immediately
5. Include clear explanations referencing specific rubric criteria

Guidelines for each version:
- Version 1: Focus on the 2-3 most critical issues (usually Clarity, Structure, or Output Format)
- Version 2: Build on Version 1 by adding Context, Examples, or Task Decomposition improvements
- Version 3: Advanced version incorporating Instruction Effectiveness, Safety, and all best practices

Important:
1. Be specific and actionable in your feedback
2. Provide concrete improvement suggestions, not vague advice
3. Consider the task type when evaluating
4. Ensure scores align with the criteria
5. Make improved prompts substantially better, not just slightly tweaked
6. Return ONLY the JSON object, no additional text`;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt || typeof prompt !== "string") {
      return NextResponse.json(
        { error: "Invalid prompt provided" },
        { status: 400 }
      );
    }

    const apiKey = process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured" },
        { status: 500 }
      );
    }

    const anthropic = new Anthropic({
      apiKey: apiKey,
    });

    const message = await anthropic.messages.create({
      model: "claude-3-5-sonnet-20241022",
      max_tokens: 8000,
      messages: [
        {
          role: "user",
          content: `${EVALUATION_RUBRIC}\n\nNow evaluate this prompt:\n\n${prompt}`,
        },
      ],
    });

    const responseText = message.content[0].type === "text" ? message.content[0].text : "";

    // Extract JSON from the response
    let evaluation;
    try {
      // Try to parse the response directly
      evaluation = JSON.parse(responseText);
    } catch {
      // If that fails, try to extract JSON from markdown code blocks
      const jsonMatch = responseText.match(/```(?:json)?\n?([\s\S]*?)\n?```/);
      if (jsonMatch) {
        evaluation = JSON.parse(jsonMatch[1]);
      } else {
        throw new Error("Failed to parse evaluation response");
      }
    }

    return NextResponse.json(evaluation);
  } catch (error) {
    console.error("Evaluation error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to evaluate prompt" },
      { status: 500 }
    );
  }
}

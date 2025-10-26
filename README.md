# Prompt Reviewer

An AI-powered tool for evaluating and improving your prompts using a comprehensive 8-dimension scoring rubric. Get detailed feedback on your prompts with specific, actionable suggestions for improvement.

## Features

- **Comprehensive Evaluation**: 8-dimension scoring rubric covering all aspects of prompt quality
- **Detailed Feedback**: Get specific scores and feedback for each dimension
- **Actionable Suggestions**: Receive concrete improvement recommendations
- **3 Improved Prompt Samples**: Get progressively enhanced versions of your prompt with explanations
- **Copy-to-Clipboard**: Easily copy improved prompts to use in your AI applications
- **Beautiful UI**: Clean, modern interface with dark mode support
- **Real-time Analysis**: Powered by Claude 3.5 Sonnet for accurate evaluations

## Scoring Dimensions

1. **Clarity and Specificity** (20 points)
2. **Structure and Organization** (15 points)
3. **Context and Background** (10 points)
4. **Examples and Demonstrations** (10 points)
5. **Task Decomposition** (10 points)
6. **Output Format Specification** (10 points)
7. **Instruction Effectiveness** (15 points)
8. **Safety and Robustness** (10 points)

## Getting Started

### Prerequisites

- Node.js 18+ installed
- An Anthropic API key ([get one here](https://console.anthropic.com/))

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd prompt-reviewer
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Edit `.env` and add your Anthropic API key:
```
ANTHROPIC_API_KEY=your_api_key_here
```

### Running the Application

Development mode:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Production build:
```bash
npm run build
npm start
```

## Usage

1. Enter or paste your prompt in the text area
2. Click "Evaluate Prompt"
3. Review your scores across all 8 dimensions
4. Read the detailed feedback for each dimension
5. Follow the specific improvement suggestions
6. **Review 3 improved prompt samples** with explanations of what makes them better
7. Click "Copy" on any improved version to use it in your AI applications
8. Iterate and re-evaluate to improve your prompt further

## Example Evaluations

### Poor Prompt Example
```
Write a blog post about AI
```
**Score**: 17/100 - Poor (Requires complete redesign)

### Improved Prompt Example
```
You are a technology journalist writing for small business owners considering AI adoption.

Task: Write a blog post introduction that demystifies AI and makes it accessible.

Requirements:
- Length: 150-200 words
- Include a relatable analogy
- Address one common misconception
- End with a question that leads into the body

Style: Short paragraphs (2-3 sentences), active voice, conversational but professional.
Avoid: Jargon, hype, fear-mongering.
```
**Score**: 82/100 - Good (Needs targeted improvements)

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **AI**: Claude 3.5 Sonnet via Anthropic SDK
- **Deployment**: Vercel-ready

## Project Structure

```
prompt-reviewer/
├── app/
│   ├── api/
│   │   └── evaluate/
│   │       └── route.ts          # API endpoint for evaluation
│   ├── components/
│   │   └── EvaluationResult.tsx  # Results display component
│   ├── globals.css               # Global styles
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Main page
├── .env.example                  # Environment variables template
├── next.config.ts                # Next.js configuration
├── tailwind.config.ts            # Tailwind configuration
└── package.json
```

## Customization

### Modifying the Rubric

To customize the evaluation rubric, edit the `EVALUATION_RUBRIC` constant in:
```
app/api/evaluate/route.ts
```

### Changing the AI Model

Update the model in the API route:
```typescript
const message = await anthropic.messages.create({
  model: "claude-3-5-sonnet-20241022", // Change this
  // ...
});
```

### UI Customization

The UI uses Tailwind CSS. Customize colors, spacing, and styles in:
- `app/globals.css` - Global styles and CSS variables
- `tailwind.config.ts` - Tailwind theme configuration
- Component files - Component-specific styling

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

ISC

## Support

For issues or questions, please open an issue on GitHub.

## Acknowledgments

- Scoring rubric based on prompt engineering best practices
- Powered by Anthropic's Claude AI
- Built with Next.js and Tailwind CSS

'use server';
/**
 * @fileOverview Generates alternative design variations for a portfolio site using generative AI.
 *
 * - generateDesignVariations - A function that generates design suggestions.
 * - GenerateDesignVariationsInput - The input type for the generateDesignVariations function.
 * - GenerateDesignVariationsOutput - The return type for the generateDesignVariations function.
 *
 * Uses an open-weights model (Llama 3.3 70B via the Groq API) instead of Google Gemini.
 * Requires the GROQ_API_KEY environment variable (free key at https://console.groq.com).
 */

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.3-70b-versatile';

export interface GenerateDesignVariationsInput {
  originalSiteContent: string;
  primaryColor: string;
  backgroundColor: string;
  accentColor: string;
  bodyTextFont: string;
  headlineFont: string;
}

export interface GenerateDesignVariationsOutput {
  designSuggestions: string[];
}

export async function generateDesignVariations(
  input: GenerateDesignVariationsInput
): Promise<GenerateDesignVariationsOutput> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured');
  }

  const prompt = `You are an expert web designer tasked with generating alternative design variations for a portfolio website.

The original website has the following characteristics:
- Primary color: ${input.primaryColor}
- Background color: ${input.backgroundColor}
- Accent color: ${input.accentColor}
- Body text font: ${input.bodyTextFont}
- Headline font: ${input.headlineFont}
- Original site content: ${input.originalSiteContent}

Based on these characteristics, suggest three alternative layouts and color schemes for the portfolio site. Be creative and explore different design possibilities while maintaining a modern and visually appealing aesthetic.

Respond with a JSON object only, in exactly this shape:
{"designSuggestions": ["suggestion 1", "suggestion 2", "suggestion 3"]}
Each suggestion is a concise description of the alternative layout and color scheme.`;

  const res = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: 'user', content: prompt }],
      response_format: { type: 'json_object' },
      temperature: 0.8,
      max_tokens: 1500,
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq API error: ${res.status}`);
  }

  const data = await res.json();
  const content: string | undefined = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error('Groq API returned an empty response');
  }

  const parsed = JSON.parse(content) as { designSuggestions?: unknown };
  if (
    !Array.isArray(parsed.designSuggestions) ||
    !parsed.designSuggestions.every((s) => typeof s === 'string')
  ) {
    throw new Error('Groq API returned an unexpected shape');
  }

  return { designSuggestions: parsed.designSuggestions };
}

import { ai, model, defaultConfig } from '@/configs/AImodal';
import { fillPrompt } from '@/utils/promptUtils';

export async function POST(request) {
  try {
    const body = await request.json();
    const { userInput, promptTemplate } = body;

    const prompt = fillPrompt(promptTemplate, userInput);

    const contents = [
      {
        role: 'user',
        parts: [{ text: prompt }],
      },
    ];

    const response = await ai.models.generateContentStream({
      model,
      config: defaultConfig,
      contents,
    });

    let result = '';
    for await (const chunk of response) {
      result += chunk.text;
    }

    return new Response(JSON.stringify({ result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('API Error:', error);
    return new Response(JSON.stringify({ error: 'Something went wrong.' }), {
      status: 500,
    });
  }
}
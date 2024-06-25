import { createOpenAI } from '@ai-sdk/openai'
import { streamText } from 'ai'

export const maxDuration = 120 // This function can run for a maximum of 5 seconds

export async function POST(req: Request) {
	const { apiKey, messages, model, systemPrompt } = await req.json()
	const openai = createOpenAI({ apiKey })

	const result = await streamText({
		model: openai(model),
		system: systemPrompt,
		messages,
		maxTokens: 4096,
		temperature: 0,
		seed: 42,
	})

	return result.toAIStreamResponse()
}

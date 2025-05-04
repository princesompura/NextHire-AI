import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    const { conversation } = await req.json();
    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    const openai = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "nvidia/llama-3.3-nemotron-super-49b-v1:free",
      messages: [
        {
          role: "system",
          content: `
            You are an AI assistant that generates structured JSON feedback based on an interview conversation.
            Your response must be a valid JSON string matching the format specified in the prompt.
            Do not include any additional text, explanations, or backticks (e.g., \`\`\`json).
            Only return the JSON object.
          `,
        },
        { role: "user", content: FINAL_PROMPT },
      ],
      response_format: { type: "json_object" }, // Enforce JSON output (if supported by the model)
    });

    // Extract the content and attempt to parse it as JSON
    let responseContent = completion.choices[0].message.content;

    // Attempt to parse the response to ensure it's valid JSON
    let parsedContent;
    try {
      parsedContent = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Model response is not valid JSON:", responseContent);
      return NextResponse.json(
        { error: "Invalid response format from AI model" },
        { status: 500 }
      );
    }

    // Return the parsed JSON content
    return NextResponse.json({ content: parsedContent });
  } catch (e) {
    console.error("Error in /api/ai-feedback:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
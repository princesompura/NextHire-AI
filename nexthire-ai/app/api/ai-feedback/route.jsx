import { FEEDBACK_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
  try {
    // Validate OpenRouter API key
    if (!process.env.OPENROUTER_API_KEY) {
      console.error("OPENROUTER_API_KEY is missing");
      return NextResponse.json(
        { error: "Server configuration error: Missing OpenRouter API key" },
        { status: 500 }
      );
    }

    const { conversation } = await req.json();

    // Validate conversation
    if (!conversation || (Array.isArray(conversation) && conversation.length === 0)) {
      console.error("Invalid conversation data:", conversation);
      return NextResponse.json(
        { error: "No conversation data provided" },
        { status: 400 }
      );
    }

    console.log("Received conversation:", conversation);

    const FINAL_PROMPT = FEEDBACK_PROMPT.replace(
      "{{conversation}}",
      JSON.stringify(conversation)
    );

    console.log("Final prompt:", FINAL_PROMPT);

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
      // Remove response_format if unsupported by the model
      // response_format: { type: "json_object" },
    }).catch((error) => {
      console.error("OpenRouter API error:", error);
      throw new Error(`OpenRouter API error: ${error.message || JSON.stringify(error)}`);
    });

    // Log raw response
    console.log("OpenRouter response:", completion.choices[0].message.content);

    // Extract and validate response
    let responseContent = completion.choices[0].message.content;
    let parsedContent;
    try {
      // Handle potential backticks or non-JSON content
      if (responseContent.includes("```json")) {
        responseContent = responseContent.replace(/```json\n?|\n?```/g, "");
      }
      parsedContent = JSON.parse(responseContent);
    } catch (parseError) {
      console.error("Failed to parse model response:", responseContent, parseError);
      return NextResponse.json(
        { error: "Invalid response format from AI model" },
        { status: 500 }
      );
    }

    return NextResponse.json({ content: parsedContent });
  } catch (e) {
    console.error("Error in /api/ai-feedback:", e);
    return NextResponse.json(
      { error: `Server error: ${e.message || "Unknown error"}` },
      { status: 500 }
    );
  }
}
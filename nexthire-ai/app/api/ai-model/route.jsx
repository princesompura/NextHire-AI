import { QUESTIONS_PROMPT } from "@/services/Constants";
import { NextResponse } from "next/server";
import OpenAI from "openai";

export async function POST(req) {
    const { jobPosition, jobDescription, interviewDuration, type } = await req.json();

    const FINAL_PROMPT = QUESTIONS_PROMPT
        .replace('{{jobTitle}}', jobPosition)
        .replace('{{jobDescription}}', jobDescription)
        .replace('{{interviewDuration}}', interviewDuration)
        .replace('{{type}}', type);

    console.log(FINAL_PROMPT);

    try {
        const openai = new OpenAI({
            baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API_KEY,
        });

        const completion = await openai.chat.completions.create({
            model: "nvidia/llama-3.3-nemotron-super-49b-v1:free", // Updated model
            messages: [
                { role: "user", content: FINAL_PROMPT },
            ],
            
        })

        return NextResponse.json(completion.choices[0].message);
    } catch (e) {
        console.log(e);
        return NextResponse.json(e);
    }
}
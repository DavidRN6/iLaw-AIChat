import { NextResponse } from "next/server";
import axios from "axios";

export async function POST(req) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json({ error: "Invalid messages" }, { status: 400 });
    }

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mistral-7b-instruct:free", // تقدر تغيّر الموديل هنا
        messages: [
          {
            role: "system",
            content: "أنت مساعد قانوني ذكي تساعد المستخدم في الأمور القانونية.",
          },
          ...messages,
        ],
        temperature: 0.7,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://i-law-ai-chat.vercel.app",
        },
      }
    );

    const aiMessage = response.data.choices[0].message;

    return NextResponse.json({
      message: {
        role: aiMessage.role || "assistant",
        content: aiMessage.content,
      },
    });
  } catch (err) {
    console.error("OpenRouter API Error:", err.response?.data || err.message);
    return NextResponse.json(
      { error: "حدث خطأ أثناء الاتصال بـ OpenRouter" },
      { status: 500 }
    );
  }
}

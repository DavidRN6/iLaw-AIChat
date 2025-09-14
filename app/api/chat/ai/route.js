// // app/api/chat/ai/route.js
// import Chat from "@/models/Chat";
// import { getAuth } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import connectDB from "@/config/db";
// import { LlamaCloudApiClient } from "llama-cloud-services";

// // نعمل client واحد بس
// const client = new LlamaCloudApiClient({
//   token: process.env.LLAMA_API_KEY,
//   baseUrl: process.env.LLAMA_ENDPOINT_URL, // مهم علشان تستخدم الـ pipeline اللي في Llama Cloud
// });

// export async function POST(req) {
//   try {
//     const { userId } = getAuth(req);
//     if (!userId) {
//       return NextResponse.json(
//         { success: false, message: "User not authenticated" },
//         { status: 401 }
//       );
//     }

//     const { chatId, prompt } = await req.json();
//     if (!prompt || !chatId) {
//       return NextResponse.json(
//         { success: false, message: "chatId and prompt are required" },
//         { status: 400 }
//       );
//     }

//     // الاتصال بالـ DB
//     await connectDB();
//     const chatData = await Chat.findOne({ _id: chatId, userId });
//     if (!chatData) {
//       return NextResponse.json(
//         { success: false, message: "Chat not found" },
//         { status: 404 }
//       );
//     }

//     // إضافة رسالة المستخدم
//     const userPrompt = {
//       role: "user",
//       content: prompt,
//       timestamp: Date.now(),
//     };
//     chatData.messages.push(userPrompt);

//     // استدعاء Llama Cloud
//     const response = await client.chat.complete({
//       messages: [{ role: "user", content: prompt }],
//     });

//     const assistantMessage = {
//       role: "assistant",
//       content:
//         response.output?.[0]?.content?.[0]?.text || "No response from AI",
//       timestamp: Date.now(),
//     };

//     chatData.messages.push(assistantMessage);
//     await chatData.save();

//     return NextResponse.json({ success: true, data: assistantMessage });
//   } catch (error) {
//     console.error("Llama Cloud error:", error);
//     return NextResponse.json(
//       { success: false, error: error.message },
//       { status: 500 }
//     );
//   }
// }

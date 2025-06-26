import { NextRequest, NextResponse } from "next/server";
import db from "@/utils/db";
import Message from "@/models/Message";
import groq from "@/lib/groq";
import mongoose from "mongoose";
import { marked } from "marked";

export async function POST(req: NextRequest) {
  await db;

  const { body, type } = await req.json();

  const userId = new mongoose.Types.ObjectId(); // ⚠ still generating new ID every time (not good for production)

  await Message.create({ user: userId, body, type, fromChat: false });

  const history = await Message.find({ user: userId }).sort({ createdAt: 1 });
  const messages = history.map(msg => ({
    role: msg.fromChat ? "assistant" : "user",
    content: msg.body,
  }));

  messages.unshift({
    role: "system",
    content: "You’re a helpful skincare expert."
  });

  try {
    const chatCompletion = await groq.chat.completions.create({
      model: "llama3-70b-8192",
      messages,
      temperature: 0.7,
      max_tokens: 800,
    });

    const assistantMsg = chatCompletion.choices[0].message.content;

    // Format assistant message with Markdown before storing
    const formattedMsg = marked(assistantMsg);

    await Message.create({
      user: userId,
      body: assistantMsg, // store raw text in DB
      type: "text",
      fromChat: true,
    });

    // Return formatted message to client
    return NextResponse.json({ message: formattedMsg });
  } catch (err) {
    console.error("Groq error:", err);
    return NextResponse.json(
      { message: "Sorry, something went wrong." },
      { status: 500 }
    );
  }
}

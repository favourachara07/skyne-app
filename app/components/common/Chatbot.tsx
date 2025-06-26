"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Maximize2, Minimize2 } from "lucide-react";
import Button from "./Button";
import DOMPurify from 'dompurify';

type Message = {
  id: number;
  text: string;
  sender: "user" | "bot";
};

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! How can I help with your skincare routine today?",
      sender: "bot",
    },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Open/close animation
  useEffect(() => {
    if (isOpen) {
      setShowChatWindow(true);
    } else {
      const timeout = setTimeout(() => setShowChatWindow(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Scroll to bottom on new message
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChat = () => setIsOpen((open) => !open);
  const toggleMaximize = () => setIsMaximized((max) => !max);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = newMessage.trim();
    if (!text) return;

    // Add user message
    const userMsg: Message = { id: Date.now(), text, sender: "user" };
    setMessages((ms) => [...ms, userMsg]);
    setNewMessage("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ body: text, type: "text" }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const { message: botText } = await res.json();

      const botMsg: Message = {
        id: Date.now() + 1,
        text: botText,
        sender: "bot",
      };
      setMessages((ms) => [...ms, botMsg]);
    } catch (err) {
      console.error(err);
      setMessages((ms) => [
        ...ms,
        {
          id: Date.now() + 2,
          text: "Sorry, something went wrong. Please try again later.",
          sender: "bot",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button
        className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-amber-800 text-white rounded-full p-3 shadow-lg hover:bg-amber-900 transition-all duration-300 z-50
          ${!isOpen ? "animate-bounce" : ""}`}
        onClick={toggleChat}
        aria-label="Open chat"
        style={{ transition: "background 0.2s, transform 0.2s" }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {showChatWindow && (
        <div
          ref={chatWindowRef}
          className={`
            fixed bg-white rounded-lg shadow-xl flex flex-col z-[400] border border-gray-200
            transition-all duration-300
            ${
              isMaximized
                ? "top-4 left-4 right-4 bottom-4 w-auto h-auto"
                : "bottom-16 right-4 md:bottom-24 md:right-8 w-11/12 max-w-md h-[28rem]"
            }
            ${
              isOpen
                ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
                : "opacity-0 translate-y-8 scale-95 pointer-events-none"
            }
          `}
          style={!isMaximized ? { maxWidth: 384 } : {}}
        >
          <div className="bg-amber-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Skyne Skincare Assistant</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={toggleMaximize}
                className="text-white hover:text-amber-200 transition-colors"
                aria-label={isMaximized ? "Minimize chat" : "Maximize chat"}
              >
                {isMaximized ? (
                  <Minimize2 size={20} />
                ) : (
                  <Maximize2 size={20} />
                )}
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:text-amber-200 transition-colors"
                aria-label="Close chat"
              >
                <X size={20} />
              </button>
            </div>
          </div>

         <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gradient-to-br from-amber-50 to-white">
  {messages.map((message, idx) => (
    <div
      key={message.id}
      ref={idx === messages.length - 1 ? lastMessageRef : undefined}
      className={`max-w-[75%] p-3 rounded-lg shadow-sm
        ${
          message.sender === "user"
            ? "bg-amber-100 text-gray-800 ml-auto animate-fade-in-right"
            : "bg-gray-100 text-gray-800 animate-fade-in-left"
        }`}
      style={{
        animationDelay: `${idx * 0.03}s`,
        animationFillMode: "backwards",
      }}
    >
      {message.sender === "user" ? (
        message.text
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(message.text),
          }}
        />
      )}
    </div>
  ))}
</div>

          <form
            onSubmit={handleSubmit}
            className="border-t border-gray-200 p-4 flex gap-2 bg-white"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              disabled={loading}
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              disabled={loading}
              className="transition-transform duration-200 active:scale-90"
            >
              {loading ? "…" : <Send size={18} />}
            </Button>
          </form>
        </div>
      )}

      <style jsx global>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.97);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-fade-in-right {
          animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .animate-fade-in-left {
          animation: fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
      `}</style>
    </>
  );
};

export default Chatbot;

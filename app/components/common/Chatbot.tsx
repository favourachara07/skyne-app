'use client';

import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import Button from './Button';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showChatWindow, setShowChatWindow] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help with your skincare routine today?", sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const chatWindowRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Handle open/close animation
  useEffect(() => {
    if (isOpen) {
      setShowChatWindow(true);
    } else {
      // Wait for animation before unmounting
      const timeout = setTimeout(() => setShowChatWindow(false), 250);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

  // Scroll to last message on new message
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const toggleChat = () => {
    setIsOpen((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    // Add user message
    const userMessageId = Date.now();
    setMessages(prevMessages => [
      ...prevMessages,
      { id: userMessageId, text: newMessage, sender: 'user' }
    ]);

    setNewMessage('');

    // Simulate bot response (in a real app, this would call an API)
    setTimeout(() => {
      setMessages(prevMessages => [
        ...prevMessages,
        {
          id: userMessageId + 1,
          text: "Thanks for your message! Our skincare expert will respond shortly. Would you like some general skincare tips in the meantime?",
          sender: 'bot'
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Chat button with bounce animation */}
      <button
        className={`fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-amber-800 text-white rounded-full p-3 shadow-lg hover:bg-amber-900 transition-all duration-300 z-50
          ${!isOpen ? 'animate-bounce' : ''}`}
        onClick={toggleChat}
        aria-label="Open chat"
        style={{ transition: 'background 0.2s, transform 0.2s' }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chat window with slide/fade animation */}
      {showChatWindow && (
        <div
          ref={chatWindowRef}
          className={`
            fixed bottom-16 right-4 md:bottom-24 md:right-8 w-11/12 max-w-md h-[28rem] bg-white rounded-lg shadow-xl flex flex-col z-[400] border border-gray-200
            transition-all duration-300
            ${isOpen
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-8 scale-95 pointer-events-none'}
          `}
          style={{ maxWidth: 384 }}
        >
          {/* Chat header */}
          <div className="bg-amber-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Skyne Skincare Assistant</h3>
            <button
              onClick={toggleChat}
              className="text-white hover:text-amber-200 transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>

          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3 bg-gradient-to-br from-amber-50 to-white">
            {messages.map((message, idx) => (
              <div
                key={message.id}
                ref={idx === messages.length - 1 ? lastMessageRef : undefined}
                className={`max-w-[75%] p-3 rounded-lg shadow-sm transition-all duration-300
                  ${message.sender === 'user'
                    ? 'bg-amber-100 text-gray-800 ml-auto animate-fade-in-right'
                    : 'bg-gray-100 text-gray-800 animate-fade-in-left'
                  }
                `}
                style={{
                  animation: 'fadeIn 0.4s',
                  animationDelay: `${idx * 0.03}s`,
                  animationFillMode: 'backwards'
                }}
              >
                {message.text}
              </div>
            ))}
          </div>

          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex gap-2 bg-white">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
            />
            <Button
              type="submit"
              variant="primary"
              size="sm"
              aria-label="Send message"
              className="transition-transform duration-200 active:scale-90"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}

      {/* Animations (Tailwind CSS custom keyframes) */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97);}
          to { opacity: 1; transform: translateY(0) scale(1);}
        }
        .animate-fade-in-right {
          animation: fadeIn 0.4s cubic-bezier(0.4,0,0.2,1);
        }
        .animate-fade-in-left {
          animation: fadeIn 0.4s cubic-bezier(0.4,0,0.2,1);
        }
      `}</style>
    </>
  );
};

export default Chatbot;
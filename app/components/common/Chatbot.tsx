'use client';

import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import Button from './Button';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: "Hello! How can I help with your skincare routine today?", sender: 'bot' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
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
    
    // Clear input
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
      {/* Chat button */}
      <button
        className="fixed bottom-24 right-4 md:bottom-8 md:right-8 bg-amber-800 text-white rounded-full p-3 shadow-lg hover:bg-amber-900 transition-colors duration-300 z-50"
        onClick={toggleChat}
        aria-label="Open chat"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
      
      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 md:bottom-20 md:right-8 w-80 md:w-96 h-96 bg-white rounded-lg shadow-xl flex flex-col z-40 border border-gray-200">
          {/* Chat header */}
          <div className="bg-amber-800 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-medium">Skyne Skincare Assistant</h3>
            <button 
              onClick={toggleChat}
              className="text-white hover:text-amber-200"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat messages */}
          <div className="flex-1 p-4 overflow-y-auto flex flex-col gap-3">
            {messages.map(message => (
              <div 
                key={message.id} 
                className={`max-w-3/4 p-3 rounded-lg ${
                  message.sender === 'user' 
                    ? 'bg-amber-100 text-gray-800 ml-auto' 
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          
          {/* Chat input */}
          <form onSubmit={handleSubmit} className="border-t border-gray-200 p-4 flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <Button 
              type="submit" 
              variant="primary"
              size="sm"
              aria-label="Send message"
            >
              <Send size={18} />
            </Button>
          </form>
        </div>
      )}
    </>
  );
};

export default Chatbot;
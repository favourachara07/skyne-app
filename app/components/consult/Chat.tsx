import { ActiveChat, ChatMessage } from "@/app/(main)/consult/page";
import { MessageCircle, Paperclip, Send, X } from "lucide-react";
import Image from "next/image";

interface RenderChatProps {
  activeChat: ActiveChat | null;
  setActiveChat: (chat: ActiveChat | null) => void;
  handleSendMessage: () => void;
  newMessage: string;
  setNewMessage: (msg: string) => void;
  chatEndRef: React.RefObject<HTMLDivElement | null>;
  chatMessages: ChatMessage[];
}

export const renderChat = ({
  activeChat,
  setActiveChat,
  handleSendMessage,
  newMessage,
  setNewMessage,
  chatEndRef,
  chatMessages,
}: RenderChatProps) => (
  <div className="max-w-4xl mx-auto">
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
      {/* Chat Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            height={40}
            width={40}
            src={activeChat?.image ?? "/default-avatar.png"}
            alt={activeChat?.name ?? "Chat avatar"}
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{activeChat?.name}</h3>
            <p className="text-sm text-blue-100">Online - Dermatologist</p>
          </div>
        </div>
        <button
          onClick={() => setActiveChat(null)}
          className="p-2 hover:bg-blue-700 rounded-lg"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {chatMessages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>Start your consultation by sending a message</p>
          </div>
        ) : (
          chatMessages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                <p>{message.text}</p>
                <p
                  className={`text-xs mt-1 ${
                    message.sender === "user"
                      ? "text-blue-100"
                      : "text-gray-500"
                  }`}
                >
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Chat Input */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <button className="p-2 text-gray-400 hover:text-gray-600">
            <Paperclip className="w-5 h-5" />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSendMessage}
            className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

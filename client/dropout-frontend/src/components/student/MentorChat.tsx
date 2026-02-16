"use client";

import ChatBubble from "./ChatBubble";
import ChatInput from "./ChatInput";
import { useMentorChat } from "@/hooks/useMentorChat";
import ShimmerBackButton from "../common/ShimmerActionButton";

export default function MentorChat() {
  const { messages, sendMessage, loading, error } = useMentorChat();

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col bg-linear-to-b from-orange-50 to-white">
      
      {/* Header */}
      <div className="border-b bg-white px-6 py-4">

        <h1 className="text-lg font-semibold text-orange-600">
          AI Mentor
        </h1>
        <ShimmerBackButton className="ml-350" fallbackHref="/student" />
        <p className="text-xs text-gray-500">
          Academic guidance • Not professional counseling
        </p>
      </div>

      {/* Chat */}
      <div className="flex-1 space-y-4 overflow-y-auto p-6">
        {messages.length === 0 && (
          <p className="text-center text-sm text-gray-400">
            Start a conversation with your AI mentor 🌅
          </p>
        )}

        {messages.map((msg, i) => (
          <ChatBubble key={i} role={msg.role} text={msg.text} />
        ))}

        {loading && (
          <ChatBubble role="mentor" text="Mentor is typing…" />
        )}

        {error && (
          <p className="text-center text-sm text-red-500">
            {error}
          </p>
        )}
      </div>

      {/* Input */}
      <ChatInput onSend={sendMessage} loading={loading} />
    </div>
  );
}

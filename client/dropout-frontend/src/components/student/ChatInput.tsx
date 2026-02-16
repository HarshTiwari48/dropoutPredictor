"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type Props = {
  onSend: (text: string) => void;
  loading: boolean;
};

export default function ChatInput({ onSend, loading }: Props) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSend(text);
    setText("");
  };

  return (
    <div className="flex gap-2 border-t bg-white p-4">
      <Input
        placeholder="Ask your AI mentor anything…"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        disabled={loading}
        className="rounded-full"
      />
      <Button
        onClick={handleSend}
        disabled={loading}
        className="rounded-full bg-orange-500 hover:bg-orange-600"
      >
        Send
      </Button>
    </div>
  );
}

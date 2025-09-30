import { useState } from "react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Send } from "lucide-react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput = ({ onSend, disabled }: ChatInputProps) => {
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !disabled) {
      onSend(input.trim());
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex gap-2 items-end">
        <Textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
          disabled={disabled}
          className="min-h-[52px] max-h-32 resize-none bg-[hsl(var(--chat-input-bg))] border-border focus-visible:ring-primary"
          rows={1}
        />
        <Button
          type="submit"
          disabled={disabled || !input.trim()}
          size="icon"
          className="h-[52px] w-[52px] shrink-0 bg-primary hover:bg-primary/90"
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default ChatInput;

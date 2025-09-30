import { useEffect, useRef } from "react";
import { MessageSquare } from "lucide-react";
import ChatMessage from "@/components/ChatMessage";
import ChatInput from "@/components/ChatInput";
import { useChat } from "@/hooks/useChat";

const Index = () => {
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
            <MessageSquare className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-foreground">AI Chat</h1>
            <p className="text-sm text-muted-foreground">Powered by Gemini</p>
          </div>
        </div>
      </header>

      {/* Messages */}
      <main className="flex-1 overflow-y-auto">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-12">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <MessageSquare className="h-10 w-10 text-primary" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Start a Conversation
              </h2>
              <p className="text-muted-foreground max-w-md">
                Ask me anything! I'm here to help answer your questions and have engaging conversations.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, index) => (
                <ChatMessage key={index} role={message.role} content={message.content} />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-[hsl(var(--chat-ai-bg))] border border-border rounded-2xl px-4 py-3">
                    <div className="flex gap-1">
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="border-t border-border bg-card shadow-lg">
        <div className="container mx-auto px-4 py-4 max-w-4xl">
          <ChatInput onSend={sendMessage} disabled={isLoading} />
        </div>
      </footer>
    </div>
  );
};

export default Index;

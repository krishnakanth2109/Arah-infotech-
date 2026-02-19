import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { MessageCircle, X, Send, Loader2, Minimize2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import axios from "axios";
import { toast } from "sonner";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "welcome",
            role: "assistant",
            content: "Hello! I'm the Arah Infotech AI assistant. How can I help you today?",
            timestamp: new Date(),
        },
    ]);
    const [inputValue, setInputValue] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isOpen]);

    const handleSendMessage = async (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!inputValue.trim() || isLoading) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: inputValue,
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue("");
        setIsLoading(true);

        try {
            const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
            const response = await axios.post(`${apiUrl}/api/chat`, {
                question: userMessage.content,
            });

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant", // "assistant" to match our interface, though backend sends "answer"
                content: response.data.answer,
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
        } catch (error) {
            console.error("Chat error:", error);
            toast.error("Failed to get a response. Please try again.");
            const errorMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: "I'm sorry, I'm having trouble connecting to the server right now.",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="mb-4 w-[350px] sm:w-[400px]"
                    >
                        <Card className="flex h-[500px] flex-col overflow-hidden border-primary/20 shadow-2xl glass-panel">
                            {/* Header */}
                            <div className="flex items-center justify-between bg-primary p-4 text-primary-foreground">
                                <div className="flex items-center gap-2">
                                    <div className="relative flex h-8 w-8 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
                                        <MessageCircle className="h-5 w-5" />
                                        <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-400 ring-1 ring-white"></span>
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-sm">Arah AI Support</h3>
                                        <p className="text-xs text-primary-foreground/80">Online</p>
                                    </div>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-8 w-8 text-primary-foreground hover:bg-white/20"
                                    onClick={() => setIsOpen(false)}
                                >
                                    <Minimize2 className="h-4 w-4" />
                                </Button>
                            </div>

                            {/* Messages Area */}
                            <ScrollArea className="flex-1 bg-background/50 p-4 backdrop-blur-sm">
                                <div className="flex flex-col gap-4">
                                    {messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.role === "user" ? "justify-end" : "justify-start"
                                                }`}
                                        >
                                            <div
                                                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm shadow-sm ${message.role === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none prose-invert" /* User message often dark/primary */
                                                    : "bg-muted text-foreground rounded-tl-none border border-border/50"
                                                    }`}
                                            >
                                                <div className="prose prose-sm max-w-none dark:prose-invert break-words">
                                                    <ReactMarkdown
                                                        remarkPlugins={[remarkGfm]}
                                                        components={{
                                                            ul: ({ node, ...props }) => <ul className="list-disc pl-4 my-2 space-y-1 text-left" {...props} />,
                                                            ol: ({ node, ...props }) => <ol className="list-decimal pl-4 my-2 space-y-1 text-left" {...props} />,
                                                            li: ({ node, ...props }) => <li className="my-0.5" {...props} />,
                                                            h1: ({ node, ...props }) => <h1 className="text-lg font-bold my-2" {...props} />,
                                                            h2: ({ node, ...props }) => <h2 className="text-base font-bold my-2" {...props} />,
                                                            h3: ({ node, ...props }) => <h3 className="text-sm font-bold my-1" {...props} />,
                                                            strong: ({ node, ...props }) => <span className="font-bold" {...props} />,
                                                            p: ({ node, ...props }) => <p className="mb-2 last:mb-0 inline-block" {...props} />,
                                                        }}
                                                    >
                                                        {message.content}
                                                    </ReactMarkdown>
                                                </div>
                                                <div
                                                    className={`mt-1 text-[10px] opacity-70 ${message.role === "user" ? "text-right" : "text-left"
                                                        }`}
                                                >
                                                    {message.timestamp.toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                    })}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {isLoading && (
                                        <div className="flex justify-start">
                                            <div className="flex items-center gap-2 rounded-2xl rounded-tl-none bg-muted px-4 py-2 text-sm text-muted-foreground">
                                                <Loader2 className="h-3 w-3 animate-spin" />
                                                <span>Typing...</span>
                                            </div>
                                        </div>
                                    )}
                                    <div ref={scrollRef} />
                                </div>
                            </ScrollArea>

                            {/* Input Area */}
                            <div className="border-t bg-background p-4">
                                <form
                                    onSubmit={handleSendMessage}
                                    className="flex items-center gap-2"
                                >
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type your question..."
                                        className="flex-1 rounded-full bg-background border-input focus-visible:ring-primary/20"
                                        disabled={isLoading}
                                    />
                                    <Button
                                        type="submit"
                                        size="icon"
                                        className="h-10 w-10 rounded-full"
                                        disabled={!inputValue.trim() || isLoading}
                                    >
                                        <Send className="h-4 w-4" />
                                        <span className="sr-only">Send</span>
                                    </Button>
                                </form>
                            </div>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>

            <Button
                onClick={() => setIsOpen(!isOpen)}
                size="lg"
                className="h-14 w-14 rounded-full shadow-lg transition-transform hover:scale-105 hover:shadow-xl active:scale-95 bg-primary hover:bg-primary/90"
            >
                {isOpen ? (
                    <X className="h-6 w-6" />
                ) : (
                    <MessageCircle className="h-6 w-6" />
                )}
            </Button>
        </div>
    );
};

export default Chatbot;

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, X, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import golu from "@/assets/golu.jpg";

interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messages.length === 0) {
            setMessages([
                {
                    id: "1",
                    text: "Namaste! 🙏 I'm Golu. Ask me anything about our delicious golgappas, orders, or delivery!",
                    sender: "bot",
                    timestamp: new Date(),
                },
            ]);
        }
    }, []);

    const handleSend = () => {
        if (!inputValue.trim()) return;

        const userMsg: Message = {
            id: Date.now().toString(),
            text: inputValue,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMsg]);
        setInputValue("");
        setIsTyping(true);

        // Simulate bot response
        setTimeout(() => {
            let botText = "That's an interesting question! Let me check the secret recipe scroll... 📜";
            const lowerInput = userMsg.text.toLowerCase();

            if (lowerInput.includes("order") || lowerInput.includes("status")) {
                botText = "You can track your order in the Orders section of your profile! Or give me your order ID and I'll pretend to look it up. 😉";
            } else if (lowerInput.includes("menu") || lowerInput.includes("price") || lowerInput.includes("food")) {
                botText = "Our menu is full of spicy and sweet delights! Check out the Menu page for the latest prices. The 'Tikha Pani' is a bestseller!";
            } else if (lowerInput.includes("delivery") || lowerInput.includes("time")) {
                botText = "We deliver faster than you can say 'Golgappa'! Usually within 30-45 minutes.";
            } else if (lowerInput.includes("contact") || lowerInput.includes("support") || lowerInput.includes("help")) {
                botText = "You can reach our humans at support@golgappafleet.com if I'm not helpful enough! 🤖";
            } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("namaste")) {
                botText = "Namaste! Ready for some crunch?";
            } else if (lowerInput.includes("golu") || lowerInput.includes("who are you")) {
                botText = "I am Golu! The official AI assistant of Golgappa Fleet. I run on spicy pani and code. 🌶️";
            }

            const botMsg: Message = {
                id: (Date.now() + 1).toString(),
                text: botText,
                sender: "bot",
                timestamp: new Date(),
            };
            setMessages((prev) => [...prev, botMsg]);
            setIsTyping(false);
        }, 1500);
    }

    // Auto scroll
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isTyping]);


    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 20 }}
                        className="fixed bottom-24 right-4 w-80 md:w-96 bg-card border border-border shadow-elevated rounded-2xl overflow-hidden z-[100] flex flex-col h-[500px]"
                    >
                        {/* Header */}
                        <div className="bg-primary p-4 flex items-center justify-between text-primary-foreground">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/50 bg-white">
                                    <img src={golu} alt="Golu" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg flex items-center gap-1">Golu <Sparkles className="w-3 h-3 text-yellow-300" /></h3>
                                    <p className="text-xs opacity-90">Golgappa Assistant</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-primary-foreground hover:bg-white/20 rounded-full h-8 w-8">
                                <X className="w-5 h-5" />
                            </Button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 overflow-y-auto p-4 bg-secondary/30">
                            <div className="flex flex-col gap-3">
                                {messages.map((msg) => (
                                    <div
                                        key={msg.id}
                                        className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                                    >
                                        <div
                                            className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === "user"
                                                    ? "bg-primary text-primary-foreground rounded-tr-none"
                                                    : "bg-white border border-border rounded-tl-none shadow-sm text-foreground"
                                                }`}
                                        >
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {isTyping && (
                                    <div className="flex justify-start">
                                        <div className="bg-white border border-border rounded-2xl rounded-tl-none p-4 shadow-sm flex gap-1 items-center">
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-75" />
                                            <span className="w-2 h-2 bg-primary/40 rounded-full animate-bounce delay-150" />
                                        </div>
                                    </div>
                                )}
                                <div ref={scrollRef} />
                            </div>
                        </div>

                        {/* Input */}
                        <div className="p-3 bg-card border-t border-border mt-auto">
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    handleSend();
                                }}
                                className="flex gap-2"
                            >
                                <Input
                                    placeholder="Ask Golu..."
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    className="flex-1 bg-secondary/50 border-0 focus-visible:ring-1 focus-visible:ring-primary"
                                />
                                <Button type="submit" size="icon" disabled={!inputValue.trim() || isTyping} className="rounded-xl shadow-soft">
                                    <Send className="w-4 h-4" />
                                </Button>
                            </form>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 w-16 h-16 bg-primary rounded-full shadow-bold flex items-center justify-center z-[100] border-4 border-white overflow-hidden group"
            >
                {!isOpen ? (
                    <img src={golu} alt="Chat" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                ) : (
                    <X className="w-8 h-8 text-primary-foreground" />
                )}
            </motion.button>
        </>
    );
}

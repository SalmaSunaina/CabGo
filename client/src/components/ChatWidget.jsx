import { useState, useRef, useEffect } from 'react';

export default function ChatWidget() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 Welcome to CabGo Support. How can we help you today?", sender: 'bot' }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const [chatMode, setChatMode] = useState('menu'); // menu, chat, agent, rating
    const [agentName, setAgentName] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen, isTyping]);

    const categories = [
        {
            id: 'trip', label: '🚖 Trip Issues', questions: [
                { q: "Where is my cab?", a: "Your cab is currently 2 minutes away and moving towards you." },
                { q: "Driver not moving", a: "We've alerted the driver. They should be moving shortly." },
                { q: "Cancel my ride", a: "You can cancel your ride from the 'My Bookings' page." }
            ]
        },
        {
            id: 'payment', label: '💳 Payments', questions: [
                { q: "Payment failed", a: "Please check your card details or try a different payment method." },
                { q: "Refund status", a: "Refunds usually take 3-5 business days to process." }
            ]
        },
        {
            id: 'account', label: '👤 Account', questions: [
                { q: "Update profile", a: "You can update your profile settings in the App Menu." },
                { q: "Login issues", a: "Try resetting your password if you cannot log in." }
            ]
        }
    ];

    const [activeCategory, setActiveCategory] = useState(null);

    const addMessage = (text, sender = 'bot') => {
        setMessages(prev => [...prev, { id: Date.now(), text, sender, timestamp: new Date() }]);
    };

    const handleCategoryClick = (category) => {
        addMessage(category.label, 'user');
        setActiveCategory(category);
        setChatMode('chat');
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addMessage(`Here are some common questions about ${category.label.replace(/[^a-zA-Z ]/g, "")}:`);
        }, 800);
    };

    const handleQuestionClick = (qa) => {
        addMessage(qa.q, 'user');
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addMessage(qa.a);
            // Offer to go back or rate
            setTimeout(() => {
                addMessage("Did this answer your question?");
            }, 500);
        }, 1000);
    };

    const handleConnectAgent = () => {
        addMessage("Talk to an Agent", 'user');
        setChatMode('agent');
        setIsTyping(true);

        setTimeout(() => {
            addMessage("Connecting you to a support agent...");
            setTimeout(() => {
                const agents = ["Sarah", "Mike", "Priya", "Alex"];
                const randomAgent = agents[Math.floor(Math.random() * agents.length)];
                setAgentName(randomAgent);
                setIsTyping(false);
                addMessage(`You are now connected with ${randomAgent}. How can I help you?`);
            }, 2000);
        }, 1000);
    };

    const handleEndChat = () => {
        setChatMode('rating');
        addMessage("Chat ended. Please rate your experience.");
    };

    const handleRating = (stars) => {
        addMessage(`${stars} Stars`, 'user');
        setIsTyping(true);
        setTimeout(() => {
            setIsTyping(false);
            addMessage("Thank you for your feedback! Have a great day. 🌟");
            setTimeout(() => {
                setIsOpen(false);
                // Reset chat after closing
                setTimeout(() => {
                    setMessages([{ id: 1, text: "Hi there! 👋 Welcome to CabGo Support. How can we help you today?", sender: 'bot' }]);
                    setChatMode('menu');
                    setActiveCategory(null);
                    setAgentName(null);
                }, 500);
            }, 2000);
        }, 800);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
            {/* Chat Window */}
            {isOpen && (
                <div className="mb-4 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300 flex flex-col max-h-[600px]">
                    {/* Header */}
                    <div className="bg-gray-900 p-4 flex justify-between items-center shrink-0">
                        <div className="flex items-center gap-3">
                            <div className={`w-2.5 h-2.5 rounded-full ${agentName ? 'bg-green-400' : 'bg-blue-400'} animate-pulse`}></div>
                            <div>
                                <h3 className="text-white font-bold text-sm">{agentName ? `${agentName} (Support)` : 'CabGo Assistant'}</h3>
                                <p className="text-gray-400 text-xs">{agentName ? 'Online' : 'Automated Support'}</p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {chatMode !== 'menu' && chatMode !== 'rating' && (
                                <button onClick={handleEndChat} className="text-xs bg-red-500/20 text-red-200 px-2 py-1 rounded hover:bg-red-500 hover:text-white transition-colors">
                                    End Chat
                                </button>
                            )}
                            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                            </button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4 min-h-[300px]">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                <div className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.sender === 'user'
                                        ? 'bg-gray-900 text-white rounded-tr-none'
                                        : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}>
                                    {msg.text}
                                    {msg.timestamp && (
                                        <p className={`text-[10px] mt-1 text-right ${msg.sender === 'user' ? 'text-gray-400' : 'text-gray-300'}`}>
                                            {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                        {isTyping && (
                            <div className="flex justify-start">
                                <div className="bg-white border border-gray-100 p-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Interactive Area */}
                    <div className="p-4 bg-white border-t border-gray-100 shrink-0">
                        {chatMode === 'menu' && (
                            <div className="grid grid-cols-2 gap-2">
                                {categories.map(cat => (
                                    <button
                                        key={cat.id}
                                        onClick={() => handleCategoryClick(cat)}
                                        className="p-3 text-sm font-semibold bg-gray-50 hover:bg-blue-50 text-gray-700 hover:text-blue-600 rounded-xl border border-gray-100 transition-all text-left"
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                                <button
                                    onClick={handleConnectAgent}
                                    className="col-span-2 p-3 text-sm font-bold bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-all shadow-lg shadow-gray-200"
                                >
                                    🎧 Talk to Agent
                                </button>
                            </div>
                        )}

                        {chatMode === 'chat' && activeCategory && (
                            <div className="space-y-2">
                                <p className="text-xs font-bold text-gray-400 uppercase mb-2">Suggested Questions</p>
                                <div className="flex flex-wrap gap-2">
                                    {activeCategory.questions.map((qa, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => handleQuestionClick(qa)}
                                            className="text-xs font-medium bg-blue-50 text-blue-700 px-3 py-2 rounded-lg hover:bg-blue-100 transition-colors border border-blue-100"
                                        >
                                            {qa.q}
                                        </button>
                                    ))}
                                    <button
                                        onClick={() => { setChatMode('menu'); setActiveCategory(null); }}
                                        className="text-xs font-bold text-gray-500 px-3 py-2 hover:text-gray-800"
                                    >
                                        ← Back to Menu
                                    </button>
                                </div>
                            </div>
                        )}

                        {chatMode === 'agent' && (
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                                    onKeyPress={(e) => {
                                        if (e.key === 'Enter' && e.target.value) {
                                            addMessage(e.target.value, 'user');
                                            e.target.value = '';
                                            setTimeout(() => {
                                                setIsTyping(true);
                                                setTimeout(() => {
                                                    setIsTyping(false);
                                                    addMessage("I'm checking that for you right now.");
                                                }, 1500);
                                            }, 500);
                                        }
                                    }}
                                />
                                <button className="bg-blue-600 text-white p-2 rounded-xl hover:bg-blue-700 transition-colors">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                                </button>
                            </div>
                        )}

                        {chatMode === 'rating' && (
                            <div className="text-center py-2">
                                <p className="text-sm font-bold text-gray-900 mb-3">How was your support experience?</p>
                                <div className="flex justify-center gap-2">
                                    {[1, 2, 3, 4, 5].map(star => (
                                        <button
                                            key={star}
                                            onClick={() => handleRating(star)}
                                            className="text-2xl hover:scale-125 transition-transform focus:outline-none"
                                        >
                                            ⭐
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`${isOpen ? 'bg-gray-800' : 'bg-blue-600'} text-white p-4 rounded-full shadow-xl hover:shadow-blue-500/40 transition-all transform hover:scale-105 flex items-center justify-center ring-4 ring-white`}
            >
                {isOpen ? (
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                ) : (
                    <div className="relative">
                        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path></svg>
                    </div>
                )}
            </button>
        </div>
    );
}

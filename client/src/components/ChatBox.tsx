"use client";
import { FC, useState, useEffect, useRef } from 'react';
import { marked } from 'marked';

interface Message {
    sender: string;
    content: string;
}

interface ChatBoxProps {
    messages: Message[];
    onSendMessage: (message: string) => Promise<void>;
    loading: boolean; // Add loading prop
}

const ChatBox: FC<ChatBoxProps> = ({ messages, onSendMessage, loading }) => {
    const [message, setMessage] = useState('');
    const chatEndRef = useRef<HTMLDivElement | null>(null); // Ref for auto-scrolling

    const handleSend = () => {
        if (message.trim()) {
            onSendMessage(message); // Call onSendMessage from props
            setMessage('');
        }
    };

    const renderText = (content: string) => {
        // Use marked to convert Markdown to HTML
        let html = marked(content);
    
        // Ensure content is a string before applying replace
        if (typeof html === 'string') {
            // Replace newlines with <br> for better formatting
            html = html.replace(/\n/g, '<br/>');
        }
    
        return { __html: html };
    };

    useEffect(() => {
        // Scroll to the bottom of the chat container
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    return (
        <div className="flex flex-col h-full bg-white p-4 rounded-lg shadow-md">
            <div className="flex-1 overflow-y-auto px-2">
                {messages.length > 0 ? (
                    messages.map((msg, index) => (
                        <div key={index} className={`mb-4 ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            <div
                                className={`inline-block p-2 rounded-lg ${msg.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}
                                dangerouslySetInnerHTML={renderText(msg.content)}
                            />
                        </div>
                    ))
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <p className="text-center text-gray-500">Choose a conversation or add a new one to start.</p>
                    </div>
                )}
                {loading && (
                    <div className="text-center mt-4">
                        <div className="animate-spin h-5 w-5 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                        <p className="mt-2 text-gray-500">Assistant is thinking...</p>
                    </div>
                )}
                <div ref={chatEndRef} /> {/* Ref for auto-scrolling */}
            </div>
            <div className="flex mt-4">
                <input
                    type="text"
                    className="flex-1 p-2 border rounded-l-lg focus:outline-none text-black"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button
                    className="p-2 bg-blue-500 text-white rounded-r-lg"
                    onClick={handleSend}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default ChatBox;

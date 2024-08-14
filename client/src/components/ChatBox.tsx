"use client";
import { FC, useState } from 'react';

interface Message {
    sender: string;
    content: string;
}

interface ChatBoxProps {
    messages: Message[];
}

const ChatBox: FC<ChatBoxProps> = ({ messages }) => {
    const [message, setMessage] = useState('');

    const handleSend = () => {
        if (message.trim()) {
            console.log('Message sent:', message);
            setMessage('');
        }
    };

    return (
        <div className="flex flex-col h-full bg-white p-4 rounded-lg shadow-md">
            <div className="flex-1 overflow-y-auto px-2">
                {messages.length > 0 ? (
                    <div>
                        {messages.map((message, index) => (
                            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                                <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                                    {message.content}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-center text-gray-500">Choose conversation or add new one to start.</p>
                    </div>
                )}
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

"use client";
import { FC } from 'react';

interface MessageProps {
    sender: 'user' | 'assistant';
    text: string;
  }
  
  const Message: FC<MessageProps> = ({ sender, text }) => {
    const isUser = sender === 'user';
    return (
      <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
        <div
          className={`p-2 max-w-xs text-white ${
            isUser ? 'bg-blue-500' : 'bg-gray-500'
          } rounded-lg`}
        >
          {text}
        </div>
      </div>
    );
  };
  
  export default Message;
  
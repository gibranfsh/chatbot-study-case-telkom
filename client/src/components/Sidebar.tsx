"use client";
import { FC, useState } from 'react';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  messages: { sender: string; content: string }[];
}

interface SidebarProps {
  conversations: Conversation[];
  onSelect: (id: string) => void;
  selectedConversationId: string | null;
  onAddConversation: () => void;
}

const Sidebar: FC<SidebarProps> = ({ conversations, onSelect, selectedConversationId, onAddConversation }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 fixed inset-y-0 left-0 w-64 bg-white p-4 shadow-md z-50`}>
      <button 
        className="absolute top-4 right-[-40px] p-2 bg-blue-500 text-white rounded-full focus:outline-none"
        onClick={toggleSidebar}
      >
        {isOpen ? '<' : '>'}
      </button>
      <h2 className="text-lg font-semibold mb-4">Conversation History</h2>
      <button
        className="mb-4 p-2 bg-blue-500 text-white rounded-lg w-full"
        onClick={onAddConversation}
      >
        Add New Conversation
      </button>
      <div className="space-y-2">
        {conversations.map((conversation) => (
          <div
            key={conversation.id}
            className={`p-2 rounded-lg cursor-pointer transition ${selectedConversationId === conversation.id ? 'bg-blue-500 text-white' : 'bg-gray-100 text-black hover:bg-blue-500 hover:text-white'}`}
            onClick={() => onSelect(conversation.id)}
          >
            <h1 className="font-semibold">{conversation.title}</h1>
            <p className="text-sm truncate">{conversation.lastMessage}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;

"use client";
import { FC, useState } from 'react';
import ChatBox from '../components/ChatBox';
import QuestionRecommendations from '../components/QuestionRecommendations';
import Sidebar from '../components/Sidebar';

const Home: FC = () => {
  const [selectedConversationId, setSelectedConversationId] = useState<number | null>(null);
  const [conversations, setConversations] = useState([
    {
      id: 1,
      title: "Conversation 1",
      lastMessage: "What's the weather like today?",
      messages: [
        { sender: 'assistant', content: 'How can I assist you?' },
        { sender: 'user', content: `What${"'"}s the weather like today?` },
        { sender: 'assistant', content: `It${"'"}s sunny outside.` }
      ]
    },
    {
      id: 2,
      title: "Conversation 2",
      lastMessage: "Tell me about the latest technology.",
      messages: [
        { sender: 'user', content: 'Tell me about the latest technology.' },
        { sender: 'assistant', content: 'AI technology is rapidly advancing.' }
      ]
    },
    {
      id: 3,
      title: "Conversation 3",
      lastMessage: "What is AI?",
      messages: [
        { sender: 'user', content: 'What is AI?' },
        { sender: 'assistant', content: 'AI is artificial intelligence that enables machines to learn.' },
        { sender: 'user', content: 'What are its applications in daily life?' },
        { sender: 'assistant', content: 'AI can be used in various fields, such as customer service and facial recognition.' },
        { sender: 'user', content: 'Okay, thanks for the explanation.' },
        { sender: 'assistant', content: `You${"'"}re welcome. Is there anything else I can help with?` },
        { sender: 'user', content: 'I think I have some questions about ChatGPT.' },
        { sender: 'assistant', content: 'Sure, feel free to ask.' },
        { sender: 'user', content: 'How does ChatGPT work?' },
        { sender: 'assistant', content: 'ChatGPT is a conversational AI model that generates human-like responses based on the input it receives.' },
        { sender: 'user', content: 'That sounds interesting.' },
        { sender: 'assistant', content: 'It is indeed. Is there anything else you would like to know?' },
        { sender: 'user', content: 'What is Ollama?' },
        { sender: 'assistant', content: 'Ollama is a platform that allows users to create and share conversational AI models.' },
        { sender: 'user', content: 'How can I get started with Ollama?' },
        { sender: 'assistant', content: 'You can create an account on Ollama and start building your own conversational AI models.' },
        { sender: 'user', content: 'Thank you for the information.' },
        { sender: 'assistant', content: `You${"'"}re welcome. Have a great day!` }
      ]
    },
  ]);

  const [currentConversation, setCurrentConversation] = useState<{
    id: number;
    title: string;
    messages: { sender: string; content: string }[];
  } | null>(null);

  const dummyQuestions = [
    "How are you?",
    "Tell me about the weather today.",
    "How does ChatGPT work?",
    "What’s new in technology?",
  ];

  const handleQuestionSelect = (question: string) => {
    console.log('Selected question:', question);
    if (currentConversation) {
      const updatedMessages = [
        ...currentConversation.messages,
        { sender: 'user', content: question },
      ];
      setCurrentConversation({ ...currentConversation, messages: updatedMessages });
    }
  };

  const handleConversationSelect = (id: number) => {
    setSelectedConversationId(id);
    const conversation = conversations.find(conv => conv.id === id);
    if (conversation) {
      setCurrentConversation(conversation);
    }
  };

  const handleAddConversation = () => {
    setSelectedConversationId(null);
    setCurrentConversation(null);
  };

  const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);

  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar
        conversations={conversations}
        onSelect={handleConversationSelect}
        selectedConversationId={selectedConversationId}
        onAddConversation={handleAddConversation}
      />
      
      <div className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
        <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
          <ChatBox messages={selectedConversation ? selectedConversation.messages : []} />
          {!selectedConversation && (
            <QuestionRecommendations questions={dummyQuestions} onSelect={handleQuestionSelect} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;

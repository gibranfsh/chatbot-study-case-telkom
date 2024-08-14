"use client";
import { FC, useState } from 'react';
import ChatBox from '../components/ChatBox';
import QuestionRecommendations from '../components/QuestionRecommendations';
import Sidebar from '../components/Sidebar';

interface Message {
    sender: string;
    content: string;
}

interface Conversation {
    id: string;
    title: string;
    created_at: string;
    messages: Message[];
}

const Home = ({ conversations: propConversations }: { conversations: Conversation[] }) => {
    const [conversations, setConversations] = useState<Conversation[]>(propConversations);
    const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);

    const dummyQuestions = [
        "How are you?",
        "Tell me about the weather today.",
        "How does ChatGPT work?",
        `What${"'"}s new in technology?`,
    ];

    const selectedConversation = conversations.find(conv => conv.id === selectedConversationId);

    const handleAddConversation = () => {
        setSelectedConversationId(null);
    };

    const sendMessage = async (message: string) => {
        try {
            const userMessage: Message = { sender: 'user', content: message };

            if (selectedConversationId) {
                const updatedConversations = conversations.map(conv =>
                    conv.id === selectedConversationId
                        ? { ...conv, messages: [...conv.messages, userMessage] }
                        : conv
                );

                setConversations(updatedConversations);
                setLoading(true);

                await fetch(`http://localhost:8000/api/conversations/${selectedConversationId}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userMessage),
                });

                const response = await fetch('http://localhost:11434/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'llama3:latest',
                        prompt: message,
                        stream: false,
                    }),
                });

                const data = await response.json();
                const assistantMessage: Message = { sender: 'assistant', content: data.response };

                const updatedWithResponse = updatedConversations.map(conv =>
                    conv.id === selectedConversationId
                        ? { ...conv, messages: [...conv.messages, assistantMessage] }
                        : conv
                );

                setConversations(updatedWithResponse);

                await fetch(`http://localhost:8000/api/conversations/${selectedConversationId}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(assistantMessage),
                });

                setLoading(false);
            } else {
                const newConversationResponse = await fetch('http://localhost:8000/api/conversations', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ title: userMessage.content }),
                });

                const newConversationData = await newConversationResponse.json();

                const updatedConversations = [...conversations, {
                    id: newConversationData.id,
                    title: userMessage.content,
                    created_at: new Date().toISOString(),
                    messages: [userMessage],
                }];

                handleConversationSelect(newConversationData.id);
                setConversations(updatedConversations);
                setLoading(true);

                await fetch(`http://localhost:8000/api/conversations/${newConversationData.id}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(userMessage),
                });

                const llmResponse = await fetch('http://localhost:11434/api/generate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        model: 'llama3:latest',
                        prompt: message,
                        stream: false,
                    }),
                });

                const data = await llmResponse.json();
                const assistantMessage: Message = { sender: 'assistant', content: data.response };

                const updatedWithResponse = updatedConversations.map(conv =>
                    conv.id === newConversationData.id
                        ? { ...conv, messages: [...conv.messages, assistantMessage] }
                        : conv
                );

                setConversations(updatedWithResponse);

                await fetch(`http://localhost:8000/api/conversations/${newConversationData.id}/messages`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(assistantMessage),
                });

                setLoading(false);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            setLoading(false);
        }
    };

    const handleQuestionSelect = async (question: string) => {
        await sendMessage(question);
    };

    const handleConversationSelect = (id: string) => {
        setSelectedConversationId(id);
    };

    return (
        <div className="flex h-screen bg-gray-200">
            <Sidebar
                conversations={conversations}
                onSelect={handleConversationSelect}
                selectedConversationId={selectedConversationId}
                onAddConversation={handleAddConversation}
            />
            <main className="flex-1 flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
                <div className="w-full max-w-4xl bg-white p-4 rounded-lg shadow-md flex flex-col h-full">
                    <ChatBox
                        messages={selectedConversation ? selectedConversation.messages : []}
                        onSendMessage={sendMessage}
                        loading={loading}
                    />
                    {!selectedConversation && (
                        <QuestionRecommendations
                            questions={dummyQuestions}
                            onSelect={handleQuestionSelect}
                        />
                    )}
                </div>
            </main>
        </div>
    );
};

export default Home;

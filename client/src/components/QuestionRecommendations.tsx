"use client";
import { FC } from 'react';

interface QuestionRecommendationsProps {
    questions: string[];
    onSelect: (question: string) => void;
}

const QuestionRecommendations: FC<QuestionRecommendationsProps> = ({ questions, onSelect }) => {
    return (
        <div className="mt-4 p-4 bg-white rounded-lg shadow-md space-y-2">
            <h2 className="text-lg text-black font-semibold">Question Recommendations</h2>
            <ul className="space-y-2">
                {questions.map((question, index) => (
                    <li
                        key={index}
                        className="p-2 bg-gray-100 rounded-lg cursor-pointer text-black hover:bg-blue-500 hover:text-white transition"
                        onClick={() => onSelect(question)}
                    >
                        {question}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionRecommendations;

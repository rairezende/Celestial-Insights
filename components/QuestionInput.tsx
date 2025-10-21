import React, { useState } from 'react';

interface QuestionInputProps {
  onSubmit: (question: string) => void;
  isLoading: boolean;
}

const QuestionInput: React.FC<QuestionInputProps> = ({ onSubmit, isLoading }) => {
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (question.trim() && !isLoading) {
      onSubmit(question.trim());
    }
  };

  return (
    <div className="w-full max-w-lg text-center p-4 animate-fade-in">
      <h2 className="text-2xl text-yellow-200/90 mb-4">What guidance do you seek?</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Focus your mind and type your question here..."
          className="w-full h-32 p-4 bg-black/30 border-2 border-purple-400/50 rounded-lg text-lg text-purple-200 placeholder-purple-300/50 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !question.trim()}
          className="mt-6 px-8 py-4 bg-purple-500/20 border-2 border-purple-400 rounded-full text-lg text-purple-200 font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)] hover:bg-purple-500/40 hover:shadow-[0_0_25px_rgba(192,132,252,0.6)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
        >
          {isLoading ? 'Consulting...' : 'Ask the Cosmos'}
        </button>
      </form>
    </div>
  );
};

export default QuestionInput;

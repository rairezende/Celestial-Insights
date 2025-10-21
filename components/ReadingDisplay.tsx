import React from 'react';

interface ReadingDisplayProps {
  reading: string;
}

const ReadingDisplay: React.FC<ReadingDisplayProps> = ({ reading }) => {
  const formatReading = (text: string) => {
    // Split by newlines and filter out empty lines
    const paragraphs = text.split('\n').filter(p => p.trim() !== '');
    
    return paragraphs.map((paragraph, index) => {
      // Check for headings like **The Past - The Fool (Upright):**
      if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
        return (
          <h3 key={index} className="text-xl font-bold text-yellow-200 mt-6 mb-2">
            {paragraph.slice(2, -2)}
          </h3>
        );
      }
      // Handle other potential bolding within paragraphs
      const parts = paragraph.split(/(\*.*?\*)/g);
      return (
        <p key={index} className="mb-4 last:mb-0">
          {parts.map((part, i) => {
            if (part.startsWith('*') && part.endsWith('*')) {
              return <strong key={i} className="text-purple-100">{part.slice(1, -1)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-black/30 backdrop-blur-sm border border-purple-400/50 rounded-lg p-6 md:p-8 mt-4 animate-fade-in">
      <div className="prose prose-invert prose-p:text-purple-200 text-left">
        {formatReading(reading)}
      </div>
    </div>
  );
};

export default ReadingDisplay;

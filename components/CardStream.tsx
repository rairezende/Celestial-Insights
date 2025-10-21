import React from 'react';
import { TarotCard } from '../types';

interface CardStreamProps {
  cards: TarotCard[];
  onSelectCard: (card: TarotCard) => void;
}

const CardStream: React.FC<CardStreamProps> = ({ cards, onSelectCard }) => {
  return (
    <div 
      className="w-full max-w-4xl max-h-[40vh] overflow-y-auto p-4 my-4 bg-black/20 rounded-lg border border-purple-500/30"
      aria-label="Card selection area"
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {cards.map((card) => (
          <button
            key={card.name}
            onClick={() => onSelectCard(card)}
            className="w-16 h-24 sm:w-20 sm:h-28 rounded-md border-2 border-purple-400 bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-800 shadow-lg shadow-purple-500/20 p-1 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-yellow-400/30 hover:border-yellow-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-label="Select a face-down card"
          >
            <div className="w-full h-full border border-purple-300/50 rounded-sm"></div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardStream;
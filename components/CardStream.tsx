import React from 'react';
import { TarotCard } from '../types';
import { CardBack } from '../assets/index.ts';



interface CardStreamProps {
  cards: TarotCard[];
  onSelectCard: (card: TarotCard) => void;
}

const CardStream: React.FC<CardStreamProps> = ({ cards, onSelectCard }) => {
  return (
    <div 
      className="w-full max-w-4xl max-h-[40vh] overflow-y-auto p-4 my-4 bg-black/20 rounded-lg border border-stone-500/30"
      aria-label=" area"
    >
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {cards.map((card) => (
          <button
          
            key={card.name}
            onClick={() => onSelectCard(card)}
            className="w-16 h-24 sm:w-20 sm:h-28 rounded-md border-2 border-stone-500 cursor-pointer transition-all duration-200 hover:scale-105 hover:shadow-blue-400/30 hover:border-blue-300 focus:outline-none focus:ring-2 focus:ring-yellow-300"
            aria-label="Select a face-down card"
          >
            <img src={CardBack}/>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CardStream;
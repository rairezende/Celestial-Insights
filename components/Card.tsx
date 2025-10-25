import React from 'react';
import { DrawnCard } from '../types';
import { CardBack } from '../assets/index.ts';

interface CardProps {
  drawnCard: DrawnCard;
}

const Card: React.FC<CardProps> = ({ drawnCard }) => {
  const { card, orientation, isFlipped, position } = drawnCard;

  return (
    <div className="w-full max-w-[160px] sm:max-w-[180px] h-full group mx-auto">
      <div 
        className={`relative w-full h-full transition-transform duration-1000 transform-style-preserve-3d ${isFlipped ? 'rotate-y-180' : ''}`}
      >
        {/* Card Back */}
        <div className="absolute w-full h-full backface-hidden rounded-xl border-2 border-stone-400 bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-800 shadow-2xl shadow-purple-500/20 flex items-center justify-center p-2">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-10 my-8 justify-center items-center h-72 sm:h-80 perspective-1000">
            <img src={CardBack}>
            </img>
          </div>
        </div>
        
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl border-2 border-stone-400 bg-gray-800 shadow-2xl shadow-yellow-500/30 flex flex-col overflow-hidden">
          <div className="flex-grow bg-black flex items-center justify-center">
            <img 
                src={card.cardImg} 
                alt={card.name} 
                className={`w-full h-full object-cover transition-transform duration-500 ${orientation === 'Reversed' ? 'rotate-180' : ''}`}
            />
          </div>
          <div className="p-2 text-center bg-gray-900">
            <h3 className="text-sm font-bold text-stone-300 truncate">{card.name}</h3>
            {/* <p className="text-xs text-purple-300">{orientation}</p> */}
          </div>
        </div>
      </div>
      <p className="text-center mt-3 font-bold text-blue-900 truncate">{position.name}</p>
    </div>
  );
};

export default Card;

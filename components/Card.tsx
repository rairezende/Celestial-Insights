import React from 'react';
import { DrawnCard } from '../types';

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
        <div className="absolute w-full h-full backface-hidden rounded-xl border-2 border-purple-400 bg-gradient-to-br from-indigo-700 via-purple-700 to-slate-800 shadow-2xl shadow-purple-500/20 flex items-center justify-center p-2">
           <div className="w-full h-full border border-purple-300/50 rounded-lg flex items-center justify-center">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-yellow-200/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.293 2.293a1 1 0 01-1.414 1.414L12 6.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 5H13.414L12 3.586 10.293 5.293a1 1 0 01-1.414-1.414L12 2.586l1.707 1.707a1 1 0 011.414 1.414L13 8.414l-2.293-2.293a1 1 0 01-1.414 1.414L12 10.414l-2.293-2.293a1 1 0 01-1.414 1.414L12 13.414l2.293 2.293a1 1 0 011.414-1.414L12 11.586l2.293 2.293a1 1 0 01-1.414 1.414L12 12.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 11H13.414L12 12.414l1.707-1.707a1 1 0 011.414 1.414L13 15.414l-2.293-2.293a1 1 0 01-1.414 1.414L12 17.414l-2.293-2.293a1 1 0 01-1.414 1.414L12 20.414l2.293-2.293a1 1 0 011.414 1.414L13 21.414l-2.293-2.293a1 1 0 01-1.414 1.414L12 22.414" />
             </svg>
           </div>
        </div>
        
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-xl border-2 border-yellow-300 bg-gray-800 shadow-2xl shadow-yellow-500/30 flex flex-col overflow-hidden">
          <div className="flex-grow bg-black flex items-center justify-center">
            <img 
                src={card.cardImg} 
                alt={card.name} 
                className={`w-full h-full object-cover transition-transform duration-500 ${orientation === 'Reversed' ? 'rotate-180' : ''}`}
            />
          </div>
          <div className="p-2 text-center bg-gray-900">
            <h3 className="text-sm font-bold text-yellow-200 truncate">{card.name}</h3>
            {/* <p className="text-xs text-purple-300">{orientation}</p> */}
          </div>
        </div>
      </div>
      <p className="text-center mt-3 font-bold text-purple-200 truncate">{position.name}</p>
    </div>
  );
};

export default Card;

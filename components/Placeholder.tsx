import React from 'react';
import { SpreadPosition } from '../types';

interface PlaceholderProps {
    position: SpreadPosition;
}

const Placeholder: React.FC<PlaceholderProps> = ({ position }) => {
    return (
        <div className="w-full max-w-[160px] sm:max-w-[180px] h-full mx-auto flex flex-col justify-between items-center group">
            <div className="w-full h-full bg-black/20 border-2 border-dashed border-purple-400/40 rounded-xl flex items-center justify-center p-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-purple-400/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <p className="text-center mt-3 font-bold text-purple-200/70 truncate">{position.name}</p>
        </div>
    );
};

export default Placeholder;

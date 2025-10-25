import React from 'react';
import { SpreadPosition } from '../types';

interface PlaceholderProps {
    position: SpreadPosition;
}

const Placeholder: React.FC<PlaceholderProps> = ({ position }) => {
    return (
        <div className="w-full max-w-[160px] sm:max-w-[180px] h-full mx-auto flex flex-col justify-between items-center group">
            <div className="w-full h-full bg-black/20 border-2 border-dashed border-stone-400/40 rounded-xl flex items-center justify-center p-4">
            </div>
            <p className="text-center mt-3 font-bold text-stone-900/70 truncate">{position.name}</p>
        </div>
    );
};

export default Placeholder;

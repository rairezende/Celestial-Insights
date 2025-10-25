
import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 py-4">
      <div className="relative w-16 h-16">
        <div className="absolute border-4 border-blue-800 border-t-transparent rounded-full w-full h-full animate-spin"></div>
        <div className="absolute border-4 border-stone-400 border-b-transparent rounded-full w-10 h-10 top-3 left-3 animate-spin-reverse"></div>
      </div>
      <p className="text-blue-900 text-lg">Interpreting the cosmic threads...</p>
    </div>
  );
};

export default Loader;

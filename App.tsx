import React, { useState, useCallback, useMemo } from 'react';
import { DrawnCard, Spread, TarotCard } from './types';
import { TAROT_DECK } from './constants/tarotDeck';
import { getTarotReading, getSpreadForQuestion } from './services/geminiService';
import Card from './components/Card';
import Header from './components/Header';
import ReadingDisplay from './components/ReadingDisplay';
import Loader from './components/Loader';
import QuestionInput from './components/QuestionInput';
import CardStream from './components/CardStream';
import Placeholder from './components/Placeholder';

type GameState = 'QUESTION' | 'SELECTING_SPREAD' | 'CARD_SELECTION' | 'REVEALING' | 'READING';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>('QUESTION');
  const [question, setQuestion] = useState<string>('');
  const [spread, setSpread] = useState<Spread | null>(null);
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [reading, setReading] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const availableCards = useMemo(() => {
    const drawnCardNames = new Set(drawnCards.map(c => c.card.name));
    return TAROT_DECK.filter(card => !drawnCardNames.has(card.name));
  }, [drawnCards]);

  const handleReset = () => {
    setGameState('QUESTION');
    setQuestion('');
    setSpread(null);
    setDrawnCards([]);
    setReading(null);
    setIsLoading(false);
    setError(null);
  }

  const handleQuestionSubmit = useCallback(async (submittedQuestion: string) => {
    setIsLoading(true);
    setError(null);
    setGameState('SELECTING_SPREAD');
    setQuestion(submittedQuestion);

    try {
      const newSpread = await getSpreadForQuestion(submittedQuestion);
      setSpread(newSpread);
      setGameState('CARD_SELECTION');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setGameState('QUESTION');
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  const handleSelectCard = useCallback((selectedCard: TarotCard) => {
    if (!spread || drawnCards.length >= spread.positions.length) return;

    const newCard: DrawnCard = {
      card: selectedCard,
      orientation: Math.random() > 0.5 ? 'Upright' : 'Reversed',
      isFlipped: false,
      position: spread.positions[drawnCards.length],
    };

    setDrawnCards(prev => [...prev, newCard]);

  }, [spread, drawnCards]);

  const handleRevealAndRead = useCallback(async () => {
    if (!spread || !question) return;

    setGameState('REVEALING');
    setIsLoading(true);
    setError(null);
    
    // Animate flips with delays
    for (let i = 0; i < drawnCards.length; i++) {
        await new Promise(res => setTimeout(res, 400));
        setDrawnCards(prev => {
            const newCards = [...prev];
            if (newCards[i]) {
            newCards[i].isFlipped = true;
            }
            return newCards;
        });
    }
    
    await new Promise(res => setTimeout(res, 500));
    setGameState('READING');

    try {
      const finalDrawnCards = drawnCards.map(c => ({...c, isFlipped: true}));
      const generatedReading = await getTarotReading(question, spread, finalDrawnCards);
      setReading(generatedReading);
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [drawnCards, question, spread]);


  const cardsToSelect = spread ? spread.positions.length - drawnCards.length : 0;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-300 via-stone-200 to-stone-300 text-stone-100 font-serif antialiased overflow-x-hidden">
      <div className="relative z-10 flex flex-col items-center min-h-screen p-4 sm:p-6">
        <Header />
        <main className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
          
            {gameState === 'QUESTION' && <QuestionInput onSubmit={handleQuestionSubmit} isLoading={isLoading} />}
            {(gameState === 'SELECTING_SPREAD' || (isLoading && gameState === 'READING')) && <Loader />}
            
            {(gameState === 'CARD_SELECTION' || gameState === 'REVEALING' || gameState === 'READING') && spread && (
              <div className="grid grid-cols-2 md:grid-cols-3  gap-4 sm:gap-10 my-8  justify-center items-center h-72 sm:h-80 perspective-1000">
                {drawnCards.map((card) => (
                    <Card key={card.position.name} drawnCard={card} />
                ))}
                {Array.from({ length: cardsToSelect }).map((_, i) => {
                    const position = spread.positions[drawnCards.length + i];
                    return <Placeholder key={position.name} position={position} />
                })}
              </div>
            )}

            {gameState === 'CARD_SELECTION' && spread && cardsToSelect > 0 && (
                <div className="text-center flex flex-col items-center">
                    <p className="text-lg text-blue-300/90 mb-2">Select a card for: <span className="font-bold">{spread.positions[drawnCards.length].name}</span></p>
                    <CardStream cards={availableCards} onSelectCard={handleSelectCard} />
                </div>
            )}

            {gameState === 'CARD_SELECTION' && cardsToSelect === 0 && (
                 <div className="my-6">
                    <button
                    onClick={handleRevealAndRead}
                    className="px-8 py-4 bg-stone-500/20 border-2 border-stone-400 rounded-full text-lg text-purple-200 font-bold shadow-[0_0_15px_rgba(192,132,252,0.4)] hover:bg-purple-500/40 hover:shadow-[0_0_25px_rgba(192,132,252,0.6)] transition-all duration-300"
                    >
                    Reveal Cards & Read Fate
                    </button>
                </div>
            )}

            <div className="w-full mt-4">
                {error && <div className="text-center p-4 bg-red-900/50 border border-red-500 rounded-lg text-red-200">{error}</div>}
                {reading && !isLoading && gameState === 'READING' && (
                  <>
                    <ReadingDisplay reading={reading} />
                    <button onClick={handleReset} className="mt-8 px-6 py-3 bg-purple-500/20 border-2 border-stone-400 rounded-full text-md text-purple-200 font-bold hover:bg-purple-500/40 transition-all duration-300">
                      Ask Another Question
                    </button>
                  </>
                )}
            </div>
        </main>
        
        <footer className="w-full text-center p-4 text-gray-400 text-sm mt-auto">
          <p>Designed by Rai Rezende. Powered by Gemini.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
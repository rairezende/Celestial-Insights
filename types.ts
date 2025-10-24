export interface TarotCard {
  name: string;
  cardImg: string;
}

export interface SpreadPosition {
    name: string;
    description: string;
}

export interface Spread {
    spreadName: string;
    positions: SpreadPosition[];
}

export interface DrawnCard {
  card: TarotCard;
  orientation: 'Upright' | 'Reversed';
  isFlipped: boolean;
  position: SpreadPosition;
}
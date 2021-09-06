import { SquareColors } from '../../constants';

interface SimonState {
  // The square currently being animated
  activeSquare: SquareColors | null;
  // Number of square the player needs to remember
  patternLength: number;
  // Count of the times a player has played simon says in a single session
  roundsPlayed: number;
  // The indicies of the squares the player must remember
  pattern: number[];
  // The indicies of the squares the player selected when remembering the pattern
  userChoices: number[];
  gameMessage: string;
  gameSpeed: number;
}

export default SimonState;

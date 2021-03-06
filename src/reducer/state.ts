import {
  GameStates,
  Messages,
  PLAYBACK_SPEED,
  SquareColors,
} from '../constants';
import { ValueOf } from '../typeHelpers';

export interface SimonState {
  // The square currently being animated
  activeSquare: SquareColors | null;
  // Number of square the player needs to remember
  initialPatternLength: number;
  // Count of the times a player has played simon says in a single session
  roundsPlayed: number;
  // The indicies of the squares the player must remember
  pattern: number[];
  // The indicies of the squares the player selected when remembering the pattern
  userChoices: number[];
  gameState: ValueOf<typeof GameStates>;
  gameMessage: string;
  gameSpeed: number;
  // Solo or two player mode. 1 for solo, 2 for 2-player
  gameMode: number;
  paused: boolean;
}

const initialState: SimonState = {
  activeSquare: null,
  gameState: GameStates.Idle,
  gameMessage: Messages.welcome,
  gameMode: 1,
  roundsPlayed: 1,
  pattern: [],
  initialPatternLength: 2,
  userChoices: [],
  gameSpeed: PLAYBACK_SPEED,
  paused: false,
};

export default initialState;

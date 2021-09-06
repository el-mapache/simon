import { GameStates } from './constants';

function isIdle(gameState: string) {
  return gameState === GameStates.Idle;
}

function isPlayback(gameState: string) {
  return gameState === GameStates.PlayBackPattern;
}

function isUserPlaying(gameState: string) {
  return gameState === GameStates.Input;
}

const GameHelpers = {
  isIdle,
  isUserPlaying,
  isPlayback,
};

export default GameHelpers;

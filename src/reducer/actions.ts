import { GameMessages, GameStates, Messages } from '../constants';
import { SimonState } from './state';
import { AppDispatch } from './types';

export const ActionTypes = {
  Restart: 'game/Restart',
  // Called when a new pattern is being generated
  SetPattern: 'game/SetPattern',
  StartPlayback: 'game/StartPlayback',
  AwaitInput: 'game/AwaitInput',
  // this calls middleware?
  // Specific action to update user square choice during game play
  UpdateUserInput: 'game/UpdateUserInput',
  // Generic action to update some field on the game state
  UpdateGameField: 'game/UpdateGameField',
  UpdateGame: 'game/UpdateGame',
  PatternMatchError: 'game/PatternMatchError',
  IncrementPattern: 'game/incrementPattern',
};

// Action creators
export const buildAppActions = (dispatch: AppDispatch) => {
  const actions = {
    restart() {
      dispatch({ type: ActionTypes.Restart, payload: {} });
    },
    awaitUserInput() {
      dispatch({
        type: ActionTypes.UpdateGame,
        payload: {
          update: {
            gameState: GameStates.Input,
            gameMessage: Messages[GameMessages.Input],
          },
        },
      });
    },
    initializePattern() {
      dispatch({ type: ActionTypes.SetPattern, payload: {} });
      dispatch({
        type: ActionTypes.UpdateGame,
        payload: {
          update: {
            gameState: GameStates.PlayBackPattern,
            gameMessage: Messages[GameMessages.PlayingBack],
          },
        },
      });
    },
    incrementPattern() {
      dispatch({ type: ActionTypes.IncrementPattern, payload: {} });
      dispatch({
        type: ActionTypes.UpdateGame,
        payload: {
          update: {
            gameState: GameStates.PlayBackPattern,
            gameMessage: Messages[GameMessages.PlayingBack],
          },
        },
      });
    },
    setPlayback() {
      dispatch({
        type: ActionTypes.UpdateGame,
        payload: {
          update: {
            gameState: GameStates.PlayBackPattern,
            gameMessage: Messages[GameMessages.PlayingBack],
          },
        },
      });
    },
    patternMatchError() {
      dispatch({
        type: ActionTypes.PatternMatchError,
        payload: {
          gameState: GameStates.PatternMatchError,
          activeSquare: null,
          gameMessage: Messages[GameMessages.Loss],
        },
      });
    },
    // Update the user input array
    updateUserInput(squareIndex: number) {
      dispatch({
        type: ActionTypes.UpdateUserInput,
        payload: {
          squareIndex,
        },
      });
    },
    updateGameState(update: Record<keyof SimonState, any>) {
      dispatch({
        type: ActionTypes.UpdateGame,
        payload: {
          update,
        },
      });
    },
  };
  return actions;
};

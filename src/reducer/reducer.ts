import { Squares, GameStates } from '../constants';
import GameHelpers from '../gameHelpers';
import { times, sample } from '../utils';
import { ActionTypes } from './actions';
import initialState, { SimonState } from './state';
import { AppAction } from './types';

export default function reducer(state: SimonState, action: AppAction) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.UpdateGame: {
      return {
        ...state,
        ...payload.update,
      };
    }
    case ActionTypes.UpdateGameField: {
      return {
        ...state,
        [payload.field]: payload.value,
      };
    }
    case ActionTypes.SetPattern: {
      const nextPattern = times<number>(state.initialPatternLength, () =>
        Squares.indexOf(sample(Squares))
      );

      return {
        ...state,
        gameState: GameStates.MakePattern,
        pattern: nextPattern,
        userChoices: [],
      };
    }
    case ActionTypes.IncrementPattern: {
      const currentPattern = state.pattern.slice();
      const nextPattern = [...currentPattern, Squares.indexOf(sample(Squares))];

      return {
        ...state,
        roundsPlayed: state.roundsPlayed++,
        userChoices: [],
        paused: true,
        pattern: nextPattern,
      };
    }
    case ActionTypes.UpdateUserInput: {
      // Ignore user input if the game is in playback mode,
      // or if the user is attempting some kind of rapid-fire button pushing
      if (
        GameHelpers.isPlayback(state.gameState) ||
        (state.pattern.length &&
          state.userChoices.length === state.pattern.length)
      ) {
        return state;
      }

      return {
        ...state,
        userChoices: state.userChoices.concat([payload.squareIndex]),
      };
    }
    case ActionTypes.PatternMatchError: {
      return {
        ...state,
        ...payload,
      };
    }
    case ActionTypes.Restart: {
      return {
        ...initialState,
      };
    }
    default: {
      return state;
    }
  }
}

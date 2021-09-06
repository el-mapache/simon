import { createContext, useContext } from 'react';
import { AppActionCreators } from './types';
import initialState, { SimonState } from './state';

interface GameContextState {
  state: SimonState;
  actions: AppActionCreators;
}

const GameContext = createContext<GameContextState>({
  state: initialState,
  actions: {},
});

function useGameContext() {
  const value = useContext(GameContext);

  if (!value) {
    throw new Error('Must be called from a Game provider');
  }

  return value;
}

export { GameContext };
export default useGameContext;

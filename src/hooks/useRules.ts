import { GameStates } from '../constants';
import { useEffect } from 'react';
import useGameContext from 'reducer/context';

function useRules() {
  const { state, actions } = useGameContext();

  useEffect(() => {
    function checkPattern(userChoices: number[], pattern: number[]) {
      return userChoices.every((choice) =>
        pattern.every((square) => choice === square)
      );
    }

    if (state.gameState !== GameStates.Input) {
      return;
    }

    const wasMatch = checkPattern(state.userChoices, state.pattern);

    if (!wasMatch) {
      actions.patternMatchError();
    } else {
      actions.incrementPattern();
    }
  }, [state.userChoices, state.gameState, state.pattern]);
}

export default useRules;

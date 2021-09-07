import { GameStates } from '../constants';
import { useEffect } from 'react';
import useGameContext from 'reducer/context';

/**
 * These simple rules define the single player experience.
 * If the user is not playing i.e. not inputting a pattern back to the game,
 * this is a noop
 *
 * Otherwise, each time the user clicks a square, we:
 * 1). determine if the correct sqaure was pushed at the correct point in the pattern.
 * If it wasn't, the game immediately ends
 * 2). Check to see if the length of the user's input matches the length of the pattern.
 * If it does, we know the user has input everything correctly and the pattern can be incremented
 */
function useRules() {
  const { state, actions } = useGameContext();

  useEffect(() => {
    if (state.gameState !== GameStates.Input) {
      return;
    }

    if (
      state.userChoices.some((choice, index) => choice !== state.pattern[index])
    ) {
      actions.patternMatchError();
      return;
    }

    if (state.userChoices.length === state.pattern.length) {
      actions.incrementPattern();
    }
  }, [actions, state.userChoices, state.gameState, state.pattern]);
}

export default useRules;

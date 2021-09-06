import { playTone } from '../audio';
import { Squares } from '../constants';
import GameHelpers from '../gameHelpers';
import useGameContext from '../reducer/context';

function usePlayerInput() {
  const { state, actions } = useGameContext();

  function onClick(squareIndex: number) {
    if (GameHelpers.isPlayback(state.gameState)) {
      // Dont allow the user to push the buttons during a playback sequence
      return;
    }
    // Is the user playing the game, or just pushing buttons?
    if (GameHelpers.isUserPlaying(state.gameState)) {
      // use the current length of user choices array to determine which
      // 'slot' in the pattern array the last pushed square should be checked against.
      // E.g. if the user choices array length is 4, the user has pushed 4 squares and will
      // now be attempting to match the fifth slot in the pattern.
      const patternIndexToCheck = state.userChoices.length;

      if (state.pattern[patternIndexToCheck] === squareIndex) {
        actions.updateUserInput(squareIndex);
      } else {
        actions.patternMatchError();
      }
    }

    if (state.activeSquare !== Squares[squareIndex]) {
      actions.updateGameState({ activeSquare: Squares[squareIndex] });
      playTone(Squares[squareIndex]);
    }
  }

  return { onClick };
}

export default usePlayerInput;

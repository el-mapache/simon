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
      actions.updateUserInput(squareIndex);
    }

    if (state.activeSquare !== Squares[squareIndex]) {
      actions.updateGameState({ activeSquare: Squares[squareIndex] });
      playTone(Squares[squareIndex], state.gameSpeed);
    }
  }

  return { onClick };
}

export default usePlayerInput;

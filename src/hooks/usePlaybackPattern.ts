import { useCallback, useEffect, useRef } from 'react';
import { playTone } from '../audio';
import { GameStates, Squares } from '../constants';
import GameHelpers from '../gameHelpers';
import useGameContext from '../reducer/context';

function usePlaybackPattern(pattern: number[]) {
  const currentIndex = useRef(-1);

  const { state, actions } = useGameContext();
  const updateGameState = useCallback(actions.updateGameState, []);
  const awaitUserInput = useCallback(actions.awaitUserInput, []);

  useEffect(() => {
    let timeout: number;

    function dequeue() {
      // Ensure no squares on the board stay active when not plying back a pattern
      // we dont update the gameState here because we only want to prevent squares from
      // displaying as active, and prevent a pattern playback from being triggered
      if (!GameHelpers.isPlayback(state.gameState)) {
        updateGameState({ activeSquare: null });
        return;
      }

      if (currentIndex.current >= pattern.length - 1) {
        updateGameState({ activeSquare: null });
        awaitUserInput();
        return;
      }

      currentIndex.current += 1;
      const nextTone = Squares[pattern[currentIndex.current]];
      updateGameState({
        activeSquare: nextTone,
        gameState: GameStates.PlayBackPattern,
      });
      playTone(nextTone);

      timeout = setTimeout(() => {
        dequeue();
      }, 1000);
    }

    dequeue();

    return () => {
      clearTimeout(timeout);
    };
  }, [pattern, state.gameState, awaitUserInput, updateGameState]);
}

export default usePlaybackPattern;

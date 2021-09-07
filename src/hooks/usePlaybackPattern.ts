import { useCallback, useEffect, useRef } from 'react';
import { playTone } from '../audio';
import { GameStates, Squares } from '../constants';
import GameHelpers from '../gameHelpers';
import useGameContext from '../reducer/context';

const GAME_RESTART_TIMEOUT = 1000;

/**
 * Simulates a queue controlled via `setTimeout` and a counter to sync playing the tones
 * associated with each square back to the player in sequence
 */
function usePlaybackPattern() {
  const playbackPosition = useRef(-1);

  const { state, actions } = useGameContext();
  const updateGameState = useCallback(actions.updateGameState, []);
  const awaitUserInput = useCallback(actions.awaitUserInput, []);

  useEffect(() => {
    const pattern = state.pattern;
    let timeout: number;

    function dequeue() {
      // Ensure no squares on the board stay active when not plying back a pattern.
      // We dont update the gameState here because we only want to prevent squares from
      // displaying as active, and prevent a pattern playback from being triggered
      if (!GameHelpers.isPlayback(state.gameState)) {
        updateGameState({ activeSquare: null });
        return;
      }

      // We have played through the pattern for the user
      if (playbackPosition.current >= pattern.length - 1) {
        updateGameState({ activeSquare: null });
        awaitUserInput();
        // Assume the user correctly repeats the pattern
        // We want this reset so that we can play through the entire
        // pattern, including the new square.
        playbackPosition.current = -1;
        return;
      }

      playbackPosition.current += 1;
      const nextTone = Squares[pattern[playbackPosition.current]];
      updateGameState({
        activeSquare: nextTone,
        gameState: GameStates.PlayBackPattern,
      });
      playTone(nextTone);

      timeout = setTimeout(() => {
        dequeue();
      }, state.gameSpeed);
    }

    // Ensure we wait for some amount of time before allowing the game to play
    // back the tones
    if (state.paused) {
      timeout = setTimeout(
        () => updateGameState({ paused: false }),
        GAME_RESTART_TIMEOUT
      );
    } else {
      dequeue();
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [
    state.pattern,
    state.gameState,
    state.paused,
    awaitUserInput,
    updateGameState,
  ]);
}

export default usePlaybackPattern;

import React from 'react';
import styled from 'styled-components';
import { GameStateMessages, GameStates } from '../constants';
import useGameContext from '../reducer/context';
import { ValueOf } from '../typeHelpers';

const GameButton = styled.button<{ disable?: boolean; hide?: boolean }>`
  background: white;
  border: none;
  border-radius: 6px;
  box-shadow: inset 0px 0px 4px rgba(200, 200, 200, 0.5);
  ${({ disable, hide }) => {
    let opacity = 1;
    if (hide) {
      opacity = 0;
    } else if (disable) {
      opacity = 0.4;
    }

    return {
      opacity,
      pointerEvents: disable || hide ? 'none' : 'initial',
    };
  }}
  font-size: 1rem;
  font-weight: 500;
  height: 2rem;
  line-height: 1rem;
  outline: none;
  padding: 0.5rem;
  width: fit-content;

  &:hover {
    cursor: pointer;
  }
`;

const controlsEnabled = (gameState: ValueOf<typeof GameStates>) => {
  return (
    gameState === GameStates.Idle || gameState === GameStates.PatternMatchError
  );
};

function GameControls() {
  const { state, actions } = useGameContext();
  const action = (() => {
    switch (state.gameState) {
      case GameStates.Idle:
      case GameStates.PatternMatchError: {
        return actions.initializePattern;
      }
      default: {
        return () => ({});
      }
    }
  })();

  return (
    <GameButton
      onClick={() => action()}
      disable={!controlsEnabled(state.gameState)}
      style={{ marginTop: '2rem' }}
    >
      {GameStateMessages[state.gameState]}
    </GameButton>
  );
}

export default GameControls;

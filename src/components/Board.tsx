import React from 'react';
import styled from 'styled-components';

import { Column, Row } from '../styles/Style';
import Square from './Square';
import useGameContext from '../reducer/context';
import { throttle } from '../utils';
import { playbackSpeed, SquareColors, Squares } from '../constants';
import usePlaybackPattern from '../hooks/usePlaybackPattern';
import usePlayerInput from '../hooks/usePlayerInput';

const BoardContainer = styled(Column)`
  align-items: center;
  margin-top: 2rem;
`;

function Board() {
  const { state, actions } = useGameContext();
  const { onClick } = usePlayerInput();

  function getActiveSquare() {
    return Squares.indexOf(state.activeSquare as SquareColors);
  }

  function onAnimationEnd() {
    actions.updateGameState({ activeSquare: null });
  }

  const handleClick = throttle(onClick, playbackSpeed);

  usePlaybackPattern();

  return (
    <BoardContainer>
      <Row>
        {Squares.map((color, index) => {
          return (
            <Square
              bg={color}
              key={color}
              index={index}
              onClick={handleClick}
              onAnimateEnd={onAnimationEnd}
              active={getActiveSquare()}
            />
          );
        })}
      </Row>
    </BoardContainer>
  );
}

export default Board;

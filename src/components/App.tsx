import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import '../styles.css';
import useGameContext from '../reducer/context';
import { theme } from '../styles/theme';
import Board from './Board';
import GameControls from './GameControls';
import useRules from 'hooks/useRules';

const AppContainer = styled.div`
  background: ${({ theme }) => theme.main.backgound};
  color: ${({ theme }) => theme.main.color};
  height: 100%;
  width: 100%;
`;

const Container = styled.div`
  margin: 0 auto;
  width: fit-content;
`;

const SimonContainer = styled(Container)`
  text-align: center;
  padding-top: 2rem;
`;

const GameHeader = styled.h1`
  font-size: 1.5rem;
  font-weight: 600;
`;

const GameMessage = styled.h2`
  font-size: 2rem;
  font-weight: 500;
  margin-bottom: 1rem;
  margin-top: 1rem;
`;

/**
 * Simon says
 *
 *
 * Grid of 4 squares
 * Number of square to light up starts based on player skill level, 1-4
 * Each round:
 *   * generate a random pattern of squares to light up, with length of initialPatternLength
 *   * light up the number of squares
 *   * wait for user input
 *   * user can click on a square
 *   * if they click on the wrong square at any time,
 *     the game is over
 *        display a message and a resync prompt
 *   * if they click on the correct square, they continue
 *   * once they have clicked on all squares correctly, display message
 *   * message disappears after interval
 *   * increment pattern length
 *   * select a new pattern
 *   * repeat
 *
 */
export default function App() {
  const { state } = useGameContext();
  useRules();

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <SimonContainer>
          <GameHeader>Simon Says</GameHeader>
          <GameControls />
          <Board />
          <GameMessage>{state.gameMessage}</GameMessage>
        </SimonContainer>
      </AppContainer>
    </ThemeProvider>
  );
}

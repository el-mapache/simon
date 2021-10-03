import { GameStates } from '../constants';
import React, { ChangeEvent } from 'react';
import useGameContext from 'reducer/context';
import styled from 'styled-components';

const OptionsForm = styled.form<{ disabled?: boolean }>`
  border: 2px solid ${({ theme }) => theme.main.color};
  border-radius: 6px;
  margin-left: auto;
  margin-top: 1rem;
  margin-right: auto;
  padding: 0.5rem 0.25rem;
  width: 50%;

  * {
    ${({ disabled }) => disabled && 'opacity: .2;'}
  }
`;

const FormControl = styled.div`
  label {
    display: flex;
    flex-direction: column;
    padding-bottom: 0.5rem;
  }
`;

function GameOptions() {
  const { state, actions } = useGameContext();
  const disabled = state.gameState !== GameStates.Idle;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { value, id } = event.target;

    actions.updateGameState({ [id]: value });
  }

  return (
    <OptionsForm>
      <FormControl className="mb-1">
        <label htmlFor="gameSpeed">
          Set game speed (ms)
          <input
            type="range"
            id="gameSpeed"
            value={state.gameSpeed}
            max={1200}
            min={200}
            disabled={disabled}
            title={`${String(state.gameSpeed)} ms`}
            onChange={handleChange}
          />{' '}
          {state.gameSpeed} ms
        </label>
      </FormControl>
      <FormControl>
        <label htmlFor="patternLength">
          Set initial pattern length
          <input
            type="range"
            id="patternLength"
            value={state.initialPatternLength}
            max={10}
            min={state.initialPatternLength}
            title={`${String(state.initialPatternLength)} notes`}
            onChange={handleChange}
          />{' '}
          {state.initialPatternLength} notes
        </label>
      </FormControl>
    </OptionsForm>
  );
}

export default GameOptions;

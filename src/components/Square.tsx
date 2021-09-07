import React from 'react';
import styled from 'styled-components';
import OpacityAnimator from './OpacityAnimator';

const Square = styled.div<{ bg?: string }>`
  box-shadow: 0px 0px 0px 0px rgb(34, 34, 34), 0px 3px 7px 0px rgb(17, 17, 17),
    inset 0px 1px 1px 0px rgba(250, 250, 250, 0.1),
    inset 0px -10px 35px 5px rgba(0, 0, 0, 0.35);
  border-radius: 6px;
  background-color: ${({ theme, bg }) =>
    bg ? theme.main.squares[bg] : 'transparent'};
  height: 120px;
  margin: 0.25rem;
  transition: background-color 0.2s;
  width: 120px;

  &:hover {
    cursor: pointer;
  }
`;

const SQUARE_BORDER_RADII = [
  'top-left-square',
  'top-right-square',
  'bottom-left-square',
  'bottom-right-square',
];

/**
 * Most of these properties are self-explanatory, but the following two may not
 * be immediately obvious.
 *
 * @active - Is the square being animated?
 * @bg - The background color of the square
 */
interface Props {
  active: number;
  bg: string;
  index: number;
  onAnimateEnd: (flag: boolean) => void;
  onClick: (event: any) => void;
}

function SquareComponent(props: Props) {
  const { index, active, onClick, onAnimateEnd, ...rest } = props;

  function handleClick() {
    onClick(index);
  }

  return (
    <OpacityAnimator
      startValue={0.4}
      endValue={0.9}
      shouldAnimate={active === index}
      onDone={props.onAnimateEnd}
    >
      <Square
        {...rest}
        className={SQUARE_BORDER_RADII[index]}
        onMouseUp={handleClick}
      />
    </OpacityAnimator>
  );
}

export default SquareComponent;

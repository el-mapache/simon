import React from 'react';
import { useSpring, animated } from 'react-spring';

interface Props
  extends React.PropsWithChildren<{
    endValue: number;
    onDone: (...args: any[]) => void;
    startValue: number;
    duration?: number;
    shouldAnimate?: boolean;
  }> {}

/**
 * HoC that wraps an arbitrary component in a div with animated opacity.
 * @param props.endValue - Animation target
 * @param props.onDone - Callback which fires when animation is complete
 * @param props.startValue - Beginning value of the animation
 * @param props.duration? - Speed of the animation. defaults to 200ms
 * @param props.shouldAnimate? - Whether or not this component should animate. defaults to true
 * @returns React spring animated component which toggles opacity
 */
function OpacityAnimator(props: Props) {
  const {
    duration = 200,
    endValue,
    onDone,
    shouldAnimate = true,
    startValue,
  } = props;
  const spring = useSpring({
    opacity: shouldAnimate ? endValue : startValue,
    config: {
      duration,
    },
    onRest({ opacity }) {
      if (opacity === endValue) {
        onDone();
      }
    },
  });

  return <animated.div style={spring}>{props.children}</animated.div>;
}

export default OpacityAnimator;

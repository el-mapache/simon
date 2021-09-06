// @ts-nocheck
import {
  createMachine,
  state,
  state as final,
  reduce,
  transition,
  immediate,
  invoke,
  action,
  Machine,
  guard,
  Transition,
} from 'robot3';
import { Messages, SquareColors } from '../constants';
import MachineActionTypes from './actionTypes';
import MachineStates from './statesMap';
import SimonState from './types/simonState';

const initialState: SimonState = {
  activeSquare: null,
  gameMessage: Messages.welcome,
  roundsPlayed: 1,
  pattern: [],
  patternLength: 6,
  userChoices: [],
  gameSpeed: 750,
};

const nestedMachine = (to: string, states: Machine, ...args: any[]) =>
  invoke(states, transition('done', to, ...args));
const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Maybe the way simon is working here is off.
 * The game is a lot simpler than i am making it
 *
 * page loads
 *
 * 1. user sees a toggle with the rules, options, and a button to start the game
 *  options include altering gamespeed, starting pattern length
 *  user can interact with the squares to play a sound
 * 2. user pushes start button
 * 3. playback starts with a sequence of 2
 *    during playback a user cant do anything
 * 4. playback ends
 *    user presses buttons:
 *      if the pattern matches, go back to playback with 1 more square
 *      if the pattern does not match, tell the user they lost and go back to 1
 *
 *  metrics: games won, games lost, highest pattern matched, detailed breakdown of pattern length to each win or loss,
 *    what the hell, playback of a game
 *
 */

// const buttonMachine = createMachine({
//   buttonPress: state(
//     immediate(
//       'finished',
//       action(() => console.log('i play a sound')),
//       reduce((ctx: SimonState) => ({
//         ...ctx,
//       }))
//     )
//   ),
//   finished: final(),
// });

// /**
//  * Determines if a player has won
//  */
// const winMachine = createMachine({
//   idle: state(immediate('finished')),
// });

interface UserChoiceEvent {
  data: {
    choice: number;
  };
}
/**
 * Updates the context with the user's square selection
 */
// const userChoiceMachine = createMachine({
//   idle: state(
//     immediate(
//       'finished',
//       reduce((ctx: SimonState, ev: UserChoiceEvent) => {
//         const nextChoices = [...ctx.userChoices, ev.data.choice];

//         return {
//           ...ctx,
//           userChoices: nextChoices,
//         };
//       })
//     )
//   ),
//   finished: final(),
// checkChoiceCount: state(
//   immediate(
//     'didWin',
//     guard((ctx: SimonState) => ctx.userChoices.length === ctx.patternLength)
//   ),
//   immediate('correctChoice')
// ),
// didWin: state(
//   immediate(
//     'won',
//     guard((ctx: SimonState) => {
//       return ctx.pattern.every((choice, index) => ctx[index] === choice);
//     })
//   )
// ),
//});

/**
 * One thing I am missing here is the concept of prompts. We cant just have a random idle state,
 * because a user could be in an idle state in a couple of different circumstances.
 *
 * I suppose we could have idle states in different machines?
 *
 * Can prompts all live at the top state? Should i  make nested machines for different prompts?
 * I dont think a nested machine can access information from other machines, though
 *
 * There has to be a nested game machine.
 *
 * idle -> invoke a nested isWinner machine that checks if they won and has a transition
 * do the  button press, immeiately invoke a button press action side effect for graphics
 * next check if the user lost.
 * invoke isLoser machine that transitions to final loss state / new game  prrompt?
 * if lost go to lost state (final?)
 * if not go back to idle
 */
const machineState = {
  [MachineStates.Idle]: state(
    transition(
      MachineActionTypes.UserInput,
      MachineStates.ButtonPress,
      // this action is where we would play a sound?
      // issue is that we need to
      action(() => console.log('i played'))
    )
  ),
  [MachineStates.ButtonPress]: state(
    immediate(
      'playSound',
      reduce(
        (ctx: SimonState, ev: { data: { activeSquare: SquareColors } }) => ({
          ...ctx,
          activeSquare: ev.data.activeSquare,
        })
      )
    )
  ),
  playSound: invoke(
    (ctx: SimonState) => {
      console.log('anpiut to awiat');
      return wait(ctx.gameSpeed);
    },
    transition(
      'done',
      'idle',
      reduce((ctx: SimonState) => {
        console.log('whees');
        return {
          ...ctx,
          activeSquare: null,
        };
      })
    )
  ),
  // [MachineStates.PatternChoice]: state(
  //   transition(
  //     MachineActionTypes.UserInput,
  //     'updateUserChoice',
  //     action(() => console.log('playing sound')),
  //     reduce((ctx: SimonState, evt: { data: { square: SquareColors } }) => ({
  //       ...ctx,
  //       activeSquare: evt.data.square,
  //     }))
  //   )
  // ),
  // updateUserChoice: state(
  //   immediate(
  //     'checkWin',
  //     reduce((ctx: SimonState, ev: UserChoiceEvent) => {
  //       const nextChoices = [...ctx.userChoices, ev.data.choice];

  //       return {
  //         ...ctx,
  //         userChoices: nextChoices,
  //       };
  //     })
  //   )
  // ),
  // checkWin: state(
  //   immediate(
  //     'win',
  //     guard((ctx: SimonState) => {
  //       return ctx.pattern.every((choice, index) => ctx[index] === choice);
  //     })
  //   ),
  //   immediate('checkLoss')
  // ),
  // checkLoss: state(),
  //immediate('loss', guard)

  //nestedMachine('checkUserChoice', userChoiceMachine),

  // lossCheck: state(
  //   immediate(
  //     'loss',
  //     guard(/*didlose */ () => false)
  //   ),
  //   immediate('patternChoice')
  // ),
};

const machine = createMachine(machineState, () => ({ ...initialState }));

export default machine;

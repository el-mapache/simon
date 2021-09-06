import { buildAppActions } from './reducer/actions';
import { SubUnion } from './typeHelpers';

export type ActionMethods = keyof ReturnType<typeof buildAppActions>;

export const GameStates = {
  Idle: 'idle',
  PlayBackPattern: 'playBackPattern',
  MakePattern: 'makePattern',
  ReadyToPlay: 'readyToPlay',
  Input: 'input',
  PatternMatchError: 'patternMatchError',
};

export const GameColors = {
  Red: 'red',
  Yellow: 'yellow',
  Blue: 'blue',
  Green: 'green',
  White: 'white',
  Black: 'black',
  Transparent: 'transparent',
} as const;

type GameColorValues = typeof GameColors[keyof typeof GameColors];
export type SquareColors = SubUnion<
  GameColorValues,
  'red' | 'yellow' | 'green' | 'blue'
>;

export const ColorIndicies = Object.entries(GameColors).reduce(
  (colors, colorKey, color, index) => ({
    ...colors,
    [color]: index,
  }),
  {}
);

export const Squares = [
  GameColors.Green,
  GameColors.Red,
  GameColors.Yellow,
  GameColors.Blue,
];

const Notes = {
  A: 440.0,
  CSharp: 554.37,
  E: 329.63,
  EO: 659.26,
};

export const SquareColorToNote = {
  [GameColors.Blue]: Notes.E,
  [GameColors.Red]: Notes.A,
  [GameColors.Yellow]: Notes.CSharp,
  [GameColors.Green]: Notes.EO,
};

export enum GameMessages {
  Welcome = 'welcome',
  Start = 'start',
  Win = 'win',
  Loss = 'loss',
  Continue = 'continue',
  Pattern = 'pattern',
  Input = 'input',
  StartButton = 'startButton',
  Confirm = 'confirm',
  Cancel = 'cancel',
  Quit = 'quit',
  PlayingBack = 'playingBack',
  TryAgain = 'tryAgain',
}

export const Messages = {
  [GameMessages.Welcome]: "Let's play Simon Says.",
  [GameMessages.Win]: 'Great job!',
  [GameMessages.Continue]: 'Do you  want to keep going?',
  [GameMessages.Loss]: "You didn't match the pattern!",
  [GameMessages.Continue]: 'Would you like to try again?',
  [GameMessages.PlayingBack]: 'Watch the pattern carefully!',
  [GameMessages.Input]: 'Click the squares and repeat the pattern.',
};

export const GameControlsMessages = {
  [GameMessages.StartButton]: 'Start',
  [GameMessages.Confirm]: 'Yes',
  [GameMessages.Cancel]: 'No',
  [GameMessages.Continue]: 'Next round',
  [GameMessages.TryAgain]: 'Try again?',
  [GameMessages.Quit]: 'Quit',
  [GameMessages.PlayingBack]: '—',
  [GameStates.PlayBackPattern]: '—',
  [GameStates.Input]: '—',
  [GameStates.MakePattern]: '—',
};

export const GameStateMessages = {
  [GameStates.Idle]: GameControlsMessages[GameMessages.StartButton],
  [GameStates.MakePattern]: GameControlsMessages[GameStates.MakePattern],
  [GameStates.PlayBackPattern]: GameControlsMessages[GameMessages.PlayingBack],
  [GameStates.PatternMatchError]: GameControlsMessages[GameMessages.TryAgain],
};

export const playbackSpeed = 500;

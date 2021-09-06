import { GameStates } from './constants';

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
}

export const Messages = {
  [GameMessages.Welcome]: "Let's play Simon Says.",
  [GameMessages.Win]: 'Great job!',
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
  [GameMessages.Quit]: 'Quit',
  [GameMessages.PlayingBack]: '—',
};

/** String corresponding to the text for the buttons which control the game */
export const GameStateMessages = {
  [GameStates.Idle]: GameControlsMessages[GameMessages.StartButton],
  [GameStates.MakePattern]: GameControlsMessages[GameMessages.StartButton],
  [GameStates.PlayBackPattern]: GameControlsMessages[GameMessages.PlayingBack],
};

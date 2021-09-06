import { GameColors } from '../constants';
import { ValueOf } from '../typeHelpers';

type colors = ValueOf<typeof GameColors>;
type squareColors = ValueOf<
  Pick<typeof GameColors, 'Red' | 'Green' | 'Blue' | 'Yellow' | 'Transparent'>
>;

interface Theme {
  main: {
    backgound: colors;
    color: colors;
    squares: Record<squareColors, string>;
    textAlign: string;
  };
}

export const theme: Theme = {
  main: {
    backgound: 'black',
    color: 'white',
    squares: {
      [GameColors.Red]: '#ef2544',
      [GameColors.Blue]: '#00AFFA',
      [GameColors.Yellow]: '#e8f32e',
      [GameColors.Green]: '#6bdd99',
      transparent: 'transparent',
    },
    textAlign: 'center',
  },
};

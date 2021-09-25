import { SimonStorage } from 'storageWriter';
import { AppAction } from './types';
import { SimonState } from './state';
import { ActionTypes } from './actions';

/**
 * Middleware to intercept game loss actions and store metadata related
 * to how well the player did each game
 * @param storageWriter
 * @returns void
 */
function storageMiddleware(storageWriter: SimonStorage) {
  return (action: AppAction, state: SimonState) => {
    switch (action.type) {
      case ActionTypes.PatternMatchError: {
        const curr = storageWriter.read();
        storageWriter.write({
          losses: [
            ...(curr.losses || []),
            {
              squaresMatched: state.userChoices.length,
              datePlayed: new Date(),
              userInput: state.userChoices,
              pattern: state.pattern,
            },
          ],
        });
        break;
      }
    }
  };
}

export default storageMiddleware;

import { StorageWriter } from 'storageWriter';
import { AppAction } from './types';
import { SimonState } from './state';
import { ActionTypes } from './actions';

function storageMiddleware(storageWriter: StorageWriter) {
  return (action: AppAction, state: SimonState) => {
    switch (action.type) {
      case ActionTypes.PatternMatchError: {
        debugger;
        const curr = storageWriter.get();
        storageWriter.set({
          losses: [
            ...(curr.losses || []),
            {
              matched: state.userChoices.length - 1,
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

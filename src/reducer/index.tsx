import React, { useMemo, useReducer } from 'react';
import { AppAction, AppActionCreators, AppDispatch } from './types';
import { buildAppActions } from './actions';
import initialState from './state';
import { GameContext } from './context';
import reducer from './reducer';
import storageWriter from 'storageWriter';
import storageMiddleware from './storageMiddleware';

/**
 * Hook that decorates reducer actions with a dispatch function.
 * Functions are memoized to minimize re-renders
 * @param dispatch Dispatch function provided by useReducer
 * @param mapDispatchToActions
 * @returns Action functions with a curried dispatch fn
 */
function useActions(
  dispatch: AppDispatch,
  mapDispatchToActions: (dispatch: AppDispatch) => AppActionCreators
) {
  const actions = useMemo(
    () => mapDispatchToActions(dispatch),
    [dispatch, mapDispatchToActions]
  );
  return actions;
}

function GameStore({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const middleware = storageMiddleware(storageWriter());

  // Inserts middleware functions before an action dispatch dispatch.
  // All supplied middleware will be executed before the action is dispatched.
  const middleWareDispatch = (action: AppAction) => {
    middleware(action, state);
    dispatch(action);
  };
  const actions = useActions(middleWareDispatch, buildAppActions);

  const values = useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
  );

  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export default GameStore;

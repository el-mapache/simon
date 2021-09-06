import React, { useMemo, useReducer } from 'react';
import { AppActionCreators, AppDispatch } from './types';
import { buildAppActions } from './actions';
import initialState from './state';
import { GameContext } from './context';
import reducer from './reducer';

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
  const actions = useActions(dispatch, buildAppActions);

  const values = useMemo(
    () => ({
      state,
      actions,
    }),
    [state, actions]
  );

  console.log(state);
  return <GameContext.Provider value={values}>{children}</GameContext.Provider>;
}

export default GameStore;

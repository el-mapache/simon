import { ValueOf } from '../typeHelpers';
import { ActionTypes } from './actions';

export type AppAction = {
  type: ValueOf<typeof ActionTypes>;
  payload: Record<string, any>;
};

export type AppDispatch = React.Dispatch<AppAction>;
export type AppActionCreators = Record<string, (...args: any) => void>;

import { ActionTypes } from './clearstate.action';
import * as fromRoot from './kanban.state';

export function clearState(reducer) {
  return (state, action) => {
    return reducer(
      action.type === ActionTypes.LOGOUT ? undefined : state,
      action
    );

    return reducer(state, action);
  };
}

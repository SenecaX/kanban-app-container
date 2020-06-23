import { User } from 'src/app/shared/models/User';
import * as fromRoot from '../../../state/kanban.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as userActions from './user.actions';

export interface State extends fromRoot.State {
  user: UserState;
}
export interface UserState {
  user: User;
  error: string;
}

const initialState = {
  user: null,
  error: ''
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(getUserFeatureState, state => state.user);

export function userReducer(state = initialState, action): UserState {
  switch (action.type) {
    case userActions.LoadUserSuccess:
      return {
        ...state,
        user: action.payload,
        error: ''
      };

    case userActions.LoadUserFail:
      return {
        ...state,
        error: action.payload
      };
    default:
      return state;
  }
}

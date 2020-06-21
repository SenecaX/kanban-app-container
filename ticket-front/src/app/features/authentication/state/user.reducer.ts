import { User } from 'src/app/shared/models/User';
import * as fromRoot from '../../../state/kanban.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export interface UserState extends fromRoot.State {
  user: User;
}

const initialState = {
  user: null
};

const getUserFeatureState = createFeatureSelector<UserState>('user');

export const getUser = createSelector(getUserFeatureState, state => state.user);

export function userReducer(state = initialState, action): UserState {
  switch (action.type) {
    default:
      return state;
  }
}

import { Action } from '@ngrx/store';
import { User } from 'src/app/shared/models/User';

export enum UserActionTypes {
  LoadUser = '[User] Load User',
  LoadUserSuccess = '[User] Load User Success',
  LoadUserFail = '[User] Load User Fail'
}

export class LoadUser implements Action {
  readonly type = UserActionTypes.LoadUser;

  constructor(public payload: User) {}
}

export class LoadUserSuccess implements Action {
  readonly type = UserActionTypes.LoadUserSuccess;

  constructor(public payload: User) {}
}

export class LoadUserFail implements Action {
  readonly type = UserActionTypes.LoadUserFail;

  constructor(public payload: string) {}
}

export type UserActions = LoadUser | LoadUserSuccess | LoadUserFail;

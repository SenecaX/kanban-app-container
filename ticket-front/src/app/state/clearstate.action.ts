import { Action } from '@ngrx/store';

export class ActionTypes {
  static LOGOUT = '[App] logout';
}

export class Logout implements Action {
  readonly type = ActionTypes.LOGOUT;
}

import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { mergeMap, map } from 'rxjs/operators';
import * as userActions from './user.actions';
import { User } from 'src/app/shared/models/User';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions) {}

  // @Effect()
  // loadUser$ = this.actions$.pipe(
  //   ofType(userActions.UserActionTypes.LoadUser),
  //   mergeMap((action: userActions.LoadUser) =>
  //     this.userService
  //       .getAll()
  //       .pipe(map((user: User) => new userActions.LoadUserSuccess(user)))
  //   )
  // );
}

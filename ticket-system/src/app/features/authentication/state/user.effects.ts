import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { UserService } from 'src/app/shared/services/user.api.service';

@Injectable()
export class UserEffects {
  constructor(private actionss$: Actions, private userService: UserService) {}

  // @Effect()
  // load
}

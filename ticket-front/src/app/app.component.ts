import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.api.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as fromUser from './features/authentication/state/user.reducer';
import { Store } from '@ngrx/store';
import { Logout } from './state/clearstate.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public decodedToken: any;
  public currentUser: any;
  public displayItem = false;

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly store: Store<fromUser.State>
  ) {
    this.authenticationService.currentUser.subscribe(
      x => (this.currentUser = x)
    );

    const helper = new JwtHelperService();
    const getToken = localStorage.getItem('access_token');
    this.decodedToken = helper.decodeToken(getToken);
  }

  ngOnInit(): void {
    if (this.decodedToken !== null) {
      this.displayItem = true;
    }
  }

  logout() {
    this.store.dispatch(new Logout());
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
    this.displayItem = false;
  }
}

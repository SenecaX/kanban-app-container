import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.api.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public decodedToken: any;
  currentUser: any;
  displayItem = false;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
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
    this.authenticationService.logout();
    this.router.navigate(['/auth/login']);
    this.displayItem = false;
  }
}

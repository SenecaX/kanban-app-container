import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './features/authentication/login/login.component';
import { RegistrationComponent } from './features/authentication/registration/registration.component';
import { DashboardComponent } from './features/kanban/dashboard/dashboard.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  TicketHttpInterceptor,
  JwtInterceptor,
  ErrorInterceptor
} from './shared/interceptor';
import { AlertComponent } from './shared/components/alert/alert.component';
import { JwtModule } from '@auth0/angular-jwt';
import {
  CommonModule,
  HashLocationStrategy,
  LocationStrategy
} from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    JwtModule.forRoot({
      config: {
        tokenGetter,
        whitelistedDomains: ['http://localhost:3000/', 'http://localhost:3001/']
      }
    }),
    SharedModule,
    FormsModule,
    ReactiveFormsModule

    // StoreModule.forRoot('reducer')
  ],
  providers: [
    TicketHttpInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

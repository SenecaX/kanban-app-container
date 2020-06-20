import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SharedModule } from '../../shared/shared.module';

/* NgRx */
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { userReducer } from './state/user.reducer';

@NgModule({
  imports: [
    SharedModule,
    FontAwesomeModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature('user', userReducer)
  ],
  exports: [FontAwesomeModule],
  declarations: [LoginComponent, RegistrationComponent]
})
export class AuthenticationModule {}

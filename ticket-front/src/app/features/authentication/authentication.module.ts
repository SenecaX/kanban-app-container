import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthenticationRoutingModule } from './authentication-routing.module';
import { userReducer } from './state/user.reducer';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';

@NgModule({
  imports: [
    SharedModule,
    FontAwesomeModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule,
    AuthenticationRoutingModule,
    StoreModule.forFeature('user', userReducer),
    EffectsModule.forFeature([UserEffects]),
    MaterialModule
  ],
  exports: [FontAwesomeModule],
  declarations: [LoginComponent, RegistrationComponent]
})
export class AuthenticationModule {}

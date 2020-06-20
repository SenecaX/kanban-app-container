import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/authentication/login/login.component';
import { DashboardComponent } from './features/kanban/dashboard/dashboard.component';
import { RegistrationComponent } from './features/authentication/registration/registration.component';
import { AuthGuard } from './shared/services/auth.guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'kanban',
    loadChildren: () =>
      import('./features/kanban/kanban.module').then(
        importedModule => importedModule.KanbanModule
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/authentication/authentication.module').then(
        importedModule => importedModule.AuthenticationModule
      )
  },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

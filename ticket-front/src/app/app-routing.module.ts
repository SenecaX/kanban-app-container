import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './features/authentication/login/login.component';
import { AuthGuard } from './shared/services/auth.guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'board',
    loadChildren: () =>
      import('./features/board/board.module').then(
        importedModule => importedModule.BoardModule
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

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { RestorePasswordTokenComponent } from './components/restore-password-token/restore-password-token.component';
import { RestorePasswordComponent } from './components/restore-password/restore-password.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { AuthGuard } from './guards/auth.guard';
import { SigninGuard } from './guards/signin.guard';
const routes: Routes = [
  {
    path: '',
    redirectTo: '/tasks',
    pathMatch: 'full',
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [SigninGuard],
  },
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [SigninGuard],
  },
  {
    path: 'confirmation/:token',
    component: ConfirmationComponent,
  },
  {
    path: 'restore_password/:token',
    component: RestorePasswordTokenComponent,
  },
  {
    path: 'restore_password',
    component: RestorePasswordComponent,
    canActivate: [SigninGuard],
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

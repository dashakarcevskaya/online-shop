import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from '@angular/fire/auth-guard';

import { UserAccountComponent } from './user-account.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/sign-in-page']);

const routes: Routes = [
  {
    path: '',
    component: UserAccountComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserAccountRoutingModule {}

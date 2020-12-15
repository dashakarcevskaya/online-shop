import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AngularFireAuthGuard } from '@angular/fire/auth-guard';
import { redirectUnauthorizedTo } from '@angular/fire/auth-guard';
import { ComparePageComponent } from './compare-page.component';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/sign-in-page']);

const routes: Routes = [
  {
    path: '',
    component: ComparePageComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComparePageRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckPageComponent } from './check-page.component';

const routes: Routes = [
  {
    path: '',
    component: CheckPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CheckPageRoutingModule {}

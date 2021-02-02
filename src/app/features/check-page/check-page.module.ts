import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckPageComponent } from './check-page.component';

import { CheckPageRoutingModule } from './check-page-routing.module';

import { ApplicationPipesModule } from '../../application-pipes.module';

@NgModule({
  declarations: [CheckPageComponent],
  imports: [CommonModule, CheckPageRoutingModule, ApplicationPipesModule]
})
export class CheckPageModule {}

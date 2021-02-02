import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageComponent } from './order-page.component';
import { ApplicationPipesModule } from '../../application-pipes.module';

import { NgxMaskModule, IConfig } from 'ngx-mask';

import { OrderPageRoutingModule } from './order-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;

@NgModule({
  declarations: [OrderPageComponent],
  imports: [
    CommonModule,
    OrderPageRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipesModule,
    NgxMaskModule.forRoot()
  ]
})
export class OrderPageModule {}

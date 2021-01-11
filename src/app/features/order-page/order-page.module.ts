import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderPageComponent } from './order-page.component';
import { OrderPageRoutingModule } from './order-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [OrderPageComponent],
  imports: [
    CommonModule,
    OrderPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class OrderPageModule {}

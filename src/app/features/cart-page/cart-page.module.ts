import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartPageComponent } from './cart-page.component';
import { CartPageRoutingModule } from './cart-page-routing.module';

@NgModule({
  declarations: [CartPageComponent],
  imports: [CommonModule, CartPageRoutingModule]
})
export class CartPageModule {}

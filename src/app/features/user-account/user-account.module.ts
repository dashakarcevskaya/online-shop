import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { AddressPipe } from '../../pipes/address.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [UserAccountComponent, CapitalizePipe, AddressPipe],
  imports: [
    CommonModule,
    UserAccountRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class UserAccountModule {}

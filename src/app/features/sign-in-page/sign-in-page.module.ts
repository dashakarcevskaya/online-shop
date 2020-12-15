import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignInPageComponent } from './sign-in-page.component';
import { SignInPageRoutingModule } from './sign-in-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignInPageComponent],
  imports: [
    CommonModule,
    SignInPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SignInPageModule {}

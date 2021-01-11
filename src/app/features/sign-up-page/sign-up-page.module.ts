import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SignUpPageComponent } from './sign-up-page.component';
import { SignUpPageRoutingModule } from './sign-up-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SignUpPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SignUpPageRoutingModule
  ]
})
export class SignUpPageModule {}

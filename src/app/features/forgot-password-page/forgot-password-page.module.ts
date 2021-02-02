import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordPageComponent } from './forgot-password-page.component';
import { ForgotPasswordPageRoutingModule } from './forgot-password-page-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [ForgotPasswordPageComponent],
  imports: [
    CommonModule,
    ForgotPasswordPageRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ForgotPasswordPageModule {}

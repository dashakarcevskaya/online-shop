import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserAccountComponent } from './user-account.component';
import { UserAccountRoutingModule } from './user-account-routing.module';
import { FormsModule } from '@angular/forms';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';

@NgModule({
  declarations: [UserAccountComponent, CapitalizePipe],
  imports: [CommonModule, UserAccountRoutingModule, FormsModule]
})
export class UserAccountModule {}

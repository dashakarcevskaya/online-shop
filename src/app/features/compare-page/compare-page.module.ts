import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparePageComponent } from './compare-page.component';
import { ComparePageRoutingModule } from './compare-page-routing.module';

@NgModule({
  declarations: [ComparePageComponent],
  imports: [CommonModule, ComparePageRoutingModule]
})
export class ComparePageModule {}

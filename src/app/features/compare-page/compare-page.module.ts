import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparePageComponent } from './compare-page.component';
import { ComparePageRoutingModule } from './compare-page-routing.module';
import { SwiperModule } from 'swiper/angular';

@NgModule({
  declarations: [ComparePageComponent],
  imports: [CommonModule, ComparePageRoutingModule, SwiperModule]
})
export class ComparePageModule {}

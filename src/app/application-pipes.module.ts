import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddressPipe } from './pipes/address.pipe';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [AddressPipe, CapitalizePipe],
  imports: [CommonModule],
  exports: [AddressPipe, CapitalizePipe]
})
export class ApplicationPipesModule {}

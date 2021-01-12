import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ModalWindowComponent } from './components/modal-window/modal-window.component';

@NgModule({
  declarations: [FooterComponent, HeaderComponent, ModalWindowComponent],
  imports: [CommonModule, RouterModule, FontAwesomeModule],
  exports: [FooterComponent, HeaderComponent, ModalWindowComponent]
})
export class CoreModule {}

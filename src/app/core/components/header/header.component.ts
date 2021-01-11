/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';

import { catalog } from '../header/catalog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  catalog = catalog;
  public display = false;

  public toggle(): void {
    this.display = !this.display;
    document.body.style.overflow = this.display ? 'hidden' : 'auto';
  }
}

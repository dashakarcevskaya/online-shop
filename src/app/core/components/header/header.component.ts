/* eslint-disable @typescript-eslint/no-empty-function */
import { Component } from '@angular/core';
import { CompareService } from '@services/compare.service';
import { CartService } from '@services/cart.service';
import { catalog } from '../header/catalog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent {
  constructor(
    private compareService: CompareService,
    private cartService: CartService
  ) {}
  public catalog = catalog;
  public display = false;

  public getCompareItemsAmount(): number {
    return this.compareService.products.length;
  }

  public getCartItemsAmount(): number {
    return this.cartService.getCartItemsAmount();
  }

  public toggle(): void {
    this.display = !this.display;
    document.body.style.overflow = this.display ? 'hidden' : 'auto';
  }
}

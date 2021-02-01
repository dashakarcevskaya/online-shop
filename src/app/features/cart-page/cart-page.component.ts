import { Component } from '@angular/core';
import { CartService } from '@core/services/cart.service';
import { CartItem } from '@core/types/cart-item';
import { Product } from '@core/types/product';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.less']
})
export class CartPageComponent {
  constructor(private cartService: CartService) {}

  public getCartItems(): Array<CartItem> {
    return this.cartService.cartItems;
  }

  public reduceQuantity(itemId: string): void {
    this.cartService.reduceItemQuantity(itemId);
  }

  public increaseQuantity(itemId: string): void {
    this.cartService.increaseItemQuantity(itemId);
  }

  public removeItem(product: Product): void {
    this.cartService.removeProduct(product);
  }

  public getCostOfItems(): number {
    return this.cartService.getCostOfCartItems();
  }

  public getCostOfDelivery(): number {
    return this.cartService.getCostOfDelivery();
  }

  public getFinalyPrice(): number {
    return this.getCostOfDelivery() + this.getCostOfItems();
  }

  public isEmptyList(): boolean {
    return this.getCartItems().length === 0;
  }

  public trackByFn(index, item) {
    return item.id;
  }
}

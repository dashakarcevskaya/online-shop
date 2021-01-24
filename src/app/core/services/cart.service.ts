import { Injectable } from '@angular/core';
import { Product } from '@core/types/product';
import { CartItem } from '@core/types/cart-item';
import { ModalService } from '@services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private lsKey = 'cartItems';
  private message: string;
  private maxProductAmount = 10;
  public cartItems: Array<CartItem> = JSON.parse(
    localStorage.getItem(this.lsKey) || '[]'
  );
  constructor(private modalService: ModalService) {
    this.init();
  }

  public cartItemsAmount: number;

  private init(): void {
    window.addEventListener('storage', ({ key, newValue }) => {
      if (key === this.lsKey) {
        this.cartItems = JSON.parse(newValue);
      }
    });
  }

  public addProduct(product: Product): void {
    const item = this.cartItems.find((el) => el.product.id === product.id);
    if (item) {
      if (!this.canAddProduct(item)) {
        this.modalService.showModalWindow(this.message);
        return;
      } else {
        item.quantity++;
      }
    } else {
      this.cartItems = [...this.cartItems, { product, quantity: 1 }];
    }
    this.sync();
  }

  public canAddProduct(product: CartItem): boolean {
    if (product.quantity === this.maxProductAmount) {
      this.message = 'Вы можете добавить не более 10 единиц одного товара';
      return false;
    }
    return true;
  }

  public removeAllProducts(): void {
    this.cartItems = [];
    this.sync();
  }

  public removeProduct(product: Product): void {
    this.cartItems = this.cartItems.filter(
      (item) => item.product.id !== product.id
    );
    this.sync();
  }

  public reduceItemQuantity(itemId: string): void {
    const item = this.cartItems.find((el) => el.product.id === itemId);
    if (item.quantity === 1) {
      return;
    }
    item.quantity -= 1;
    this.sync();
  }

  public increaseItemQuantity(itemId: string): void {
    const item = this.cartItems.find((el) => el.product.id === itemId);
    if (item.quantity === 10) {
      return;
    }
    item.quantity += 1;
    this.sync();
  }

  public getCartItemsAmount(): number {
    this.cartItemsAmount = this.cartItems.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
    return this.cartItemsAmount;
    // this.sync();
  }

  public getCostOfCartItems(): number {
    return this.cartItems.reduce(
      (acc, value) => acc + value.product.price * value.quantity,
      0
    );
    // this.sync();
  }

  public getCostOfDelivery(): number {
    if (this.getCostOfCartItems() <= 500) {
      return 50;
    } else return 0;
    // this.sync();
  }

  private sync(): void {
    localStorage.setItem(this.lsKey, JSON.stringify(this.cartItems));
  }
}

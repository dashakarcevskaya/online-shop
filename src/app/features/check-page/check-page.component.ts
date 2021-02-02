import { Component, OnInit } from '@angular/core';

import { OrderService } from '@services/order.service';
import { CartService } from '@services/cart.service';

import { CartItem } from '@core/types/cart-item';
import { Order } from '@core/types/order';

@Component({
  selector: 'app-check-page',
  templateUrl: './check-page.component.html',
  styleUrls: ['./check-page.component.less']
})
export class CheckPageComponent implements OnInit {
  public productList: Array<CartItem>;
  public order: Order;

  constructor(
    private orderService: OrderService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productList = this.cartService.cartItems;
    this.order = this.orderService.currentOrder;
    this.cartService.removeAllProducts();
  }

  public getPaymentMethodString(): string {
    return this.order.paymentMethod === 'cash' ? 'Cash' : 'Card';
  }

  public trackByFn(index, item) {
    return item.id;
  }
}

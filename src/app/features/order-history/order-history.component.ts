import { Component, OnInit } from '@angular/core';

import { OrderHistoryService } from '@services/order-history.service';
import { AuthService } from '@core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Order } from '@core/types/order';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.less']
})
export class OrderHistoryComponent implements OnInit {
  public orders: Array<Order>;

  constructor(
    private orderHistoryService: OrderHistoryService,
    private auth: AuthService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    this.orderHistoryService.getOrders().subscribe((orders) => {
      this.orders = orders.sort((a, b) => (a.date > b.date ? 1 : -1));
    });
  }

  public getPaymentMethod(order: Order): string {
    return order.paymentMethod === 'cash' ? 'Наличные' : 'Карта';
  }

  public createUrl(product: any): string {
    return `/catalog/${product.type}/${product.id}`;
  }
}

import { Component, OnInit } from '@angular/core';

import { OrderHistoryService } from '@services/order-history.service';
import { AuthService } from '@core/services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';

import { Order } from '@core/types/order';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.less']
})
export class OrderHistoryComponent implements OnInit {
  constructor(
    private orderHistoryService: OrderHistoryService,
    private auth: AuthService,
    private db: AngularFirestore
  ) {}

  public orders$: Observable<Order[]>;
  public hasMore$: Observable<boolean>;

  ngOnInit(): void {
    this.orders$ = this.orderHistoryService.getLoadedItems();
    this.hasMore$ = this.orderHistoryService.hasMore();
    this.loadMore();
  }

  public getPaymentMethod(order: Order): string {
    return order.paymentMethod === 'cash' ? 'Наличные' : 'Карта';
  }

  public createUrl(product: any): string {
    return `/catalog/${product.type}/${product.id}`;
  }

  public loadMore(): void {
    this.orderHistoryService.loadMore();
  }
}

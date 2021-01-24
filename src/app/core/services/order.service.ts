import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Order } from '@core/types/order';

import { AuthService } from '@services/auth.service';
import { CartService } from '@services/cart.service';

// import { CartItem } from '@core/types/cart-item';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  public currentOrder: Order;

  constructor(
    private db: AngularFirestore,
    private auth: AuthService,
    private cartService: CartService
  ) {}

  public addNewOrder(
    city: string,
    street: string,
    house: number,
    apartment: number | null,
    paymentMethod: string,
    phoneNumber: string,
    comment: string,
    orderPrice: number
  ): void {
    const subscription = this.auth.getUserId().subscribe((id) => {
      this.currentOrder = {
        number: Math.floor(Math.random() * 1000) + 1,
        userId: id,
        date: this.getDate(),
        time: this.getTime(),
        city: city,
        street: street,
        house: house,
        apartment: apartment,
        paymentMethod: paymentMethod,
        mobilePhone: `+375${phoneNumber}`,
        comment: comment,
        products: this.getProducts(),
        orderPrice: orderPrice
      };
      this.db.collection<Order>('/orders').add(this.currentOrder);
      // subscription.unsubscribe();
    });
  }

  public getDate(): string {
    const currentDate = new Date().toISOString().slice(0, 10);
    return currentDate;
  }

  public getTime(): string {
    const currentTime = new Date().toLocaleTimeString('en-US', {
      hour12: false
    });
    return currentTime;
  }

  public getProducts(): Array<{
    id: string;
    type: string;
    name: string;
    quantity: number;
    price: number;
    images: string;
  }> {
    const products = this.cartService.cartItems.reduce(
      (acc, cartItem) => [
        ...acc,
        {
          id: cartItem.product.id,
          type: cartItem.product.type,
          name: cartItem.product.name,
          quantity: cartItem.quantity,
          price: cartItem.product.price,
          images: cartItem.product.images[0]
        }
      ],
      []
    );

    return products;
  }
}

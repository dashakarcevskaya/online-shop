import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from '@core/services/auth.service';

import { Order } from '../types/order';
import { map, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  public id;
  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.id = this.auth.getUserId().subscribe((id) => id);
  }

  public getOrders(): Observable<Order[]> {
    return this.auth.getUserId().pipe(
      mergeMap((id) => {
        return this.db
          .collection<Order>('/orders', (ref) => {
            return ref.where('userId', '==', id);
          })
          .snapshotChanges()
          .pipe(
            map((items) =>
              items.map((item) => {
                const data = item.payload.doc.data();
                const id = item.payload.doc.id;
                this.id = id;
                return { id, ...data } as Order;
              })
            )
          );
      })
    );
  }
}

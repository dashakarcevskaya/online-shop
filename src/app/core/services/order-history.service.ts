import { Injectable } from '@angular/core';
import { Observable, Subject, BehaviorSubject } from 'rxjs';
import {
  AngularFirestore,
  DocumentChangeAction,
  QueryDocumentSnapshot
} from '@angular/fire/firestore';

import { AuthService } from '@core/services/auth.service';

import { Order } from '../types/order';
import { map, mergeMap, scan, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {
  public id;
  private limit = 3;
  private lastItem: QueryDocumentSnapshot<Order> = null;
  private items$ = new BehaviorSubject<{
    items: DocumentChangeAction<Order>[];
    firstLoad: boolean;
  }>({ items: [], firstLoad: true });
  private loadedItems$: Observable<Order[]>;
  private hasMore$ = new BehaviorSubject(false);
  private load$ = new Subject<void>();

  constructor(private db: AngularFirestore, private auth: AuthService) {
    this.id = this.auth.getUserId().subscribe((id) => id);
    this.init();
  }

  private init() {
    this.load$
      .pipe(
        switchMap(() => {
          return this.auth.getUserId().pipe(
            mergeMap((id) => {
              return this.db
                .collection<Order>('/orders', (ref) => {
                  let query = ref
                    .where('userId', '==', id)
                    .limit(this.limit + 1);
                  if (this.lastItem) {
                    query = query.startAfter(this.lastItem);
                  }

                  return query;
                })
                .snapshotChanges();
            })
          );
        })
      )
      .subscribe((items) =>
        this.items$.next({ items, firstLoad: !this.lastItem })
      );

    this.items$.subscribe(({ items }) => {
      if (items.length > 0) {
        this.hasMore$.next(items.length === this.limit + 1);
        this.lastItem = (
          items[items.length - 2] || items[items.length - 1]
        ).payload.doc;
      } else {
        this.hasMore$.next(false);
      }
    });

    this.loadedItems$ = this.items$.pipe(
      map(({ items, firstLoad }) => {
        const products = items.map((item) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, ...data };
        });
        return { firstLoad, items: products };
      }),
      scan(
        (acc, { items, firstLoad }) =>
          firstLoad
            ? items.slice(0, this.limit)
            : [...acc, ...items.slice(0, this.limit)],
        []
      )
    );
  }

  public loadMore(): void {
    this.load$.next();
  }

  public getLoadedItems(): Observable<Order[]> {
    return this.loadedItems$;
  }

  public hasMore(): Observable<boolean> {
    return this.hasMore$;
  }
}

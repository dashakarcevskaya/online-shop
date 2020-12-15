import {
  AngularFirestore,
  QueryDocumentSnapshot,
  DocumentChangeAction
} from '@angular/fire/firestore';
import { Observable, BehaviorSubject, Subject } from 'rxjs';
import { map, switchMap, scan } from 'rxjs/operators';

import { Product } from '@core/types/product';
import { ProductType } from '@core/enums/product-type';
import { SortType } from '@core/enums/sort-type';

export class Searcher {
  private lastItem$ = new BehaviorSubject<QueryDocumentSnapshot<Product>>(null);
  private items$ = new BehaviorSubject<DocumentChangeAction<Product>[]>([]);
  private loadedItems$: Observable<Product[]>;
  private hasMore$ = new BehaviorSubject(false);
  private load$ = new Subject<void>();

  private orderBy = 'year';
  private orderDirection: 'asc' | 'desc' = 'desc';

  constructor(
    private db: AngularFirestore,
    private dbPath: string,
    private productType: ProductType,
    private limit = 5
  ) {
    this.init();
  }

  private init() {
    this.load$
      .pipe(
        switchMap(() => {
          return this.db
            .collection<Product>(this.dbPath, (ref) => {
              const startAfter = this.lastItem$.getValue();
              const query = ref
                .orderBy(this.orderBy, this.orderDirection)
                .limit(this.limit + 1);
              return startAfter ? query.startAfter(startAfter) : query;
            })
            .snapshotChanges();
        })
      )
      .subscribe((items) => this.items$.next(items));

    this.items$.subscribe((items) => {
      if (items.length > 0) {
        this.lastItem$.next(items[items.length - 2].payload.doc);
        this.hasMore$.next(items.length === this.limit + 1);
      }
    });

    this.loadedItems$ = this.items$.pipe(
      map((items) => {
        return items.map((item) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, type: this.productType, ...data };
        });
      }),
      scan((acc, items) => [...acc, ...items.slice(0, this.limit)], [])
    );
  }

  public loadMore(): void {
    this.load$.next();
  }

  public getLoadedItems(): Observable<Product[]> {
    return this.loadedItems$;
  }

  public hasMore(): Observable<boolean> {
    return this.hasMore$;
  }

  public changeSortType(sortType: SortType): void {
    switch (sortType) {
      case SortType.Default:
        this.orderBy = 'year';
        this.orderDirection = 'desc';
        break;
      case SortType.PriceAsc:
        this.orderBy = 'price';
        this.orderDirection = 'asc';
        break;
      case SortType.PriceDesc:
        this.orderBy = 'price';
        this.orderDirection = 'desc';
        break;
    }
    this.lastItem$.next(null);
    this.load$.next();
  }
}

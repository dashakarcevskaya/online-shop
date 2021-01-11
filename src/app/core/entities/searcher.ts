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

type FilterQuery = { field: string; value: any };

export class Searcher {
  private lastItem: QueryDocumentSnapshot<Product> = null;
  private items$ = new BehaviorSubject<{
    items: DocumentChangeAction<Product>[];
    firstLoad: boolean;
  }>({ items: [], firstLoad: true });
  private loadedItems$: Observable<Product[]>;
  private hasMore$ = new BehaviorSubject(false);
  private load$ = new Subject<void>();

  private orderBy = null;
  private orderDirection: 'asc' | 'desc';
  private searchString = '';
  private searchField = 'name';

  private filters: Array<FilterQuery> = [];

  constructor(
    private db: AngularFirestore,
    private dbPath: string,
    private productType: ProductType,
    private limit = 7
  ) {
    this.init();
  }

  private init() {
    this.load$
      .pipe(
        switchMap(() => {
          return this.db
            .collection<Product>(this.dbPath, (ref) => {
              let query = ref.limit(this.limit + 1);
              if (this.orderBy) {
                query = query.orderBy(this.orderBy, this.orderDirection);
              }
              if (this.lastItem) {
                query = query.startAfter(this.lastItem);
              }
              if (this.filters.length > 0) {
                query = this.filters.reduce(
                  (acc, item) => acc.where(item.field, '==', item.value),
                  query
                );
              }
              if (this.searchString !== '') {
                query = query
                  .where(this.searchField, '>=', this.searchString)
                  .where(this.searchField, '<=', this.searchString + '\uf8ff');
              }
              return query;
            })
            .snapshotChanges();
        })
      )
      .subscribe((items) =>
        this.items$.next({ items, firstLoad: !this.lastItem })
      );

    this.items$.subscribe(({ items }) => {
      if (items.length > 0) {
        this.lastItem = items[items.length - 2].payload.doc;
        this.hasMore$.next(items.length === this.limit + 1);
      }
    });

    this.loadedItems$ = this.items$.pipe(
      map(({ items, firstLoad }) => {
        const products = items.map((item) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, type: this.productType, ...data };
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

  public getLoadedItems(): Observable<Product[]> {
    return this.loadedItems$;
  }

  public hasMore(): Observable<boolean> {
    return this.hasMore$;
  }

  public changeSortType(sortType: SortType): void {
    switch (sortType) {
      case SortType.Default:
        this.orderBy = null;
        this.orderDirection = null;
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
    this.lastItem = null;
    this.load$.next();
  }

  public changeSearchString(value: string): void {
    this.searchString = value.toLocaleLowerCase();
    this.lastItem = null;
    this.load$.next();
  }

  // public setFilters(filters: FilterQuery[]): void {
  //   this.filters = filters;
  //   this.lastItem = null;
  //   this.load$.next();
  // }
}

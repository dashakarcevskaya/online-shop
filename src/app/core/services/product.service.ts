import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { ProductType } from '../enums/product-type';

import { Product } from '../types/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Searcher } from '../entities/searcher';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private collections: {
    [key: string]: AngularFirestoreCollection<Product>;
  };

  constructor(private db: AngularFirestore) {
    this.collections = Object.values(ProductType).reduce(
      (acc, item) => ({
        [item]: db.collection(this.getDbPath(item)),
        ...acc
      }),
      {}
    );
  }

  private getDbPath(productType: ProductType): string {
    switch (productType) {
      case ProductType.Phone:
        return '/phones';
      case ProductType.Headphones:
        return '/headphones';
      case ProductType.SmartWatch:
        return '/smartwatches';
      case ProductType.Laptop:
        return '/laptops';
    }
  }

  public getAll(type: ProductType): Observable<Product[]> {
    return this.collections[type].snapshotChanges().pipe(
      map((items) =>
        items.map((item) => {
          const data = item.payload.doc.data();
          const id = item.payload.doc.id;
          return { id, type, ...data } as Product;
        })
      )
    );
  }

  public getById(type: ProductType, id: string): Observable<Product> {
    return this.db
      .doc<Product>(`${this.getDbPath(type)}/${id}`)
      .get()
      .pipe(
        map((doc) => ({
          id: doc.id,
          type,
          ...doc.data()
        }))
      );
  }

  public createSearcher(type: ProductType): Searcher {
    return new Searcher(this.db, this.getDbPath(type), type);
  }
}

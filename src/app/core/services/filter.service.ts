import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductType } from '../enums/product-type';
import { Filter } from '../types/filter';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private dbPath = '/filters';

  constructor(private db: AngularFirestore) {}

  public getFilters(productType: ProductType): Observable<Filter[]> {
    return this.db
      .collection<Filter>('/filters', (ref) => {
        return ref.where('productType', '==', productType);
      })
      .snapshotChanges()
      .pipe(
        map((items) =>
          items.map((item) => {
            const data = item.payload.doc.data();
            const id = item.payload.doc.id;
            return { id, ...data } as Filter;
          })
        )
      );
  }
}

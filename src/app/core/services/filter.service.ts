import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ProductType } from '../enums/product-type';
import { Filter } from '../types/filter';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private dbPath = '/filters';

  constructor(private db: AngularFirestore) {}

  public getFilters(productType: ProductType): Observable<Filter[]> {
    return this.db
      .collection<Filter>(this.dbPath, (ref) => {
        return ref.where('producType', '==', productType);
      })
      .valueChanges();
  }
}

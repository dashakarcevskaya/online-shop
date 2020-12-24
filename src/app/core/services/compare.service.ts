import { Injectable } from '@angular/core';
import { Product } from '@core/types/product';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private lsKey = 'itemsToCompare';
  public products: Product[] = JSON.parse(
    localStorage.getItem(this.lsKey) || '[]'
  );
  private maxProductAmount = 3;

  constructor() {
    this.init();
  }

  private init(): void {
    window.addEventListener('storage', ({ key, newValue }) => {
      if (key === this.lsKey) {
        this.products = JSON.parse(newValue);
      }
    });
  }

  public addProduct(product: Product): void {
    if (!this.canAddProduct(product)) {
      return;
    }
    this.products = [...this.products, product];
    this.sync();
  }

  public canAddProduct(product: Product): boolean {
    if (!this.products.every((item) => item.type === product.type)) {
      return false;
    }
    if (this.products.length === this.maxProductAmount) {
      return false;
    }
    return true;
  }

  public removeAllProducts(): void {
    this.products = [];
    this.sync();
  }

  public removeProduct(product: Product): void {
    this.products = this.products.filter((item) => item !== product);
    this.sync();
  }

  private sync(): void {
    localStorage.setItem(this.lsKey, JSON.stringify(this.products));
  }
}

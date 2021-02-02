import { Injectable } from '@angular/core';
import { Product } from '@core/types/product';
import { ModalService } from '@services/modal.service';

@Injectable({
  providedIn: 'root'
})
export class CompareService {
  private lsKey = 'itemsToCompare';
  public products: Product[] = JSON.parse(
    localStorage.getItem(this.lsKey) || '[]'
  );
  private maxProductAmount = 3;
  private message: string;

  constructor(private modalService: ModalService) {
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
      this.modalService.showModalWindow(this.message);
      return;
    }

    this.products = [...this.products, product];
    this.sync();
  }

  public canAddProduct(product: Product): boolean {
    const item = this.products.find((el) => el.id === product.id);
    if (!this.products.every((item: Product) => item.type === product.type)) {
      this.message = 'You can only add products from one category';
      return false;
    }
    if (this.products.length === this.maxProductAmount) {
      this.message = 'You can add up to 3 products to compare';
      return false;
    }
    if (item) {
      this.message = 'The product is already in comparison!';
      return false;
    }
    return true;
  }

  public inProductsList(product: Product): boolean {
    const item = this.products.find((el) => el.id === product.id);
    if (item) {
      return true;
    } else return false;
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

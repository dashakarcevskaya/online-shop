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
    if (!this.products.every((item) => item.type === product.type)) {
      return false;
    }
    if (this.products.length === this.maxProductAmount) {
      this.message = 'Вы можете добавить не более 3 товаров в сравнение';
      return false;
    }
    if (this.products.includes(product)) {
      this.message = 'Товар уже в сравнении!';
      return false;
    }
    return true;
  }

  public inProductsList(product: Product): boolean {
    return this.products.includes(product);
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

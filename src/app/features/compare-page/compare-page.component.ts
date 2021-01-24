import { Component, OnInit } from '@angular/core';
import { Product } from '@core/types/product';
import { ProductDescription } from '@core/types/product-description';

import { CompareService } from '@services/compare.service';
import { CartService } from '@services/cart.service';
import { ProductDescriptionService } from '@core/services/product-description.service';
import Swiper from 'swiper';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.less']
})
export class ComparePageComponent implements OnInit {
  public swiper: Swiper;
  constructor(
    private compareService: CompareService,
    private cartService: CartService,
    private productDescriptionService: ProductDescriptionService
  ) {}

  ngOnInit(): void {}

  public getProducts(): Product[] {
    return this.compareService.products;
  }

  public getDifferentProductProperties(): string[] {
    const descriptions = this.getProducts()
      .map((item) => this.getProductDescription(item))
      .map((description) =>
        description
          .map((item) => item.children)
          .reduce((acc, item) => [...acc, ...item], [])
      );

    const firstDescription = descriptions[0];
    return firstDescription.reduce((acc, item) => {
      if (
        !descriptions.every(
          (description) =>
            description.find(({ name }) => name === item.name).value ===
            item.value
        )
      ) {
        return [...acc, item.name];
      }
      return acc;
    }, []);
  }

  public getProductDescription(product: Product): ProductDescription {
    return this.productDescriptionService.mapProductToDescription(product);
  }

  public removeProduct(product: Product): void {
    this.compareService.removeProduct(product);
  }

  public addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}

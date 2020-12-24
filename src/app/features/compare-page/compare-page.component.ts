import { Component } from '@angular/core';
import { CompareService } from '@core/services/compare.service';
import { Product } from '@core/types/product';
import { ProductDescriptionService } from '@core/services/product-description.service';
import { ProductDescription } from '@core/types/product-description';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.less']
})
export class ComparePageComponent {
  constructor(
    private compareService: CompareService,
    private productDescriptionService: ProductDescriptionService
  ) {}

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
}

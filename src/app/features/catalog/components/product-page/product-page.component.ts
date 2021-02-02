import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { ProductService } from '@services/product.service';
import { CompareService } from '@services/compare.service';
import { ProductDescriptionService } from '@services/product-description.service';
import { CartService } from '@services/cart.service';

import { ProductType } from '@core/enums/product-type';
import { Product } from '@core/types/product';
import { ProductDescription } from '@core/types/product-description';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.less']
})
export class ProductPageComponent {
  public id: string;
  public quantity = 1;
  public productType: ProductType;
  public description: ProductDescription;

  public productId$: Observable<string>;
  public product: Product;
  public description$: Observable<ProductDescription>;

  constructor(
    private productService: ProductService,
    private productDescriptionService: ProductDescriptionService,
    private route: ActivatedRoute,
    private compareService: CompareService,
    private cartService: CartService
  ) {
    this.productType = (this.route.data as any).value.productType;
    this.productId$ = this.route.params.pipe(map((params) => params.id));

    this.route.params.subscribe((params) => {
      this.productService
        .getById(this.productType, params.id)
        .subscribe((product) => {
          this.product = product;
          this.description = productDescriptionService.mapProductToDescription(
            this.product
          );
        });
    });
  }

  public increaseQuantity(): void {
    if (this.quantity >= 10) {
      return;
    }
    this.quantity += 1;
  }

  public reduceQuantity(): void {
    if (this.quantity <= 1) {
      return;
    }
    this.quantity -= 1;
  }

  public addToCompare(): void {
    this.compareService.addProduct(this.product);
  }

  public canAddToCompare(): boolean {
    return this.compareService.canAddProduct(this.product);
  }

  public addToCard(): void {
    this.cartService.addProduct(this.product);
  }

  public trackByFn(index, item) {
    return item.id;
  }
}

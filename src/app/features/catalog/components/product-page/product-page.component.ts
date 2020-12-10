import { Component, OnInit } from '@angular/core';
import { ProductService } from '@services/product.service';
import { ProductDescriptionService } from '../../services/product-description.service';
import { ProductDescription } from '../../types/product-description';
import { ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, first, concatAll } from 'rxjs/operators';
import { Input } from '@angular/core';

import { ProductType } from '@core/enums/product-type';
import { Product } from '@core/types/product';
import { Observable } from 'rxjs';

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

  public $productId: Observable<string>;
  public $product: Observable<Product>;
  public $description: Observable<ProductDescription>;

  constructor(
    private productService: ProductService,
    private productDescriptionService: ProductDescriptionService,
    private route: ActivatedRoute
  ) {
    this.productType = (this.route.data as any).value.productType;

    this.$productId = this.route.params.pipe(map((params) => params.id));
    this.$product = this.$productId.pipe(
      map((id) => {
        return this.productService.getById(this.productType, id);
      }),
      concatAll()
    );
    this.$description = this.$product.pipe(
      map((product) =>
        productDescriptionService.mapProductToDescription(product)
      )
    );

    // this.this.route.params.subscribe((params) => {
    //   this.productService
    //     .getById(this.productType, params.id)
    //     .subscribe((product) => {
    //       this.product = product;
    //       this.description = productDescriptionService.mapProductToDescription(
    //         this.product
    //       );
    //     });
    // });
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
}

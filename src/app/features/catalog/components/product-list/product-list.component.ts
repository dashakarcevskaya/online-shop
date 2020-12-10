import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductShortDescriptionService } from '../../services/product-short-description.service';
import { map } from 'rxjs/operators';

import { ProductType } from '@core/enums/product-type';
import { Product } from '@core/types/product';
import { from, Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent implements OnInit {
  public $products: Observable<Product[]>;
  public productType: ProductType;
  public shortDescription: string;
  @Input() ref;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shordDescriptionService: ProductShortDescriptionService
  ) {
    this.productType = (this.route.data as any).value.productType;
  }

  ngOnInit(): void {
    this.retrieveProducts();
  }

  public retrieveProducts(): void {
    this.$products = this.productService.getAll(this.productType);
  }

  public createUrl(product: Product): string {
    return `catalog/${this.productType}/${product.id}`;
  }

  public createShortDescription(product: Product): string {
    return this.shordDescriptionService.mapProductToShortDescription(product);
  }

  public createTitle(product: Product): string {
    return `${product.brand} ${product.model}`;
  }
}

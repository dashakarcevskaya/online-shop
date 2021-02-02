import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { CompareService } from '@core/services/compare.service';
import { ProductService } from '@services/product.service';
import { CartService } from '@services/cart.service';
import { ProductShortDescriptionService } from '../../services/product-short-description.service';

import { ProductType } from '@core/enums/product-type';
import { Product } from '@core/types/product';
import { Searcher } from '@core/entities/searcher';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less']
})
export class ProductListComponent {
  @Input()
  products$: Observable<Product[]>;
  @Input()
  hasMore$: Observable<boolean>;
  @Output()
  loadedMore = new EventEmitter<void>();

  public productType: ProductType;
  public shortDescription: string;
  public searcher: Searcher;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private shordDescriptionService: ProductShortDescriptionService,
    private compareService: CompareService,
    private cartService: CartService
  ) {
    this.productType = (this.route.data as any).value.productType;
  }

  public createUrl(product: Product): string {
    return `/catalog/${this.productType}/${product.id}`;
  }

  public createShortDescription(product: Product): string {
    return this.shordDescriptionService.mapProductToShortDescription(product);
  }

  public createTitle(product: Product): string {
    return `${product.brand} ${product.model}`;
  }

  public loadMore(): void {
    this.loadedMore.emit();
  }

  public trackByFn(index, item) {
    return item.id;
  }

  public addToCompare(product: Product): void {
    this.compareService.addProduct(product);
  }

  public canAddToCompare(product: Product): boolean {
    return this.compareService.canAddProduct(product);
  }

  public addToCart(product: Product): void {
    this.cartService.addProduct(product);
  }
}

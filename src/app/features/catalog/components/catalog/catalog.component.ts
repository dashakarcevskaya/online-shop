import { Component, OnInit } from '@angular/core';
import { Product } from '@core/types/product';
import { Searcher } from '@core/entities/searcher';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductType } from '@core/enums/product-type';
import { SortType } from '@core/enums/sort-type';
import { CompareService } from '@core/services/compare.service';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.less']
})
export class CatalogComponent implements OnInit {
  public products$: Observable<Product[]>;
  public hasMore$: Observable<boolean>;
  public searcher: Searcher;
  public productType: ProductType;

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private compareService: CompareService
  ) {
    this.productType = (this.route.data as any).value.productType;
  }

  ngOnInit(): void {
    this.searcher = this.productService.createSearcher(this.productType);
    this.products$ = this.searcher.getLoadedItems();
    this.hasMore$ = this.searcher.hasMore();
    this.loadMore();
    // this.searcher.setFilters([
    //   { field: 'brand', value: 'Samsung' },
    //   { field: 'memory', value: 12 },
    //   { field: 'year', value: 2020 },
    //   { field: 'accumulator', value: 5000 }
    // ]);
  }

  public loadMore(): void {
    this.searcher.loadMore();
  }

  public onChange(value: SortType): void {
    this.searcher.changeSortType(value);
  }

  public getCompareItemsAmount(): number {
    return this.compareService.products.length;
  }

  public clearCompareList(): void {
    this.compareService.removeAllProducts();
    console.log(this.compareService.products);
  }
}

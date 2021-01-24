import { Component, OnInit } from '@angular/core';
import { Product } from '@core/types/product';
import { Searcher } from '@core/entities/searcher';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '@services/product.service';
import { ProductType } from '@core/enums/product-type';
import { SortType } from '@core/enums/sort-type';
import { CompareService } from '@core/services/compare.service';
import { FilterQuery } from '@core/types/filterQuery';

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
  public sortType = SortType.Default;

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
  }

  public loadMore(): void {
    this.searcher.loadMore();
  }

  public onChange(value: SortType): void {
    this.searcher.changeSortType(value);
    this.sortType = value;
  }

  public onChangeFilters(value: FilterQuery): void {
    this.searcher.setFilters(value);
  }

  public isSortingDisabled(): boolean {
    return this.searcher.isSortingDisabled;
  }

  public getCompareItemsAmount(): number {
    return this.compareService.products.length;
  }

  public clearCompareList(): void {
    this.compareService.removeAllProducts();
  }

  public updateSearchValue(value: string): void {
    this.searcher.changeSearchString(value);
  }
}

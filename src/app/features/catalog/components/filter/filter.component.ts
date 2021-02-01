import { OnInit, Output, EventEmitter, Input, Component } from '@angular/core';
import { FilterService } from '@services/filter.service';
import { Filter } from '@core/types/filter';
import { FilterQuery } from '@core/types/filterQuery';
import { ProductType } from '@core/enums/product-type';
import { Searcher } from '@core/entities/searcher';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
  public searcher: Searcher;

  constructor(private filterService: FilterService) {}

  @Input()
  productType: ProductType;
  @Output()
  changedFilter = new EventEmitter<FilterQuery>();
  @Output()
  resetedFilters = new EventEmitter<void>();

  public filters: Filter[] = [];
  public display = false;

  ngOnInit(): void {
    this.filterService.getFilters(this.productType).subscribe((filters) => {
      this.filters = filters.sort((a, b) => (a.name > b.name ? 1 : -1));
      this.filters.forEach((filter) =>
        filter.options.sort((a, b) => (a.name > b.name ? 1 : -1))
      );
      console.log(this.filters);
    });
  }

  public onChangeFilers(value: string | number, field: string): void {
    this.changedFilter.emit({ field, value: isNaN(+value) ? value : +value });
  }

  public toggle(): void {
    this.display = !this.display;
  }

  public trackByFn(index, item) {
    return item.id;
  }

  public resetFilters(): void {
    this.resetedFilters.emit();
  }
}

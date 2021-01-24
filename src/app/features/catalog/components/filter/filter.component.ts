import { OnInit, Output, EventEmitter, Input, Component } from '@angular/core';
import { FilterService } from '@services/filter.service';
import { Filter } from '@core/types/filter';
import { FilterQuery } from '@core/types/filterQuery';
import { ProductType } from '@core/enums/product-type';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.less']
})
export class FilterComponent implements OnInit {
  constructor(private filterService: FilterService) {}

  @Input()
  productType: ProductType;
  @Output()
  changedFilter = new EventEmitter<FilterQuery>();

  public filters: Filter[];

  ngOnInit(): void {
    this.filterService.getFilters(this.productType).subscribe((filters) => {
      this.filters = filters;
      this.filters.map((filter) =>
        filter.options.sort((a, b) => (a.name > b.name ? 1 : -1))
      );
    });
  }

  public onChangeFilers(value: string | number, field: string): void {
    this.changedFilter.emit({ field, value: isNaN(+value) ? value : +value });
  }
}

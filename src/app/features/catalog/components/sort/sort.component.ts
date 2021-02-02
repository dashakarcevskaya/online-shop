import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SortType } from '@core/enums/sort-type';
import { sort } from './sortTypes';

@Component({
  selector: 'app-sort',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.less']
})
export class SortComponent {
  @Input()
  value: SortType;
  @Input()
  disabled: boolean;
  @Output()
  changed = new EventEmitter<SortType>();
  public sortTypes = sort;

  public onChange(value) {
    this.changed.emit(value);
  }

  public trackByFn(index, item) {
    return item.id;
  }
}

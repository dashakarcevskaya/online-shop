import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.less']
})
export class SearchLineComponent {
  @Output()
  changed = new EventEmitter<string>();
  public onChange(value) {
    this.changed.emit(value);
  }
}

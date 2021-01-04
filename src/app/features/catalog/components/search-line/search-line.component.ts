import { Component, EventEmitter, Output } from '@angular/core';
// import { Searcher } from '@core/entities/searcher';

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.less']
})
export class SearchLineComponent {
  // public currentString: string;
  // public searcher: Searcher;

  // ngOnInit(): void {}

  // public updateSearchLine(): void {
  //   this.searcher.changeSearchString(this.currentString);
  // }
  @Output()
  changed = new EventEmitter<string>();
  public onChange(value) {
    this.changed.emit(value);
  }
}

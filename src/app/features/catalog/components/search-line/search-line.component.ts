import { Component, EventEmitter, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-search-line',
  templateUrl: './search-line.component.html',
  styleUrls: ['./search-line.component.less']
})
export class SearchLineComponent {
  @Output()
  changed = new EventEmitter<string>();

  public userQuestion: string;
  userQuestionUpdate = new Subject<string>();

  constructor() {
    this.userQuestionUpdate
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((value) => this.changed.emit(value));
  }
}

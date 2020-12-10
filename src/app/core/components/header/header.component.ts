/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';

import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faChartBar } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { catalog } from '../header/catalog';

import { AngularFireDatabase } from '@angular/fire/database';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.less']
})
export class HeaderComponent implements OnInit {
  faSearch = faSearch;
  faChartBar = faChartBar;
  faHeart = faHeart;
  faUser = faUser;
  faShoppingCart = faShoppingCart;
  faBars = faBars;
  catalog = catalog;
  public display = false;

  public toggle(): void {
    this.display = !this.display;
    console.log(this.display);
  }
  constructor() {}

  ngOnInit(): void {}
}

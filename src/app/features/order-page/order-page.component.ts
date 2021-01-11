import { Component, OnInit } from '@angular/core';

import { CartService } from '@services/cart.service';
import { UserService } from '@services/user.service';

// import { CartItem } from '@core/types/cart-item';
// import { Product } from '@core/types/product';
// import { User } from '@core/types/user';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.less']
})
export class OrderPageComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private userService: UserService
  ) {}

  ngOnInit(): void {}
}

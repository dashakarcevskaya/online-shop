import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  // AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';

import { Router } from '@angular/router';

import { CartService } from '@services/cart.service';
import { UserService } from '@services/user.service';
import { OrderService } from '@services/order.service';

import { CartItem } from '@core/types/cart-item';
import { User } from '@core/types/user';
import { UserAddress } from '@core/types/userAddress';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.less']
})
export class OrderPageComponent implements OnInit {
  public currentUser: User;

  public userName: string;
  public userSurname: string;
  public currentUserAddress: UserAddress = {
    city: '',
    street: '',
    house: null,
    apartment: null
  };

  public addressForm: FormGroup;
  public orderForm: FormGroup;
  public cardForm: FormGroup;

  public isChangeAddress = false;

  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private userService: UserService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.currentUser = user[0];
      this.userName = user[0].name;
      this.userSurname = user[0].surname;
      this.currentUserAddress = {
        city: user[0].city,
        street: user[0].street,
        house: user[0].house,
        apartment: user[0].apartment
      };
    });
    this.initOrderForm();
    this.initAddressForm();
    this.initCardform();
  }

  public initOrderForm(): void {
    this.orderForm = this.fb.group({
      paymentMethod: ['cash', [Validators.required]],
      phoneNumber: [
        '',
        {
          validators: [Validators.required, Validators.minLength(8)],
          updateOn: 'blur'
        }
      ],
      comment: ['']
    });
  }

  public initCardform(): void {
    this.cardForm = this.fb.group({
      cardNumber: ['', [Validators.required]],
      cardMonth: ['', [Validators.required]],
      cardYear: ['', [Validators.required]],
      cvvNumber: ['', [Validators.required]]
    })
  }

  public initAddressForm(): void {
    this.addressForm = this.fb.group({
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[А-яA-z]*$/)
        ]
      ],
      street: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern(/^[А-яA-z]*$/)
        ]
      ],
      house: [
        '',
        [
          Validators.required,
          Validators.min(1),
          Validators.maxLength(3),
          Validators.pattern(/^[1-9]*$/)
        ]
      ],
      apartment: [
        '',
        [
          Validators.min(1),
          Validators.maxLength(1000),
          Validators.pattern(/^[1-9]*$/)
        ]
      ]
    });
  }

  public isHasAddress(): boolean {
    return this.currentUserAddress.city === '' ? true : false;
  }

  public getCartItems(): Array<CartItem> {
    return this.cartService.cartItems;
  }

  public getCostOfItems(): number {
    return this.cartService.getCostOfCartItems();
  }

  public getCostOfDelivery(): number {
    return this.cartService.getCostOfDelivery();
  }

  public getFinalyPrice(): number {
    return this.getCostOfDelivery() + this.getCostOfItems();
  }

  public showAddressEditor(): void {
    this.isChangeAddress = !this.isChangeAddress;
  }

  get phoneNumber(): AbstractControl {
    return this.orderForm.get('phoneNumber');
  }

  public changeUserAddress(): void {
    this.currentUserAddress = {
      city: this.addressForm.value.city,
      street: this.addressForm.value.street,
      house: this.addressForm.value.house,
      apartment:
        this.addressForm.value.apartment === ''
          ? null
          : this.addressForm.value.apartment
    };

    this.isChangeAddress = !this.isChangeAddress;
  }

  public paymentMethod(): string {
    return this.orderForm.value.paymentMethod;
  }

  public createNewOrder(): void {
    this.orderService.addNewOrder(
      this.currentUserAddress.city,
      this.currentUserAddress.street,
      this.currentUserAddress.house,
      this.currentUserAddress.apartment,
      this.orderForm.value.paymentMethod,
      this.orderForm.value.phoneNumber,
      this.orderForm.value.comment,
      this.getFinalyPrice()
    );
  }

  public onSubmit(): void {
    this.createNewOrder();
    this.router.navigate(['check-page']);
  }
}

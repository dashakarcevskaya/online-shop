import { Component, OnInit } from '@angular/core';
import { UserService } from '@services/user.service';
import { AuthService } from '@services/auth.service';
import { User } from '@core/types/user';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.less']
})
export class UserAccountComponent implements OnInit {
  public currentUser: User;
  public userName: string;
  public userSurname: string;
  public isChangeName = false;
  public isChangeSurname = false;
  public isChangeAddress = false;
  public addressForm: FormGroup;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe((user) => {
      this.currentUser = user[0];
    });
    this.initAddressForm();
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
          Validators.minLength(4),
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

  public logOut(): void {
    this.auth.signOut();
  }

  public getUserEmail(): string {
    return this.auth.getUserEmail();
  }

  public showNameEditor(): void {
    this.isChangeName = !this.isChangeName;
  }

  public showSurnameEditor(): void {
    this.isChangeSurname = !this.isChangeSurname;
  }

  public showAddressEditor(): void {
    this.isChangeAddress = !this.isChangeAddress;
  }

  public changeUserName(): void {
    this.isChangeName = false;
    this.userService.changeName(this.userName.toLowerCase());
    this.userName = '';
  }

  public changeUserSurname(): void {
    this.isChangeSurname = false;
    this.userService.changeSurname(this.userSurname.toLowerCase());
    this.userSurname = '';
  }

  public changeUserAddress(): void {
    this.userService.changeAddress(
      this.addressForm.value.city,
      this.addressForm.value.street,
      Number(this.addressForm.value.house),
      this.addressForm.value.apartment
        ? Number(this.addressForm.value.apartment)
        : null
    );
    this.isChangeAddress = false;
  }

  get name(): string {
    return this.currentUser?.name;
  }

  get surname(): string {
    return this.currentUser?.surname;
  }

  get email(): string {
    return this.getUserEmail();
  }
}

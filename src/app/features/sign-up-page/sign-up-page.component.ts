import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth.service';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.less']
})
export class SignUpPageComponent implements OnInit {
  public registerForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private route: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.initRegisterForm();
  }

  public initRegisterForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      surname: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(7)]]
    });
  }

  public registerUser(): void {
    this.auth
      .createUser(
        this.registerForm.value.email,
        this.registerForm.value.password
      )
      .then((id) => {
        this.userService.addNewUser(
          this.registerForm.value.name,
          this.registerForm.value.surname,
          id
        );
      });
  }

  get login(): AbstractControl {
    return this.registerForm.get('login');
  }

  get password(): AbstractControl {
    return this.registerForm.get('password');
  }

  get name(): AbstractControl {
    return this.registerForm.get('name');
  }

  get surname(): AbstractControl {
    return this.registerForm.get('surname');
  }

  get errorMessage(): string {
    return this.auth.errorMessage;
  }
}

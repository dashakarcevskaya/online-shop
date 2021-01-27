import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';
import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-sign-in-page',
  templateUrl: './sign-in-page.component.html',
  styleUrls: ['./sign-in-page.component.less']
})
export class SignInPageComponent implements OnInit {
  public loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.loginForm = this.fb.group({
      login: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur'
        }
      ],
      password: [
        '',
        {
          validators: [Validators.required, Validators.minLength(7)],
          updateOn: 'blur'
        }
      ]
    });
  }

  public onSubmit(): void {
    this.authService.signIn(
      this.loginForm.value.login,
      this.loginForm.value.password
    );
  }

  public error(): boolean {
    return this.authService.isLoggedIn();
  }

  get login(): AbstractControl {
    return this.loginForm.get('login');
  }

  get password(): AbstractControl {
    return this.loginForm.get('password');
  }

  get errorMessage(): string {
    return this.authService.errorMessage;
  }
}

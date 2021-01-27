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

  public initRegisterForm(): void {
    this.registerForm = this.fb.group({
      name: [
        '',
        {
          validators: [
            (Validators.required,
            Validators.minLength(1),
            Validators.pattern(/^[А-яA-z]*$/))
          ],
          updateOn: 'blur'
        }
      ],
      surname: [
        '',
        {
          validators: [
            Validators.required,
            Validators.minLength(3),
            Validators.pattern(/^[А-яA-z]*$/)
          ],
          updateOn: 'blur'
        }
      ],
      email: [
        '',
        {
          validators: [Validators.required, Validators.email],
          updateOn: 'blur'
        }
      ],
      password: [
        '',
        {
          validators: [(Validators.required, Validators.minLength(7))],
          updateOn: 'blur'
        }
      ]
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

  get email(): AbstractControl {
    return this.registerForm.get('email');
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

import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from '@angular/forms';

import { AuthService } from '@services/auth.service';

@Component({
  selector: 'app-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.less']
})
export class ForgotPasswordPageComponent implements OnInit {
  public resetPasswordForm: FormGroup;
  public isReset = false;

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.resetPasswordForm = this.fb.group({
      email: [
        '',
        {
          validators: [
            Validators.required,
            Validators.email,
            Validators.pattern(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            )
          ],
          updateOn: 'blur'
        }
      ]
    });
  }

  public onSubmit(): void {
    this.authService
      .resetPassword(this.resetPasswordForm.value.email)
      .then(() => (this.isReset = !this.isReset))
      .catch((error) => window.alert(error));
  }

  get email(): AbstractControl {
    return this.resetPasswordForm.get('email');
  }

  public isResetEmail(): boolean {
    return this.isReset;
  }
}

import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../core/interfaces/http';
import { AuthService } from '../../core/service/authServices';
import { Router } from '@angular/router';
import {  NgxSpinnerService } from 'ngx-spinner';
import { SharedModule } from '../../shared/module/shared/shared-module';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Login {
  email!: FormControl;
  password!: FormControl;
  loginForm!: FormGroup;

  constructor(
    private _authService: AuthService,
    private _messageService: MessageService,
    private _ngxSpinnerService: NgxSpinnerService,
    private _router: Router,
  ) {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.email = new FormControl('', [Validators.required,Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
  }

  initFormGroupe(): void {
    this.loginForm = new FormGroup({
      email: this.email,
      password: this.password,
    });
  }

  submit() {
    if (this.loginForm.valid) {
      this.signIn(this.loginForm.value);
    } else {
      this.loginForm.markAllAsTouched();
      Object.keys(this.loginForm.controls).forEach((control) =>
        this.loginForm.controls[control].markAsDirty()
      );
    }
  }

  signIn(data: ILogin): void {
    this._ngxSpinnerService.show();
    this._authService.login(data).subscribe({
      next: (response) => {
          this.show('success', 'success', 'success login');
        this._ngxSpinnerService.hide();
        this._router.navigate(['home']);
      },
      error: (err) => {
        this.show('error', 'Error', err.error.error);
        this._ngxSpinnerService.hide();
      },
    });
  }
  show(severity: string, summary: string, detail: string) {
    this._messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
    });
  }
}

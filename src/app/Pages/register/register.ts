import { Component, ViewEncapsulation} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { SharedModule } from '../../shared/module/shared/shared-module';
import { MessageService } from 'primeng/api';
import { IRegister } from '../../core/interfaces/http';
import { AuthService } from '../../core/service/authServices';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.None,
})
export class Register {

  username!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmpassword!: FormControl;
  registrationForm!: FormGroup;

  constructor(private _authService: AuthService,
     private _messageService: MessageService,
    private _router: Router,
    private _ngxSpinnerService: NgxSpinnerService) {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.username = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.password = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]);
    this.confirmpassword = new FormControl('', [
      Validators.required,
      this.passwordMatchValidator(this.password),
    ]);
  }

  initFormGroupe(): void {
    this.registrationForm = new FormGroup({
      username: this.username,
      email: this.email,
      password: this.password,
      confirmpassword: this.confirmpassword,
    });
  }

  passwordMatchValidator(pass: AbstractControl): ValidatorFn {
    return (confirmpass: AbstractControl): null | { [key: string]: boolean } => {
      if (pass.value !== confirmpass.value || confirmpass.value === '') {
        return { passNotMatch: true };
      } else return null;
    };
  }


  submit() {
    if (this.registrationForm.valid) {
      this.siginUp(this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((control) =>
        this.registrationForm.controls[control].markAsDirty()
      );
    }
  }
  siginUp(data: IRegister): void {
    this._ngxSpinnerService.show();
    this._authService.register(data).subscribe({
      next: (response) => {
          this.show('success', 'success', 'success register');
          const { email, password } = data;
          this._authService.login({email, password }).subscribe((next) => {
            this._router.navigate(['home']);
          });

        this._ngxSpinnerService.hide();
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

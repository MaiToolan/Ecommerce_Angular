import { StorageService } from './../../core/service/storageService';
import { Component, ViewEncapsulation} from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';

import { SharedModule } from '../../shared/module/shared/shared-module';
import { IRegister } from '../../core/interfaces/user';
import { AuthService } from '../../core/service/authServices';
import { Router } from '@angular/router';
import { NotificationService } from '../../core/service/notification-service';

@Component({
  selector: 'app-register',
  imports: [SharedModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
  encapsulation: ViewEncapsulation.None,
  standalone:true
})
export class Register {

  isRegister:boolean = false;
  username!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmpassword!: FormControl;
  registrationForm!: FormGroup;

  constructor(private _authService: AuthService,
     private _notificationService: NotificationService,
    private _router: Router,
    private _storageService : StorageService) {
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
    this.isRegister=true;
    this._authService.register(data).subscribe({
      next: (response) => {
          this._notificationService.showSuccess('success', 'success register');
          this._authService.getUsers().subscribe(users=>{
    const user=users.find((u: {email: string})=>u.email===data.email);
    if(user){
      this._authService.login(data).subscribe((next) => {
            this._storageService.setItem('name',data.username);
            this._storageService.setItem('id',user.id);
            this._router.navigate(['/home']);
          });
          }
    })
    this.isRegister=false;
      },
      error: (err) => {
        this._notificationService.showError( 'Error', err.error.error);
      },
    });
  }

}

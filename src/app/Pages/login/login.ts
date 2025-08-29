import { productService } from '../../core/service/productService';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ILogin } from '../../core/interfaces/user';
import { AuthService } from '../../core/service/authServices';
import { Router } from '@angular/router';
import { SharedModule } from '../../shared/module/shared/shared-module';
import { StorageService } from '../../core/service/storageService';
import { NotificationService } from '../../core/service/notification-service';

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
    private _notificationService: NotificationService,
    private _router: Router,
    private _StorageService: StorageService,
    private _userData :productService,
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
    this._authService.getUsers().subscribe(users=>{
    const user=users.find((u: {email: string})=>u.email===data.email);
    if(user){
      this._authService.login({username:user.username,email: user.email ,password :user.password}).subscribe({
      next: (response) => {
        if(response.token){
          this._StorageService.setItem('id',user.id);
          this._StorageService.setItem('name',user.username) ;
          this._notificationService.showSuccess('success', 'success login');
        }
        this._router.navigate(['home']);
      },
      error: (err) => {
        this._notificationService.showError( 'Error', err.error.error);
      },
    });
    }
    })
  }


}



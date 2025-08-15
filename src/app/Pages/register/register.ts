import { Component ,OnInit} from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import {Message, MessageModule } from 'primeng/message';


@Component({
  selector: 'app-register',
  imports: [FormsModule, InputGroupModule, InputGroupAddonModule, InputTextModule,ReactiveFormsModule,ButtonModule,MessageModule],
  templateUrl: './register.html',
  styleUrl: './register.scss'
})
export class Register {
/*   constructor(private _formbuilder : FormBuilder){};

  registrationform!:FormGroup;
  ngOnInit(): void {
    this.registrationform = this._formbuilder.group({
      name:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required,Validators.minLength(3),Validators.maxLength(15)]],
      confirmpassword:['',{ validators: [Validators.required], updateOn: 'blur' }]
    },{Validators:this.passwordMatchValidator});
  }

  passwordMatchValidator :ValidatorFn = (form:AbstractControl):null|ValidationErrors =>{
   const pass=form.get('password')?.value;
   const confirmpass=form.get('confirmpassword')?.value;
   return (pass && confirmpass && pass !== confirmpass) ?  {'passwordMismatch':true} :null;
  }; */


  name!: FormControl;
  email!: FormControl;
  password!: FormControl;
  confirmpassword!: FormControl;
  registrationForm!: FormGroup;

  constructor() {
    this.initFormControls();
    this.initFormGroupe();
  }

  initFormControls(): void {
    this.name = new FormControl('', [
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
      name: this.name,
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
      //this.siginUp(this.registrationForm.value);
    } else {
      this.registrationForm.markAllAsTouched();
      Object.keys(this.registrationForm.controls).forEach((control) =>
        this.registrationForm.controls[control].markAsDirty()
      );
    }
  }


}

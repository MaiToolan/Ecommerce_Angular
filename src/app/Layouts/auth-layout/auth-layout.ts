import { Component } from '@angular/core';
import { AuthNav } from "../../Components/auth-nav/auth-nav";
import { AuthFooter } from "../../Components/auth-footer/auth-footer";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-auth-layout',
  imports: [AuthNav, AuthFooter, RouterOutlet],
  templateUrl: './auth-layout.html',
  styleUrl: './auth-layout.scss',
  standalone:true
})
export class AuthLayout {

}

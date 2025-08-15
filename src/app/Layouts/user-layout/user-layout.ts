import { Component } from '@angular/core';
import { UserNav } from "../../Components/user-nav/user-nav";
import { UserFooter } from "../../Components/user-footer/user-footer";
import { Home } from "../../Pages/home/home";

@Component({
  selector: 'app-user-layout',
  imports: [UserNav, UserFooter, Home],
  templateUrl: './user-layout.html',
  styleUrl: './user-layout.scss',
  standalone:true
})
export class UserLayout {

}

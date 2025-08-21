import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-auth-nav',
  imports: [MenubarModule,RouterLink,RouterLinkActive],
  templateUrl: './auth-nav.html',
  styleUrl: './auth-nav.scss',
  standalone:true
})
export class AuthNav {
  items: MenuItem[] | undefined;
  ngOnInit() {
        this.items = [

                    {
                        label: 'Login',
                        icon: 'pi pi-sign-in',
                        path:'login'
                    },
                    {
                        label: 'Register',
                        icon: 'pi pi-user-plus',
                        path:'register'
                    }
                ]
}
}

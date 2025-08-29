import { ChangeDetectorRef, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { Router, RouterLink,RouterLinkActive } from '@angular/router';
import { StorageService } from '../../core/service/storageService';
import { CartService } from '../../core/service/cart-service';
import { Icart } from '../../core/interfaces/cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-nav',
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './user-nav.html',
  styleUrl: './user-nav.scss',
  standalone:true,
  encapsulation: ViewEncapsulation.None,
})
export class UserNav implements OnInit{

  constructor(private _storageservice :StorageService,
              public _cartService :CartService,
              private _router :Router
            ){}

   items: MenuItem[] | undefined;
   logOut: boolean = false;
   userName:string |null='';
   userCart:Icart []=[];
   cartCount$ !:Observable<number>;


    ngOnInit() {
      this.userName = this._storageservice.getItem('name');
      this.cartCount$ = this._cartService.cartCount$;
      this._cartService.getCartCount();

        this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        routerLink:'/home'
      },
      {
        label: 'Products',
        icon: 'pi pi-sparkles',
        routerLink:'/products'
      },
      {
        label: 'Categories',
        icon: 'pi pi-th-large',
        routerLink:'/category'
      },
    ];
    }


    logout():void{
      this._storageservice.removeItem('id');
      this._storageservice.removeItem('name');
      this._storageservice.removeItem('cart');
      this._router.navigate(['/login']);
    }

}

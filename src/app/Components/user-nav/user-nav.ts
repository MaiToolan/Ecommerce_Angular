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
import { UserData } from '../../core/service/user-data';

@Component({
  selector: 'app-user-nav',
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './user-nav.html',
  styleUrl: './user-nav.scss',
  standalone:true,
  encapsulation: ViewEncapsulation.None,
})
export class UserNav {
  constructor(private _storageservice :StorageService,
              private _userData :UserData,
              private _router :Router,
              private __cahangeDetector :ChangeDetectorRef
            ){}

   items: MenuItem[] | undefined;
   logOut: boolean = false;
   userName:string |null='';
   cartCount:number=0;


    ngOnInit() {
      this.getUserCartCount();
      this.userName = this._storageservice.getItem('name');
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

    getUserCartCount(){
        const ID =Number(this._storageservice.getItem('id')?? 0);
        this._userData.getAllCarts().subscribe(carts=>{
            const userCarts= carts.filter((c: { userId: any })=>c.userId===ID);
            if(userCarts && userCarts.length>0){
              let total=0;
              userCarts.forEach((cart:any) => {
                this._userData.getUserCart(cart.id).subscribe(c=>{
                total+=c.products.reduce((sum:number,p:any)=> sum+ p.quantity,0);
                this.cartCount=total;
                  this.__cahangeDetector.detectChanges();
              });
              })

            }
          })
    }

    logout():void{
      this._storageservice.removeItem('id');
      this._storageservice.removeItem('name');
      this._router.navigate(['login']);
    }

}

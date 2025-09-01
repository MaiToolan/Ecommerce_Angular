import { Products } from './../../Pages/products/products';
import { HttpClient } from '@angular/common/http';
import { Injectable, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { StorageService } from './storageService';
import { IProducts } from '../interfaces/product';
import { json } from 'node:stream/consumers';
import { NotificationService } from './notification-service';

@Injectable({
  providedIn: 'root'
})
export class CartService {

   constructor(private _httpClient: HttpClient,
    private _storageService :StorageService){}

    private cartCountSubject=new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();

    private addedProducts = new Set<number>();

  getAllCarts():Observable<any>{
      return this._httpClient.get<any[]>(`${baseUrl}/carts`);
    }

    getCartCount():void {
        const ID =Number(this._storageService.getItem('id')?? 0);
        this.getAllCarts().pipe( map((carts:any[])=>{
            const userCarts= carts.filter((c: { userId: any })=>c.userId===ID);
            if( userCarts.length ){
              let currentCart=userCarts[userCarts.length -1];
              const total= currentCart.products.reduce((sum:number,p:any)=> sum+ (p?.quantity??0),0);
              this._storageService.setItem('cart',JSON.stringify(currentCart));
              this.cartCountSubject.next(total);
            }
            else{
              this.cartCountSubject.next(0) ;
            }
          })).subscribe();

    }

    updateCartCount():void{
      const ID =Number(this._storageService.getItem('id')?? 0);
      const cart =JSON.parse(this._storageService.getItem('cart')?? `{id:1 ,userId:${ID} , products:[]}`);
      const total= cart.products.reduce((sum:number,p:any)=> sum+ (p?.quantity??0),0);
      this.cartCountSubject.next(total);

    }

  addToCart(product:IProducts){
    const ID =Number(this._storageService.getItem('id')?? 0);
    const cart= JSON.parse(this._storageService.getItem('cart')?? `{id:1 ,userId:${ID} , products:[]}`);
    let _product=cart.products.find((p:any)=>p.productId===product.id);
      if(_product){
        _product.quantity+=1;
      }
      else{
        cart.products.push({productId:product.id,quantity:1});
      }
      this._storageService.setItem('cart',JSON.stringify(cart));
      this.updateCartCount();
      this.addedProducts.add(product.id);
    }

    isProductInCart(productId:number):boolean{
      return this.addedProducts.has(productId);
    }
    removeProductFromCart():void{
      this.addedProducts.clear();
    }
  }



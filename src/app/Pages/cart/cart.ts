import { map, Observable, of } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DataView } from 'primeng/dataview';
import { IProducts } from '../../core/interfaces/product';
import { StorageService } from '../../core/service/storageService';
import { productService } from '../../core/service/productService';
import { CartService } from '../../core/service/cart-service';
import { Empty } from '../../shared/empty/empty';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [DataView, ButtonModule, CommonModule,Empty,RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss'
})
export class Cart {
  constructor(private _storageService: StorageService,
    private _productService :productService,
    private _cartService :CartService,
    private _cdr :ChangeDetectorRef
  ){}
    cart: {productId:number;quantity:number}[] = [];
    cartproducts$ !:Observable<IProducts[]>;

  ngOnInit(): void {
    if (this._storageService.getItem('cart') !== null) {
      this.cart = (JSON.parse(this._storageService.getItem('cart')|| '[]')).products;
      this.cartproducts$= this._productService.getAllProducts().pipe(map(products =>
      products.filter((p:any)=>this.cart.some((item:any)=>+item.productId===+p.id)).map(
        (p:any)=>{
          const item=this.cart.find(c=>+c.productId===+p.id);
          return {...p,quantity:item?.quantity??0};

        })
      ));

    }
  }
  clearCart(): void {
    let cartData=JSON.parse(this._storageService.getItem('cart')??'');
    cartData.products=[];
    this._storageService.setItem('cart',JSON.stringify(cartData));
    this.cart = [];
    this.cartproducts$=of([]);
    this._cartService.updateCartCount();
    this._cartService.removeProductFromCart();
  }
}

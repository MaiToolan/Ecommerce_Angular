import { Router, RouterLink } from '@angular/router';
import { productService } from '../../../core/service/productService';
import { CartService } from '../../../core/service/cart-service';
import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { IProducts } from '../../../core/interfaces/product';
import { ButtonModule } from 'primeng/button';
import { NotificationService } from '../../../core/service/notification-service';

@Component({
  selector: 'app-card',
  imports: [NgClass,ButtonModule],
  templateUrl: './card.html',
  styleUrl: './card.scss',
  standalone:true,
})
export class Card {
    constructor( private _productService: productService,
      private _cartService : CartService,
      private _notificationService : NotificationService
    ){}
    @Input({ required: true }) isSmallCard: boolean = false;
   @Input({ required: true }) Products!: IProducts[];

   addToCart(product:IProducts) {
    this._cartService.addToCart(product);
    this._notificationService.showSuccess('success','Added to Cart');
  }

  isInCart(productId:number):boolean{
    return this._cartService.isProductInCart(productId);
  }
}

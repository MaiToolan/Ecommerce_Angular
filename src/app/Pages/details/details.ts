import { ButtonModule } from 'primeng/button';
import { ChangeDetectorRef, Component } from '@angular/core';
import { productService } from '../../core/service/productService';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProducts } from '../../core/interfaces/product';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CartService } from '../../core/service/cart-service';
import { NotificationService } from '../../core/service/notification-service';

@Component({
  selector: 'app-details',
  imports: [CommonModule, ButtonModule, RouterLink],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details {
  constructor(private _productService :productService,
    private _activeRoute: ActivatedRoute,
    private _cartService :CartService,
    private _notificationService : NotificationService
  ){}
  Id:string='';
  productDetails$ !: Observable <IProducts>;
  ngOnInit(): void {
    this._activeRoute.paramMap.subscribe(params=>{
      this.Id =params.get('id')??'';
    })
    this.displayDetails(this.Id);
  }
  displayDetails(id:string):void{
      this.productDetails$=this._productService.getDetails(id);
  }

  addToCart(product:IProducts) {
      this._cartService.addToCart(product);
      this._notificationService.showSuccess('success','Added to Cart');
    }

    isInCart(productId:number):boolean{
      return this._cartService.isProductInCart(productId);
    }
}

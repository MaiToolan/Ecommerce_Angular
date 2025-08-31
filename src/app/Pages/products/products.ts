import { Observable } from 'rxjs';
import { ChangeDetectorRef, Component } from '@angular/core';
import { IProducts } from '../../core/interfaces/product';
import { productService } from '../../core/service/productService';
import { Card } from "../../shared/card/card/card";
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { SearchProductPipe } from '../../core/pipes/search-product-pipe';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',
  imports: [Card ,InputIconModule,
    IconFieldModule,
    InputTextModule,
    FormsModule,
    CommonModule,
  SearchProductPipe],
  templateUrl: './products.html',
  styleUrl: './products.scss',
  standalone:true
})
export class Products {
  allProducts$ !:Observable<IProducts[]>;
  searchKey :string ='';

  constructor(private _productService : productService,
    private _cdr :ChangeDetectorRef
  ){};

  ngOnInit(): void {
      this.getAllProducts();
  }

  getAllProducts():void{
    this.allProducts$=this._productService.getAllProducts()

  }
}

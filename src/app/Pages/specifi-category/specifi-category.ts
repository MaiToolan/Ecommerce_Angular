import { Category } from './../category/category';
import { Component } from '@angular/core';
import { productService } from '../../core/service/productService';
import { IProducts } from '../../core/interfaces/product';
import { Card } from '../../shared/card/card/card';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-specifi-category',
  imports: [Card, CommonModule],
  templateUrl: './specifi-category.html',
  styleUrl: './specifi-category.scss'
})
export class SpecifiCategory {
   constructor(private _productService :productService,
    private _activatedRoute: ActivatedRoute
   ){}

  products$ !: Observable< IProducts[]>;
   categoryName !:string ;

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe(params=>{
    this.categoryName =params.get('category')?? '';
    if(this.categoryName){
      this.getSpecificCategory(this.categoryName);
    }
    })

  }
  getSpecificCategory(categoryName:string){
    this.products$=this._productService.getAllProducts().pipe(
      map(products=>products.filter((p:any)=>p.category===categoryName)));
  }
}

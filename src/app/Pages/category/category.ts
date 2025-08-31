import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { productService } from '../../core/service/productService';
import { map, Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-category',
  imports: [RouterLink,CommonModule],
  templateUrl: './category.html',
  styleUrl: './category.scss'
})
export class Category {
  constructor(private _productService :productService){}
  allCategory$ !: Observable< {name:string ,image :string}[]>;

  ngOnInit(): void {
    this.getAllcategories();
  }

  getAllcategories(){
    this.allCategory$= this._productService.getAllProducts().pipe(
      map(products=>{
        const categoryMap:{[key:string] :string}={};
        products.forEach((p:any) => {
          if(!categoryMap[p.category]){
            categoryMap[p.category]=p.image;
          }
        });
        return Object.keys(categoryMap).map(key=>
          ({name:key , image: categoryMap[key]}));
      })
    )
  }

}

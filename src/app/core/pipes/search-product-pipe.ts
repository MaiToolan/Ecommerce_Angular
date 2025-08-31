import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/product';

@Pipe({
  name: 'searchProduct'
})
export class SearchProductPipe implements PipeTransform {

  transform(products: IProducts[] |null |undefined, searchKey:string): IProducts[] {
    if(!products){return [];}
    if(!searchKey || searchKey.trim()===''){return products;}
    return products.filter(p=>p.title.toLowerCase().includes(searchKey.toLowerCase()));
  }

}

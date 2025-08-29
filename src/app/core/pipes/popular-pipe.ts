import { Pipe, PipeTransform } from '@angular/core';
import { IProducts } from '../interfaces/product';

@Pipe({
  name: 'popular',
  standalone:true
})
export class PopularPipe implements PipeTransform {

   transform(products: IProducts[]): IProducts[] {
    return products.filter((product) => product?.rating.rate > 3);
  }

}

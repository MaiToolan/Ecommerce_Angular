import { ChangeDetectorRef, Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { IProducts } from '../../core/interfaces/product';
import { productService } from '../../core/service/productService';
import { Card } from '../../shared/card/card/card';
import { PopularPipe } from '../../core/pipes/popular-pipe';


@Component({
  selector: 'app-home',
  imports: [GalleriaModule,Card,PopularPipe],
  templateUrl: './home.html',
  styleUrl: './home.scss',
  standalone:true
})
export class Home {
  constructor(private _productService: productService,
    private _cdr :ChangeDetectorRef) {}

  images: any[] | undefined;
  smallProducts: IProducts[]=[];
  popularProducts: IProducts[]=[];
  ngOnInit() {
    this.images = [
      {
        itemImageSrc: 'product-1.jpg',
        alt: 'Description for Product 1',
        title: 'product 1',
      },
      {
        itemImageSrc: 'product-2.jpg',
        alt: 'Description for Product 2',
        title: 'product 2',
      },
      {
        itemImageSrc: 'product-3.jpg',
        alt: 'Description for Product 3',
        title: 'product 3',
      },
      {
        itemImageSrc: 'product-4.jpg',
        alt: 'Description for Product 4',
        title: 'product 4',
      },
    ];
    this.getAllProducts();
  }

  getAllProducts(): void {
    this._productService.getAllProducts().subscribe((next) => {
      this.smallProducts = next.filter((p:any) => p?.rating.rate > 4).slice(0, 4);
      this.popularProducts = next;
      this._cdr.detectChanges();
    });
  }
}

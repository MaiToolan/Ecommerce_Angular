import { ChangeDetectorRef, Component } from '@angular/core';
import { GalleriaModule } from 'primeng/galleria';
import { IProducts } from '../../core/interfaces/http';
import { UserData } from '../../core/service/user-data';
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
  constructor(private _userData: UserData,
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
    this._userData.getAllProducts().subscribe((next) => {
      this.smallProducts = next.slice(0, 4);
      this.popularProducts = next;
      this._cdr.detectChanges();
    });
  }
}

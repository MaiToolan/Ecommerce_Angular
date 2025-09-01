import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class productService {

  constructor(private _httpClient: HttpClient){}


  getAllProducts():Observable<any>{
    return this._httpClient.get(`${baseUrl}/products`);
  }

  getDetails(id:string):Observable<any>{
    return this._httpClient.get(`${baseUrl}/products/${id}`);
  }

}

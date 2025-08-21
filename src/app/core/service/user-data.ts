import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';

@Injectable({
  providedIn: 'root'
})
export class UserData {

  constructor(private _httpClient: HttpClient){}

  getAllCarts():Observable<any>{
    return this._httpClient.get<any[]>(`${baseUrl}/carts`);
  }
  getUserCart(id:string):Observable<any>{
    return this._httpClient.get(`${baseUrl}/carts/${id}`);
  }
  getAllProducts():Observable<any>{
    return this._httpClient.get(`${baseUrl}/products`);
  }
}


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { ILogin, IRegister } from '../interfaces/http';
import { StorageService } from './storageService';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpclient : HttpClient, private _storageService :StorageService){}



  register (registerData:IRegister):Observable<any>{

    return this._httpclient.post(`${baseUrl}/users`,registerData);
  }

  login(loginUser:IRegister): Observable<any> {

    return this._httpclient.post(`${baseUrl}/auth/login`, loginUser);
  }

  getUsers():Observable<any>{
    return this._httpclient.get<any[]>(`${baseUrl}/users`)
  }

  authorized(): boolean {
    if (this._storageService.getItem('id')) {
      return true;
    } else return false;
  }


}


import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { baseUrl } from '../apiRoot/baseUrl';
import { ILogin, IRegister } from '../interfaces/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private _httpclient : HttpClient){}



  register (registerData:IRegister):Observable<any>{
    const headers= new HttpHeaders({'x-api-key': 'reqres-free-v1',
    'Content-Type': 'application/json'});
    return this._httpclient.post(`${baseUrl}/users`,registerData,{headers});
  }

  login(loginUser: ILogin): Observable<any> {
    const headers= new HttpHeaders({'x-api-key': 'reqres-free-v1',
    'Content-Type': 'application/json'});
    return this._httpclient.post(`${baseUrl}/login`, loginUser,{headers});
  }
}

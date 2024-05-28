import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from "../models/login";
import { Register } from "../models/register";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtAuth } from "../models/jwtAuth";
import { Company } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "AuthManagement/Register";
  loginUrl = "AuthManagement/Login";
  getMeUrl = "AuthManagement/Me";

  constructor(private httpClient: HttpClient) { }
  
  onGetInfo$ = new Subject<any>();

  public register(user: Register): Observable<JwtAuth> {
    return this.httpClient.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}`, user);
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.httpClient.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`, user);
  }

  public getMe(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.getMeUrl}`);
  }

  public logout(): void { }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Login } from "../models/login";
import { Register } from "../models/register";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { JwtAuth } from "../models/jwtAuth";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  registerUrl = "AuthManagement/Register";
  loginUrl = "AuthManagement/Login";
  weatherUrl = "WeatherForecast";

  constructor(private httpClient: HttpClient) { }

  public register(user: Register): Observable<JwtAuth> {
    return this.httpClient.post<JwtAuth>(`${environment.apiUrl}/${this.registerUrl}`, user);
  }

  public login(user: Login): Observable<JwtAuth> {
    return this.httpClient.post<JwtAuth>(`${environment.apiUrl}/${this.loginUrl}`, user);
  }

  public getWeather(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.weatherUrl}`);
  }
}

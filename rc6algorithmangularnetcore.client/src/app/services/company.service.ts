import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Company } from '../models/company';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  companyUrl = "Company";
  company?: Company;

  constructor(private httpClient: HttpClient) { }

  public addCompany(company: Company): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}/${this.companyUrl}`, company);
  }

  public getCompany(companyEmail: string): Observable<Company> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${this.companyUrl}/${companyEmail}`);
  }
}

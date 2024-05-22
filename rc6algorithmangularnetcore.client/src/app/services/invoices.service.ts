import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtAuth } from '../models/jwtAuth';
import { environment } from "src/environments/environment";
import { Invoice } from '../models/Invoice';

@Injectable({
  providedIn: 'root'
})
export class InvoicesService {
  invoiceUrl = 'Invoice';

  constructor(private httpClient: HttpClient) { }

  public getInvoices(): Observable<Invoice[]> {
    return this.httpClient.get<Invoice[]>(`${environment.apiUrl}/${this.invoiceUrl}`);
  }

  public getInvoice(id: number): Observable<Invoice> {
    return this.httpClient.get<Invoice>(`${environment.apiUrl}/${this.invoiceUrl}/${id}`);
  }

  public createInvoice(invoice: Invoice): Observable<any> {
    return this.httpClient.post<Invoice>(`${environment.apiUrl}/${this.invoiceUrl}`, invoice);
  }
  
  public updateInvoice(updatedInvoice: Invoice): Observable<Invoice> {
    return this.httpClient.put<Invoice>(`${environment.apiUrl}/${this.invoiceUrl}`, updatedInvoice);
  }

  public deleteInvoice(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${environment.apiUrl}/${this.invoiceUrl}/${id}`);
  }
}

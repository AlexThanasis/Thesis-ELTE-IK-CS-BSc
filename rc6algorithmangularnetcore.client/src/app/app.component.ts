import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { AuthenticationService } from './services/authentication.service';
import { InvoicesService } from './services/invoices.service';
import { CompanyService } from './services/company.service';
import { Company } from './models/company';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'rc6algorithmangularnetcore';
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();
  company?: Company;

  constructor(
    private authService: AuthenticationService,
    private invoiceService: InvoicesService,
    private companyService: CompanyService
  ) { }

  ngOnInit() {
    this.authService.getMe().subscribe((data) => {
      console.log("DATA: ", JSON.stringify(data.result.email));

      if (data && data.result) {
        localStorage.setItem("email", data.result.email);
        this.companyService.getCompany(data.result.email).subscribe(company => {
          this.companyService.company = company;
          localStorage.setItem("company", JSON.stringify(company));
        });
      }
    });
  }

  // invoices() {
  //   this.invoiceService.getInvoices().subscribe((invoices: any) => {
  //     console.log(invoices);
  //   })
  // }

  // getForecasts() {
  //   this.http.get<WeatherForecast[]>('/weatherforecast').subscribe(
  //     (result) => {
  //       this.forecasts = result;
  //     },
  //     (error) => {
  //       console.error(error);
  //     }
  //   );
  // }

}

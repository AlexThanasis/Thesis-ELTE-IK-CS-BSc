import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { AuthenticationService } from './services/authentication.service';
import { InvoicesService } from './services/invoices.service';

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public forecasts: WeatherForecast[] = [];
  title = 'rc6algorithmangularnetcore';
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();

  constructor(
    // private http: HttpClient,
    private authService: AuthenticationService,
    private invoiceService: InvoicesService
  ) { }

  ngOnInit() {
    // this.getForecasts();
  }

  register(registerDto: Register) {
    this.authService.register(registerDto).subscribe();
  }

  login(loginDto: Login) {
    console.log("LOGIN> ", loginDto);

    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
    });
  }

  weather() {
    this.authService.getWeather().subscribe((weatherData: any) => {
      console.log(weatherData);
    })
  }

  invoices() {
    this.invoiceService.getInvoices().subscribe((invoices: any) => {
      console.log(invoices);
    })
  }

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

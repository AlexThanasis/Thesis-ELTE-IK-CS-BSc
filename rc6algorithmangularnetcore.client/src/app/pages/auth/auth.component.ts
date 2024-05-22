import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { InvoicesService } from '../../services/invoices.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Register } from '../../models/register';
import { JwtAuth } from '../../models/jwtAuth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();

  constructor(
    // private http: HttpClient,
    private authService: AuthenticationService,
    private invoiceService: InvoicesService,
    private router: Router,
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
      this.router.navigate(['/dashboard']);
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
}

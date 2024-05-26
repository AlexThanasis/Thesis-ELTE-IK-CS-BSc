import { Component } from '@angular/core';
import { Login } from '../../models/login';
import { InvoicesService } from '../../services/invoices.service';
import { AuthenticationService } from '../../services/authentication.service';
import { Register } from '../../models/register';
import { JwtAuth } from '../../models/jwtAuth';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  loginDto = new Login();
  userRegisterDto = new Register();
  companyRegisterDto = new Company();
  jwtDto = new JwtAuth();

  constructor(
    // private http: HttpClient,
    private authService: AuthenticationService,
    private invoiceService: InvoicesService,
    private companyService: CompanyService,
    private router: Router,
  ) { }

  ngOnInit() {
    // this.getForecasts();
  }

  register(registerDto: Register, companyRegisterDto: Company) {
    companyRegisterDto.email = registerDto.email;
    this.authService.register(registerDto).subscribe();
    this.companyService.addCompany(companyRegisterDto).subscribe();
    console.log("Register> ");
    this.router.navigate(['/dashboard']);

  }

  login(loginDto: Login) {
    console.log("LOGIN> ", loginDto);

    this.authService.login(loginDto).subscribe((jwtDto) => {
      localStorage.setItem('jwtToken', jwtDto.token);
      this.router.navigate(['/dashboard']);
    });
  }

  invoices() {
    this.invoiceService.getInvoices().subscribe((invoices: any) => {
      console.log(invoices);
    })
  }
}

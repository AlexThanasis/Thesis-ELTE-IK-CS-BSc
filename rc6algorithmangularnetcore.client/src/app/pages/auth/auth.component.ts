import { Component, EventEmitter, Output } from '@angular/core';
import { Login } from '../../models/login';
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
  isRegisterError = false;
  isUserError = false;
  isCompanyError = false;

  constructor(
    private authService: AuthenticationService,
    private companyService: CompanyService,
    private router: Router,
  ) { }

  ngOnInit(): void { }

  register(registerDto: Register, companyRegisterDto: Company): void {
    companyRegisterDto.email = registerDto.email;
    this.authService.register(registerDto).subscribe(
      (jwtDto) => {
        localStorage.setItem('jwtToken', jwtDto.token);
        this.authService.getMe().subscribe(
          (user) => {
            this.authService.onGetInfo$.next(user);
            if (user.result.email) {
              this.companyService.getCompany(registerDto.email).subscribe(
                (company) => {
                  this.authService.onGetInfo$.next(company);
                  this.router.navigate(['/invoices']);
                }, (error) => {
                  this.isCompanyError = true;
                  console.error(error);
                }
              )
            }
          }, (error) => {
            this.isUserError = true;
            console.error(error);
          }
        );
      }, (error) => {
        this.isUserError = true;
        console.error(error);
      }
    );
    this.companyService.addCompany(companyRegisterDto).subscribe();
    this.router.navigate(['/invoices']);
  }

  login(loginDto: Login): void {
    this.authService.login(loginDto).subscribe(
      (jwtDto) => {
        localStorage.setItem('jwtToken', jwtDto.token);
        this.authService.getMe().subscribe(
          (user) => {
            this.authService.onGetInfo$.next(user);
            if (user.result.email) {
              this.companyService.getCompany(user.result.email).subscribe(
                (company) => {
                  this.authService.onGetInfo$.next(company);
                  this.router.navigate(['/invoices']);
                }, (error) => {
                  this.isCompanyError = true;
                  console.error(error);
                }
              )
            }
          }, (error) => {
            this.isUserError = true;
            console.error(error);
          }
        );
      }, (error) => {
        this.isUserError = true;
        console.error(error);
      });
  }

  isRegFieldsOk(): boolean {
    if (this.userRegisterDto.email.length > 0 && this.userRegisterDto.password.length > 0 && this.companyRegisterDto.address.length > 0 &&
      this.userRegisterDto.name.length > 0 && !!this.companyRegisterDto.companyId && this.companyRegisterDto.email.length > 0 &&
      this.companyRegisterDto.taxNumber.length > 0) {
      return true;
    }
    return false;
  }
}

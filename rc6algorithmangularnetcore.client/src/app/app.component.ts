import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Login } from './models/login';
import { Register } from './models/register';
import { JwtAuth } from './models/jwtAuth';
import { AuthenticationService } from './services/authentication.service';
import { Company } from './models/company';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'RC6 Algorithms with Angular and .NetCore';
  loginDto = new Login();
  registerDto = new Register();
  jwtDto = new JwtAuth();
  company?: Company;
  userData?: any;

  onGetInfoSub: Subscription = new Subscription;

  constructor(
    private authService: AuthenticationService,
  ) { }

  ngOnInit() {
    this.onGetInfoSub = this.authService.onGetInfo$.subscribe($event => {
      this.addUserInfo($event);
    })
    const company = localStorage.getItem("company");
    const user = localStorage.getItem("user");
    if (company) {
      this.company = JSON.parse(company);
    }
    if (user) {
      this.userData = JSON.parse(user);
    }
  }

  ngOnDestroy(): void {
    if (this.onGetInfoSub) {
      this.onGetInfoSub.unsubscribe();
    }
  }

  addUserInfo(event: any) {
    if (event.companyId) {
      this.company = event;
      localStorage.setItem("company", JSON.stringify(this.company));
    } else {
      this.userData = event;
      localStorage.setItem("user", JSON.stringify(this.userData));
    }
  }
}

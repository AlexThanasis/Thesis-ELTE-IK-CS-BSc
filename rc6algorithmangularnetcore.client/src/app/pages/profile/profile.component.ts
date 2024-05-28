import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Company } from 'src/app/models/company';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData?: any;
  company?: Company;

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
      localStorage.setItem("user", JSON.stringify(this.company));
    }
  }

  logout(): void {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("user");
    localStorage.removeItem("company");
    this.authService.logout();
    window.location.href = "/welcome";
  }
}

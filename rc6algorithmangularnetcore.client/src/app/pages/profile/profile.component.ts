import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from 'src/app/models/company';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData?: any;

  constructor(
    private authService: AuthenticationService,
    private companyService: CompanyService,
    private router: Router
  ) { }

  ngOnInit(): void {
    if (this.companyService.company) {
      this.userData = this.companyService.company;
    } else {
      this.userData = JSON.parse(localStorage.getItem("company") ?? "");
    }
    console.log("Profile: ", this.companyService.company);

  }

  logout(): void {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("email");
    localStorage.removeItem("company");
    this.router.navigate(['/welcome']);
    this.authService.logout();
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthenticationService, private companyService: CompanyService) { }

  ngOnInit(): void {
    this.authService.getMe().subscribe((data) => {
      console.log("DATA: ", data);
      if (data) {
        //this.userData = data;
        this.companyService.getCompany(data.email).subscribe((data) => {
          console.log("DATA: ", data);
          if (data) {
            //this.userData = data;
          }
        });
      }
    });
  }

  logout(): void {
    console.log("LOGOUT!");
    localStorage.removeItem("jwtToken");
    this.authService.logout();
  }
}

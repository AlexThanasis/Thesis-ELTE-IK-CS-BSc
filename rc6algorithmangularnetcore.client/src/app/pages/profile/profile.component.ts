import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userData: any;

  constructor(private authService: AuthenticationService) { }
  ngOnInit(): void {
    this.authService.getMe().subscribe((data) => {
      console.log("DATA: ", data);
      if (data) {
        this.userData = data;
      }
    });
  }

  logout(): void {
    console.log("LOGOUT!");
    this.authService.logout();
  }

}

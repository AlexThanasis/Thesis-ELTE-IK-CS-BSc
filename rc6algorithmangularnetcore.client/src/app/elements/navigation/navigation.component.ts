import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  title = 'Presentation of the used cryptographic methods';
  isLoggedIn = localStorage.getItem('jwtToken');
}

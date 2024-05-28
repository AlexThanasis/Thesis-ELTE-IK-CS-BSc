import { Component, Input } from '@angular/core';
import { Company } from 'src/app/models/company';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent {
  @Input() company?: Company;
  title = 'Presentation of the used cryptographic methods';
  isLoggedIn = localStorage.getItem('jwtToken');
}

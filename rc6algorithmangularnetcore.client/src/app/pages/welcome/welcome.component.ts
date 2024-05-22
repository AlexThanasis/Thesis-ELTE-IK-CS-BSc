import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  title = 'Szakdolgozat projektje, Atanasziu Alexisz 2024';
  content = `Az én nevem Atanasziu Alexisz és üdvözöllek a szakdolgozatom projektjében!`;
}

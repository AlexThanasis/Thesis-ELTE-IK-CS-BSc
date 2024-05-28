import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  title = ' Atanasziu Alexisz Szakdolgozat projektje, 2024';
  subtitle = `Az én nevem Atanasziu Alexisz és üdvözöllek a szakdolgozatom projektjében!`;
  text = `Bár maga a keret applikáció angolul van, a szakdolgozat specifikus leírások magyarul olvashatóak.
  A szakdolgozatomban elsősorban az RC6 titkosítási eljárás megoldásaira fókuszáltam, amelyet külön lapon el lehet érni a navigációból. A számlákat az invoices menüből lehet elérni és 
  újakat hozzáadni.`;
  text2 = `Külön aloldalt szenteltem az RC6 közvetlen kipróbálásnak is, amely így szemléletesen bemutatja a működését és lépéseit a titkosításnak és a visszafejtésnek.`;
}

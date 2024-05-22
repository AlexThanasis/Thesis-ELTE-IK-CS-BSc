import { Component, Input } from '@angular/core';
import { Invoice } from 'src/app/models/Invoice';

@Component({
  selector: 'app-invoice-list-detail',
  templateUrl: './invoice-list-detail.component.html',
  styleUrls: ['./invoice-list-detail.component.css']
})
export class InvoiceListDetailComponent {
  @Input() invoice: Invoice = {};
}

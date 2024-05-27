import { Component, OnInit } from '@angular/core';
import { Invoice } from 'src/app/models/Invoice';
import { ActivatedRoute } from '@angular/router';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice-details',
  templateUrl: './invoice-details.component.html',
  styleUrls: ['./invoice-details.component.css']
})
export class InvoiceDetailsComponent implements OnInit {
  invoice: Invoice = {};

  constructor(
    private route: ActivatedRoute,
    private invoicesService: InvoicesService,
  ) { }

  ngOnInit() {
    this.getInvoiceDetails();
  }

  getInvoiceDetails() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.invoicesService.getInvoice(id).subscribe(invoice => this.invoice = invoice);
  }
}

import { Component, OnInit } from '@angular/core';
import { Invoice, InvoiceDTO } from 'src/app/models/Invoice';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  invoices: Invoice[] = [];
  isAddNewOpen = false;
  newInvoice: Invoice = new InvoiceDTO();

  constructor(private invoiceService: InvoicesService) { }

  ngOnInit(): void {
    this.getInvoices();
  }
  
  getInvoices() {
    this.invoiceService.getInvoices().subscribe((result) => {
      this.invoices = result;
      console.log("inv: ", this.invoices);
    });
  }

  toggleIsAddNewOpen() {
    this.isAddNewOpen = !this.isAddNewOpen;
  }

  addNewInvoice() {
    this.invoiceService.createInvoice(this.newInvoice).subscribe((result) => {
      this.getInvoices();
    })
  }

  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe((result) => {
      console.log(result);
      this.getInvoices();
    })
  }
}

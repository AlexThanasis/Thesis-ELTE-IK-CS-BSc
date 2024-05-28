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
    });
  }

  toggleIsAddNewOpen() {
    this.isAddNewOpen = !this.isAddNewOpen;
  }

  addNewInvoice() {
    this.newInvoice.companyId = JSON.parse(localStorage.getItem("company") ?? "");
    this.invoiceService.createInvoice(this.newInvoice).subscribe((result) => {
      this.getInvoices();
    })
  }

  addNewRandomInvoice() {
    const currencies = ["HUF", "EUR"];
    const customerAddress = ["Bp 1041 Tesztelok utca 1", "Bp 1201 Teszt ter 3/B", "Bp 1132 Teszt utca 4", "Bp 1172 Tesztenszky u 5/T"];
    const customerNames = ["Teeeeszt Kft.", "Customer Kft.", "Kosztumer Zrt.", "Teszt Bt.", "Teszteset Zrt."];

    this.newInvoice.companyId = JSON.parse(localStorage.getItem("company") ?? "");
    this.newInvoice.currency = currencies[Math.floor(Math.random() * currencies.length)];
    this.newInvoice.customerAddress = customerAddress[Math.floor(Math.random() * customerAddress.length)];
    this.newInvoice.customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
    this.newInvoice.customerTaxNumber = "CTN-12" + Math.floor(Math.random() * 99);
    this.newInvoice.netValue = Math.floor(Math.random() * 10000);
    this.newInvoice.vat = 27;
    this.newInvoice.grossValue = this.newInvoice.netValue * 1.27;
    this.newInvoice.invoiceNumber = "IN-12" + Math.floor(Math.random() * 9999);
    this.newInvoice.issueDate = "2024-06-" + Math.floor(Math.random() * 30);
    this.newInvoice.fulfilmentDate = "2024-06-" + Math.floor(Math.random() * 30);
    this.newInvoice.paymentDate = "2024-06-" + Math.floor(Math.random() * 30);
    
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

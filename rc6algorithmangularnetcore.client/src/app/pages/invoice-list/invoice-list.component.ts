import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Invoice, InvoiceDTO } from 'src/app/models/Invoice';
import { Company } from 'src/app/models/company';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { InvoicesService } from 'src/app/services/invoices.service';

@Component({
  selector: 'app-invoice-list',
  templateUrl: './invoice-list.component.html',
  styleUrls: ['./invoice-list.component.css']
})
export class InvoiceListComponent implements OnInit {
  company?: Company;
  invoices: Invoice[] = [];
  newInvoice: Invoice = new InvoiceDTO();
  isAddNewOpen = false;
  isAddInvoiceError = false;
  isGetInvoicesError = false;

  onGetCompanySub: Subscription = new Subscription;

  constructor(private authService: AuthenticationService, private invoiceService: InvoicesService) { }

  ngOnInit(): void {
    this.onGetCompanySub = this.authService.onGetInfo$.subscribe($event => {
      this.addCompanyInfo($event);
    })
    this.newInvoice.currency = "HUF";
    this.newInvoice.vat = 27;
    this.getInvoices();
    const company = localStorage.getItem("company");
    if (company) {
      this.company = JSON.parse(company);
    }
  }

  getInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (result) => {
        this.invoices = result;
      }, (error) => {
        console.error(error);
        this.isGetInvoicesError = true;
      }
    );
  }

  addCompanyInfo(event: any) {
    if (event?.companyId) {
      this.company = event;
    }
  }

  toggleIsAddNewOpen() {
    this.isAddNewOpen = !this.isAddNewOpen;
  }

  addNewInvoice() {
    this.newInvoice.companyId = Number(this.company?.companyId ?? 1);
    this.invoiceService.createInvoice(this.newInvoice).subscribe(
      (result) => {
        this.getInvoices();
      }, (error) => {
        console.error(error);
        this.isAddInvoiceError = true;
      }
    )
  }

  addNewRandomInvoice() {
    const currencies = ["HUF", "EUR"];
    const customerAddress = ["Bp 1041 Tesztelok utca 1", "Bp 1201 Teszt ter 3/B", "Bp 1132 Teszt utca 4", "Bp 1172 Tesztenszky u 5/T"];
    const customerNames = ["Teeeeszt Kft.", "Customer Kft.", "Kosztumer Zrt.", "Teszt Bt.", "Teszteset Zrt."];
    console.log("newInv random: ", this.newInvoice);

    this.newInvoice.companyId = Number(this.company?.companyId ?? 1);
    this.newInvoice.currency = currencies[Math.floor(Math.random() * currencies.length)];
    this.newInvoice.customerAddress = customerAddress[Math.floor(Math.random() * customerAddress.length)];
    this.newInvoice.customerName = customerNames[Math.floor(Math.random() * customerNames.length)];
    this.newInvoice.customerTaxNumber = "CTN-12" + Math.floor(Math.random() * 99);
    this.newInvoice.netValue = Math.floor(Math.random() * 10000);
    this.newInvoice.vat = 27;
    this.newInvoice.grossValue = this.newInvoice.netValue * this.newInvoice.vat + this.newInvoice.netValue;
    this.newInvoice.invoiceNumber = "IN-12" + Math.floor(Math.random() * 9999);
    this.newInvoice.issueDate = "2024-06-" + Math.floor(Math.random() * 30);
    this.newInvoice.fulfilmentDate = "2024-06-" + Math.floor(Math.random() * 30);
    this.newInvoice.paymentDate = "2024-06-" + Math.floor(Math.random() * 30);

    this.invoiceService.createInvoice(this.newInvoice).subscribe(
      (result) => {
        this.getInvoices();
      }, (error) => {
        console.error(error);
        this.isAddInvoiceError = true;
      })
  }

  countGrossValue(): number | undefined {
    return this.newInvoice?.netValue ? this.newInvoice.netValue + (this.newInvoice.netValue * (this.newInvoice.vat ?? 27)) / 100 : undefined;
  }

  isNewInvoiceOk(): boolean {
    const o = this.newInvoice;
    return (o && o.companyId && o.companyId > 0
      && o.customerAddress && o.customerAddress?.length > 0
      && o.customerName && o.customerName?.length > 0
      && o.customerTaxNumber && o.customerTaxNumber?.length > 0
      && o.netValue && o.netValue > 0
      && o.issueDate && o.issueDate?.length > 0
      && o.invoiceNumber && o.invoiceNumber?.length > 0
    ) ? true : false;
  }

  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id).subscribe((result) => {
      console.log(result);
      this.getInvoices();
    })
  }
}

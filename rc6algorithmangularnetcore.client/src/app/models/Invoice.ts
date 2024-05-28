export interface Invoice {
    id?: number;
    companyId?: number;
    invoiceNumber?: string;
    customerName?: string;
    customerTaxNumber?: string;
    customerAddress?: string;
    issueDate?: string;
    paymentDate?: string;
    fulfilmentDate?: string;
    netValue?: number;
    vat?: 8 | 16 | 27;
    grossValue?: number;
    currency?: string;
}

export class InvoiceDTO implements Invoice { }
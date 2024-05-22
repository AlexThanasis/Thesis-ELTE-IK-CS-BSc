export interface Invoice {
    id?: number;
    companyId?: number;
    invoiceNumber?: string;
    issuerName?: string;
    issuerTaxNumber?: string;
    issuerAddress?: string;
    customerName?: string;
    customerTaxNumber?: string;
    // privateCustomer?: boolean;
    customerAddress?: string;
    issueDate?: string;
    paymentDate?: string;
    fulfilmentDate?: string;
    netValue?: number;
    vat?: number;
    grossValue?: number;
    currency?: string;
}

export class InvoiceDTO implements Invoice { }
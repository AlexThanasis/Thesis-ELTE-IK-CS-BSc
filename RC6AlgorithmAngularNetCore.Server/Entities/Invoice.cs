namespace RC6AlgorithmAngularNetCore.Server.Entities
{
    public class Invoice
    {
        public int Id { get; set; }
        public int CompanyId { get; set; }

        public required string InvoiceNumber { get; set; }

        public string CustomerName { get; set; }
        public string CustomerTaxNumber { get; set; }
        public string CustomerAddress { get; set; }
        public required string IssueDate { get; set; }
        public string PaymentDate { get; set; }

        public string FulfilmentDate { get; set; }

        public required float NetValue { get; set; }
        public float GrossValue { get; set; }
        public float VAT { get; set; }
        public string Currency { get; set; }
    }
}

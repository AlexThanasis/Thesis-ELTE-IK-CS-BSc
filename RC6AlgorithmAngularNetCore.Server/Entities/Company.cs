namespace RC6AlgorithmAngularNetCore.Server.Entities
{
    public class Company
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string CompanyId { get; set; }
        public string CompanyEmail { get; set; }
        public required string TaxNumber { get; set; }
        public string Address { get; set; }

    }
}

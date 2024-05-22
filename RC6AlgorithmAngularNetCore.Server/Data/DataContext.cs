using Microsoft.EntityFrameworkCore;
using RC6AlgorithmAngularNetCore.Server.Entities;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;


namespace RC6AlgorithmAngularNetCore.Server.Data
{
    public class DataContext : IdentityDbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }

        public DbSet<Invoice> Invoices { get; set; }
    }
}

using RC6AlgorithmAngularNetCore.Server.Data;
using RC6AlgorithmAngularNetCore.Server.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RC6AlgorithmAngularNetCore.Server.Cipher;
using System.Text;

namespace RC6AlgorithmAngularNetCore.Server.Controllers;

[Route("api/[controller]")]
[ApiController]
public class InvoiceController : ControllerBase
{
    private readonly DataContext _context;
    public InvoiceController(DataContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<List<Invoice>>> GetAllInvoices()
    {
        var invoices = await _context.Invoices.ToListAsync();
        //for (int i = 0; i < invoices.Count; i++)
        //{
            
            //invoices[i].CustomerTaxNumber = RC6.DecryptFromDB(invoices[i].CustomerTaxNumber, 128, "secretKeyForThesis");
            //invoices[i].CustomerAddress = RC6.DecryptFromDB(invoices[i].CustomerAddress, 128, "secretKeyForThesis");
       // }
        return Ok(invoices);
    }

    [HttpGet]
    [Route("{id}")]
    public async Task<ActionResult<Invoice>> GetInvoice(int id)
    {
        var invoice = await _context.Invoices.FindAsync(id);
        if (invoice is null)
            return NotFound("Invoice not found.");
        // return BadRequest("Invoice not found.");

        invoice.CustomerTaxNumber = RC6.DecryptFromDB(invoice.CustomerTaxNumber, 128, "secretKeyForThesis");
        invoice.CustomerAddress = RC6.DecryptFromDB(invoice.CustomerAddress, 128, "secretKeyForThesis");

        return Ok(invoice);
    }

    [HttpPost]
    public async Task<ActionResult<List<Invoice>>> AddInvoice([FromBody] Invoice invoice)
    {
        invoice.CustomerTaxNumber = RC6.EncryptForDB(invoice.CustomerTaxNumber, 128, "secretKeyForThesis");
        invoice.CustomerAddress = RC6.EncryptForDB(invoice.CustomerAddress, 128, "secretKeyForThesis");

        _context.Invoices.Add(invoice);
        await _context.SaveChangesAsync();

        return Ok(await _context.Invoices.ToListAsync());
    }

    [HttpPut]
    public async Task<ActionResult<List<Invoice>>> UpdateInvoice(Invoice updatedInvoice)
    {
        var dbInvoice = await _context.Invoices.FindAsync(updatedInvoice.Id);
        if (dbInvoice is null)
            return NotFound("Invoice not found.");

        dbInvoice.NetValue = updatedInvoice.NetValue;
        dbInvoice.GrossValue = updatedInvoice.GrossValue;
        dbInvoice.VAT = updatedInvoice.VAT;
        dbInvoice.companyId = updatedInvoice.companyId;
        dbInvoice.InvoiceNumber = updatedInvoice.InvoiceNumber;
        dbInvoice.CustomerTaxNumber = RC6.EncryptForDB(updatedInvoice.CustomerTaxNumber, 128, "secretKeyForThesis");
        dbInvoice.CustomerName = updatedInvoice.CustomerName;
        dbInvoice.CustomerAddress = RC6.EncryptForDB(updatedInvoice.CustomerAddress, 128, "secretKeyForThesis");
        dbInvoice.IssuerTaxNumber = updatedInvoice.IssuerTaxNumber;
        dbInvoice.IssuerName = updatedInvoice.IssuerName;
        dbInvoice.IssuerAddress = updatedInvoice.IssuerAddress;
        dbInvoice.Currency = updatedInvoice.Currency;
        
        Console.WriteLine("Faszom");
        Console.WriteLine(RC6.DecryptFromDB(RC6.EncryptForDB(updatedInvoice.CustomerTaxNumber, 128, "secretKeyForThesis")));
        Console.WriteLine(RC6.EncryptForDB(updatedInvoice.CustomerTaxNumber, 128, "secretKeyForThesis"));

        Console.WriteLine(updatedInvoice.CustomerTaxNumber); 
        Console.WriteLine(RC6.DecryptFromDB(RC6.EncryptForDB(updatedInvoice.CustomerAddress, 128, "secretKeyForThesis")));
        Console.WriteLine(RC6.EncryptForDB(updatedInvoice.CustomerTaxNumber, 128, "secretKeyForThesis"));

        Console.WriteLine(updatedInvoice.CustomerAddress);

        await _context.SaveChangesAsync();

        return Ok(await _context.Invoices.ToListAsync());
    }

    [HttpDelete]
    public async Task<ActionResult<List<Invoice>>> DeleteInvoice(int id)
    {
        var dbInvoice = await _context.Invoices.FindAsync(id);
        if (dbInvoice is null)
            return NotFound("Invoice not found.");

        _context.Invoices.Remove(dbInvoice);
        await _context.SaveChangesAsync();

        return Ok(await _context.Invoices.ToListAsync());
    }
}

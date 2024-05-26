using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RC6AlgorithmAngularNetCore.Server.Cipher;
using RC6AlgorithmAngularNetCore.Server.Data;
using RC6AlgorithmAngularNetCore.Server.Entities;
using System.Security.Cryptography;

namespace RC6AlgorithmAngularNetCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CompanyController : ControllerBase
    {
        private readonly DataContext _context;
        public CompanyController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        [Route("{companyEmail}")]
        public async Task<ActionResult<Company>> GetCompany(string companyEmail)
        {
            var company = await _context.Companies.FirstOrDefaultAsync(i => i.CompanyEmail == companyEmail);
            if (company is null)
                return NotFound("Company not found.");

            return Ok(company);
        }

        [HttpPost]
        [Route("Add")]
        public async Task<ActionResult<Company>> AddCompany([FromBody] Company company)
        {
            Console.WriteLine("ADDCO");
            Console.WriteLine("company: ", company);

            _context.Companies.Add(company);
            await _context.SaveChangesAsync();

            var newCompany =await _context.Companies.FirstOrDefaultAsync(i => i.CompanyEmail == company.CompanyEmail);
            if (newCompany is null)
                return NotFound("Company has not been created.");

            return Ok(newCompany);
        }
    }
}

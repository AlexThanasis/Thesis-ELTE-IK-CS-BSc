using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RC6AlgorithmAngularNetCore.Server.Cipher;
using RC6AlgorithmAngularNetCore.Server.Entities;
using RC6AlgorithmAngularNetCore.Server.Entities.DTOs;
using System.Text;

namespace RC6AlgorithmAngularNetCore.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class RC6Controller : ControllerBase
    {
        [HttpPost]
        [Route("Encrypt")]
        public async Task<ActionResult<string>> Encrypt([FromBody] EncryptionDTO encryptionDTO)
        {
            var ciphertext = RC6.EncryptForDB(encryptionDTO.PlainText, encryptionDTO.KeySize, encryptionDTO.Key);
            if (ciphertext == null)
            {
                return BadRequest("ciphertext encryption has gone wrong");
            }

            return Ok(ciphertext);
        }

        [HttpPost]
        [Route("Decrypt")]
        public async Task<ActionResult<string>> Decrypt([FromBody] DecryptionDTO decryptionDTO)
        {
            var decryptedtext = RC6.DecryptFromDB(decryptionDTO.CipherText, decryptionDTO.KeySize, decryptionDTO.Key);
            if (decryptedtext == null)
            {
                return BadRequest("ciphertext encryption has gone wrong");
            }
            return Ok(decryptedtext);
        }
    }
}

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
            if (encryptionDTO.KeySize != 128 && encryptionDTO.KeySize != 192 && encryptionDTO.KeySize != 256)
            {
                return BadRequest("Key size should be 128 or 192 or 256 ");
            }
            Console.WriteLine("cucc:" + encryptionDTO.KeySize / encryptionDTO.Key.Length);
            if (encryptionDTO.KeySize / encryptionDTO.Key.Length >= 8)
            {
                return BadRequest("Key string is not enought long, it should be longer than " + encryptionDTO.KeySize / 8);
            }
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
            if (decryptionDTO.KeySize != 128 && decryptionDTO.KeySize != 192 && decryptionDTO.KeySize != 256)
            {
                return BadRequest("Key size should be 128 or 192 or 256 ");
            }
            if (decryptionDTO.KeySize / decryptionDTO.Key.Length >= 8)
            {
                return BadRequest("Key string is not enought long, it should be longer than " + decryptionDTO.KeySize / 8);
            }
            var decryptedtext = RC6.DecryptFromDB(decryptionDTO.CipherText, decryptionDTO.KeySize, decryptionDTO.Key);
            if (decryptedtext == null)
            {
                return BadRequest("ciphertext encryption has gone wrong");
            }
            return Ok(decryptedtext);
        }
    }
}

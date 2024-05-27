using System.ComponentModel.DataAnnotations;

namespace RC6AlgorithmAngularNetCore.Server.Entities.DTOs
{
    public class DecryptionDTO
    {
        [Required]
        public string CipherText { get; set; } = string.Empty;
        public int KeySize { get; set; }
        public string Key { get; set; } = string.Empty;
    }
}

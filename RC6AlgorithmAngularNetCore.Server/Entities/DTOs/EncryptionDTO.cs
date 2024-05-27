using System.ComponentModel.DataAnnotations;

namespace RC6AlgorithmAngularNetCore.Server.Entities.DTOs
{
    public class EncryptionDTO
    {
        [Required]
        public string PlainText { get; set; } = string.Empty;
        public int KeySize { get; set; }
        public string Key { get; set; } = string.Empty;
    }
}

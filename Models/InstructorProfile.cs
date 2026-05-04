using System.ComponentModel.DataAnnotations;

namespace Web_Eng.Models
{
    public class InstructorProfile
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string OfficeLocation { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Bio { get; set; }


        public int UserId { get; set; }
        public User User { get; set; } = null!;
    }
}
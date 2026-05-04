using System.ComponentModel.DataAnnotations;

namespace Web_Eng.Models
{
    public class Student
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string Name { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        [MaxLength(100)]
        public string Email { get; set; } = string.Empty;

        public int Age { get; set; }

        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        public List<Enrollment> Enrollments { get; set; } = new();
    }
}
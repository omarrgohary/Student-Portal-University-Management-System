using System.ComponentModel.DataAnnotations;
using Web_Eng.Models; 
namespace Web_Eng.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [MaxLength(100)]
        public string FullName { get; set; } = string.Empty;

        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;


        [Required]
        public string PasswordHash { get; set; } = string.Empty;

        [Required]
        [MaxLength(20)]
        public string Role { get; set; } = string.Empty; // Admin, Instructor, Student

        public InstructorProfile? InstructorProfile { get; set; }

        public List<Course> CoursesTaught { get; set; } = new();
    }
}
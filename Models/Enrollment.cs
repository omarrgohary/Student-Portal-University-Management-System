using Web_Eng.Models;

namespace Web_Eng.Models
{
    public class Enrollment
    {
        public int StudentId { get; set; }
        public Student Student { get; set; } = null!;

        public int CourseId { get; set; }
        public Course Course { get; set; } = null!;

        public DateTime EnrolledAt { get; set; } = DateTime.UtcNow;

        public string? Grade { get; set; } = "U";

        public int? Seventh { get; set; }
        public int? Twelfth { get; set; }
        public int? Prefinal { get; set; }
        public int? Final { get; set; }
        public bool IsGradeConfirmed { get; set; } = false;

    }
}





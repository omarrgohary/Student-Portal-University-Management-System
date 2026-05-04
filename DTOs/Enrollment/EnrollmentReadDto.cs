namespace Web_Eng.DTOs.Enrollment
{
    public class EnrollmentReadDto
    {
        public int StudentId { get; set; }
        public string StudentName { get; set; } = string.Empty;
        public int CourseId { get; set; }
        public string CourseTitle { get; set; } = string.Empty;
        public DateTime EnrolledAt { get; set; }

        public string? Grade { get; set; }
        public int? Seventh { get; set; }
        public int? Twelfth { get; set; }
        public int? Prefinal { get; set; }
        public int? Final { get; set; }

        public bool IsGradeConfirmed { get; set; }
    }
}
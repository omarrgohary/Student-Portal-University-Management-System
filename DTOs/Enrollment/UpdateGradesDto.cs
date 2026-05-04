namespace Web_Eng.DTOs.Enrollment
{
    public class UpdateGradesDto
    {
        public int StudentId { get; set; }
        public int CourseId { get; set; }

        public int? Seventh { get; set; }
        public int? Twelfth { get; set; }
        public int? Prefinal { get; set; }
        public int? Final { get; set; }

        public string? Grade { get; set; } = "U";
    }
}
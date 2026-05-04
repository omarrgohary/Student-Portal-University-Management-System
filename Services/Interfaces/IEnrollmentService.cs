using Web_Eng.DTOs.Enrollment;

namespace Web_Eng.Services.Interfaces
{
    public interface IEnrollmentService
    {
        Task<List<EnrollmentReadDto>> GetAllAsync();

        Task<EnrollmentReadDto> CreateAsync(EnrollmentCreateDto dto);

        Task<bool> UpdateDetailedGradesAsync(
            int studentId,
            int courseId,
            int? seventh,
            int? twelfth,
            int? prefinal,
            int? final,
            string? grade);

        Task<bool> ConfirmCourseGradesAsync(int courseId);

        Task<bool> DeleteAsync(int studentId, int courseId);
    }
}
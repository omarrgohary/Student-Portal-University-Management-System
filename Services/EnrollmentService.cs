using Microsoft.EntityFrameworkCore;
using Web_Eng.Data;
using Web_Eng.DTOs.Enrollment;
using Web_Eng.Models;
using Web_Eng.Services.Interfaces;

namespace Web_Eng.Services
{
    public class EnrollmentService : IEnrollmentService
    {
        private readonly AppDbContext _context;

        public EnrollmentService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EnrollmentReadDto>> GetAllAsync()
        {
            return await _context.Enrollments
                .AsNoTracking()
                .Include(e => e.Student)
                .Include(e => e.Course)
                .Select(e => new EnrollmentReadDto
                {
                    StudentId = e.StudentId,
                    StudentName = e.Student.Name,
                    CourseId = e.CourseId,
                    CourseTitle = e.Course.Title,
                    EnrolledAt = e.EnrolledAt,

                    Seventh = e.Seventh,
                    Twelfth = e.Twelfth,
                    Prefinal = e.Prefinal,
                    Final = e.Final,
                    IsGradeConfirmed = e.IsGradeConfirmed,

                    Grade = string.IsNullOrWhiteSpace(e.Grade) ? "U" : e.Grade
                })
                .ToListAsync();
        }

        public async Task<EnrollmentReadDto> CreateAsync(EnrollmentCreateDto dto)
        {
            var enrollment = new Enrollment
            {
                StudentId = dto.StudentId,
                CourseId = dto.CourseId,
                Seventh = null,
                Twelfth = null,
                Prefinal = null,
                Final = null,
                Grade = "U"
            };

            _context.Enrollments.Add(enrollment);
            await _context.SaveChangesAsync();

            var student = await _context.Students.FirstAsync(s => s.Id == dto.StudentId);
            var course = await _context.Courses.FirstAsync(c => c.Id == dto.CourseId);

            return new EnrollmentReadDto
            {
                StudentId = enrollment.StudentId,
                StudentName = student.Name,
                CourseId = enrollment.CourseId,
                CourseTitle = course.Title,
                EnrolledAt = enrollment.EnrolledAt,

                Seventh = enrollment.Seventh,
                Twelfth = enrollment.Twelfth,
                Prefinal = enrollment.Prefinal,
                Final = enrollment.Final,

                Grade = enrollment.Grade
            };
        }

        public async Task<bool> UpdateGradeAsync(int studentId, int courseId, string grade)
        {
            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);

            if (enrollment == null)
                return false;

            enrollment.Grade = string.IsNullOrWhiteSpace(grade) ? "U" : grade;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> UpdateDetailedGradesAsync(
            int studentId,
            int courseId,
            int? seventh,
            int? twelfth,
            int? prefinal,
            int? final,
            string? grade)
        {
            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);

            if (enrollment == null)
                return false;

            enrollment.Seventh = seventh;
            enrollment.Twelfth = twelfth;
            enrollment.Prefinal = prefinal;
            enrollment.Final = final;
            enrollment.IsGradeConfirmed = false;
            enrollment.Grade = string.IsNullOrWhiteSpace(grade) ? "U" : grade;

            if (final == null)
            {
                enrollment.Grade = "U";
            }
            else if (final >= 97)
            {
                enrollment.Grade = "A+";
            }
            else if (final >= 93)
            {
                enrollment.Grade = "A";
            }
            else if (final >= 89)
            {
                enrollment.Grade = "A-";
            }
            else if (final >= 84)
            {
                enrollment.Grade = "B+";
            }
            else if (final >= 80)
            {
                enrollment.Grade = "B";
            }
            else if (final >= 76)
            {
                enrollment.Grade = "B-";
            }
            else if (final >= 73)
            {
                enrollment.Grade = "C+";
            }
            else if (final >= 70)
            {
                enrollment.Grade = "C";
            }
            else if (final >= 66)
            {
                enrollment.Grade = "C-";
            }
            else if (final >= 64)
            {
                enrollment.Grade = "D+";
            }
            else if (final >= 60)
            {
                enrollment.Grade = "D";
            }
            else
            {
                enrollment.Grade = "F";
            }

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> ConfirmCourseGradesAsync(int courseId)
        {
            var enrollments = await _context.Enrollments
                .Where(e => e.CourseId == courseId)
                .ToListAsync();

            if (!enrollments.Any())
                return false;

            foreach (var e in enrollments)
            {
                if (!string.IsNullOrWhiteSpace(e.Grade) && e.Grade != "U")
                {
                    e.IsGradeConfirmed = true;
                }
            }

            await _context.SaveChangesAsync();
            return true;
        }
        public async Task<bool> DeleteAsync(int studentId, int courseId)
        {
            var enrollment = await _context.Enrollments
                .FirstOrDefaultAsync(e => e.StudentId == studentId && e.CourseId == courseId);

            if (enrollment == null)
                return false;

            _context.Enrollments.Remove(enrollment);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
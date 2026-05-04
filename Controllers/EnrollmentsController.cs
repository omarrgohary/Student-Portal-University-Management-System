using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Web_Eng.DTOs.Enrollment;
using Web_Eng.Services.Interfaces;

namespace Web_Eng.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class EnrollmentsController : ControllerBase
    {
        private readonly IEnrollmentService _enrollmentService;

        public EnrollmentsController(IEnrollmentService enrollmentService)
        {
            _enrollmentService = enrollmentService;
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<EnrollmentReadDto>>> GetAll()
        {
            return Ok(await _enrollmentService.GetAllAsync());
        }

        [HttpGet("my-courses")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<List<EnrollmentReadDto>>> GetMyCourses()
        {
            var studentIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (studentIdClaim == null)
                return Unauthorized();

            if (!int.TryParse(studentIdClaim, out var studentId))
                return Unauthorized();

            var allEnrollments = await _enrollmentService.GetAllAsync();

            var myCourses = allEnrollments
                .Where(e => e.StudentId == studentId)
                .ToList();

            return Ok(myCourses);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<EnrollmentReadDto>> Create(EnrollmentCreateDto dto)
        {
            var result = await _enrollmentService.CreateAsync(dto);
            return Ok(result);
        }

        [HttpPut("update-grades")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> UpdateGrades(UpdateGradesDto dto)
        {
            var updated = await _enrollmentService.UpdateDetailedGradesAsync(
                dto.StudentId,
                dto.CourseId,
                dto.Seventh,
                dto.Twelfth,
                dto.Prefinal,
                dto.Final,
                dto.Grade
            );

            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpPut("confirm-course")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> ConfirmCourseGrades(ConfirmCourseDto dto)
        {
            if (dto.CourseId <= 0)
                return BadRequest("Course ID is required.");

            var confirmed = await _enrollmentService.ConfirmCourseGradesAsync(dto.CourseId);

            if (!confirmed)
                return NotFound("No enrollments found for this course.");

            return NoContent();
        }

        [HttpDelete("{studentId}/{courseId}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int studentId, int courseId)
        {
            var deleted = await _enrollmentService.DeleteAsync(studentId, courseId);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
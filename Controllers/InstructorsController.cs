using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Web_Eng.DTOs.Instructor;
using Web_Eng.Services.Interfaces;

namespace Web_Eng.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class InstructorsController : ControllerBase
    {
        private readonly IInstructorService _instructorService;
        private readonly ICourseService _courseService;
        private readonly IEnrollmentService _enrollmentService;

        public InstructorsController(
            IInstructorService instructorService,
            ICourseService courseService,
            IEnrollmentService enrollmentService)
        {
            _instructorService = instructorService;
            _courseService = courseService;
            _enrollmentService = enrollmentService;
        }

        private int? GetInstructorIdFromToken()
        {
            var instructorIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (instructorIdClaim == null)
                return null;

            if (!int.TryParse(instructorIdClaim, out var instructorId))
                return null;

            return instructorId;
        }

        [HttpGet("me")]
        [Authorize(Roles = "Instructor")]
        public async Task<ActionResult<InstructorReadDto>> GetMyProfile()
        {
            var instructorId = GetInstructorIdFromToken();

            if (instructorId == null)
                return Unauthorized();

            var instructor = await _instructorService.GetByIdAsync(instructorId.Value);

            if (instructor == null)
                return NotFound();

            return Ok(instructor);
        }

        [HttpGet("my-courses")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> GetMyCourses()
        {
            var instructorId = GetInstructorIdFromToken();

            if (instructorId == null)
                return Unauthorized();

            var courses = await _courseService.GetAllAsync();

            var myCourses = courses
                .Where(c => c.InstructorName != null)
                .Where(c => c.InstructorName == User.FindFirst(ClaimTypes.Name)?.Value)
                .ToList();

            return Ok(myCourses);
        }

        [HttpGet("my-students")]
        [Authorize(Roles = "Instructor")]
        public async Task<IActionResult> GetMyStudents()
        {
            var instructorId = GetInstructorIdFromToken();

            if (instructorId == null)
                return Unauthorized();

            var instructorName = User.FindFirst(ClaimTypes.Name)?.Value;

            var courses = await _courseService.GetAllAsync();

            var myCourseTitles = courses
                .Where(c => c.InstructorName == instructorName)
                .Select(c => c.Title)
                .ToList();

            var enrollments = await _enrollmentService.GetAllAsync();

            var myStudents = enrollments
                .Where(e => myCourseTitles.Contains(e.CourseTitle))
                .Select(e => new
                {
                    e.StudentId,
                    e.StudentName,
                    e.CourseId,
                    e.CourseTitle,
                    e.Seventh,
                    e.Twelfth,
                    e.Prefinal,
                    e.Final,
                    e.Grade,
                    e.EnrolledAt
                })
                .ToList();

            return Ok(myStudents);
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<InstructorReadDto>>> GetAll()
        {
            return Ok(await _instructorService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<InstructorReadDto>> GetById(int id)
        {
            var instructor = await _instructorService.GetByIdAsync(id);

            if (instructor == null)
                return NotFound();

            return Ok(instructor);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<InstructorReadDto>> Create(InstructorCreateDto dto)
        {
            var result = await _instructorService.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, InstructorUpdateDto dto)
        {
            var updated = await _instructorService.UpdateAsync(id, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _instructorService.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Web_Eng.DTOs.Student;
using Web_Eng.Services.Interfaces;

namespace Web_Eng.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class StudentsController : ControllerBase
    {
        private readonly IStudentService _studentService;

        public StudentsController(IStudentService studentService)
        {
            _studentService = studentService;
        }

        private int? GetStudentIdFromToken()
        {
            var studentIdClaim = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            if (studentIdClaim == null)
                return null;

            if (!int.TryParse(studentIdClaim, out var studentId))
                return null;

            return studentId;
        }

        [HttpGet("me")]
        [Authorize(Roles = "Student")]
        public async Task<ActionResult<StudentReadDto>> GetMyProfile()
        {
            var studentId = GetStudentIdFromToken();

            if (studentId == null)
                return Unauthorized();

            var student = await _studentService.GetByIdAsync(studentId.Value);

            if (student == null)
                return NotFound();

            return Ok(student);
        }

        [HttpPut("me")]
        [Authorize(Roles = "Student")]
        public async Task<IActionResult> UpdateMyProfile(StudentUpdateDto dto)
        {
            var studentId = GetStudentIdFromToken();

            if (studentId == null)
                return Unauthorized();

            var updated = await _studentService.UpdateAsync(studentId.Value, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<StudentReadDto>>> GetAll()
        {
            return Ok(await _studentService.GetAllAsync());
        }

        [HttpGet("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<StudentReadDto>> GetById(int id)
        {
            var student = await _studentService.GetByIdAsync(id);

            if (student == null)
                return NotFound();

            return Ok(student);
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<StudentReadDto>> Create(StudentCreateDto dto)
        {
            var result = await _studentService.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, StudentUpdateDto dto)
        {
            var updated = await _studentService.UpdateAsync(id, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }

        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _studentService.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
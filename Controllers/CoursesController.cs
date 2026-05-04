using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Web_Eng.DTOs.Course;
using Web_Eng.Services.Interfaces;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace Web_Eng.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class CoursesController : ControllerBase
    {
        private readonly ICourseService _courseService;

        public CoursesController(ICourseService courseService)
        {
            _courseService = courseService;
        }

        // Admin and Student can view all available courses
        [HttpGet]
        [Authorize(Roles = "Admin,Student")]
        public async Task<ActionResult<List<CourseReadDto>>> GetAll()
        {
            return Ok(await _courseService.GetAllAsync());
        }

        // Admin and Student can view course details
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin,Student")]
        public async Task<ActionResult<CourseReadDto>> GetById(int id)
        {
            var course = await _courseService.GetByIdAsync(id);

            if (course == null)
                return NotFound();

            return Ok(course);
        }

        // Only Admin can create courses
        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<CourseReadDto>> Create(CourseCreateDto dto)
        {
            var result = await _courseService.CreateAsync(dto);

            return CreatedAtAction(nameof(GetById), new { id = result.Id }, result);
        }

        // Only Admin can update courses
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Update(int id, CourseUpdateDto dto)
        {
            var updated = await _courseService.UpdateAsync(id, dto);

            if (!updated)
                return NotFound();

            return NoContent();
        }

        // Only Admin can delete courses
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Delete(int id)
        {
            var deleted = await _courseService.DeleteAsync(id);

            if (!deleted)
                return NotFound();

            return NoContent();
        }
    }
}
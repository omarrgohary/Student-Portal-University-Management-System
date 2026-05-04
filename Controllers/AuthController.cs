using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Web_Eng.Data;
using Web_Eng.DTOs.Auth;
using Web_Eng.Helpers;

namespace Web_Eng.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly JwtTokenGenerator _jwtTokenGenerator;

        public AuthController(AppDbContext context, JwtTokenGenerator jwtTokenGenerator)
        {
            _context = context;
            _jwtTokenGenerator = jwtTokenGenerator;
        }

        // Admin login
        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequestDto dto)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Invalid email or password.");

            var token = _jwtTokenGenerator.GenerateToken(user);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(1)
            });

            Response.Headers.Append("X-Access-Token", token);

            return Ok(new
            {
                message = "Admin login successful"
            });
        }

        // Student login
        [HttpPost("student-login")]
        public async Task<IActionResult> StudentLogin(LoginRequestDto dto)
        {
            var student = await _context.Students
                .FirstOrDefaultAsync(s => s.Email == dto.Email);

            if (student == null || string.IsNullOrWhiteSpace(student.PasswordHash))
                return Unauthorized("Invalid student email or password.");

            var isPasswordValid = BCrypt.Net.BCrypt.Verify(dto.Password, student.PasswordHash);

            if (!isPasswordValid)
                return Unauthorized("Invalid student email or password.");

            var token = _jwtTokenGenerator.GenerateTokenForStudent(student);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(1)
            });

            Response.Headers.Append("X-Access-Token", token);

            return Ok(new
            {
                message = "Student login successful"
            });
        }

        [HttpPost("instructor-login")]
        public async Task<IActionResult> InstructorLogin(LoginRequestDto dto)
        {
            var instructor = await _context.Users
                .FirstOrDefaultAsync(u => u.Email == dto.Email && u.Role == "Instructor");

            if (instructor == null || !BCrypt.Net.BCrypt.Verify(dto.Password, instructor.PasswordHash))
                return Unauthorized("Invalid instructor email or password.");

            var token = _jwtTokenGenerator.GenerateToken(instructor);

            Response.Cookies.Append("jwt", token, new CookieOptions
            {
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Strict,
                Expires = DateTime.UtcNow.AddHours(1)
            });

            Response.Headers.Append("X-Access-Token", token);

            return Ok(new
            {
                message = "Instructor login successful"
            });
        }

        [HttpPost("logout")]
        public IActionResult Logout()
        {
            Response.Cookies.Delete("jwt");

            return Ok(new
            {
                message = "Logged out successfully"
            });
        }
    }
}
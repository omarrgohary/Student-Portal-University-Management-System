using Microsoft.EntityFrameworkCore;
using Web_Eng.Data;
using Web_Eng.DTOs.Instructor;
using Web_Eng.Models;
using Web_Eng.Services.Interfaces;

namespace Web_Eng.Services
{
    public class InstructorService : IInstructorService
    {
        private readonly AppDbContext _context;

        public InstructorService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<InstructorReadDto>> GetAllAsync()
        {
            return await _context.Users
                .AsNoTracking()
                .Where(u => u.Role == "Instructor")
                .Include(u => u.InstructorProfile)
                .Select(u => new InstructorReadDto
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    OfficeLocation = u.InstructorProfile!.OfficeLocation,
                    Bio = u.InstructorProfile.Bio
                })
                .ToListAsync();
        }

        public async Task<InstructorReadDto?> GetByIdAsync(int id)
        {
            return await _context.Users
                .AsNoTracking()
                .Where(u => u.Id == id && u.Role == "Instructor")
                .Include(u => u.InstructorProfile)
                .Select(u => new InstructorReadDto
                {
                    Id = u.Id,
                    FullName = u.FullName,
                    Email = u.Email,
                    OfficeLocation = u.InstructorProfile!.OfficeLocation,
                    Bio = u.InstructorProfile.Bio
                })
                .FirstOrDefaultAsync();
        }

        public async Task<InstructorReadDto> CreateAsync(InstructorCreateDto dto)
        {
            var user = new User
            {
                FullName = dto.FullName,
                Email = dto.Email,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password),
                Role = "Instructor"
            };

            var profile = new InstructorProfile
            {
                User = user,
                OfficeLocation = dto.OfficeLocation,
                Bio = dto.Bio
            };

            _context.Users.Add(user);
            _context.InstructorProfiles.Add(profile);

            await _context.SaveChangesAsync();

            return new InstructorReadDto
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                OfficeLocation = profile.OfficeLocation,
                Bio = profile.Bio,

            };
        }

        public async Task<bool> UpdateAsync(int id, InstructorUpdateDto dto)
        {
            var user = await _context.Users
                .Include(u => u.InstructorProfile)
                .FirstOrDefaultAsync(u => u.Id == id && u.Role == "Instructor");

            if (user == null)
                return false;

            user.FullName = dto.FullName;
            user.Email = dto.Email;
            user.InstructorProfile!.OfficeLocation = dto.OfficeLocation;
            user.InstructorProfile.Bio = dto.Bio;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var user = await _context.Users
                .Include(u => u.InstructorProfile)
                .FirstOrDefaultAsync(u => u.Id == id && u.Role == "Instructor");

            if (user == null)
                return false;

            if (user.InstructorProfile != null)
                _context.InstructorProfiles.Remove(user.InstructorProfile);

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
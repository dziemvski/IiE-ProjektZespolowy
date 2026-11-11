using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PodrozeMaleIDuze.DTO.Response.Users;
using PodrozeMaleIDuze.Models;

namespace PodrozeMaleIDuze.Services.AdminUser;

public class AdminUserService(UserManager<ApplicationUser> userManager) : IAdminUserService
{
    public async Task<IReadOnlyList<UsersListDto>> GetAllUsers()
    {
        return await userManager.Users
            .AsNoTracking()
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName)
            .Select(u => new UsersListDto
            {
                Id = u.Id,
                UserName = u.UserName!,
                Email = u.Email!,
                FirstName = u.FirstName,
                MiddleName = u.MiddleName,
                LastName = u.LastName
            })
            .ToListAsync();
    }
}
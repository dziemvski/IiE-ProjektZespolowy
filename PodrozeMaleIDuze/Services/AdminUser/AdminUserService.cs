using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Data;
using PodrozeMaleIDuze.DTO.Response.Users;
using PodrozeMaleIDuze.Models;
using PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

namespace PodrozeMaleIDuze.Services.AdminUser;

public class AdminUserService(UserManager<ApplicationUser> userManager, AppDbContext context) : IAdminUserService
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

    public async Task<AdminPanelViewModel> GetPanelAsync()
    {
        var users = await userManager.Users
            .AsNoTracking()
            .Include(u => u.ManagedCity)
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName)
            .ToListAsync();

        var roleByUserId = await GetRoleByUserIdAsync();

        var cities = await context.Cities
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => c.Name)
            .ToListAsync();

        return new AdminPanelViewModel
        {
            Cities = cities,
            NewUser = new CreateUserViewModel { AvailableCities = cities },
            Users = users.Select(u => new AdminUserRowViewModel
            {
                Id = u.Id,
                UserName = u.UserName ?? string.Empty,
                Email = u.Email ?? string.Empty,
                Role = roleByUserId.GetValueOrDefault(u.Id, Roles.User),
                Cities = u.ManagedCity is null ? new List<string>() : new List<string> { u.ManagedCity.Name },
                IsEnabled = IsEnabled(u)
            }).ToList()
        };
    }

    private async Task<Dictionary<string, string>> GetRoleByUserIdAsync()
    {
        var pairs = await (
            from userRole in context.UserRoles
            join role in context.Roles on userRole.RoleId equals role.Id
            select new { userRole.UserId, RoleName = role.Name! }
        ).ToListAsync();

        return pairs
            .GroupBy(p => p.UserId)
            .ToDictionary(g => g.Key, g => g.First().RoleName);
    }

    public async Task<UserDetailsViewModel?> GetUserDetailsAsync(string id)
    {
        var user = await userManager.Users
            .AsNoTracking()
            .Include(u => u.ManagedCity)
            .FirstOrDefaultAsync(u => u.Id == id);

        if (user is null)
            return null;

        var roles = await userManager.GetRolesAsync(user);

        return new UserDetailsViewModel
        {
            Id = user.Id,
            UserName = user.UserName ?? string.Empty,
            Email = user.Email ?? string.Empty,
            FirstName = user.FirstName,
            LastName = user.LastName,
            DateOfBirth = user.DateOfBirth,
            Role = roles.FirstOrDefault() ?? Roles.User,
            Cities = user.ManagedCity is null
                ? new List<string>()
                : new List<string> { user.ManagedCity.Name },
            IsEnabled = IsEnabled(user)
        };
    }

    private static bool IsEnabled(ApplicationUser user) =>
        user.LockoutEnd is null || user.LockoutEnd <= DateTimeOffset.UtcNow;
}
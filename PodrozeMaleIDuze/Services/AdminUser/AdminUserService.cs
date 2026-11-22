using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Data;
using PodrozeMaleIDuze.Models;
using PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

namespace PodrozeMaleIDuze.Services.AdminUser;

public class AdminUserService(UserManager<ApplicationUser> userManager, AppDbContext context) : IAdminUserService
{
    public async Task<IReadOnlyList<UserListItemViewModel>> GetAllUsers()
    {
        return await userManager.Users
            .AsNoTracking()
            .OrderBy(u => u.LastName)
            .ThenBy(u => u.FirstName)
            .Select(u => new UserListItemViewModel
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
        var cityOptions = await GetCityOptionsAsync();

        return new AdminPanelViewModel
        {
            Cities = cityOptions.Select(c => c.Text).ToList(),
            NewUser = new CreateUserViewModel { AvailableCities = cityOptions },
            Users = users.Select(u => new AdminUserRowViewModel
            {
                Id = u.Id,
                UserName = u.UserName ?? string.Empty,
                Email = u.Email ?? string.Empty,
                Role = roleByUserId.GetValueOrDefault(u.Id, Roles.User),
                Cities = CityNames(u),
                IsEnabled = IsEnabled(u)
            }).ToList()
        };
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
            Cities = CityNames(user),
            IsEnabled = IsEnabled(user),
            CityId = user.ManagedCityId,
            AvailableCities = await GetCityOptionsAsync()
        };
    }

    public async Task<IdentityResult> CreateUserAsync(CreateUserViewModel model)
    {
        var validation = await ValidateRoleAndCityAsync(model.Role, model.CityId);
        if (validation is not null)
            return validation;

        var user = new ApplicationUser
        {
            UserName = model.UserName.Trim(),
            Email = model.Email.Trim(),
            EmailConfirmed = true,
            FirstName = model.FirstName.Trim(),
            LastName = model.LastName.Trim(),
            DateOfBirth = DateOnly.FromDateTime(model.DateOfBirth!.Value),
            ManagedCityId = model.Role == Roles.CityAdmin ? model.CityId : null
        };

        var createResult = await userManager.CreateAsync(user, model.Password);
        if (!createResult.Succeeded)
            return createResult;

        var roleResult = await userManager.AddToRoleAsync(user, model.Role);
        if (!roleResult.Succeeded)
        {
            await userManager.DeleteAsync(user);
            return roleResult;
        }

        return IdentityResult.Success;
    }

    public async Task<IdentityResult> UpdateUserAsync(string id, UpdateUserViewModel model, string currentUserId)
    {
        if (id == currentUserId)
            return Failed("Nie możesz zmienić własnej roli ani zablokować własnego konta.");

        var user = await userManager.FindByIdAsync(id);
        if (user is null)
            return Failed("Nie znaleziono użytkownika.");

        var validation = await ValidateRoleAndCityAsync(model.Role, model.CityId);
        if (validation is not null)
            return validation;

        var currentRoles = await userManager.GetRolesAsync(user);
        if (currentRoles.Count != 1 || currentRoles[0] != model.Role)
        {
            var removeResult = await userManager.RemoveFromRolesAsync(user, currentRoles);
            if (!removeResult.Succeeded)
                return removeResult;

            var addResult = await userManager.AddToRoleAsync(user, model.Role);
            if (!addResult.Succeeded)
                return addResult;
        }

        user.ManagedCityId = model.Role == Roles.CityAdmin ? model.CityId : null;
        var updateResult = await userManager.UpdateAsync(user);
        if (!updateResult.Succeeded)
            return updateResult;

        if (model.IsEnabled)
            return await userManager.SetLockoutEndDateAsync(user, null);

        await userManager.SetLockoutEnabledAsync(user, true);
        await userManager.SetLockoutEndDateAsync(user, DateTimeOffset.MaxValue);
        return await userManager.UpdateSecurityStampAsync(user);
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

    private async Task<List<SelectListItem>> GetCityOptionsAsync()
    {
        return await context.Cities
            .AsNoTracking()
            .OrderBy(c => c.Name)
            .Select(c => new SelectListItem(c.Name, c.Id.ToString()))
            .ToListAsync();
    }

    private async Task<IdentityResult?> ValidateRoleAndCityAsync(string role, int? cityId)
    {
        if (!Roles.All.Contains(role))
            return Failed("Wybrano nieznaną rolę.");

        if (role != Roles.CityAdmin)
            return null;

        if (cityId is null)
            return Failed("Wybierz miasto dla admina miasta.");

        if (!await context.Cities.AnyAsync(c => c.Id == cityId))
            return Failed("Wybrane miasto nie istnieje.");

        return null;
    }

    private static List<string> CityNames(ApplicationUser user) =>
        user.ManagedCity is null ? new List<string>() : new List<string> { user.ManagedCity.Name };

    private static IdentityResult Failed(string message) =>
        IdentityResult.Failed(new IdentityError { Description = message });

    private static bool IsEnabled(ApplicationUser user) =>
        user.LockoutEnd is null || user.LockoutEnd <= DateTimeOffset.UtcNow;
}
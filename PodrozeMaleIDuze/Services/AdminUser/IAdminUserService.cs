using Microsoft.AspNetCore.Identity;
using PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

namespace PodrozeMaleIDuze.Services.AdminUser;

public interface IAdminUserService
{
    Task<IReadOnlyList<UserListItemViewModel>> GetAllUsers();

    Task<AdminPanelViewModel> GetPanelAsync();

    Task<UserDetailsViewModel?> GetUserDetailsAsync(string id);

    Task<IdentityResult> CreateUserAsync(CreateUserViewModel model);

    Task<IdentityResult> UpdateUserAsync(string id, UpdateUserViewModel model, string currentUserId);
}
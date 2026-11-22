using PodrozeMaleIDuze.DTO.Response.Users;
using PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

namespace PodrozeMaleIDuze.Services.AdminUser;

public interface IAdminUserService
{
    Task<IReadOnlyList<UsersListDto>> GetAllUsers();

    Task<AdminPanelViewModel> GetPanelAsync();

    Task<UserDetailsViewModel?> GetUserDetailsAsync(string id);
}
using PodrozeMaleIDuze.DTO.Response.Users;

namespace PodrozeMaleIDuze.Services.AdminUser;

public interface IAdminUserService
{
    Task<IReadOnlyList<UsersListDto>> GetAllUsers();
}
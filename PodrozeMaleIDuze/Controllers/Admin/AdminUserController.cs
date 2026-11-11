using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Services.AdminUser;

namespace PodrozeMaleIDuze.Controllers.Admin;

[ApiController]
[Route("api/admin/users")]
[Authorize(Roles = Roles.Admin)]
public class AdminUserController(IAdminUserService userService) : ControllerBase
{
    // GET /api/admin/users
    [HttpGet]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await userService.GetAllUsers();
        return Ok(users);
    }
}
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models.ViewModels.AdminPanel;
using PodrozeMaleIDuze.Services.AdminUser;

namespace PodrozeMaleIDuze.Controllers.Admin;

[Authorize(Roles = Roles.Admin)]
public class AdminPanelController(IAdminUserService adminUserService) : Controller
{
    // GET /AdminPanel
    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var model = await adminUserService.GetPanelAsync();
        return View(model);
    }

    // GET /AdminPanel/Details/{id}
    [HttpGet]
    public IActionResult Details(string id)
    {
        var user = SampleUsers().FirstOrDefault(u => u.Id == id);
        if (user is null)
            return NotFound();

        return View(user);
    }

    // TODO(backend): zastąpić danymi z serwisu
    private List<UserDetailsViewModel> SampleUsers() =>
    [
        new()
        {
            Id = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "1",
            UserName = "admin123", Email = "admin123@gmail.com",
            FirstName = "Administrator", LastName = "Systemu",
            DateOfBirth = new DateOnly(1990, 1, 1), Role = Roles.Admin
        },
        new()
        {
            Id = "2", UserName = "cityadmin123", Email = "cityadmin123@gmail.com",
            FirstName = "Jan", LastName = "Kowalski",
            DateOfBirth = new DateOnly(1995, 5, 12), Role = Roles.CityAdmin, Cities = ["Białystok"]
        },
        new()
        {
            Id = "3", UserName = "user123", Email = "user123@gmail.com",
            FirstName = "Anna", LastName = "Nowak",
            DateOfBirth = new DateOnly(2001, 9, 30), Role = Roles.User, IsEnabled = false
        }
    ];
}
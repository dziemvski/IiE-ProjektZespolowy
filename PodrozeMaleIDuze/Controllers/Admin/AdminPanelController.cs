using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

namespace PodrozeMaleIDuze.Controllers.Admin;

[Authorize(Roles = Roles.Admin)]
public class AdminPanelController : Controller
{
    // GET /AdminPanel
    [HttpGet]
    public IActionResult Index()
    {
        // TODO(backend): zastąpić danymi z serwisu
        List<string> cities = ["Białystok", "Gdańsk", "Kraków", "Warszawa"];

        var model = new AdminPanelViewModel
        {
            Cities = cities,
            NewUser = new CreateUserViewModel { AvailableCities = cities },
            Users =
            [
                new AdminUserRowViewModel
                {
                    Id = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "1",
                    UserName = "admin123", Email = "admin123@gmail.com", Role = Roles.Admin
                },
                new AdminUserRowViewModel
                {
                    Id = "2", UserName = "cityadmin123", Email = "cityadmin123@gmail.com", Role = Roles.CityAdmin,
                    Cities = ["Białystok"]
                },
                new AdminUserRowViewModel
                {
                    Id = "3", UserName = "user123", Email = "user123@gmail.com", Role = Roles.User
                }
            ]
        };
        return View(model);
    }
}
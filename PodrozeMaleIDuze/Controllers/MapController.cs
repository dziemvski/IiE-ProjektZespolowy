using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models.ViewModels.Map;

namespace PodrozeMaleIDuze.Controllers;

public class MapController : Controller
{
    public IActionResult Index()
    {
        var isAuthenticated = User.Identity?.IsAuthenticated == true;

        var role = User.IsInRole(Roles.Admin) ? Roles.Admin
            : User.IsInRole(Roles.CityAdmin) ? Roles.CityAdmin
            : isAuthenticated ? Roles.User
            : MapViewModel.GuestRole;

        var model = new MapViewModel
        {
            IsAuthenticated = isAuthenticated,
            UserName = User.Identity?.Name ?? string.Empty,
            Email = User.FindFirstValue(ClaimTypes.Email),
            Role = role,
            // TODO: pobierać z bazy (ApplicationUser.ManagedCityId -> City.Name)
            ManagedCity = role == Roles.CityAdmin ? "Białystok" : null
        };

        return View(model);
    }
}
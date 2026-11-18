using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models.ViewModels.Map;

namespace PodrozeMaleIDuze.Controllers;

public class MapController : Controller
{
    public IActionResult Index()
    {
        var model = new MapViewModel();

        // TODO(backend): pobrać miasta z ApplicationUser.ManagedCity zalogowanego admina miasta
        if (User.IsInRole(Roles.CityAdmin))
            model.ManagedCities = ["Białystok"];

        return View(model);
    }
}

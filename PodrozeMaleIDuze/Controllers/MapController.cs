using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models.ViewModels.Map;

namespace PodrozeMaleIDuze.Controllers;

public class MapController : Controller
{
    public IActionResult Index()
    {
        var model = new MapViewModel();

        if (User.IsInRole(Roles.CityAdmin))
            model.ManagedCity = "Białystok";

        return View(model);
    }
}

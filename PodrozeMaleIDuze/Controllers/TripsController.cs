using Microsoft.AspNetCore.Mvc;

namespace PodrozeMaleIDuze.Controllers;

public class TripsController : Controller
{
    public IActionResult Index() => View();
}
using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Models;

namespace PodrozeMaleIDuze.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        ViewData["Tytul"] = "Podróże Małe i Duże";
        ViewData["Opis"] = "Odkrywaj miejsca, które warto zobaczyć.";
        return View();
    }

    public IActionResult Travel()
    {
        var podroze = new List<string>
        {
            "Tatry – górskie wędrówki",
            "Gdańsk – weekend nad morzem",
            "Praga – city break",
            "Rzym – historia i zabytki"
        };
        return View();
    }

    public IActionResult Kontakt()
    {
        return View();
    }

    public IActionResult Privacy()
    {
        return View();
    }

    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }
}
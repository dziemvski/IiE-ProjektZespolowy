using Microsoft.AspNetCore.Mvc;

namespace PodrozeMaleIDuze.Controllers;

public class MapController : Controller
{
    private readonly IWebHostEnvironment _env;

    public MapController(IWebHostEnvironment env) => _env = env;

    public IActionResult Index() => View();

    [HttpGet]
    public IActionResult Poland()
    {
        var path = Path.Combine(_env.WebRootPath, "data", "wojewodztwa.json");
        if (!System.IO.File.Exists(path))
            return NotFound("Brak pliku: " + path);

        return PhysicalFile(path, "application/json");
    }
}
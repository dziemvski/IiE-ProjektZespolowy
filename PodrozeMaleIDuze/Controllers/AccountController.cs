using Microsoft.AspNetCore.Mvc;

namespace PodrozeMaleIDuze.Controllers;

public class AccountController : Controller
{
    public IActionResult Login() => View();
}

using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Models;
using PodrozeMaleIDuze.Services.Auth;

namespace PodrozeMaleIDuze.Controllers;

public class AccountController(IAuthService authService) : Controller
{
    // GET /Account/Login
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Login(string? returnUrl = null)
    {
        if (User.Identity?.IsAuthenticated == true)
            return RedirectToAction("Index", "Home");

        ViewData["ReturnUrl"] = returnUrl;
        return View();
    }

    // POST /Account/Login
    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Login(LoginViewModel model, string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;

        if (!ModelState.IsValid)
            return View(model);

        var result = await authService.LoginAsync(model);

        if (result.Succeeded)
        {
            if (!string.IsNullOrEmpty(returnUrl) && Url.IsLocalUrl(returnUrl))
                return LocalRedirect(returnUrl);

            return RedirectToAction("Index", "Home");
        }

        if (result.IsLockedOut)
        {
            ModelState.AddModelError(string.Empty,
                "Konto zostało tymczasowo zablokowane po kilku nieudanych próbach. Spróbuj za kilka minut.");
            return View(model);
        }

        ModelState.AddModelError(string.Empty, "Nieprawidłowy login lub hasło.");
        return View(model);
    }

    // GET /Account/Register
    // Wyświetla formularz rejestracji
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Register()
    {
        if (User.Identity?.IsAuthenticated == true)
            return RedirectToAction("Index", "Home");

        return View(new RegisterViewModel());
    }

    // POST /Account/Logout
    [HttpPost]
    [Authorize]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Logout()
    {
        await authService.LogoutAsync();
        return RedirectToAction("Index", "Home");
    }
}


using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models;
using PodrozeMaleIDuze.Services.Auth;

namespace PodrozeMaleIDuze.Controllers;

public class AccountController(
    IAuthService authService,
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager) : Controller
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
    public async Task<IActionResult> Login(
        LoginViewModel model,
        string? returnUrl = null)
    {
        ViewData["ReturnUrl"] = returnUrl;

        if (!ModelState.IsValid)
            return View(model);

        var result = await authService.LoginAsync(model);

        if (result.Succeeded)
        {
            if (!string.IsNullOrEmpty(returnUrl)
                && Url.IsLocalUrl(returnUrl))
                return LocalRedirect(returnUrl);

            return RedirectToAction("Index", "Home");
        }

        if (result.IsLockedOut)
        {
            ModelState.AddModelError(
                string.Empty,
                "Konto zostało tymczasowo zablokowane. Spróbuj za kilka minut.");

            return View(model);
        }

        ModelState.AddModelError(
            string.Empty,
            "Nieprawidłowy login lub hasło.");

        return View(model);
    }

    // GET /Account/Register
 
    [HttpGet]
    [AllowAnonymous]
    public IActionResult Register()
    {
        if (User.Identity?.IsAuthenticated == true)
            return RedirectToAction("Index", "Home");

        return View(new RegisterViewModel());
    }

    // POST /Account/Register
    
    [HttpPost]
    [AllowAnonymous]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Register(
        RegisterViewModel model)
    {
        if (User.Identity?.IsAuthenticated == true)
            return RedirectToAction("Index", "Home");

        // Sprawdzamy poprawność formularza
        if (!ModelState.IsValid)
            return View(model);

        // Sprawdzamy datę urodzenia
        if (!model.DateOfBirth.HasValue ||
            model.DateOfBirth.Value.Date > DateTime.Today ||
            model.DateOfBirth.Value.Date < new DateTime(1900, 1, 1))
        {
            ModelState.AddModelError(
                nameof(model.DateOfBirth),
                "Podaj poprawną datę urodzenia.");

            return View(model);
        }

        string nazwa = model.UserName.Trim();
        string email = model.Email.Trim();
        string imie = model.FirstName.Trim();
        string nazwisko = model.LastName.Trim();

        var istniejacaNazwa =
            await userManager.FindByNameAsync(nazwa);

        if (istniejacaNazwa != null)
        {
            ModelState.AddModelError(
                nameof(model.UserName),
                "Ta nazwa jest już zajęta.");
        }

        
        var istniejacyEmail =
            await userManager.FindByEmailAsync(email);

        if (istniejacyEmail != null)
        {
            ModelState.AddModelError(
                nameof(model.Email),
                "Ten adres e-mail jest już zarejestrowany.");
        }

        
        if (!ModelState.IsValid)
            return View(model);

       
        var nowyUzytkownik = new ApplicationUser
        {
            UserName = nazwa,
            Email = email,
            FirstName = imie,
            LastName = nazwisko,
            DateOfBirth = DateOnly.FromDateTime(
                model.DateOfBirth.Value),
            CreatedAt = DateTime.UtcNow
        };

        
        var wynik = await userManager.CreateAsync(
            nowyUzytkownik,
            model.Password);

        if (!wynik.Succeeded)
        {
            foreach (var blad in wynik.Errors)
            {
                if (blad.Code == "DuplicateUserName")
                {
                    ModelState.AddModelError(
                        nameof(model.UserName),
                        "Ta nazwa jest już zajęta.");
                }
                else if (blad.Code == "DuplicateEmail")
                {
                    ModelState.AddModelError(
                        nameof(model.Email),
                        "Ten e-mail jest już zarejestrowany.");
                }
                else if (blad.Code.StartsWith("Password"))
                {
                    ModelState.AddModelError(
                        nameof(model.Password),
                        blad.Description);
                }
                else
                {
                    ModelState.AddModelError(
                        string.Empty,
                        blad.Description);
                }
            }

            return View(model);
        }

      
        var wynikRoli = await userManager.AddToRoleAsync(
            nowyUzytkownik,
            Roles.User);

        if (!wynikRoli.Succeeded)
        {
            
            await userManager.DeleteAsync(nowyUzytkownik);

            ModelState.AddModelError(
                string.Empty,
                "Nie udało się dokończyć rejestracji. Spróbuj ponownie.");

            return View(model);
        }

        
        await signInManager.SignInAsync(
            nowyUzytkownik,
            isPersistent: false);

      
        return RedirectToAction("Index", "Home");
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

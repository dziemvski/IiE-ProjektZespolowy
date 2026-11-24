using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models.ViewModels.AdminPanel;
using PodrozeMaleIDuze.Services.AdminUser;

namespace PodrozeMaleIDuze.Controllers.Admin;

[Authorize(Roles = Roles.Admin)]
public class AdminPanelController(IAdminUserService adminUserService) : Controller
{
    // GET /AdminPanel
    [HttpGet]
    public async Task<IActionResult> Index()
    {
        var model = await adminUserService.GetPanelAsync();
        return View(model);
    }

    // GET /AdminPanel/Details/{id}
    [HttpGet]
    public async Task<IActionResult> Details(string id)
    {
        var model = await adminUserService.GetUserDetailsAsync(id);
        if (model is null)
            return NotFound();

        return View(model);
    }

    // POST /AdminPanel/Create
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Create(CreateUserViewModel model)
    {
        if (ModelState.IsValid)
        {
            var result = await adminUserService.CreateUserAsync(model);
            if (result.Succeeded)
            {
                TempData["Success"] = $"Utworzono konto {model.UserName}.";
                return RedirectToAction(nameof(Index));
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);
        }

        return await ShowPanelWithCreateErrors(model);
    }

    // POST /AdminPanel/Update/{id}
    [HttpPost]
    [ValidateAntiForgeryToken]
    public async Task<IActionResult> Update(string id, UpdateUserViewModel model)
    {
        if (ModelState.IsValid)
        {
            var currentUserId = User.FindFirstValue(ClaimTypes.NameIdentifier)!;
            var result = await adminUserService.UpdateUserAsync(id, model, currentUserId);
            if (result.Succeeded)
            {
                TempData["Success"] = "Zapisano zmiany.";
                return RedirectToAction(nameof(Details), new { id });
            }

            foreach (var error in result.Errors)
                ModelState.AddModelError(string.Empty, error.Description);
        }

        var details = await adminUserService.GetUserDetailsAsync(id);
        if (details is null)
            return NotFound();

        details.Role = model.Role;
        details.IsEnabled = model.IsEnabled;
        details.CityId = model.CityId;
        return View(nameof(Details), details);
    }

    private async Task<IActionResult> ShowPanelWithCreateErrors(CreateUserViewModel model)
    {
        var panel = await adminUserService.GetPanelAsync();
        model.AvailableCities = panel.NewUser.AvailableCities;
        panel.NewUser = model;

        ViewData["OpenDrawer"] = true;
        return View(nameof(Index), panel);
    }
}
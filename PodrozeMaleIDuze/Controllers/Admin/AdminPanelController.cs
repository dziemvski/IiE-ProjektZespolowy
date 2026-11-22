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
}
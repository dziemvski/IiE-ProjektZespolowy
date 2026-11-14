using PodrozeMaleIDuze.Models.ViewModels.Admin;

namespace PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

public class AdminPanelViewModel
{
    public List<AdminUserRowViewModel> Users { get; set; } = new();
    public List<string> Cities { get; set; } = new();
    public CreateUserViewModel NewUser { get; set; } = new();
}
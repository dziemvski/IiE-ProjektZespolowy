namespace PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

public class AdminUserRowViewModel
{
    public string Id { get; set; } = string.Empty;

    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;

    public List<string> Cities { get; set; } = new();
}
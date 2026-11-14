namespace PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

public class UserDetailsViewModel
{
    public string Id { get; set; } = string.Empty;
    public string UserName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public DateOnly DateOfBirth { get; set; }
    public string Role { get; set; } = string.Empty;
    public List<string> Cities { get; set; } = new();
    public bool IsEnabled { get; set; } = true;
}
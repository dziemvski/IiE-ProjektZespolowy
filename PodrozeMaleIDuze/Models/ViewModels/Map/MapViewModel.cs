using PodrozeMaleIDuze.Constants;

namespace PodrozeMaleIDuze.Models.ViewModels.Map;

public class MapViewModel
{
    public const string GuestRole = "Guest";

    public bool IsAuthenticated { get; set; }
    public string UserName { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string Role { get; set; } = GuestRole;
    public string? ManagedCity { get; set; }

    public bool IsAdmin => Role == Roles.Admin;
    public bool IsCityAdmin => Role == Roles.CityAdmin;

    public string Initial => string.IsNullOrEmpty(UserName) ? "?" : UserName[..1].ToUpper();

    public string? Subtitle => IsCityAdmin ? $"Miasta: {ManagedCity ?? "brak"}" : Email;

    public string? Badge => IsAdmin ? "Admin" : IsCityAdmin ? "Admin miasta" : null;
}
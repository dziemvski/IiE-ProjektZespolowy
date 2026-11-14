using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

public class CreateUserViewModel
{
    [Required(ErrorMessage = "Wpisz nazwę użytkownika.")]
    [RegularExpression(@"^[A-Za-z0-9._-]{3,30}$",
        ErrorMessage = "Dozwolone 3–30 znaków: litery, cyfry, kropka, myślnik, podkreślnik.")]
    public string UserName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz adres e-mail.")]
    [EmailAddress(ErrorMessage = "To nie wygląda na adres e-mail.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz hasło startowe.")]
    [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d).{8,64}$",
        ErrorMessage = "Hasło musi mieć min. 8 znaków, literę i cyfrę.")]
    public string Password { get; set; } = string.Empty;

    [Required] public string Role { get; set; } = "User";

    public List<string> Cities { get; set; } = new();

    public List<string> AvailableCities { get; set; } = new();
}
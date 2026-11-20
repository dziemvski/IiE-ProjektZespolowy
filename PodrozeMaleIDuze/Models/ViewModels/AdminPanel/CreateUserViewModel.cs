using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

public class CreateUserViewModel
{
    [Required(ErrorMessage = "Wpisz nazwę użytkownika.")]
    [RegularExpression(@"^[A-Za-z0-9._-]{3,30}$",
        ErrorMessage = "Dozwolone 3–30 znaków: litery, cyfry, kropka, myślnik, podkreślnik.")]
    public string UserName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz adres e-mail.")]
    [StringLength(254, ErrorMessage = "Adres e-mail może mieć maksymalnie 254 znaki.")]
    [EmailAddress(ErrorMessage = "To nie wygląda na adres e-mail.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz hasło startowe.")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$",
        ErrorMessage = "Hasło musi mieć 8–64 znaków, małą literę, wielką literę i cyfrę.")]
    public string Password { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^(Admin|CityAdmin|User)$", ErrorMessage = "Wybierz prawidłową rolę.")]
    public string Role { get; set; } = "User";

    public List<string> Cities { get; set; } = new();

    public List<string> AvailableCities { get; set; } = new();
}

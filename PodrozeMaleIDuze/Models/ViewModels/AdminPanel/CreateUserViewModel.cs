using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc.Rendering;

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

    [Required(ErrorMessage = "Wpisz imię.")]
    [StringLength(50, ErrorMessage = "Imię może mieć maksymalnie 50 znaków.")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz nazwisko.")]
    [StringLength(80, ErrorMessage = "Nazwisko może mieć maksymalnie 80 znaków.")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Podaj datę urodzenia.")]
    [DataType(DataType.Date)]
    public DateTime? DateOfBirth { get; set; }

    [Required(ErrorMessage = "Wpisz hasło startowe.")]
    [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$",
        ErrorMessage = "Hasło musi mieć 8–64 znaków, małą literę, wielką literę i cyfrę.")]
    public string Password { get; set; } = string.Empty;

    [Required]
    [RegularExpression(@"^(Admin|CityAdmin|User)$", ErrorMessage = "Wybierz prawidłową rolę.")]
    public string Role { get; set; } = "User";

    public int? CityId { get; set; }

    public List<SelectListItem> AvailableCities { get; set; } = new();
}
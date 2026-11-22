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
    [RegularExpression(@"^(?=.*[A-Za-z])(?=.*\d).{8,64}$",
        ErrorMessage = "Hasło musi mieć min. 8 znaków, literę i cyfrę.")]
    public string Password { get; set; } = string.Empty;

    [Required] public string Role { get; set; } = "User";

    public int? CityId { get; set; }

    public List<SelectListItem> AvailableCities { get; set; } = new();
}
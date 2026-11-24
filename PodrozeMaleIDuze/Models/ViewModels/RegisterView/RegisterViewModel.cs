using System.ComponentModel.DataAnnotations;
using PodrozeMaleIDuze.Models.Validation;

namespace PodrozeMaleIDuze.Models.ViewModels.RegisterView;

public class RegisterViewModel
{
    [Required(ErrorMessage = "Wpisz nazwę użytkownika.")]
    [RegularExpression(
        @"^[A-Za-z0-9_.-]{3,30}$",
        ErrorMessage = "Nazwa musi mieć 3–30 znaków: litery, cyfry, kropki, myślniki lub podkreślenia.")]
    public string UserName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz adres e-mail.")]
    [StringLength(254, ErrorMessage = "Adres e-mail może mieć maksymalnie 254 znaki.")]
    [EmailAddress(ErrorMessage = "To nie wygląda na adres e-mail.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz hasło.")]
    [StringLength(64, MinimumLength = 8,
        ErrorMessage = "Hasło musi mieć od 8 do 64 znaków.")]
    [RegularExpression(ValidationPatterns.Password,
        ErrorMessage = "Hasło musi mieć 8–64 znaków, w tym małą literę, wielką literę i cyfrę.")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Powtórz hasło.")]
    [Compare(nameof(Password),
        ErrorMessage = "Hasła nie są takie same.")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz imię.")]
    [StringLength(50, MinimumLength = 2,
        ErrorMessage = "Imię musi mieć od {2} do {1} znaków.")]
    [RegularExpression(ValidationPatterns.PersonName,
        ErrorMessage = "Imię może zawierać litery, spacje, apostrof i myślnik.")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz nazwisko.")]
    [StringLength(80, MinimumLength = 2,
        ErrorMessage = "Nazwisko musi mieć od {2} do {1} znaków.")]
    [RegularExpression(ValidationPatterns.PersonName,
        ErrorMessage = "Nazwisko może zawierać litery, spacje, apostrof i myślnik.")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Podaj datę urodzenia.")]
    [ValidBirthDate]
    [DataType(DataType.Date)]
    public DateTime? DateOfBirth { get; set; }

    [MustBeTrue(
        ErrorMessage = "Zaakceptuj politykę prywatności, aby założyć konto.")]
    public bool AcceptPrivacy { get; set; }
}
using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.ViewModels.RegisterView;

public class RegisterViewModel
{
    [Required(ErrorMessage = "Wpisz nazwę użytkownika.")]
    [RegularExpression(
        @"^[A-Za-z0-9_.-]{3,30}$",
        ErrorMessage = "Nazwa musi mieć 3–30 znaków: litery, cyfry, kropki, myślniki lub podkreślenia.")]
    public string UserName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz adres e-mail.")]
    [System.ComponentModel.DataAnnotations.StringLength(254, ErrorMessage = "Adres e-mail może mieć maksymalnie 254 znaki.")]
    [EmailAddress(ErrorMessage = "To nie wygląda na adres e-mail.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz hasło.")]
    [StringLength(64, MinimumLength = 8,
        ErrorMessage = "Hasło musi mieć od 8 do 64 znaków.")]
    [RegularExpression(
        @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$",
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
        ErrorMessage = "Imię może mieć maksymalnie 50 znaków.")]
    [RegularExpression(@"^[\p{L}][\p{L}\p{M} . '\u2019-]*$", ErrorMessage = "Imię może zawierać litery, spacje, apostrof i myślnik.")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz nazwisko.")]
    [StringLength(80, MinimumLength = 2,
        ErrorMessage = "Nazwisko może mieć maksymalnie 80 znaków.")]
    [RegularExpression(@"^[\p{L}][\p{L}\p{M} . '\u2019-]*$", ErrorMessage = "Nazwisko może zawierać litery, spacje, apostrof i myślnik.")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Podaj datę urodzenia.")]
    [PodrozeMaleIDuze.Models.Validation.ValidBirthDate]
    [DataType(DataType.Date)]
    public DateTime? DateOfBirth { get; set; }

    [MustBeTrue(
        ErrorMessage = "Zaakceptuj politykę prywatności, aby założyć konto.")]
    public bool AcceptPrivacy { get; set; }
}


using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models;

public class RegisterViewModel
{
    [Required(ErrorMessage = "Wpisz nazwę użytkownika.")]
    [RegularExpression(
        @"^[A-Za-z0-9_.-]{3,30}$",
        ErrorMessage = "Nazwa musi mieć 3–30 znaków: litery, cyfry, kropki, myślniki lub podkreślenia.")]
    public string UserName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz adres e-mail.")]
    [EmailAddress(ErrorMessage = "To nie wygląda na adres e-mail.")]
    public string Email { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz hasło.")]
    [StringLength(100, MinimumLength = 8,
        ErrorMessage = "Hasło musi mieć minimum 8 znaków.")]
    [RegularExpression(
        @"^(?=.*[A-Za-z])(?=.*\d).{8,}$",
        ErrorMessage = "Min. 8 znaków, w tym litera i cyfra.")]
    [DataType(DataType.Password)]
    public string Password { get; set; } = string.Empty;

    [Required(ErrorMessage = "Powtórz hasło.")]
    [Compare(nameof(Password),
        ErrorMessage = "Hasła nie są takie same.")]
    [DataType(DataType.Password)]
    public string ConfirmPassword { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz imię.")]
    [StringLength(50,
        ErrorMessage = "Imię może mieć maksymalnie 50 znaków.")]
    public string FirstName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Wpisz nazwisko.")]
    [StringLength(80,
        ErrorMessage = "Nazwisko może mieć maksymalnie 80 znaków.")]
    public string LastName { get; set; } = string.Empty;

    [Required(ErrorMessage = "Podaj datę urodzenia.")]
    [DataType(DataType.Date)]
    public DateTime? DateOfBirth { get; set; }

    [MustBeTrue(
        ErrorMessage = "Zaakceptuj politykę prywatności, aby założyć konto.")]
    public bool AcceptPrivacy { get; set; }
}

public sealed class MustBeTrueAttribute : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        return value is true;
    }
}

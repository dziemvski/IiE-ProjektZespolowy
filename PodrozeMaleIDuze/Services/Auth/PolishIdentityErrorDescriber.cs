using Microsoft.AspNetCore.Identity;

namespace PodrozeMaleIDuze.Services.Auth;

public class PolishIdentityErrorDescriber : IdentityErrorDescriber
{
    public override IdentityError DefaultError() =>
        Error(nameof(DefaultError), "Wystąpił nieoczekiwany błąd.");

    public override IdentityError ConcurrencyFailure() =>
        Error(nameof(ConcurrencyFailure), "Dane zostały w międzyczasie zmienione. Odśwież stronę i spróbuj ponownie.");

    public override IdentityError DuplicateUserName(string userName) =>
        Error(nameof(DuplicateUserName), $"Nazwa użytkownika „{userName}” jest już zajęta.");

    public override IdentityError DuplicateEmail(string email) =>
        Error(nameof(DuplicateEmail), $"Konto z adresem {email} już istnieje.");

    public override IdentityError InvalidUserName(string? userName) =>
        Error(nameof(InvalidUserName), $"Nazwa użytkownika „{userName}” zawiera niedozwolone znaki.");

    public override IdentityError InvalidEmail(string? email) =>
        Error(nameof(InvalidEmail), $"Adres e-mail {email} jest nieprawidłowy.");

    public override IdentityError PasswordTooShort(int length) =>
        Error(nameof(PasswordTooShort), $"Hasło musi mieć co najmniej {length} znaków.");

    public override IdentityError PasswordRequiresDigit() =>
        Error(nameof(PasswordRequiresDigit), "Hasło musi zawierać co najmniej jedną cyfrę.");

    public override IdentityError PasswordRequiresLower() =>
        Error(nameof(PasswordRequiresLower), "Hasło musi zawierać co najmniej jedną małą literę.");

    public override IdentityError PasswordRequiresUpper() =>
        Error(nameof(PasswordRequiresUpper), "Hasło musi zawierać co najmniej jedną wielką literę.");

    public override IdentityError PasswordRequiresNonAlphanumeric() =>
        Error(nameof(PasswordRequiresNonAlphanumeric), "Hasło musi zawierać co najmniej jeden znak specjalny.");

    public override IdentityError PasswordRequiresUniqueChars(int uniqueChars) =>
        Error(nameof(PasswordRequiresUniqueChars), $"Hasło musi zawierać co najmniej {uniqueChars} różnych znaków.");

    public override IdentityError UserAlreadyInRole(string role) =>
        Error(nameof(UserAlreadyInRole), $"Użytkownik ma już rolę {role}.");

    public override IdentityError UserNotInRole(string role) =>
        Error(nameof(UserNotInRole), $"Użytkownik nie ma roli {role}.");

    public override IdentityError UserLockoutNotEnabled() =>
        Error(nameof(UserLockoutNotEnabled), "Blokada nie jest włączona dla tego użytkownika.");

    private static IdentityError Error(string code, string description) =>
        new() { Code = code, Description = description };
}
using PodrozeMaleIDuze.Constants;

namespace PodrozeMaleIDuze.Models.Validation;

public static class ValidationPatterns
{
    public const string PersonName = @"^[A-Za-zÀ-ÖØ-öø-ž][A-Za-zÀ-ÖØ-öø-ž .'’-]*$";

    public const string Password = @"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$";

    public const string Role = $"^({Roles.Admin}|{Roles.CityAdmin}|{Roles.User})$";
}
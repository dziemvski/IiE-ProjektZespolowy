using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class ValidBirthDateAttribute : ValidationAttribute
{
    public ValidBirthDateAttribute() : base("Data urodzenia musi być prawidłową datą z zakresu 01.01.1900–dzisiaj.")
    {
    }

    public override bool IsValid(object? value)
    {
        if (value is null)
            return true; // [Required] handles a missing date.

        var today = DateOnly.FromDateTime(DateTime.Today);
        var earliestDate = new DateOnly(1900, 1, 1);

        return value switch
        {
            DateTime date => date.Date >= earliestDate.ToDateTime(TimeOnly.MinValue) && date.Date <= DateTime.Today,
            DateOnly date => date >= earliestDate && date <= today,
            _ => false
        };
    }
}

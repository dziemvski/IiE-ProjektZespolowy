using System.ComponentModel.DataAnnotations;
using System.Reflection;

namespace PodrozeMaleIDuze.Models.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class DateOnOrAfterAttribute(string otherProperty) : ValidationAttribute
{
    public string OtherProperty { get; } = otherProperty;

    protected override ValidationResult? IsValid(object? value, ValidationContext validationContext)
    {
        if (value is not DateOnly endDate)
            return ValidationResult.Success;

        PropertyInfo? property = validationContext.ObjectType.GetProperty(OtherProperty);
        if (property?.GetValue(validationContext.ObjectInstance) is not DateOnly startDate)
            return ValidationResult.Success;

        return startDate != default && endDate != default && endDate >= startDate
            ? ValidationResult.Success
            : new ValidationResult(ErrorMessage ?? "Podaj prawidłowe daty, a data końcowa nie może być wcześniejsza niż początkowa.");
    }
}

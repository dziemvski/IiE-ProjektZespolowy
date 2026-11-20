using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.Validation;

[AttributeUsage(AttributeTargets.Property | AttributeTargets.Field | AttributeTargets.Parameter)]
public sealed class NotWhitespaceAttribute : ValidationAttribute
{
    public NotWhitespaceAttribute() : base("Wartość nie może składać się wyłącznie z białych znaków.")
    {
    }

    public override bool IsValid(object? value)
    {
        // [Required] provides the missing-value error; this attribute handles whitespace-only input.
        return value is not string text || !string.IsNullOrWhiteSpace(text);
    }
}

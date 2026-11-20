using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.ViewModels.RegisterView;

public sealed class MustBeTrueAttribute : ValidationAttribute
{
    public override bool IsValid(object? value)
    {
        return value is true;
    }
}
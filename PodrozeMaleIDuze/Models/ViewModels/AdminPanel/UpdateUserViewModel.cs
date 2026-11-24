using System.ComponentModel.DataAnnotations;
using PodrozeMaleIDuze.Models.Validation;

namespace PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

public class UpdateUserViewModel
{
    [Required(ErrorMessage = "Wybierz rolę.")]
    [RegularExpression(ValidationPatterns.Role, ErrorMessage = "Wybierz prawidłową rolę.")]
    public string Role { get; set; } = string.Empty;

    public bool IsEnabled { get; set; }

    public int? CityId { get; set; }
}
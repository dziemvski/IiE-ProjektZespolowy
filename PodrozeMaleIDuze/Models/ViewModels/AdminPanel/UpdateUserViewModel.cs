using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.ViewModels.AdminPanel;

public class UpdateUserViewModel
{
    [Required(ErrorMessage = "Wybierz rolę.")]
    public string Role { get; set; } = string.Empty;

    public bool IsEnabled { get; set; }

    public int? CityId { get; set; }
}
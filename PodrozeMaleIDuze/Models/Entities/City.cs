using System.ComponentModel.DataAnnotations;

using PodrozeMaleIDuze.Models.Validation;

namespace PodrozeMaleIDuze.Models;

public class City
{
    public int Id { get; set; }

    [Required, NotWhitespace]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required, NotWhitespace]
    [MaxLength(50)]
    public string Region { get; set; } = string.Empty;

    public ICollection<ApplicationUser> Admins { get; set; } = new List<ApplicationUser>();
    
    public ICollection<Place> Places { get; set; } = new List<Place>();
}

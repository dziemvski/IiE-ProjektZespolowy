using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models;

public class City
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(50)]
    public string Region { get; set; } = string.Empty;

    public ICollection<ApplicationUser> Admins { get; set; } = new List<ApplicationUser>();
}
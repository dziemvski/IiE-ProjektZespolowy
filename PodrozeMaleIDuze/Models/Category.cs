using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models;

public class Category
{
    public int Id { get; set; }

    [Required]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    public ICollection<Place> Places { get; set; } = new List<Place>();
}
using System.ComponentModel.DataAnnotations;

using PodrozeMaleIDuze.Models.Validation;

namespace PodrozeMaleIDuze.Models;

public class Category
{
    public int Id { get; set; }

    [Required, NotWhitespace]
    [MaxLength(50)]
    public string Name { get; set; } = string.Empty;

    public ICollection<Place> Places { get; set; } = new List<Place>();
}

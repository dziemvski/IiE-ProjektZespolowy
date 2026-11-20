using System.ComponentModel.DataAnnotations;

using PodrozeMaleIDuze.Models.Validation;

namespace PodrozeMaleIDuze.Models;

public class Trip
{
    public int Id { get; set; }

    [Required, NotWhitespace]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsCompleted { get; set; }
    public DateTime? CompletedAt { get; set; }

    [Required, NotWhitespace]
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;

    public ICollection<TripPlace> TripPlaces { get; set; } = new List<TripPlace>();
}

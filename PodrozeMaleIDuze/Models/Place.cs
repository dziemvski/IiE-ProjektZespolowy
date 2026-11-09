using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models;

public class Place
{
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(1000)]
    public string? Description { get; set; }

    [Range(-90, 90)]
    public double Latitude { get; set; }

    [Range(-180, 180)]
    public double Longitude { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    public int CityId { get; set; }
    public City City { get; set; } = null!;

    public int CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    [Required]
    public string CreatedByUserId { get; set; } = string.Empty;
    public ApplicationUser CreatedByUser { get; set; } = null!;

    public ICollection<PlaceImage> Images { get; set; } = new List<PlaceImage>();
    }
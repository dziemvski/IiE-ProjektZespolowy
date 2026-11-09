using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace PodrozeMaleIDuze.Models;

public class ApplicationUser : IdentityUser
{
    [Required]
    [MaxLength(100)]
    public string DisplayName { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int? ManagedCityId { get; set; }
    public City? ManagedCity { get; set; }
    
    public ICollection<Place> CreatedPlaces { get; set; } = new List<Place>();
    public ICollection<SavedPlace> SavedPlaces { get; set; } = new List<SavedPlace>();
    public ICollection<Trip> Trips { get; set; } = new List<Trip>();
}
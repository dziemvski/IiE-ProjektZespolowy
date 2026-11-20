using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using PodrozeMaleIDuze.Models.Validation;

namespace PodrozeMaleIDuze.Models;

public class ApplicationUser : IdentityUser
{
    [Required, NotWhitespace, StringLength(50, MinimumLength = 2)]
    [RegularExpression(@"^[\p{L}][\p{L}\p{M} . '\u2019-]*$", ErrorMessage = "Imię może zawierać litery, spacje, apostrof i myślnik.")]
    public string FirstName { get; set; } = string.Empty;

    [StringLength(50)]
    [RegularExpression(@"^$|^[\p{L}][\p{L}\p{M} . '\u2019-]*$", ErrorMessage = "Drugie imię może zawierać litery, spacje, apostrof i myślnik.")]
    public string? MiddleName { get; set; }

    [Required, NotWhitespace, StringLength(80, MinimumLength = 2)]
    [RegularExpression(@"^[\p{L}][\p{L}\p{M} . '\u2019-]*$", ErrorMessage = "Nazwisko może zawierać litery, spacje, apostrof i myślnik.")]
    public string LastName { get; set; } = string.Empty;

    [ValidBirthDate]
    public DateOnly DateOfBirth { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public int? ManagedCityId { get; set; }
    public City? ManagedCity { get; set; }

    public ICollection<Place> CreatedPlaces { get; set; } = new List<Place>();
    public ICollection<SavedPlace> SavedPlaces { get; set; } = new List<SavedPlace>();
    public ICollection<Trip> Trips { get; set; } = new List<Trip>();
}

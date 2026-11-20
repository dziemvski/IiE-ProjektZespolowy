using System.ComponentModel.DataAnnotations;

using PodrozeMaleIDuze.Models.Validation;

namespace PodrozeMaleIDuze.Models;

public class PlaceImage
{
    public int Id { get; set; }

    // Bezpieczna nazwa na dysku (np. GUID + rozszerzenie)
    [Required, NotWhitespace]
    [RegularExpression(@"^[A-Za-z0-9][A-Za-z0-9._-]*$", ErrorMessage = "Nazwa pliku może zawierać tylko litery, cyfry, kropkę, myślnik i podkreślenie.")]
    [MaxLength(255)]
    public string FileName { get; set; } = string.Empty;

    // Oryginalna nazwa pliku od użytkownika (tylko do wyświetlenia)
    [Required, NotWhitespace]
    [MaxLength(255)]
    public string OriginalName { get; set; } = string.Empty;

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;
}

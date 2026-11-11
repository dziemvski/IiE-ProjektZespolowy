using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models;

public class PlaceImage
{
    public int Id { get; set; }

    // Bezpieczna nazwa na dysku (np. GUID + rozszerzenie)
    [Required]
    [MaxLength(255)]
    public string FileName { get; set; } = string.Empty;

    // Oryginalna nazwa pliku od użytkownika (tylko do wyświetlenia)
    [Required]
    [MaxLength(255)]
    public string OriginalName { get; set; } = string.Empty;

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;
}
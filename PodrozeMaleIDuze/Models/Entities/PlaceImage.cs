using System.ComponentModel.DataAnnotations;

namespace PodrozeMaleIDuze.Models.Entities;

public class PlaceImage
{
    public int Id { get; set; }

    [Required]
    [MaxLength(255)]
    public string FileName { get; set; } = string.Empty;

    [Required]
    [MaxLength(255)]
    public string OriginalName { get; set; } = string.Empty;

    public DateTime UploadedAt { get; set; } = DateTime.UtcNow;

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;
}
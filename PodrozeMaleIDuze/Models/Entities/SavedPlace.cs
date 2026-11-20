namespace PodrozeMaleIDuze.Models;

public class SavedPlace
{
    public string UserId { get; set; } = string.Empty;
    public ApplicationUser User { get; set; } = null!;

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;

    public DateTime SavedAt { get; set; } = DateTime.UtcNow;
    public bool IsVisited { get; set; }
    public DateTime? VisitedAt { get; set; }
}
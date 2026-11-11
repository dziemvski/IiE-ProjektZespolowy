namespace PodrozeMaleIDuze.Models;

public class TripPlace
{
    public int TripId { get; set; }
    public Trip Trip { get; set; } = null!;

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;

    public int OrderNumber { get; set; }
}
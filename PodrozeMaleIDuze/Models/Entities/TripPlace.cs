namespace PodrozeMaleIDuze.Models;

public class TripPlace
{
    public int TripId { get; set; }
    public Trip Trip { get; set; } = null!;

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;

    [System.ComponentModel.DataAnnotations.Range(1, int.MaxValue, ErrorMessage = "Numer miejsca na trasie musi być większy od zera.")]
    public int OrderNumber { get; set; }
}

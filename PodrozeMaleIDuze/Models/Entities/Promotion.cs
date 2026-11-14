namespace PodrozeMaleIDuze.Models;

public class Promotion
{
    public int Id { get; set; }

    public DateOnly StartDate { get; set; }
    public DateOnly EndDate { get; set; }

    public decimal Price { get; set; }

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;
}
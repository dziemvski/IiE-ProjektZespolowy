namespace PodrozeMaleIDuze.Models;

public class Promotion
{
    public int Id { get; set; }

    public DateOnly StartDate { get; set; }
    [PodrozeMaleIDuze.Models.Validation.DateOnOrAfter(nameof(StartDate))]
    public DateOnly EndDate { get; set; }

    [System.ComponentModel.DataAnnotations.Range(typeof(decimal), "0.01", "99999999.99", ErrorMessage = "Cena musi być większa od 0 i nie może przekraczać 99 999 999,99.")]
    public decimal Price { get; set; }

    public int PlaceId { get; set; }
    public Place Place { get; set; } = null!;
}

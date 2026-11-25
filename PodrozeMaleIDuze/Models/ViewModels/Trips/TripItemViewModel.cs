namespace PodrozeMaleIDuze.Models.ViewModels.Trips;

public class TripItemViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string City { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public double Km { get; set; }
    public bool IsCompleted { get; set; }
    public string DateLabel { get; set; } = string.Empty;
    public List<TripStopViewModel> Stops { get; set; } = new();
}
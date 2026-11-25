namespace PodrozeMaleIDuze.Models.ViewModels.Trips;

public class TripStopViewModel
{
    public int OrderNumber { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Category { get; set; } = string.Empty;

    public int MapX { get; set; }
    public int MapY { get; set; }
}
namespace PodrozeMaleIDuze.Models.ViewModels.Trips;

public class TripsViewModel
{
    public const string TodoTab = "todo";
    public const string DoneTab = "done";
    public string ActiveTab { get; set; } = TodoTab;
    public int? SelectedTripId { get; set; }
    public int TodoCount { get; set; }
    public int DoneCount { get; set; }
    public double DoneKm { get; set; }
    public List<TripItemViewModel> Trips { get; set; } = new();
}
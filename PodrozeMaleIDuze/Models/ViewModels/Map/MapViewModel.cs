namespace PodrozeMaleIDuze.Models.ViewModels.Map;

public class MapViewModel
{
    // Miasta, którymi zarządza zalogowany admin miasta (puste dla pozostałych ról).
    public List<string> ManagedCities { get; set; } = new();
}

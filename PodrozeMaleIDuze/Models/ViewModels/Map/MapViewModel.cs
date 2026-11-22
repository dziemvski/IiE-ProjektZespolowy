namespace PodrozeMaleIDuze.Models.ViewModels.Map;

public class MapViewModel
{
    // Miasto, którym zarządza zalogowany admin miasta (jeden admin = jedno miasto,
    // tak jak ApplicationUser.ManagedCityId). Null dla pozostałych ról.
    public string? ManagedCity { get; set; }
}

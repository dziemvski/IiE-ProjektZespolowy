using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models.ViewModels.Trips;

namespace PodrozeMaleIDuze.Controllers;

[Authorize(Roles = Roles.User)]
public class TripsController : Controller
{
    // GET /Trips?tab=todo|done&selectedId=1
    [HttpGet]
    public IActionResult Index(string tab = TripsViewModel.TodoTab, int? selectedId = null)
    {
        // TODO (osobny branch z backendem): pobierać trasy z ITripService
        var trips = GetSampleTrips();
        var doneTrips = trips.Where(t => t.IsCompleted).ToList();

        var model = new TripsViewModel
        {
            ActiveTab = tab == TripsViewModel.DoneTab ? TripsViewModel.DoneTab : TripsViewModel.TodoTab,
            SelectedTripId = selectedId,
            TodoCount = trips.Count - doneTrips.Count,
            DoneCount = doneTrips.Count,
            DoneKm = Math.Round(doneTrips.Sum(t => t.Km), 1),
            Trips = trips
        };

        return View(model);
    }

    // Przykładowe dane tylko na potrzeby widoku (bez bazy danych).
    private static List<TripItemViewModel> GetSampleTrips() =>
    [
        new()
        {
            Id = 1,
            Name = "Białystok w jeden dzień",
            City = "Białystok",
            Km = 4.2,
            IsCompleted = false,
            DateLabel = "Utworzona 18.11.2026",
            Description = "Spacer po centrum: od pałacu przez rynek do katedry i z powrotem przez Planty.",
            Stops =
            [
                new() { OrderNumber = 1, Name = "Pałac Branickich", Category = "Zabytek", MapX = 120, MapY = 250 },
                new() { OrderNumber = 2, Name = "Rynek Kościuszki", Category = "Plac", MapX = 250, MapY = 180 },
                new()
                {
                    OrderNumber = 3, Name = "Archikatedra Wniebowzięcia NMP", Category = "Kościół", MapX = 330,
                    MapY = 120
                },
                new() { OrderNumber = 4, Name = "Planty", Category = "Park", MapX = 470, MapY = 95 }
            ]
        },
        new()
        {
            Id = 2,
            Name = "Szlak Tatarski",
            City = "Kruszyniany",
            Km = 12.8,
            IsCompleted = false,
            DateLabel = "Utworzona 20.11.2026",
            Description = "Meczet i mizar w Kruszynianach, potem Bohoniki.",
            Stops =
            [
                new() { OrderNumber = 1, Name = "Meczet w Kruszynianach", Category = "Zabytek", MapX = 90, MapY = 80 },
                new() { OrderNumber = 2, Name = "Mizar", Category = "Cmentarz", MapX = 160, MapY = 150 },
                new() { OrderNumber = 3, Name = "Meczet w Bohonikach", Category = "Zabytek", MapX = 510, MapY = 270 }
            ]
        },
        new()
        {
            Id = 3,
            Name = "Kraków – Stare Miasto",
            City = "Kraków",
            Km = 3.1,
            IsCompleted = true,
            DateLabel = "Zrobiona 12.10.2026",
            Description = "Klasyczna pętla: Wawel, Rynek Główny, Kazimierz.",
            Stops =
            [
                new() { OrderNumber = 1, Name = "Wawel", Category = "Zamek", MapX = 140, MapY = 270 },
                new() { OrderNumber = 2, Name = "Rynek Główny", Category = "Plac", MapX = 250, MapY = 110 },
                new() { OrderNumber = 3, Name = "Sukiennice", Category = "Zabytek", MapX = 330, MapY = 160 },
                new() { OrderNumber = 4, Name = "Kazimierz", Category = "Dzielnica", MapX = 520, MapY = 300 }
            ]
        }
    ];
}
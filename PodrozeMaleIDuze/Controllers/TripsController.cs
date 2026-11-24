using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PodrozeMaleIDuze.Data;
using PodrozeMaleIDuze.Models;
using PodrozeMaleIDuze.Models.ViewModels.Trips;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PodrozeMaleIDuze.Controllers
{
    [Authorize]
    public class TripsController : Controller
    {
        private readonly AppDbContext _context;
        private readonly UserManager<ApplicationUser> _userManager;

        public TripsController(AppDbContext context, UserManager<ApplicationUser> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet]
        public async Task<IActionResult> Index(string tab = "todo", int? selectedId = null)
        {
            var userId = _userManager.GetUserId(User);

            var dbTrips = await _context.Trips
                .Include(t => t.TripPlaces)
                    .ThenInclude(tp => tp.Place)
                        .ThenInclude(p => p.City)
                .Include(t => t.TripPlaces)
                    .ThenInclude(tp => tp.Place)
                        .ThenInclude(p => p.Category)
                .Where(t => t.UserId == userId)
                .OrderByDescending(t => t.CreatedAt)
                .ToListAsync();

            List<TripItemViewModel> allTrips;

            if (dbTrips.Any())
            {
                allTrips = dbTrips.Select(t =>
                {
                    var orderedPlaces = t.TripPlaces.OrderBy(tp => tp.OrderNumber).ToList();
                    var firstCity = orderedPlaces.FirstOrDefault()?.Place?.City?.Name ?? "Polska";
                    
                    var defaultCoords = new[] { (120, 250), (250, 180), (330, 120), (470, 95), (520, 270) };

                    return new TripItemViewModel
                    {
                        Id = t.Id,
                        Name = t.Name,
                        City = firstCity,
                        Description = t.Description ?? "Zaplanowana trasa zwiedzania.",
                        Km = Math.Round(orderedPlaces.Count * 1.4, 1),
                        IsCompleted = t.IsCompleted,
                        DateLabel = t.IsCompleted && t.CompletedAt.HasValue
                            ? $"Zrobiona {t.CompletedAt.Value:dd.MM.yyyy}"
                            : $"Utworzona {t.CreatedAt:dd.MM.yyyy}",
                        Stops = orderedPlaces.Select((tp, idx) =>
                        {
                            var coord = defaultCoords[idx % defaultCoords.Length];
                            return new TripStopViewModel
                            {
                                OrderNumber = tp.OrderNumber,
                                Name = tp.Place?.Name ?? "Punkt trasy",
                                Category = tp.Place?.Category?.Name ?? "Miejsce",
                                MapX = coord.Item1,
                                MapY = coord.Item2
                            };
                        }).ToList()
                    };
                }).ToList();
            }
            else
            {
                allTrips = GetSampleTrips();
            }

            var todoTrips = allTrips.Where(t => !t.IsCompleted).ToList();
            var doneTrips = allTrips.Where(t => t.IsCompleted).ToList();

            var viewModel = new TripsViewModel
            {
                ActiveTab = tab == "done" ? "done" : "todo",
                SelectedTripId = selectedId,
                TodoCount = todoTrips.Count,
                DoneCount = doneTrips.Count,
                DoneKm = Math.Round(doneTrips.Sum(t => t.Km), 1),
                Trips = allTrips
            };

            return View(viewModel);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> ToggleComplete(int id, string currentTab = "todo")
        {
            var userId = _userManager.GetUserId(User);
            var trip = await _context.Trips.FirstOrDefaultAsync(t => t.Id == id && t.UserId == userId);

            if (trip != null)
            {
                trip.IsCompleted = !trip.IsCompleted;
                trip.CompletedAt = trip.IsCompleted ? DateTime.UtcNow : null;
                await _context.SaveChangesAsync();
            }

            return RedirectToAction(nameof(Index), new { tab = currentTab });
        }

        private List<TripItemViewModel> GetSampleTrips()
        {
            return new List<TripItemViewModel>
            {
                new TripItemViewModel
                {
                    Id = 1,
                    Name = "Białystok w jeden dzień",
                    City = "Białystok",
                    Km = 4.2,
                    IsCompleted = false,
                    DateLabel = "Utworzona 18.11.2026",
                    Description = "Spacer po centrum: od pałacu przez rynek do katedry i z powrotem przez Planty.",
                    Stops = new List<TripStopViewModel>
                    {
                        new() { OrderNumber = 1, Name = "Pałac Branickich", Category = "Zabytek", MapX = 120, MapY = 250 },
                        new() { OrderNumber = 2, Name = "Rynek Kościuszki", Category = "Plac", MapX = 250, MapY = 180 },
                        new() { OrderNumber = 3, Name = "Archikatedra Wniebowzięcia NMP", Category = "Kościół", MapX = 330, MapY = 120 },
                        new() { OrderNumber = 4, Name = "Planty", Category = "Park", MapX = 470, MapY = 95 }
                    }
                },
                new TripItemViewModel
                {
                    Id = 2,
                    Name = "Szlak Tatarski",
                    City = "Kruszyniany",
                    Km = 12.8,
                    IsCompleted = false,
                    DateLabel = "Utworzona 20.11.2026",
                    Description = "Meczet i mizar w Kruszynianach, potem Bohoniki.",
                    Stops = new List<TripStopViewModel>
                    {
                        new() { OrderNumber = 1, Name = "Meczet w Kruszynianach", Category = "Zabytek", MapX = 90, MapY = 80 },
                        new() { OrderNumber = 2, Name = "Mizar", Category = "Cmentarz", MapX = 160, MapY = 150 },
                        new() { OrderNumber = 3, Name = "Meczet w Bohonikach", Category = "Zabytek", MapX = 510, MapY = 270 }
                    }
                },
                new TripItemViewModel
                {
                    Id = 3,
                    Name = "Kraków – Stare Miasto",
                    City = "Kraków",
                    Km = 3.1,
                    IsCompleted = true,
                    DateLabel = "Zrobiona 12.10.2026",
                    Description = "Klasyczna pętla: Wawel, Rynek Główny, Kazimierz.",
                    Stops = new List<TripStopViewModel>
                    {
                        new() { OrderNumber = 1, Name = "Wawel", Category = "Zamek", MapX = 140, MapY = 270 },
                        new() { OrderNumber = 2, Name = "Rynek Główny", Category = "Plac", MapX = 250, MapY = 110 },
                        new() { OrderNumber = 3, Name = "Sukiennice", Category = "Zabytek", MapX = 330, MapY = 160 },
                        new() { OrderNumber = 4, Name = "Kazimierz", Category = "Dzielnica", MapX = 520, MapY = 300 }
                    }
                }
            };
        }
    }
}
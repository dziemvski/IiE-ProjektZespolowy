using System;
using System.Collections.Generic;

namespace PodrozeMaleIDuze.Models.ViewModels.Trips
{
    public class TripsViewModel
    {
        public string ActiveTab { get; set; } = "todo"; // "todo" lub "done"
        public int? SelectedTripId { get; set; }

        public int TodoCount { get; set; }
        public int DoneCount { get; set; }
        public double DoneKm { get; set; }

        public List<TripItemViewModel> Trips { get; set; } = new();
    }

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

    public class TripStopViewModel
    {
        public int OrderNumber { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Category { get; set; } = string.Empty;
        public int MapX { get; set; }
        public int MapY { get; set; }
    }
}
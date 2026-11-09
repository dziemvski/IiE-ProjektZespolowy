using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using PodrozeMaleIDuze.Models;

namespace PodrozeMaleIDuze.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<City> Cities { get; set; }
    public DbSet<Category> Categories { get; set; }
    public DbSet<Place> Places { get; set; }
    public DbSet<PlaceImage> PlaceImages { get; set; }
    public DbSet<SavedPlace> SavedPlaces { get; set; }
    public DbSet<Trip> Trips { get; set; }
    public DbSet<TripPlace> TripPlaces { get; set; }
    public DbSet<Promotion> Promotions { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<ApplicationUser>()
            .HasIndex(u => u.NormalizedEmail)
            .HasDatabaseName("EmailIndex")
            .IsUnique();

        builder.Entity<ApplicationUser>()
            .HasOne(u => u.ManagedCity)
            .WithMany(c => c.Admins)
            .HasForeignKey(u => u.ManagedCityId)
            .OnDelete(DeleteBehavior.SetNull);

        builder.Entity<City>()
            .HasIndex(c => new { c.Name, c.Region })
            .IsUnique();

        builder.Entity<Category>()
            .HasIndex(c => c.Name)
            .IsUnique();

        builder.Entity<Place>()
            .HasOne(p => p.City)
            .WithMany(c => c.Places)
            .HasForeignKey(p => p.CityId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Place>()
            .HasOne(p => p.Category)
            .WithMany(c => c.Places)
            .HasForeignKey(p => p.CategoryId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<Place>()
            .HasOne(p => p.CreatedByUser)
            .WithMany(u => u.CreatedPlaces)
            .HasForeignKey(p => p.CreatedByUserId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<PlaceImage>()
            .HasOne(i => i.Place)
            .WithMany(p => p.Images)
            .HasForeignKey(i => i.PlaceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<SavedPlace>()
            .HasKey(sp => new { sp.UserId, sp.PlaceId });

        builder.Entity<SavedPlace>()
            .HasOne(sp => sp.User)
            .WithMany(u => u.SavedPlaces)
            .HasForeignKey(sp => sp.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<SavedPlace>()
            .HasOne(sp => sp.Place)
            .WithMany(p => p.SavedBy)
            .HasForeignKey(sp => sp.PlaceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Trip>()
            .HasOne(t => t.User)
            .WithMany(u => u.Trips)
            .HasForeignKey(t => t.UserId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<TripPlace>()
            .HasKey(tp => new { tp.TripId, tp.PlaceId });

        builder.Entity<TripPlace>()
            .HasOne(tp => tp.Trip)
            .WithMany(t => t.TripPlaces)
            .HasForeignKey(tp => tp.TripId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<TripPlace>()
            .HasOne(tp => tp.Place)
            .WithMany(p => p.TripPlaces)
            .HasForeignKey(tp => tp.PlaceId)
            .OnDelete(DeleteBehavior.Cascade);

        builder.Entity<Promotion>()
            .Property(p => p.Price)
            .HasPrecision(10, 2);

        builder.Entity<Promotion>()
            .HasOne(pr => pr.Place)
            .WithMany(p => p.Promotions)
            .HasForeignKey(pr => pr.PlaceId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
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
    }
}
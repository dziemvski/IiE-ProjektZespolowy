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
    }
}
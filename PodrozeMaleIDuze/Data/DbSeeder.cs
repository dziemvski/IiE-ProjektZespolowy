using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using PodrozeMaleIDuze.Constants;
using PodrozeMaleIDuze.Models;

namespace PodrozeMaleIDuze.Data;

public static class DbSeeder
{
    public static async Task SeedAsync(IServiceProvider services)
    {
        var context = services.GetRequiredService<AppDbContext>();
        var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();
        var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
        var configuration = services.GetRequiredService<IConfiguration>();
        var logger = services.GetRequiredService<ILoggerFactory>().CreateLogger(nameof(DbSeeder));

        await context.Database.MigrateAsync();
        await SeedRolesAsync(roleManager);
        await SeedAdminAsync(userManager, configuration, logger);
    }

    private static async Task SeedRolesAsync(RoleManager<IdentityRole> roleManager)
    {
        foreach (var roleName in Roles.All)
        {
            if (await roleManager.RoleExistsAsync(roleName))
                continue;

            var result = await roleManager.CreateAsync(new IdentityRole(roleName));
            if (!result.Succeeded && await roleManager.RoleExistsAsync(roleName))
                continue;
            EnsureSucceeded(result, $"Nie udało się utworzyć roli {roleName}");
        }
    }

    private static async Task SeedAdminAsync(UserManager<ApplicationUser> userManager, IConfiguration configuration,
        ILogger logger)
    {
        var email = configuration["SeedAdmin:Email"];
        var password = configuration["SeedAdmin:Password"];

        if (string.IsNullOrWhiteSpace(email) || string.IsNullOrWhiteSpace(password))
        {
            logger.LogWarning("Brak SeedAdmin:Email lub SeedAdmin:Password - pomijam tworzenie konta administratora.");
            return;
        }

        var admin = await userManager.FindByEmailAsync(email);
        if (admin is null)
        {
            admin = new ApplicationUser
            {
                UserName = email,
                Email = email,
                EmailConfirmed = true,
                DisplayName = "Administrator"
            };

            var createResult = await userManager.CreateAsync(admin, password);
            if (!createResult.Succeeded)
            {
                admin = await userManager.FindByEmailAsync(email);
                if (admin is null)
                    EnsureSucceeded(createResult, "Nie udało się utworzyć konta administratora");
            }
        }

        if (!await userManager.IsInRoleAsync(admin!, Roles.Admin))
        {
            var roleResult = await userManager.AddToRoleAsync(admin!, Roles.Admin);

            if (!roleResult.Succeeded && !await userManager.IsInRoleAsync(admin!, Roles.Admin))
                EnsureSucceeded(roleResult, "Nie udało się nadać roli Admin");
        }
    }

    private static void EnsureSucceeded(IdentityResult result, string message)
    {
        if (!result.Succeeded)
        {
            var errors = string.Join("; ", result.Errors.Select(e => e.Description));
            throw new InvalidOperationException($"{message}: {errors}");
        }
    }
}
using HaHongElevator.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HaHongElevator.Api.Data;

public static class DatabaseSeeder
{
    public static async Task SeedAdminUserAsync(IServiceProvider serviceProvider)
    {
        using var scope = serviceProvider.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<ApplicationDbContext>();

        if (!await dbContext.Database.CanConnectAsync())
        {
            return;
        }

        await SeedAdminAsync(scope.ServiceProvider, dbContext);
    }

    private static async Task SeedAdminAsync(IServiceProvider serviceProvider, ApplicationDbContext dbContext)
    {
        if (await dbContext.AdminUsers.AnyAsync())
        {
            return;
        }

        var adminUser = new AdminUser
        {
            Username = GetRequiredAdminValue(serviceProvider, "AdminSeed:Username", "admin"),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(GetRequiredAdminValue(serviceProvider, "AdminSeed:Password")),
            FullName = GetRequiredAdminValue(serviceProvider, "AdminSeed:FullName", "Quản trị viên"),
            Role = "Admin",
            IsActive = true,
            CreatedAt = DateTime.UtcNow
        };

        dbContext.AdminUsers.Add(adminUser);
        await dbContext.SaveChangesAsync();
    }

    private static string GetRequiredAdminValue(IServiceProvider serviceProvider, string key, string? developmentDefault = null)
    {
        var configuration = serviceProvider.GetRequiredService<IConfiguration>();
        var environment = serviceProvider.GetRequiredService<IWebHostEnvironment>();
        var configuredValue = configuration[key];

        if (!string.IsNullOrWhiteSpace(configuredValue))
        {
            return configuredValue.Trim();
        }

        if (environment.IsDevelopment() && !string.IsNullOrWhiteSpace(developmentDefault))
        {
            return developmentDefault;
        }

        throw new InvalidOperationException($"{key} must be configured before seeding admin user.");
    }
}

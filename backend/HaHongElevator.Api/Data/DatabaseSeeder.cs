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

        if (!await dbContext.Projects.AnyAsync())
        {
            dbContext.Projects.AddRange(
                new Project
                {
                    Name = "Thang mĂ¡y gia Ä‘Ă¬nh 4 táº§ng - NhĂ  phá»‘ hiá»‡n Ä‘áº¡i",
                    Slug = "thang-may-gia-dinh-4-tang-nha-pho",
                    Category = "gia-dinh",
                    Location = "NhĂ  phá»‘ Ä‘Ă´ thá»‹",
                    Description = "PhÆ°Æ¡ng Ă¡n thang mĂ¡y gia Ä‘Ă¬nh táº£i trá»ng khoáº£ng 350-450kg, phĂ¹ há»£p nhĂ  phá»‘ 4 táº§ng cáº§n tá»‘i Æ°u diá»‡n tĂ­ch, cabin inox kĂ­nh sĂ¡ng vĂ  váº­n hĂ nh Ăªm cho nhu cáº§u di chuyá»ƒn háº±ng ngĂ y.",
                    PriceRange = "Khoáº£ng 320 - 520 triá»‡u VNÄ",
                    ImageUrl = "https://source.unsplash.com/1200x900/?home,elevator,interior",
                    CompletedAt = new DateTime(2026, 3, 18, 0, 0, 0, DateTimeKind.Utc),
                    IsFeatured = true,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Project
                {
                    Name = "Thang mĂ¡y vÄƒn phĂ²ng - Sáº£nh thÆ°Æ¡ng máº¡i",
                    Slug = "thang-may-van-phong-sanh-thuong-mai",
                    Category = "van-phong",
                    Location = "TĂ²a nhĂ  vÄƒn phĂ²ng",
                    Description = "Giáº£i phĂ¡p thang mĂ¡y táº£i khĂ¡ch cho khu vÄƒn phĂ²ng, Æ°u tiĂªn lÆ°u lÆ°á»£ng di chuyá»ƒn á»•n Ä‘á»‹nh, cá»­a táº§ng inox, báº£ng gá»i táº§ng dá»… sá»­ dá»¥ng vĂ  thiáº¿t káº¿ sáº£nh chuyĂªn nghiá»‡p.",
                    PriceRange = "Khoáº£ng 550 triá»‡u - 1,2 tá»· VNÄ",
                    ImageUrl = "https://source.unsplash.com/1200x900/?elevator,lobby,office",
                    CompletedAt = new DateTime(2026, 4, 12, 0, 0, 0, DateTimeKind.Utc),
                    IsFeatured = true,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Project
                {
                    Name = "Thang mĂ¡y táº£i hĂ ng - Kho váº­n nhá»",
                    Slug = "thang-may-tai-hang-kho-van-nho",
                    Category = "tai-hang",
                    Location = "Kho hĂ ng vĂ  xÆ°á»Ÿng sáº£n xuáº¥t",
                    Description = "Cáº¥u hĂ¬nh thang táº£i hĂ ng cho kho váº­n quy mĂ´ nhá», táº­p trung vĂ o Ä‘á»™ bá»n, sĂ n cabin chá»‹u táº£i tá»‘t, cá»­a má»Ÿ thuáº­n tiá»‡n vĂ  quy trĂ¬nh báº£o trĂ¬ dá»… kiá»ƒm soĂ¡t.",
                    PriceRange = "Khoáº£ng 450 - 900 triá»‡u VNÄ",
                    ImageUrl = "https://source.unsplash.com/1200x900/?warehouse,industrial,elevator",
                    CompletedAt = new DateTime(2026, 5, 6, 0, 0, 0, DateTimeKind.Utc),
                    IsFeatured = false,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                },
                new Project
                {
                    Name = "Cáº£i táº¡o cabin thang mĂ¡y inox champagne",
                    Slug = "cai-tao-cabin-thang-may-inox-champagne",
                    Category = "noi-that-cabin",
                    Location = "KhĂ¡ch sáº¡n vĂ  cÄƒn há»™ dá»‹ch vá»¥",
                    Description = "GĂ³i cáº£i táº¡o ná»™i tháº¥t cabin vá»›i váº­t liá»‡u inox champagne, Ä‘Ă¨n tráº§n sĂ¡ng dá»‹u vĂ  tay vá»‹n gá»n gĂ ng, phĂ¹ há»£p cĂ´ng trĂ¬nh muá»‘n nĂ¢ng cáº¥p hĂ¬nh áº£nh mĂ  khĂ´ng thay Ä‘á»•i toĂ n bá»™ há»‡ thá»‘ng.",
                    PriceRange = "Khoáº£ng 80 - 180 triá»‡u VNÄ",
                    ImageUrl = "https://source.unsplash.com/1200x900/?elevator,interior,luxury",
                    CompletedAt = new DateTime(2026, 6, 22, 0, 0, 0, DateTimeKind.Utc),
                    IsFeatured = false,
                    IsActive = true,
                    CreatedAt = DateTime.UtcNow
                }
            );

            await dbContext.SaveChangesAsync();
        }

        if (await dbContext.AdminUsers.AnyAsync())
        {
            return;
        }

        var adminUser = new AdminUser
        {
            Username = GetRequiredAdminValue(scope.ServiceProvider, "AdminSeed:Username", "admin"),
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(GetRequiredAdminValue(scope.ServiceProvider, "AdminSeed:Password")),
            FullName = GetRequiredAdminValue(scope.ServiceProvider, "AdminSeed:FullName", "Quản trị viên"),
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


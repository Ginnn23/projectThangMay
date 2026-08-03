using System.Text.Json;
using HaHongElevator.Api.Data;
using HaHongElevator.Api.DTOs.SiteSettings;
using HaHongElevator.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HaHongElevator.Api.Controllers;

[ApiController]
[Route("api/site-settings")]
public class SiteSettingsController : ControllerBase
{
    private const string HomeHeroKey = "home-hero";
    private readonly ApplicationDbContext _dbContext;

    public SiteSettingsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet("home-hero")]
    public async Task<ActionResult<HomeHeroSettingsDto>> GetHomeHero()
    {
        var setting = await _dbContext.SiteSettings.AsNoTracking().FirstOrDefaultAsync(x => x.Key == HomeHeroKey);
        if (setting == null || string.IsNullOrWhiteSpace(setting.Value))
        {
            return Ok(new HomeHeroSettingsDto());
        }

        try
        {
            var result = JsonSerializer.Deserialize<HomeHeroSettingsDto>(setting.Value, new JsonSerializerOptions
            {
                PropertyNameCaseInsensitive = true
            });

            return Ok(result ?? new HomeHeroSettingsDto());
        }
        catch (JsonException)
        {
            return Ok(new HomeHeroSettingsDto());
        }
    }

    [HttpPut("home-hero")]
    [Authorize(Roles = "Admin")]
    public async Task<ActionResult<HomeHeroSettingsDto>> UpdateHomeHero(HomeHeroSettingsDto request)
    {
        var payload = new HomeHeroSettingsDto
        {
            MainImages = CleanImages(request.MainImages, 3),
            SideImages = CleanImages(request.SideImages, 2),
            BadgeText = string.IsNullOrWhiteSpace(request.BadgeText) ? "Hỗ trợ kỹ thuật 24/7" : request.BadgeText.Trim()
        };

        var setting = await _dbContext.SiteSettings.FirstOrDefaultAsync(x => x.Key == HomeHeroKey);
        if (setting == null)
        {
            setting = new SiteSetting { Key = HomeHeroKey };
            _dbContext.SiteSettings.Add(setting);
        }

        setting.Value = JsonSerializer.Serialize(payload);
        setting.UpdatedAt = DateTime.UtcNow;
        await _dbContext.SaveChangesAsync();

        return Ok(payload);
    }

    private static List<string> CleanImages(IEnumerable<string>? images, int maxItems)
    {
        return images?
            .Where(image => !string.IsNullOrWhiteSpace(image))
            .Select(image => image.Trim())
            .Take(maxItems)
            .ToList() ?? [];
    }
}

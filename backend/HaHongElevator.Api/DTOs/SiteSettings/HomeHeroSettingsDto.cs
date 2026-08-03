namespace HaHongElevator.Api.DTOs.SiteSettings;

public class HomeHeroSettingsDto
{
    public List<string> MainImages { get; set; } = [];
    public List<string> SideImages { get; set; } = [];
    public string BadgeText { get; set; } = "Hỗ trợ kỹ thuật 24/7";
}

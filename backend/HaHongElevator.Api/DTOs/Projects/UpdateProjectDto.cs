using System.ComponentModel.DataAnnotations;

namespace HaHongElevator.Api.DTOs.Projects;

public class UpdateProjectDto
{
    [Required]
    [MaxLength(220)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(240)]
    public string? Slug { get; set; }

    [Required]
    [MaxLength(120)]
    public string Category { get; set; } = string.Empty;

    [Required]
    [MaxLength(220)]
    public string Location { get; set; } = string.Empty;

    [Required]
    [MaxLength(5000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(120)]
    public string? PriceRange { get; set; }

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    public List<string> GalleryImageUrls { get; set; } = [];

    public DateTime? CompletedAt { get; set; }
    public bool IsFeatured { get; set; }
    public bool IsActive { get; set; } = true;
}

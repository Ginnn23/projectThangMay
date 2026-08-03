using System.ComponentModel.DataAnnotations;

namespace HaHongElevator.Api.DTOs.Services;

public class CreateElevatorServiceDto
{
    [Required]
    [MaxLength(200)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(220)]
    public string? Slug { get; set; }

    [Required]
    [MaxLength(500)]
    public string ShortDescription { get; set; } = string.Empty;

    [Required]
    [MaxLength(5000)]
    public string Description { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? ImageUrl { get; set; }

    [MaxLength(100)]
    public string? Icon { get; set; }

    public int DisplayOrder { get; set; }
    public bool IsActive { get; set; } = true;
}

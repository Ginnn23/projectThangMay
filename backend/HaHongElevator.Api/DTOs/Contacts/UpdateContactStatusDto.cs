using System.ComponentModel.DataAnnotations;

namespace HaHongElevator.Api.DTOs.Contacts;

public class UpdateContactStatusDto
{
    [Required]
    [MaxLength(30)]
    public string Status { get; set; } = string.Empty;
}

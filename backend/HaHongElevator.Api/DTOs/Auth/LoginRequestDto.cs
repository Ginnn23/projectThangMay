using System.ComponentModel.DataAnnotations;

namespace HaHongElevator.Api.DTOs.Auth;

public class LoginRequestDto
{
    [Required]
    [MaxLength(100)]
    public string Username { get; set; } = string.Empty;

    [Required]
    public string Password { get; set; } = string.Empty;
}

namespace HaHongElevator.Api.DTOs.Auth;

public class LoginResponseDto
{
    public string Token { get; set; } = string.Empty;
    public DateTime ExpiresAt { get; set; }
    public AdminUserDto User { get; set; } = new();
}

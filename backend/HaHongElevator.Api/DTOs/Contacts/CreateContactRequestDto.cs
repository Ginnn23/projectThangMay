using System.ComponentModel.DataAnnotations;

namespace HaHongElevator.Api.DTOs.Contacts;

public class CreateContactRequestDto
{
    [Required]
    [StringLength(100, MinimumLength = 2)]
    public string FullName { get; set; } = string.Empty;

    [Required]
    [StringLength(20, MinimumLength = 8)]
    [RegularExpression(@"^[0-9+\-\s().]{8,20}$", ErrorMessage = "Số điện thoại không hợp lệ.")]
    public string PhoneNumber { get; set; } = string.Empty;

    [EmailAddress]
    [MaxLength(150)]
    public string? Email { get; set; }

    [MaxLength(120)]
    public string? Subject { get; set; }

    [Required]
    [StringLength(2000, MinimumLength = 10)]
    public string Message { get; set; } = string.Empty;
}

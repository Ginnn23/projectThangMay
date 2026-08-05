namespace HaHongElevator.Api.DTOs.Maintenance;

public class CreateMaintenanceCustomerDto
{
    public string CustomerName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string ProjectType { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public DateTime InstalledAt { get; set; }
    public DateTime NextMaintenanceAt { get; set; }
    public string? Note { get; set; }
    public bool IsActive { get; set; } = true;
}

namespace HaHongElevator.Api.DTOs.Maintenance;

public class MaintenanceCustomerDto
{
    public int Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public string PhoneNumber { get; set; } = string.Empty;
    public string? Email { get; set; }
    public string ProjectName { get; set; } = string.Empty;
    public string ProjectType { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public DateTime InstalledAt { get; set; }
    public DateTime NextMaintenanceAt { get; set; }
    public string Note { get; set; } = string.Empty;
    public bool IsActive { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
}

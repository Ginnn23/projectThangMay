using HaHongElevator.Api.Data;
using HaHongElevator.Api.DTOs.Maintenance;
using HaHongElevator.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HaHongElevator.Api.Controllers;

[ApiController]
[Authorize(Roles = "Admin")]
[Route("api/maintenance-customers")]
public class MaintenanceCustomersController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public MaintenanceCustomersController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MaintenanceCustomerDto>>> GetMaintenanceCustomers([FromQuery] string? search, CancellationToken cancellationToken)
    {
        var query = _dbContext.MaintenanceCustomers.AsNoTracking();

        if (!string.IsNullOrWhiteSpace(search))
        {
            var keyword = search.Trim().ToLower();
            query = query.Where(x =>
                x.CustomerName.ToLower().Contains(keyword) ||
                x.PhoneNumber.ToLower().Contains(keyword) ||
                (x.Email != null && x.Email.ToLower().Contains(keyword)) ||
                x.ProjectName.ToLower().Contains(keyword) ||
                x.Address.ToLower().Contains(keyword));
        }

        var customers = await query
            .OrderBy(x => x.NextMaintenanceAt)
            .ThenByDescending(x => x.CreatedAt)
            .Select(x => ToDto(x))
            .ToListAsync(cancellationToken);

        return Ok(customers);
    }

    [HttpPost]
    public async Task<ActionResult<MaintenanceCustomerDto>> CreateMaintenanceCustomer(CreateMaintenanceCustomerDto request, CancellationToken cancellationToken)
    {
        var validationError = ValidateRequest(request);
        if (validationError != null)
        {
            return BadRequest(new { message = validationError });
        }

        var customer = new MaintenanceCustomer
        {
            CustomerName = request.CustomerName.Trim(),
            PhoneNumber = NormalizePhoneNumber(request.PhoneNumber),
            Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim().ToLowerInvariant(),
            ProjectName = request.ProjectName.Trim(),
            ProjectType = request.ProjectType.Trim(),
            Address = request.Address.Trim(),
            InstalledAt = request.InstalledAt.ToUniversalTime(),
            NextMaintenanceAt = request.NextMaintenanceAt.ToUniversalTime(),
            Note = request.Note?.Trim() ?? string.Empty,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.MaintenanceCustomers.Add(customer);
        await _dbContext.SaveChangesAsync(cancellationToken);

        return CreatedAtAction(nameof(GetMaintenanceCustomers), new { id = customer.Id }, ToDto(customer));
    }

    [HttpPut("{id:int}")]
    public async Task<ActionResult<MaintenanceCustomerDto>> UpdateMaintenanceCustomer(int id, UpdateMaintenanceCustomerDto request, CancellationToken cancellationToken)
    {
        var validationError = ValidateRequest(request);
        if (validationError != null)
        {
            return BadRequest(new { message = validationError });
        }

        var customer = await _dbContext.MaintenanceCustomers.FindAsync([id], cancellationToken);
        if (customer == null)
        {
            return NotFound();
        }

        customer.CustomerName = request.CustomerName.Trim();
        customer.PhoneNumber = NormalizePhoneNumber(request.PhoneNumber);
        customer.Email = string.IsNullOrWhiteSpace(request.Email) ? null : request.Email.Trim().ToLowerInvariant();
        customer.ProjectName = request.ProjectName.Trim();
        customer.ProjectType = request.ProjectType.Trim();
        customer.Address = request.Address.Trim();
        customer.InstalledAt = request.InstalledAt.ToUniversalTime();
        customer.NextMaintenanceAt = request.NextMaintenanceAt.ToUniversalTime();
        customer.Note = request.Note?.Trim() ?? string.Empty;
        customer.IsActive = request.IsActive;

        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok(ToDto(customer));
    }

    [HttpPut("{id:int}/visibility")]
    public async Task<ActionResult<MaintenanceCustomerDto>> UpdateVisibility(int id, UpdateMaintenanceVisibilityDto request, CancellationToken cancellationToken)
    {
        var customer = await _dbContext.MaintenanceCustomers.FindAsync([id], cancellationToken);
        if (customer == null)
        {
            return NotFound();
        }

        customer.IsActive = request.IsActive;
        await _dbContext.SaveChangesAsync(cancellationToken);
        return Ok(ToDto(customer));
    }

    [HttpDelete("{id:int}/permanent")]
    public async Task<IActionResult> DeleteMaintenanceCustomer(int id, CancellationToken cancellationToken)
    {
        var customer = await _dbContext.MaintenanceCustomers.FindAsync([id], cancellationToken);
        if (customer == null)
        {
            return NotFound();
        }

        _dbContext.MaintenanceCustomers.Remove(customer);
        await _dbContext.SaveChangesAsync(cancellationToken);
        return NoContent();
    }

    private static string? ValidateRequest(CreateMaintenanceCustomerDto request)
    {
        if (string.IsNullOrWhiteSpace(request.CustomerName) ||
            string.IsNullOrWhiteSpace(request.PhoneNumber) ||
            string.IsNullOrWhiteSpace(request.ProjectName) ||
            string.IsNullOrWhiteSpace(request.ProjectType) ||
            string.IsNullOrWhiteSpace(request.Address))
        {
            return "Vui lòng nhập đầy đủ thông tin khách hàng, công trình và địa chỉ.";
        }

        if (request.InstalledAt == default || request.NextMaintenanceAt == default)
        {
            return "Vui lòng chọn ngày lắp đặt và ngày bảo trì tiếp theo.";
        }

        var phoneNumber = NormalizePhoneNumber(request.PhoneNumber);
        if (phoneNumber.Length != 10 || phoneNumber.Any(character => !char.IsDigit(character)))
        {
            return "Số điện thoại phải gồm đúng 10 chữ số.";
        }

        if (!string.IsNullOrWhiteSpace(request.Email) && !IsValidEmail(request.Email))
        {
            return "Email phải đúng định dạng và có ký tự @.";
        }

        var installedAt = request.InstalledAt.ToUniversalTime();
        var nextMaintenanceAt = request.NextMaintenanceAt.ToUniversalTime();
        if (installedAt.Year is < 2000 or > 2100 || nextMaintenanceAt.Year is < 2000 or > 2100)
        {
            return "Ngày lắp đặt và ngày bảo trì phải hợp lệ trong khoảng năm 2000 - 2100.";
        }

        if (nextMaintenanceAt < installedAt)
        {
            return "Ngày bảo trì tiếp theo không được trước ngày lắp đặt.";
        }

        return null;
    }

    private static string NormalizePhoneNumber(string value)
    {
        return new string(value.Trim().Where(char.IsDigit).ToArray());
    }

    private static bool IsValidEmail(string value)
    {
        var email = value.Trim();
        var atIndex = email.IndexOf('@');
        return atIndex > 0 &&
            atIndex == email.LastIndexOf('@') &&
            atIndex < email.Length - 3 &&
            email[(atIndex + 1)..].Contains('.') &&
            !email.Contains(' ');
    }

    private static MaintenanceCustomerDto ToDto(MaintenanceCustomer customer) => new()
    {
        Id = customer.Id,
        CustomerName = customer.CustomerName,
        PhoneNumber = customer.PhoneNumber,
        Email = customer.Email,
        ProjectName = customer.ProjectName,
        ProjectType = customer.ProjectType,
        Address = customer.Address,
        InstalledAt = customer.InstalledAt,
        NextMaintenanceAt = customer.NextMaintenanceAt,
        Note = customer.Note,
        IsActive = customer.IsActive,
        CreatedAt = customer.CreatedAt,
        UpdatedAt = customer.UpdatedAt
    };
}

public class UpdateMaintenanceVisibilityDto
{
    public bool IsActive { get; set; }
}

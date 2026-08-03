using HaHongElevator.Api.Data;
using HaHongElevator.Api.DTOs.Services;
using HaHongElevator.Api.Helpers;
using HaHongElevator.Api.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace HaHongElevator.Api.Controllers;

[ApiController]
[Route("api/services")]
public class ServicesController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public ServicesController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [EnableRateLimiting("public-read")]
    [OutputCache(PolicyName = "public-cache")]
    public async Task<ActionResult<IEnumerable<ElevatorServiceDto>>> GetServices(CancellationToken cancellationToken)
    {
        var services = await _dbContext.ElevatorServices
            .AsNoTracking()
            .Where(x => x.IsActive)
            .OrderBy(x => x.DisplayOrder)
            .ThenBy(x => x.Name)
            .Select(x => ToDto(x))
            .ToListAsync(cancellationToken);

        return Ok(services);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public async Task<ActionResult<IEnumerable<ElevatorServiceDto>>> GetServicesForAdmin()
    {
        var services = await _dbContext.ElevatorServices
            .AsNoTracking()
            .OrderBy(x => x.DisplayOrder)
            .ThenBy(x => x.Name)
            .Select(x => ToDto(x))
            .ToListAsync();

        return Ok(services);
    }

    [HttpGet("{id:int:min(1)}")]
    [EnableRateLimiting("public-read")]
    public async Task<ActionResult<ElevatorServiceDto>> GetService(int id, CancellationToken cancellationToken)
    {
        var service = await _dbContext.ElevatorServices.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.IsActive, cancellationToken);
        return service == null ? NotFound() : Ok(ToDto(service));
    }

    [HttpGet("slug/{slug}")]
    [EnableRateLimiting("public-read")]
    public async Task<ActionResult<ElevatorServiceDto>> GetServiceBySlug(string slug, CancellationToken cancellationToken)
    {
        var service = await _dbContext.ElevatorServices.AsNoTracking().FirstOrDefaultAsync(x => x.Slug == slug && x.IsActive, cancellationToken);
        return service == null ? NotFound() : Ok(ToDto(service));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ElevatorServiceDto>> CreateService(CreateElevatorServiceDto request)
    {
        var slug = string.IsNullOrWhiteSpace(request.Slug) ? SlugHelper.GenerateSlug(request.Name) : SlugHelper.GenerateSlug(request.Slug);
        if (await _dbContext.ElevatorServices.AnyAsync(x => x.Slug == slug))
        {
            return BadRequest(new { message = "Slug already exists." });
        }

        var service = new ElevatorService
        {
            Name = request.Name.Trim(),
            Slug = slug,
            ShortDescription = request.ShortDescription.Trim(),
            Description = request.Description.Trim(),
            ImageUrl = request.ImageUrl,
            Icon = request.Icon,
            DisplayOrder = request.DisplayOrder,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.ElevatorServices.Add(service);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetService), new { id = service.Id }, ToDto(service));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ElevatorServiceDto>> UpdateService(int id, UpdateElevatorServiceDto request)
    {
        var service = await _dbContext.ElevatorServices.FindAsync(id);
        if (service == null)
        {
            return NotFound();
        }

        var slug = string.IsNullOrWhiteSpace(request.Slug) ? SlugHelper.GenerateSlug(request.Name) : SlugHelper.GenerateSlug(request.Slug);
        if (await _dbContext.ElevatorServices.AnyAsync(x => x.Slug == slug && x.Id != id))
        {
            return BadRequest(new { message = "Slug already exists." });
        }

        service.Name = request.Name.Trim();
        service.Slug = slug;
        service.ShortDescription = request.ShortDescription.Trim();
        service.Description = request.Description.Trim();
        service.ImageUrl = request.ImageUrl;
        service.Icon = request.Icon;
        service.DisplayOrder = request.DisplayOrder;
        service.IsActive = request.IsActive;

        await _dbContext.SaveChangesAsync();
        return Ok(ToDto(service));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteService(int id)
    {
        var service = await _dbContext.ElevatorServices.FindAsync(id);
        if (service == null)
        {
            return NotFound();
        }

        service.IsActive = false;
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}/permanent")]
    public async Task<IActionResult> DeleteServicePermanently(int id)
    {
        var service = await _dbContext.ElevatorServices.FindAsync(id);
        if (service == null)
        {
            return NotFound();
        }

        _dbContext.ElevatorServices.Remove(service);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/visibility")]
    public async Task<ActionResult<ElevatorServiceDto>> UpdateServiceVisibility(int id, UpdateServiceVisibilityDto request)
    {
        var service = await _dbContext.ElevatorServices.FindAsync(id);
        if (service == null)
        {
            return NotFound();
        }

        service.IsActive = request.IsActive;
        await _dbContext.SaveChangesAsync();

        return Ok(ToDto(service));
    }

    private static ElevatorServiceDto ToDto(ElevatorService service) => new()
    {
        Id = service.Id,
        Name = service.Name,
        Slug = service.Slug,
        ShortDescription = service.ShortDescription,
        Description = service.Description,
        ImageUrl = service.ImageUrl,
        Icon = service.Icon,
        DisplayOrder = service.DisplayOrder,
        IsActive = service.IsActive,
        CreatedAt = service.CreatedAt,
        UpdatedAt = service.UpdatedAt
    };
}

public class UpdateServiceVisibilityDto
{
    public bool IsActive { get; set; }
}

using HaHongElevator.Api.Data;
using HaHongElevator.Api.DTOs.Projects;
using HaHongElevator.Api.Helpers;
using HaHongElevator.Api.Models;
using System.Text.Json;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.OutputCaching;
using Microsoft.AspNetCore.RateLimiting;
using Microsoft.EntityFrameworkCore;

namespace HaHongElevator.Api.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController : ControllerBase
{
    private readonly ApplicationDbContext _dbContext;

    public ProjectsController(ApplicationDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    [HttpGet]
    [EnableRateLimiting("public-read")]
    [OutputCache(PolicyName = "public-cache")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects([FromQuery] string? category, [FromQuery] string? search, CancellationToken cancellationToken)
    {
        var query = _dbContext.Projects.AsNoTracking().Where(x => x.IsActive);

        if (!string.IsNullOrWhiteSpace(category))
        {
            query = query.Where(x => x.Category == category);
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var keyword = search.Trim().ToLower();
            query = query.Where(x =>
                x.Name.ToLower().Contains(keyword) ||
                x.Location.ToLower().Contains(keyword) ||
                x.Description.ToLower().Contains(keyword));
        }

        var projects = await query
            .OrderByDescending(x => x.IsFeatured)
            .ThenByDescending(x => x.CompletedAt ?? x.CreatedAt)
            .Select(x => ToDto(x))
            .ToListAsync(cancellationToken);

        return Ok(projects);
    }

    [HttpGet("featured")]
    [EnableRateLimiting("public-read")]
    [OutputCache(PolicyName = "public-cache")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetFeaturedProjects(CancellationToken cancellationToken)
    {
        var projects = await _dbContext.Projects
            .AsNoTracking()
            .Where(x => x.IsActive && x.IsFeatured)
            .OrderByDescending(x => x.CompletedAt ?? x.CreatedAt)
            .Select(x => ToDto(x))
            .ToListAsync(cancellationToken);

        return Ok(projects);
    }

    [Authorize(Roles = "Admin")]
    [HttpGet("admin")]
    public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjectsForAdmin(CancellationToken cancellationToken)
    {
        var projects = await _dbContext.Projects
            .AsNoTracking()
            .OrderByDescending(x => x.IsActive)
            .ThenByDescending(x => x.IsFeatured)
            .ThenByDescending(x => x.CompletedAt ?? x.CreatedAt)
            .Select(x => ToDto(x))
            .ToListAsync(cancellationToken);

        return Ok(projects);
    }

    [HttpGet("{id:int:min(1)}")]
    [EnableRateLimiting("public-read")]
    public async Task<ActionResult<ProjectDto>> GetProject(int id, CancellationToken cancellationToken)
    {
        var project = await _dbContext.Projects.AsNoTracking().FirstOrDefaultAsync(x => x.Id == id && x.IsActive, cancellationToken);
        return project == null ? NotFound() : Ok(ToDto(project));
    }

    [HttpGet("slug/{slug}")]
    [EnableRateLimiting("public-read")]
    public async Task<ActionResult<ProjectDto>> GetProjectBySlug(string slug, CancellationToken cancellationToken)
    {
        var project = await _dbContext.Projects.AsNoTracking().FirstOrDefaultAsync(x => x.Slug == slug && x.IsActive, cancellationToken);
        return project == null ? NotFound() : Ok(ToDto(project));
    }

    [Authorize(Roles = "Admin")]
    [HttpPost]
    public async Task<ActionResult<ProjectDto>> CreateProject(CreateProjectDto request)
    {
        var slug = string.IsNullOrWhiteSpace(request.Slug) ? SlugHelper.GenerateSlug(request.Name) : SlugHelper.GenerateSlug(request.Slug);
        if (await _dbContext.Projects.AnyAsync(x => x.Slug == slug))
        {
            return BadRequest(new { message = "Slug already exists." });
        }

        var project = new Project
        {
            Name = request.Name.Trim(),
            Slug = slug,
            Category = request.Category.Trim(),
            Location = request.Location.Trim(),
            Description = request.Description.Trim(),
            PriceRange = string.IsNullOrWhiteSpace(request.PriceRange) ? null : request.PriceRange.Trim(),
            ImageUrl = request.ImageUrl,
            GalleryImageUrls = SerializeGalleryImages(request.GalleryImageUrls),
            CompletedAt = request.CompletedAt?.ToUniversalTime(),
            IsFeatured = request.IsFeatured,
            IsActive = request.IsActive,
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Projects.Add(project);
        await _dbContext.SaveChangesAsync();

        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, ToDto(project));
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}")]
    public async Task<ActionResult<ProjectDto>> UpdateProject(int id, UpdateProjectDto request)
    {
        var project = await _dbContext.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        var slug = string.IsNullOrWhiteSpace(request.Slug) ? SlugHelper.GenerateSlug(request.Name) : SlugHelper.GenerateSlug(request.Slug);
        if (await _dbContext.Projects.AnyAsync(x => x.Slug == slug && x.Id != id))
        {
            return BadRequest(new { message = "Slug already exists." });
        }

        project.Name = request.Name.Trim();
        project.Slug = slug;
        project.Category = request.Category.Trim();
        project.Location = request.Location.Trim();
        project.Description = request.Description.Trim();
        project.PriceRange = string.IsNullOrWhiteSpace(request.PriceRange) ? null : request.PriceRange.Trim();
        project.ImageUrl = request.ImageUrl;
        project.GalleryImageUrls = SerializeGalleryImages(request.GalleryImageUrls);
        project.CompletedAt = request.CompletedAt?.ToUniversalTime();
        project.IsFeatured = request.IsFeatured;
        project.IsActive = request.IsActive;

        await _dbContext.SaveChangesAsync();
        return Ok(ToDto(project));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _dbContext.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        project.IsActive = false;
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    [Authorize(Roles = "Admin")]
    [HttpPut("{id:int}/visibility")]
    public async Task<ActionResult<ProjectDto>> UpdateProjectVisibility(int id, UpdateProjectVisibilityDto request)
    {
        var project = await _dbContext.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        project.IsActive = request.IsActive;
        await _dbContext.SaveChangesAsync();

        return Ok(ToDto(project));
    }

    [Authorize(Roles = "Admin")]
    [HttpDelete("{id:int}/permanent")]
    public async Task<IActionResult> DeleteProjectPermanently(int id)
    {
        var project = await _dbContext.Projects.FindAsync(id);
        if (project == null)
        {
            return NotFound();
        }

        _dbContext.Projects.Remove(project);
        await _dbContext.SaveChangesAsync();
        return NoContent();
    }

    private static ProjectDto ToDto(Project project) => new()
    {
        Id = project.Id,
        Name = project.Name,
        Slug = project.Slug,
        Category = project.Category,
        Location = project.Location,
        Description = project.Description,
        PriceRange = project.PriceRange,
        ImageUrl = project.ImageUrl,
        GalleryImageUrls = DeserializeGalleryImages(project.GalleryImageUrls),
        CompletedAt = project.CompletedAt,
        IsFeatured = project.IsFeatured,
        IsActive = project.IsActive,
        CreatedAt = project.CreatedAt,
        UpdatedAt = project.UpdatedAt
    };

    private static string? SerializeGalleryImages(IEnumerable<string>? imageUrls)
    {
        var cleaned = imageUrls?
            .Where(imageUrl => !string.IsNullOrWhiteSpace(imageUrl))
            .Select(imageUrl => imageUrl.Trim())
            .Distinct()
            .Take(8)
            .ToList();

        return cleaned is { Count: > 0 } ? JsonSerializer.Serialize(cleaned) : null;
    }

    private static List<string> DeserializeGalleryImages(string? value)
    {
        if (string.IsNullOrWhiteSpace(value))
        {
            return [];
        }

        try
        {
            return JsonSerializer.Deserialize<List<string>>(value) ?? [];
        }
        catch (JsonException)
        {
            return [];
        }
    }
}

public class UpdateProjectVisibilityDto
{
    public bool IsActive { get; set; }
}

using HaHongElevator.Api.Models;
using Microsoft.EntityFrameworkCore;

namespace HaHongElevator.Api.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<AdminUser> AdminUsers => Set<AdminUser>();
    public DbSet<ElevatorService> ElevatorServices => Set<ElevatorService>();
    public DbSet<Project> Projects => Set<Project>();
    public DbSet<ContactRequest> ContactRequests => Set<ContactRequest>();
    public DbSet<SiteSetting> SiteSettings => Set<SiteSetting>();

    public override Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        ApplyUtcDates();
        return base.SaveChangesAsync(cancellationToken);
    }

    public override int SaveChanges()
    {
        ApplyUtcDates();
        return base.SaveChanges();
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<AdminUser>(entity =>
        {
            entity.HasIndex(x => x.Username).IsUnique();
            entity.Property(x => x.Username).HasMaxLength(100).IsRequired();
            entity.Property(x => x.PasswordHash).HasMaxLength(255).IsRequired();
            entity.Property(x => x.FullName).HasMaxLength(150).IsRequired();
            entity.Property(x => x.Role).HasMaxLength(50).IsRequired();
            entity.Property(x => x.CreatedAt).HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'");
        });

        modelBuilder.Entity<ElevatorService>(entity =>
        {
            entity.HasIndex(x => x.Slug).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(200).IsRequired();
            entity.Property(x => x.Slug).HasMaxLength(220).IsRequired();
            entity.Property(x => x.ShortDescription).HasMaxLength(500).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(5000).IsRequired();
            entity.Property(x => x.ImageUrl).HasMaxLength(500);
            entity.Property(x => x.Icon).HasMaxLength(100);
            entity.Property(x => x.CreatedAt).HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'");
        });

        modelBuilder.Entity<Project>(entity =>
        {
            entity.HasIndex(x => x.Slug).IsUnique();
            entity.Property(x => x.Name).HasMaxLength(220).IsRequired();
            entity.Property(x => x.Slug).HasMaxLength(240).IsRequired();
            entity.Property(x => x.Category).HasMaxLength(120).IsRequired();
            entity.Property(x => x.Location).HasMaxLength(220).IsRequired();
            entity.Property(x => x.Description).HasMaxLength(5000).IsRequired();
            entity.Property(x => x.PriceRange).HasMaxLength(120);
            entity.Property(x => x.ImageUrl).HasMaxLength(500);
            entity.Property(x => x.GalleryImageUrls).HasColumnType("text");
            entity.Property(x => x.CreatedAt).HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'");
        });

        modelBuilder.Entity<ContactRequest>(entity =>
        {
            entity.Property(x => x.FullName).HasMaxLength(150).IsRequired();
            entity.Property(x => x.PhoneNumber).HasMaxLength(30).IsRequired();
            entity.Property(x => x.Email).HasMaxLength(254);
            entity.Property(x => x.Subject).HasMaxLength(220);
            entity.Property(x => x.Message).HasMaxLength(3000).IsRequired();
            entity.Property(x => x.Status).HasMaxLength(30).HasDefaultValue("New").IsRequired();
            entity.Property(x => x.CreatedAt).HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'");
        });

        modelBuilder.Entity<SiteSetting>(entity =>
        {
            entity.HasIndex(x => x.Key).IsUnique();
            entity.Property(x => x.Key).HasMaxLength(120).IsRequired();
            entity.Property(x => x.Value).HasColumnType("text").IsRequired();
            entity.Property(x => x.UpdatedAt).HasDefaultValueSql("NOW() AT TIME ZONE 'UTC'");
        });
    }

    private void ApplyUtcDates()
    {
        var entries = ChangeTracker.Entries()
            .Where(entry => entry.State is EntityState.Added or EntityState.Modified);

        foreach (var entry in entries)
        {
            if (entry.Entity is ElevatorService service && entry.State == EntityState.Modified)
            {
                service.UpdatedAt = DateTime.UtcNow;
            }

            if (entry.Entity is Project project && entry.State == EntityState.Modified)
            {
                project.UpdatedAt = DateTime.UtcNow;
            }

            if (entry.Entity is SiteSetting setting && entry.State == EntityState.Modified)
            {
                setting.UpdatedAt = DateTime.UtcNow;
            }

            if (entry.State == EntityState.Added)
            {
                var createdAt = entry.Properties.FirstOrDefault(p => p.Metadata.Name == "CreatedAt");
                if (createdAt is { CurrentValue: DateTime dateTime } && dateTime.Kind != DateTimeKind.Utc)
                {
                    createdAt.CurrentValue = DateTime.SpecifyKind(dateTime, DateTimeKind.Utc);
                }
            }
        }
    }
}

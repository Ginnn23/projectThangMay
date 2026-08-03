using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HaHongElevator.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectGalleryImages : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GalleryImageUrls",
                table: "Projects",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GalleryImageUrls",
                table: "Projects");
        }
    }
}

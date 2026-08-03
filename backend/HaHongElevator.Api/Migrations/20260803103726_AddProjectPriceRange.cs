using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HaHongElevator.Api.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectPriceRange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PriceRange",
                table: "Projects",
                type: "character varying(120)",
                maxLength: 120,
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PriceRange",
                table: "Projects");
        }
    }
}

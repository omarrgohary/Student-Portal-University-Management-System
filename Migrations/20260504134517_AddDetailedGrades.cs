using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_Eng.Migrations
{
    /// <inheritdoc />
    public partial class AddDetailedGrades : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Final",
                table: "Enrollments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Prefinal",
                table: "Enrollments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Seventh",
                table: "Enrollments",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Twelfth",
                table: "Enrollments",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Final",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "Prefinal",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "Seventh",
                table: "Enrollments");

            migrationBuilder.DropColumn(
                name: "Twelfth",
                table: "Enrollments");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Web_Eng.Migrations
{
    /// <inheritdoc />
    public partial class AddGradeConfirmation : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsGradeConfirmed",
                table: "Enrollments",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsGradeConfirmed",
                table: "Enrollments");
        }
    }
}

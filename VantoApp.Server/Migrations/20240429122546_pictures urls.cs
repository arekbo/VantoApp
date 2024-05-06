using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace VantoApp.Server.Migrations
{
    /// <inheritdoc />
    public partial class picturesurls : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PictureLargeUrl",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PictureMediumUrl",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "PictureThumbnailUrl",
                table: "Users",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PictureLargeUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PictureMediumUrl",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PictureThumbnailUrl",
                table: "Users");
        }
    }
}

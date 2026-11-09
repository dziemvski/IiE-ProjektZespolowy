using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PodrozeMaleIDuze.Migrations
{
    /// <inheritdoc />
    public partial class FixTableNamesAndPricePrecision : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Place_AspNetUsers_CreatedByUserId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_Place_Cities_CityId",
                table: "Place");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaceImage_Place_PlaceId",
                table: "PlaceImage");

            migrationBuilder.DropForeignKey(
                name: "FK_Promotion_Place_PlaceId",
                table: "Promotion");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedPlace_AspNetUsers_UserId",
                table: "SavedPlace");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedPlace_Place_PlaceId",
                table: "SavedPlace");

            migrationBuilder.DropForeignKey(
                name: "FK_Trip_AspNetUsers_UserId",
                table: "Trip");

            migrationBuilder.DropForeignKey(
                name: "FK_TripPlace_Place_PlaceId",
                table: "TripPlace");

            migrationBuilder.DropForeignKey(
                name: "FK_TripPlace_Trip_TripId",
                table: "TripPlace");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TripPlace",
                table: "TripPlace");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Trip",
                table: "Trip");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavedPlace",
                table: "SavedPlace");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Promotion",
                table: "Promotion");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlaceImage",
                table: "PlaceImage");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Place",
                table: "Place");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Category",
                table: "Category");

            migrationBuilder.RenameTable(
                name: "TripPlace",
                newName: "TripPlaces");

            migrationBuilder.RenameTable(
                name: "Trip",
                newName: "Trips");

            migrationBuilder.RenameTable(
                name: "SavedPlace",
                newName: "SavedPlaces");

            migrationBuilder.RenameTable(
                name: "Promotion",
                newName: "Promotions");

            migrationBuilder.RenameTable(
                name: "PlaceImage",
                newName: "PlaceImages");

            migrationBuilder.RenameTable(
                name: "Place",
                newName: "Places");

            migrationBuilder.RenameTable(
                name: "Category",
                newName: "Categories");

            migrationBuilder.RenameIndex(
                name: "IX_TripPlace_PlaceId",
                table: "TripPlaces",
                newName: "IX_TripPlaces_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Trip_UserId",
                table: "Trips",
                newName: "IX_Trips_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_SavedPlace_PlaceId",
                table: "SavedPlaces",
                newName: "IX_SavedPlaces_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Promotion_PlaceId",
                table: "Promotions",
                newName: "IX_Promotions_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_PlaceImage_PlaceId",
                table: "PlaceImages",
                newName: "IX_PlaceImages_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Place_CreatedByUserId",
                table: "Places",
                newName: "IX_Places_CreatedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Place_CityId",
                table: "Places",
                newName: "IX_Places_CityId");

            migrationBuilder.RenameIndex(
                name: "IX_Place_CategoryId",
                table: "Places",
                newName: "IX_Places_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Category_Name",
                table: "Categories",
                newName: "IX_Categories_Name");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Promotions",
                type: "numeric(10,2)",
                precision: 10,
                scale: 2,
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TripPlaces",
                table: "TripPlaces",
                columns: new[] { "TripId", "PlaceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Trips",
                table: "Trips",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavedPlaces",
                table: "SavedPlaces",
                columns: new[] { "UserId", "PlaceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Promotions",
                table: "Promotions",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlaceImages",
                table: "PlaceImages",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Places",
                table: "Places",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Categories",
                table: "Categories",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceImages_Places_PlaceId",
                table: "PlaceImages",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Places_AspNetUsers_CreatedByUserId",
                table: "Places",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Categories_CategoryId",
                table: "Places",
                column: "CategoryId",
                principalTable: "Categories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Places_Cities_CityId",
                table: "Places",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Promotions_Places_PlaceId",
                table: "Promotions",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedPlaces_AspNetUsers_UserId",
                table: "SavedPlaces",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedPlaces_Places_PlaceId",
                table: "SavedPlaces",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripPlaces_Places_PlaceId",
                table: "TripPlaces",
                column: "PlaceId",
                principalTable: "Places",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripPlaces_Trips_TripId",
                table: "TripPlaces",
                column: "TripId",
                principalTable: "Trips",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trips_AspNetUsers_UserId",
                table: "Trips",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaceImages_Places_PlaceId",
                table: "PlaceImages");

            migrationBuilder.DropForeignKey(
                name: "FK_Places_AspNetUsers_CreatedByUserId",
                table: "Places");

            migrationBuilder.DropForeignKey(
                name: "FK_Places_Categories_CategoryId",
                table: "Places");

            migrationBuilder.DropForeignKey(
                name: "FK_Places_Cities_CityId",
                table: "Places");

            migrationBuilder.DropForeignKey(
                name: "FK_Promotions_Places_PlaceId",
                table: "Promotions");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedPlaces_AspNetUsers_UserId",
                table: "SavedPlaces");

            migrationBuilder.DropForeignKey(
                name: "FK_SavedPlaces_Places_PlaceId",
                table: "SavedPlaces");

            migrationBuilder.DropForeignKey(
                name: "FK_TripPlaces_Places_PlaceId",
                table: "TripPlaces");

            migrationBuilder.DropForeignKey(
                name: "FK_TripPlaces_Trips_TripId",
                table: "TripPlaces");

            migrationBuilder.DropForeignKey(
                name: "FK_Trips_AspNetUsers_UserId",
                table: "Trips");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Trips",
                table: "Trips");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TripPlaces",
                table: "TripPlaces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavedPlaces",
                table: "SavedPlaces");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Promotions",
                table: "Promotions");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Places",
                table: "Places");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlaceImages",
                table: "PlaceImages");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Categories",
                table: "Categories");

            migrationBuilder.RenameTable(
                name: "Trips",
                newName: "Trip");

            migrationBuilder.RenameTable(
                name: "TripPlaces",
                newName: "TripPlace");

            migrationBuilder.RenameTable(
                name: "SavedPlaces",
                newName: "SavedPlace");

            migrationBuilder.RenameTable(
                name: "Promotions",
                newName: "Promotion");

            migrationBuilder.RenameTable(
                name: "Places",
                newName: "Place");

            migrationBuilder.RenameTable(
                name: "PlaceImages",
                newName: "PlaceImage");

            migrationBuilder.RenameTable(
                name: "Categories",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_Trips_UserId",
                table: "Trip",
                newName: "IX_Trip_UserId");

            migrationBuilder.RenameIndex(
                name: "IX_TripPlaces_PlaceId",
                table: "TripPlace",
                newName: "IX_TripPlace_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_SavedPlaces_PlaceId",
                table: "SavedPlace",
                newName: "IX_SavedPlace_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Promotions_PlaceId",
                table: "Promotion",
                newName: "IX_Promotion_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Places_CreatedByUserId",
                table: "Place",
                newName: "IX_Place_CreatedByUserId");

            migrationBuilder.RenameIndex(
                name: "IX_Places_CityId",
                table: "Place",
                newName: "IX_Place_CityId");

            migrationBuilder.RenameIndex(
                name: "IX_Places_CategoryId",
                table: "Place",
                newName: "IX_Place_CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_PlaceImages_PlaceId",
                table: "PlaceImage",
                newName: "IX_PlaceImage_PlaceId");

            migrationBuilder.RenameIndex(
                name: "IX_Categories_Name",
                table: "Category",
                newName: "IX_Category_Name");

            migrationBuilder.AlterColumn<decimal>(
                name: "Price",
                table: "Promotion",
                type: "numeric",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "numeric(10,2)",
                oldPrecision: 10,
                oldScale: 2);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Trip",
                table: "Trip",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TripPlace",
                table: "TripPlace",
                columns: new[] { "TripId", "PlaceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavedPlace",
                table: "SavedPlace",
                columns: new[] { "UserId", "PlaceId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_Promotion",
                table: "Promotion",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Place",
                table: "Place",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlaceImage",
                table: "PlaceImage",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Category",
                table: "Category",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Place_AspNetUsers_CreatedByUserId",
                table: "Place",
                column: "CreatedByUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_Category_CategoryId",
                table: "Place",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Place_Cities_CityId",
                table: "Place",
                column: "CityId",
                principalTable: "Cities",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceImage_Place_PlaceId",
                table: "PlaceImage",
                column: "PlaceId",
                principalTable: "Place",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Promotion_Place_PlaceId",
                table: "Promotion",
                column: "PlaceId",
                principalTable: "Place",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedPlace_AspNetUsers_UserId",
                table: "SavedPlace",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SavedPlace_Place_PlaceId",
                table: "SavedPlace",
                column: "PlaceId",
                principalTable: "Place",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Trip_AspNetUsers_UserId",
                table: "Trip",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripPlace_Place_PlaceId",
                table: "TripPlace",
                column: "PlaceId",
                principalTable: "Place",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TripPlace_Trip_TripId",
                table: "TripPlace",
                column: "TripId",
                principalTable: "Trip",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

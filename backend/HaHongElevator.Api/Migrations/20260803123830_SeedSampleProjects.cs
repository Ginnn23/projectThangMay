using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HaHongElevator.Api.Migrations
{
    /// <inheritdoc />
    public partial class SeedSampleProjects : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                INSERT INTO "Projects" ("Name", "Slug", "Category", "Location", "Description", "PriceRange", "ImageUrl", "CompletedAt", "IsFeatured", "IsActive", "CreatedAt")
                SELECT 'Thang máy gia đình 4 tầng - Nhà phố hiện đại', 'thang-may-gia-dinh-4-tang-nha-pho', 'gia-dinh', 'Nhà phố đô thị',
                       'Phương án thang máy gia đình tải trọng khoảng 350-450kg, phù hợp nhà phố 4 tầng cần tối ưu diện tích, cabin inox kính sáng và vận hành êm cho nhu cầu di chuyển hằng ngày.',
                       'Khoảng 320 - 520 triệu VNĐ', 'https://source.unsplash.com/1200x900/?home,elevator,interior', TIMESTAMPTZ '2026-03-18 00:00:00Z', TRUE, TRUE, NOW() AT TIME ZONE 'UTC'
                WHERE NOT EXISTS (SELECT 1 FROM "Projects" WHERE "Slug" = 'thang-may-gia-dinh-4-tang-nha-pho');

                INSERT INTO "Projects" ("Name", "Slug", "Category", "Location", "Description", "PriceRange", "ImageUrl", "CompletedAt", "IsFeatured", "IsActive", "CreatedAt")
                SELECT 'Thang máy văn phòng - Sảnh thương mại', 'thang-may-van-phong-sanh-thuong-mai', 'van-phong', 'Tòa nhà văn phòng',
                       'Giải pháp thang máy tải khách cho khu văn phòng, ưu tiên lưu lượng di chuyển ổn định, cửa tầng inox, bảng gọi tầng dễ sử dụng và thiết kế sảnh chuyên nghiệp.',
                       'Khoảng 550 triệu - 1,2 tỷ VNĐ', 'https://source.unsplash.com/1200x900/?elevator,lobby,office', TIMESTAMPTZ '2026-04-12 00:00:00Z', TRUE, TRUE, NOW() AT TIME ZONE 'UTC'
                WHERE NOT EXISTS (SELECT 1 FROM "Projects" WHERE "Slug" = 'thang-may-van-phong-sanh-thuong-mai');

                INSERT INTO "Projects" ("Name", "Slug", "Category", "Location", "Description", "PriceRange", "ImageUrl", "CompletedAt", "IsFeatured", "IsActive", "CreatedAt")
                SELECT 'Thang máy tải hàng - Kho vận nhỏ', 'thang-may-tai-hang-kho-van-nho', 'tai-hang', 'Kho hàng và xưởng sản xuất',
                       'Cấu hình thang tải hàng cho kho vận quy mô nhỏ, tập trung vào độ bền, sàn cabin chịu tải tốt, cửa mở thuận tiện và quy trình bảo trì dễ kiểm soát.',
                       'Khoảng 450 - 900 triệu VNĐ', 'https://source.unsplash.com/1200x900/?warehouse,industrial,elevator', TIMESTAMPTZ '2026-05-06 00:00:00Z', FALSE, TRUE, NOW() AT TIME ZONE 'UTC'
                WHERE NOT EXISTS (SELECT 1 FROM "Projects" WHERE "Slug" = 'thang-may-tai-hang-kho-van-nho');

                INSERT INTO "Projects" ("Name", "Slug", "Category", "Location", "Description", "PriceRange", "ImageUrl", "CompletedAt", "IsFeatured", "IsActive", "CreatedAt")
                SELECT 'Cải tạo cabin thang máy inox champagne', 'cai-tao-cabin-thang-may-inox-champagne', 'noi-that-cabin', 'Khách sạn và căn hộ dịch vụ',
                       'Gói cải tạo nội thất cabin với vật liệu inox champagne, đèn trần sáng dịu và tay vịn gọn gàng, phù hợp công trình muốn nâng cấp hình ảnh mà không thay đổi toàn bộ hệ thống.',
                       'Khoảng 80 - 180 triệu VNĐ', 'https://source.unsplash.com/1200x900/?elevator,interior,luxury', TIMESTAMPTZ '2026-06-22 00:00:00Z', FALSE, TRUE, NOW() AT TIME ZONE 'UTC'
                WHERE NOT EXISTS (SELECT 1 FROM "Projects" WHERE "Slug" = 'cai-tao-cabin-thang-may-inox-champagne');
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                DELETE FROM "Projects"
                WHERE "Slug" IN (
                    'thang-may-gia-dinh-4-tang-nha-pho',
                    'thang-may-van-phong-sanh-thuong-mai',
                    'thang-may-tai-hang-kho-van-nho',
                    'cai-tao-cabin-thang-may-inox-champagne'
                );
                """);
        }
    }
}

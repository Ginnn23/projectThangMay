using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace HaHongElevator.Api.Migrations
{
    /// <inheritdoc />
    public partial class UpdateProjectAndServiceCatalog : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                UPDATE "Projects"
                SET "IsActive" = FALSE
                WHERE "Name" IN ('1', 'string')
                   OR "Description" = 'string'
                   OR "ImageUrl" IN ('1', 'string')
                   OR "ImageUrl" LIKE 'https://source.unsplash.com%';

                UPDATE "ElevatorServices"
                SET "IsActive" = FALSE
                WHERE "Name" IN ('khai', 'string', '1')
                   OR "Description" = 'string'
                   OR "ShortDescription" = 'string'
                   OR "ImageUrl" IN ('1', 'string')
                   OR "ImageUrl" LIKE 'https://source.unsplash.com%';

                INSERT INTO "Projects" ("Name", "Slug", "Category", "Location", "Description", "PriceRange", "ImageUrl", "CompletedAt", "IsFeatured", "IsActive", "CreatedAt")
                VALUES
                    ('Thang máy gia đình', 'thang-may-gia-dinh', 'gia-dinh', 'Nhà phố và biệt thự', 'Giải pháp thang máy nhỏ gọn cho nhà ở, ưu tiên an toàn, tiết kiệm diện tích và vận hành êm.', 'Khoảng 320 - 520 triệu VNĐ', NULL, NOW() AT TIME ZONE 'UTC', TRUE, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Thang máy văn phòng', 'thang-may-van-phong', 'van-phong', 'Tòa nhà văn phòng', 'Cấu hình thang máy tải khách cho văn phòng, phù hợp tần suất di chuyển ổn định hằng ngày.', 'Khoảng 550 triệu - 1,2 tỷ VNĐ', NULL, NOW() AT TIME ZONE 'UTC', TRUE, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Thang máy doanh nghiệp', 'thang-may-doanh-nghiep', 'doanh-nghiep', 'Nhà xưởng và trụ sở doanh nghiệp', 'Giải pháp thang máy cho doanh nghiệp, chú trọng độ bền, tải trọng và khả năng bảo trì thuận tiện.', 'Liên hệ để nhận báo giá', NULL, NOW() AT TIME ZONE 'UTC', FALSE, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Thang máy khách sạn', 'thang-may-khach-san', 'khach-san', 'Khách sạn và căn hộ dịch vụ', 'Thiết kế thang máy hài hòa không gian lưu trú, vận hành êm và nâng trải nghiệm khách hàng.', 'Khoảng 650 triệu - 1,5 tỷ VNĐ', NULL, NOW() AT TIME ZONE 'UTC', FALSE, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Cửa sập', 'cua-sap', 'cua-sap', 'Công trình dân dụng và kho hàng', 'Hạng mục cửa sập hỗ trợ vận chuyển, bảo vệ khu vực kỹ thuật và tối ưu lối tiếp cận thiết bị.', 'Liên hệ để nhận báo giá', NULL, NOW() AT TIME ZONE 'UTC', FALSE, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Thang cuốn', 'thang-cuon', 'thang-cuon', 'Trung tâm thương mại và tòa nhà công cộng', 'Giải pháp thang cuốn cho khu vực có lưu lượng di chuyển cao, cần vận hành ổn định và an toàn.', 'Liên hệ để nhận báo giá', NULL, NOW() AT TIME ZONE 'UTC', FALSE, TRUE, NOW() AT TIME ZONE 'UTC')
                ON CONFLICT ("Slug") DO UPDATE SET
                    "Name" = EXCLUDED."Name",
                    "Category" = EXCLUDED."Category",
                    "Location" = EXCLUDED."Location",
                    "Description" = EXCLUDED."Description",
                    "PriceRange" = EXCLUDED."PriceRange",
                    "IsActive" = TRUE,
                    "UpdatedAt" = NOW() AT TIME ZONE 'UTC';

                INSERT INTO "ElevatorServices" ("Name", "Slug", "ShortDescription", "Description", "ImageUrl", "Icon", "DisplayOrder", "IsActive", "CreatedAt")
                VALUES
                    ('Dịch vụ tư vấn', 'tu-van', 'Tư vấn giải pháp thang máy phù hợp nhu cầu.', 'Tiếp nhận nhu cầu, khảo sát thông tin ban đầu và đề xuất giải pháp thang máy phù hợp với công trình.', NULL, 'bi-chat-dots', 1, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Dịch vụ lắp đặt', 'lap-dat', 'Lắp đặt thang máy theo quy trình rõ ràng.', 'Triển khai lắp đặt thang máy cho nhà ở, văn phòng, khách sạn và công trình thương mại theo quy trình rõ ràng.', NULL, 'bi-building-gear', 2, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Dịch vụ bảo trì', 'bao-tri', 'Bảo trì định kỳ để vận hành ổn định.', 'Kiểm tra định kỳ, vệ sinh thiết bị, theo dõi vận hành và hỗ trợ kỹ thuật để thang máy hoạt động ổn định.', NULL, 'bi-shield-check', 3, TRUE, NOW() AT TIME ZONE 'UTC'),
                    ('Dịch vụ sửa chữa', 'sua-chua', 'Sửa chữa và xử lý sự cố thang máy.', 'Xử lý sự cố, thay thế linh kiện phù hợp và hiệu chỉnh hệ thống khi thang máy có dấu hiệu bất thường.', NULL, 'bi-tools', 4, TRUE, NOW() AT TIME ZONE 'UTC')
                ON CONFLICT ("Slug") DO UPDATE SET
                    "Name" = EXCLUDED."Name",
                    "ShortDescription" = EXCLUDED."ShortDescription",
                    "Description" = EXCLUDED."Description",
                    "Icon" = EXCLUDED."Icon",
                    "DisplayOrder" = EXCLUDED."DisplayOrder",
                    "IsActive" = TRUE,
                    "UpdatedAt" = NOW() AT TIME ZONE 'UTC';
                """);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql("""
                DELETE FROM "Projects"
                WHERE "Slug" IN ('thang-may-gia-dinh', 'thang-may-van-phong', 'thang-may-doanh-nghiep', 'thang-may-khach-san', 'cua-sap', 'thang-cuon');

                DELETE FROM "ElevatorServices"
                WHERE "Slug" IN ('tu-van', 'lap-dat', 'bao-tri', 'sua-chua');
                """);
        }
    }
}

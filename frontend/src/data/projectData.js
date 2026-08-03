import { API_BASE_URL } from "../api/client";
import anhCabinInox01 from "../assets/images/du-an/cabin-thang-may-inox-01.webp";
import anhGiaDinh01 from "../assets/images/du-an/thang-may-gia-dinh-01.webp";
import anhGiaDinh02 from "../assets/images/du-an/thang-may-gia-dinh-02.webp";
import anhTaiHang01 from "../assets/images/du-an/thang-may-tai-hang-01.webp";
import anhVanPhong01 from "../assets/images/du-an/thang-may-van-phong-01.webp";
import anhVanPhong02 from "../assets/images/du-an/thang-may-van-phong-02.webp";

export const anhDuAnMacDinh = [anhGiaDinh01, anhVanPhong01, anhTaiHang01, anhVanPhong02, anhCabinInox01, anhGiaDinh02];

export const duAnMau = [
  {
    id: "mau-1",
    slug: "thang-may-gia-dinh",
    name: "Thang máy gia đình",
    category: "gia-dinh",
    location: "Nhà phố và biệt thự",
    description: "Giải pháp thang máy nhỏ gọn cho nhà ở, ưu tiên an toàn, tiết kiệm diện tích và vận hành êm.",
    priceRange: "Khoảng 320 - 520 triệu VNĐ",
    imageUrl: anhGiaDinh01,
    galleryImageUrls: [anhGiaDinh01, anhGiaDinh02, anhVanPhong02],
    isSample: true,
  },
  {
    id: "mau-2",
    slug: "thang-may-van-phong",
    name: "Thang máy văn phòng",
    category: "van-phong",
    location: "Tòa nhà văn phòng",
    description: "Cấu hình thang máy tải khách cho văn phòng, phù hợp tần suất di chuyển ổn định hằng ngày.",
    priceRange: "Khoảng 550 triệu - 1,2 tỷ VNĐ",
    imageUrl: anhVanPhong01,
    galleryImageUrls: [anhVanPhong01, anhVanPhong02, anhCabinInox01],
    isSample: true,
  },
  {
    id: "mau-3",
    slug: "thang-may-doanh-nghiep",
    name: "Thang máy doanh nghiệp",
    category: "doanh-nghiep",
    location: "Nhà xưởng và trụ sở doanh nghiệp",
    description: "Giải pháp thang máy cho doanh nghiệp, chú trọng độ bền, tải trọng và khả năng bảo trì thuận tiện.",
    priceRange: "Liên hệ để nhận báo giá",
    imageUrl: anhTaiHang01,
    galleryImageUrls: [anhTaiHang01, anhVanPhong01, anhCabinInox01],
    isSample: true,
  },
  {
    id: "mau-4",
    slug: "thang-may-khach-san",
    name: "Thang máy khách sạn",
    category: "khach-san",
    location: "Khách sạn và căn hộ dịch vụ",
    description: "Thiết kế thang máy hài hòa không gian lưu trú, vận hành êm và nâng trải nghiệm khách hàng.",
    priceRange: "Khoảng 650 triệu - 1,5 tỷ VNĐ",
    imageUrl: anhVanPhong02,
    galleryImageUrls: [anhVanPhong02, anhGiaDinh02, anhVanPhong01],
    isSample: true,
  },
  {
    id: "mau-5",
    slug: "cua-sap",
    name: "Cửa sập",
    category: "cua-sap",
    location: "Công trình dân dụng và kho hàng",
    description: "Hạng mục cửa sập hỗ trợ vận chuyển, bảo vệ khu vực kỹ thuật và tối ưu lối tiếp cận thiết bị.",
    priceRange: "Liên hệ để nhận báo giá",
    imageUrl: anhCabinInox01,
    galleryImageUrls: [anhCabinInox01, anhTaiHang01, anhGiaDinh01],
    isSample: true,
  },
  {
    id: "mau-6",
    slug: "thang-cuon",
    name: "Thang cuốn",
    category: "thang-cuon",
    location: "Trung tâm thương mại và tòa nhà công cộng",
    description: "Giải pháp thang cuốn cho khu vực có lưu lượng di chuyển cao, cần vận hành ổn định và an toàn.",
    priceRange: "Liên hệ để nhận báo giá",
    imageUrl: anhGiaDinh02,
    galleryImageUrls: [anhGiaDinh02, anhVanPhong02, anhVanPhong01],
    isSample: true,
  },
];

export function taoUrlAnhApi(imageUrl) {
  if (!imageUrl) return "";
  if (/source\.unsplash\.com/i.test(imageUrl)) return "";
  if (/^https?:\/\//i.test(imageUrl) || imageUrl.startsWith("data:") || imageUrl.startsWith("/src/") || imageUrl.startsWith("/assets/")) return imageUrl;
  if (!imageUrl.startsWith("/") || !/\.(jpg|jpeg|png|webp)$/i.test(imageUrl)) return "";
  return `${API_BASE_URL.replace(/\/api$/, "")}${imageUrl}`;
}

export function chuanHoaDuAn(item, index = 0) {
  const imageUrl = taoUrlAnhApi(item.imageUrl) || anhDuAnMacDinh[index % anhDuAnMacDinh.length];
  const galleryImageUrls = Array.isArray(item.galleryImageUrls)
    ? item.galleryImageUrls.map(taoUrlAnhApi).filter(Boolean)
    : [];

  return {
    ...item,
    imageUrl,
    galleryImageUrls: [imageUrl, ...galleryImageUrls.filter((url) => url !== imageUrl)],
    priceRange: item.priceRange || "Liên hệ để nhận báo giá",
  };
}

export const phanLoaiDuAn = [
  { label: "Thang máy gia đình", value: "gia-dinh" },
  { label: "Thang máy văn phòng", value: "van-phong" },
  { label: "Thang máy doanh nghiệp", value: "doanh-nghiep" },
  { label: "Thang máy khách sạn", value: "khach-san" },
  { label: "Cửa sập", value: "cua-sap" },
  { label: "Thang cuốn", value: "thang-cuon" },
];

export const boLocDuAn = [
  { label: "Tất cả", value: "tat-ca" },
  ...phanLoaiDuAn,
];

const phanLoaiTuCu = {
  "thang may gia dinh": "gia-dinh",
  "gia dinh": "gia-dinh",
  "nha o gia dinh": "gia-dinh",
  "nha pho": "gia-dinh",
  "biet thu": "gia-dinh",
  "thang may van phong": "van-phong",
  "van phong": "van-phong",
  "toa nha van phong": "van-phong",
  "thang may doanh nghiep": "doanh-nghiep",
  "doanh nghiep": "doanh-nghiep",
  "cong trinh thuong mai": "doanh-nghiep",
  "thuong mai": "doanh-nghiep",
  "tai hang": "doanh-nghiep",
  "thang may khach san": "khach-san",
  "khach san": "khach-san",
  "co so luu tru": "khach-san",
  "cua sap": "cua-sap",
  "cua cuon": "cua-sap",
  "thang cuon": "thang-cuon",
};

export function boDauTiengViet(value = "") {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();
}

export function chuanHoaPhanLoaiDuAn(value = "") {
  const giaTri = String(value || "").trim();
  if (!giaTri) return "";

  const key = boDauTiengViet(giaTri);
  const phanLoaiCoSan = phanLoaiDuAn.find((item) => item.value === giaTri || boDauTiengViet(item.label) === key);

  return phanLoaiCoSan?.value || phanLoaiTuCu[key] || giaTri;
}

export function layNhanPhanLoaiDuAn(value = "") {
  const slug = chuanHoaPhanLoaiDuAn(value);
  return phanLoaiDuAn.find((item) => item.value === slug)?.label || value || "Chưa phân loại";
}

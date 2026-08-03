import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { apiClient } from "../api/client";
import anhVanPhong02 from "../assets/images/du-an/thang-may-van-phong-02.webp";
import { soDienThoaiCongTy, soDienThoaiLienKet } from "../data/contactInfo";
import { chuanHoaDuAn, duAnMau } from "../data/projectData";

const boLocDuAn = [
  { label: "Tất cả", value: "tat-ca" },
  { label: "Thang máy gia đình", value: "gia-dinh" },
  { label: "Thang máy văn phòng", value: "van-phong" },
  { label: "Thang máy doanh nghiệp", value: "doanh-nghiep" },
  { label: "Thang máy khách sạn", value: "khach-san" },
  { label: "Cửa sập", value: "cua-sap" },
  { label: "Thang cuốn", value: "thang-cuon" },
];

function SectionTitle({ eyebrow, title, description, center = false }) {
  return (
    <div className={`about-section-title${center ? " text-center mx-auto" : ""}`}>
      <span className="section-eyebrow">{eyebrow}</span>
      <h2 className="section-heading">{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function BannerDuAn() {
  return (
    <section className="about-banner project-banner" style={{ backgroundImage: `linear-gradient(90deg, rgba(5, 14, 28, 0.95), rgba(5, 14, 28, 0.68)), url(${anhVanPhong02})` }}>
      <div className="site-container">
        <nav className="about-breadcrumb" aria-label="breadcrumb">
          <a href="/">Trang chủ</a>
          <span>/</span>
          <span>Dự án</span>
        </nav>
        <span className="section-eyebrow">THƯ VIỆN DỰ ÁN</span>
        <h1>Giải pháp cho từng không gian</h1>
        <p>Tham khảo các dòng thang máy và hạng mục kỹ thuật phù hợp với nhà ở, văn phòng, doanh nghiệp, khách sạn và công trình thương mại.</p>
      </div>
    </section>
  );
}

function TheDuAn({ duAn }) {
  const [anhDangDung, setAnhDangDung] = useState(duAn.imageUrl);

  return (
    <article className="project-gallery-card" data-aos="fade-up">
      <Link to={`/du-an/${duAn.slug}`} target="_blank" rel="noopener noreferrer" className="project-gallery-image">
        <img src={anhDangDung} alt={duAn.name} loading="lazy" width="960" height="720" onError={() => setAnhDangDung(chuanHoaDuAn(duAn).imageUrl)} />
        <div className="project-gallery-overlay"></div>
        <span className="project-reference-badge">{duAn.isSample ? "Dữ liệu tham khảo" : "Dự án Hà Hồng"}</span>
      </Link>
      <div className="project-gallery-content">
        <span>{duAn.category}</span>
        <h3>{duAn.name}</h3>
        <p>{duAn.description}</p>
        <strong className="project-card-price">{duAn.priceRange}</strong>
        <Link className="project-view-link" to={`/du-an/${duAn.slug}`} target="_blank" rel="noopener noreferrer">
          Xem chi tiết
          <i className="bi bi-arrow-up-right ms-2"></i>
        </Link>
      </div>
    </article>
  );
}

function DuAn() {
  const [danhMucDangChon, setDanhMucDangChon] = useState("tat-ca");
  const [duAnHienThi, setDuAnHienThi] = useState(duAnMau.map(chuanHoaDuAn));

  useEffect(() => {
    let dangHoatDong = true;

    const taiDuAn = async () => {
      try {
        const { data } = await apiClient.get("/projects");
        if (dangHoatDong && data.length) {
          setDuAnHienThi(data.map(chuanHoaDuAn));
        }
      } catch {
        // Giữ dữ liệu mẫu nếu API chưa sẵn sàng.
      }
    };

    taiDuAn();

    return () => {
      dangHoatDong = false;
    };
  }, []);

  const danhSachDaLoc = danhMucDangChon === "tat-ca"
    ? duAnHienThi
    : duAnHienThi.filter((duAn) => duAn.category === danhMucDangChon);

  return (
    <main>
      <BannerDuAn />
      <section className="project-filter-section">
        <div className="site-container">
          <SectionTitle
            center
            eyebrow="DANH SÁCH THAM KHẢO"
            title="Mẫu công trình thang máy"
            description="Các mức giá trên website là khoảng tham khảo, chi phí thực tế phụ thuộc tải trọng, số điểm dừng, nội thất cabin và hiện trạng công trình."
          />
          <div className="project-filter-bar" aria-label="Bộ lọc dự án">
            {boLocDuAn.map((item) => (
              <button className={danhMucDangChon === item.value ? "active" : ""} key={item.value} type="button" onClick={() => setDanhMucDangChon(item.value)}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </section>
      <section className="project-gallery-section">
        <div className="site-container">
          <div className="row g-4 project-gallery-grid">
            {danhSachDaLoc.map((duAn) => (
              <div className="col-md-6 col-xl-4" key={duAn.id}>
                <TheDuAn duAn={duAn} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="about-cta-section">
        <div className="site-container">
          <div className="about-cta-content" data-aos="fade-up">
            <div>
              <span className="section-eyebrow">TƯ VẤN CÔNG TRÌNH</span>
              <h2>Bạn đang chuẩn bị một công trình?</h2>
              <p>Hãy chia sẻ nhu cầu để Hà Hồng tư vấn phương án thang máy phù hợp và báo giá chi tiết hơn.</p>
            </div>
            <div className="about-cta-actions">
              <a href="/lien-he" className="btn hero-primary-button">Yêu cầu tư vấn<i className="bi bi-arrow-right ms-2"></i></a>
              <a href={`tel:${soDienThoaiLienKet}`} className="btn about-call-button">Gọi ngay: {soDienThoaiCongTy}</a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default DuAn;

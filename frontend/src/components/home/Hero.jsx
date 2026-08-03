import HeroGallery from "./HeroGallery";
import Stats from "./Stats";

function Hero() {
  return (
    <section id="trang-chu" className="hero-section">
      <div className="site-container hero-container">
        <div className="hero-grid">
          <div className="hero-content" data-aos="fade-right">
            <span className="hero-eyebrow">HÀ HỒNG ELEVATOR</span>
            <h1>
              <span className="hero-title-line">Giải pháp thang máy</span>
              <span className="hero-title-line hero-title-highlight">an toàn, tinh gọn</span>
              <span className="hero-title-line hero-title-highlight">và hiện đại</span>
            </h1>
            <p>
              Tư vấn, lắp đặt, bảo trì và nâng cấp thang máy cho nhà ở, văn phòng và công trình dân dụng với quy trình rõ ràng,
              kỹ thuật chắc chắn và thẩm mỹ chuyên nghiệp.
            </p>
            <div className="hero-actions">
              <a href="/lien-he" className="btn hero-primary-button">
                Yêu cầu báo giá
                <i className="bi bi-arrow-right ms-2"></i>
              </a>
              <a href="/du-an" className="btn hero-outline-button">
                Xem dự án
                <i className="bi bi-arrow-up-right ms-2"></i>
              </a>
            </div>
            <Stats />
          </div>

          <HeroGallery />
        </div>
      </div>
    </section>
  );
}

export default Hero;

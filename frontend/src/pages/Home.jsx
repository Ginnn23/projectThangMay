import heroImage from "../assets/images/hero-elevator.jpg";

const services = [
  {
    icon: "bi-building-gear",
    number: "01",
    title: "Lắp đặt thang máy",
    description:
      "Khảo sát, tư vấn, thiết kế và thi công hệ thống thang máy phù hợp với từng công trình.",
  },
  {
    icon: "bi-tools",
    number: "02",
    title: "Bảo trì định kỳ",
    description:
      "Kiểm tra và bảo dưỡng định kỳ nhằm duy trì khả năng vận hành ổn định và an toàn.",
  },
  {
    icon: "bi-wrench-adjustable-circle",
    number: "03",
    title: "Sửa chữa và nâng cấp",
    description:
      "Tiếp nhận sự cố, thay thế linh kiện và nâng cấp hệ thống thang máy đang sử dụng.",
  },
];

const advantages = [
  {
    icon: "bi-shield-check",
    title: "An toàn",
    description:
      "Kiểm tra kỹ thuật cẩn thận trong từng giai đoạn thi công và vận hành.",
  },
  {
    icon: "bi-people",
    title: "Đội ngũ chuyên môn",
    description:
      "Nhân sự lắp đặt và bảo trì có kinh nghiệm thực tế tại nhiều công trình.",
  },
  {
    icon: "bi-clock-history",
    title: "Hỗ trợ nhanh chóng",
    description:
      "Tiếp nhận yêu cầu và phối hợp xử lý các vấn đề kỹ thuật kịp thời.",
  },
  {
    icon: "bi-gear-wide-connected",
    title: "Giải pháp phù hợp",
    description:
      "Tư vấn cấu hình dựa trên nhu cầu sử dụng và đặc điểm công trình.",
  },
];

const projects = [
  {
    title: "Thang máy nhà phố",
    category: "THANG MÁY GIA ĐÌNH",
    location: "TP. Hồ Chí Minh",
  },
  {
    title: "Tòa nhà văn phòng",
    category: "THANG MÁY TẢI KHÁCH",
    location: "Khu vực phía Nam",
  },
  {
    title: "Cải tạo hệ thống cũ",
    category: "BẢO TRÌ VÀ NÂNG CẤP",
    location: "TP. Hồ Chí Minh",
  },
];

function Home() {
  return (
    <main>
      {/* Hero */}
      <section
        id="trang-chu"
        className="hero-section"
        style={{
          backgroundImage: `
            linear-gradient(
              90deg,
              rgba(6, 18, 35, 0.96) 0%,
              rgba(6, 18, 35, 0.82) 46%,
              rgba(6, 18, 35, 0.2) 100%
            ),
            url(${heroImage})
          `,
        }}
      >
        <div className="container hero-container">
          <div className="hero-content" data-aos="fade-right">
            <span className="hero-eyebrow">HÀ HỒNG ELEVATOR</span>

            <h1>
              Giải pháp thang máy
              <span> an toàn và bền vững</span>
            </h1>

            <p>
              Chuyên tư vấn, lắp đặt, bảo trì và sửa chữa thang máy cho nhà ở,
              văn phòng và các công trình dân dụng.
            </p>

            <div className="hero-actions">
              <a href="#dich-vu" className="btn hero-primary-button">
                Khám phá dịch vụ
                <i className="bi bi-arrow-right ms-2"></i>
              </a>

              <a href="#lien-he" className="btn hero-outline-button">
                Nhận tư vấn
              </a>
            </div>
          </div>

          <div
            className="hero-information"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <div>
              <strong>30+</strong>
              <span>Nhân sự lắp đặt</span>
            </div>

            <div>
              <strong>10+</strong>
              <span>Nhân sự bảo trì</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Hỗ trợ kỹ thuật</span>
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu */}
      <section className="company-section" id="gioi-thieu">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-lg-5" data-aos="fade-right">
              <div className="company-visual">
                <div className="company-visual-main">
                  <span>HÀ HỒNG</span>
                  <strong>ELEVATOR</strong>
                </div>

                <div className="company-experience">
                  <strong>UY TÍN</strong>
                  <span>Trong từng công trình</span>
                </div>
              </div>
            </div>

            <div className="col-lg-7" data-aos="fade-left">
              <span className="section-eyebrow">VỀ CHÚNG TÔI</span>

              <h2 className="section-heading">
                Đơn vị cung cấp giải pháp thang máy cho nhiều loại công trình
              </h2>

              <p className="section-description">
                Công ty Cổ phần Thương mại Dịch vụ Thang máy Hà Hồng hoạt động
                trong lĩnh vực tư vấn, lắp đặt, bảo trì và sửa chữa thang máy.
              </p>

              <p className="section-description">
                Công ty chú trọng đến chất lượng thi công, độ an toàn, khả năng
                vận hành ổn định và dịch vụ hỗ trợ sau khi bàn giao.
              </p>

              <div className="company-points">
                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Tư vấn theo đặc điểm công trình</span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Quy trình làm việc rõ ràng</span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Hỗ trợ kỹ thuật sau lắp đặt</span>
                </div>

                <div>
                  <i className="bi bi-check-circle-fill"></i>
                  <span>Bảo trì và kiểm tra định kỳ</span>
                </div>
              </div>

              <a href="#dich-vu" className="company-link">
                Tìm hiểu về doanh nghiệp
                <i className="bi bi-arrow-up-right ms-2"></i>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Dịch vụ */}
      <section className="services-section" id="dich-vu">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div>
              <span className="section-eyebrow">LĨNH VỰC HOẠT ĐỘNG</span>

              <h2 className="section-heading">Dịch vụ thang máy toàn diện</h2>
            </div>

            <p>
              Đồng hành từ giai đoạn khảo sát, tư vấn, thi công đến bảo trì và
              hỗ trợ trong quá trình vận hành.
            </p>
          </div>

          <div className="row g-4">
            {services.map((service, index) => (
              <div
                className="col-lg-4"
                key={service.title}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <article className="service-card">
                  <div className="service-number">{service.number}</div>

                  <div className="service-icon">
                    <i className={`bi ${service.icon}`}></i>
                  </div>

                  <h3>{service.title}</h3>

                  <p>{service.description}</p>

                  <a href="#lien-he">
                    Xem chi tiết
                    <i className="bi bi-arrow-right ms-2"></i>
                  </a>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Năng lực */}
      <section className="advantages-section">
        <div className="container">
          <div className="text-center advantages-title" data-aos="fade-up">
            <span className="section-eyebrow">NĂNG LỰC DOANH NGHIỆP</span>

            <h2 className="section-heading">
              Vì sao khách hàng lựa chọn Hà Hồng?
            </h2>
          </div>

          <div className="row g-4">
            {advantages.map((item, index) => (
              <div
                className="col-md-6 col-lg-3"
                key={item.title}
                data-aos="fade-up"
                data-aos-delay={index * 120}
              >
                <div className="advantage-item">
                  <i className={`bi ${item.icon}`}></i>

                  <h3>{item.title}</h3>

                  <p>{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dự án */}
      <section className="projects-section" id="du-an">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div>
              <span className="section-eyebrow">DỰ ÁN TIÊU BIỂU</span>

              <h2 className="section-heading">Công trình đã triển khai</h2>
            </div>

            <a href="#lien-he" className="project-view-link">
              Xem tất cả dự án
              <i className="bi bi-arrow-right ms-2"></i>
            </a>
          </div>

          <div className="row g-4">
            {projects.map((project, index) => (
              <div
                className="col-lg-4"
                key={project.title}
                data-aos="zoom-in"
                data-aos-delay={index * 120}
              >
                <article className="project-card">
                  <div className={`project-image project-image-${index + 1}`}>
                    <span>{project.category}</span>
                  </div>

                  <div className="project-content">
                    <h3>{project.title}</h3>

                    <p>
                      <i className="bi bi-geo-alt me-2"></i>
                      {project.location}
                    </p>

                    <a href="#lien-he">
                      Xem dự án
                      <i className="bi bi-arrow-up-right ms-2"></i>
                    </a>
                  </div>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Liên hệ */}
      <section className="contact-cta" id="lien-he">
        <div className="container">
          <div className="contact-cta-content" data-aos="fade-up">
            <div>
              <span>HỖ TRỢ TƯ VẤN</span>

              <h2>Bạn đang cần giải pháp thang máy cho công trình?</h2>

              <p>
                Liên hệ với Hà Hồng để được tư vấn phương án phù hợp với nhu cầu
                sử dụng và quy mô công trình.
              </p>
            </div>

            <div className="contact-cta-actions">
              <a href="tel:0909123456" className="btn contact-button-primary">
                <i className="bi bi-telephone-fill me-2"></i>
                0909 123 456
              </a>

              <a
                href="mailto:contact@hahongelevator.com"
                className="btn contact-button-outline"
              >
                Gửi yêu cầu báo giá
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;

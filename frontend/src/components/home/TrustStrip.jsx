const highlights = [
  {
    icon: "bi-chat-dots",
    title: "Tư vấn đúng nhu cầu",
    description: "Đề xuất giải pháp phù hợp công trình, ngân sách và thói quen sử dụng.",
  },
  {
    icon: "bi-shield-check",
    title: "An toàn và chuẩn kỹ thuật",
    description: "Kiểm tra kỹ từng hạng mục trước khi bàn giao và đưa vào vận hành.",
  },
  {
    icon: "bi-tools",
    title: "Bảo trì nhanh chóng",
    description: "Phản hồi kịp thời, hỗ trợ kiểm tra định kỳ và xử lý sự cố.",
  },
  {
    icon: "bi-cpu",
    title: "Linh kiện phù hợp",
    description: "Tư vấn cấu hình theo tải trọng, số điểm dừng và không gian lắp đặt.",
  },
];

function TrustStrip() {
  return (
    <section className="trust-strip">
      <div className="site-container">
        <div className="trust-strip-grid">
          {highlights.map((item, index) => (
            <article className="trust-item" key={item.title} data-aos="fade-up" data-aos-delay={index * 80}>
              <i className={`bi ${item.icon}`}></i>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustStrip;

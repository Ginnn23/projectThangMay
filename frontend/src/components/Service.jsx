function Service() {
  const services = [
    {
      title: "Lắp đặt thang máy",
      icon: "🏢",
      description:
        "Thi công và lắp đặt thang máy cho nhà ở, văn phòng và công trình.",
    },
    {
      title: "Bảo trì định kỳ",
      icon: "🔧",
      description:
        "Bảo trì theo định kỳ giúp thang máy hoạt động ổn định và an toàn.",
    },
    {
      title: "Sửa chữa",
      icon: "🛠",
      description:
        "Khắc phục nhanh các sự cố và thay thế linh kiện chính hãng.",
    },
  ];

  return (
    <section className="container py-5">
      <h2 className="text-center fw-bold mb-5">DỊCH VỤ CỦA CHÚNG TÔI</h2>

      <div className="row">
        {services.map((item, index) => (
          <div className="col-lg-4 mb-4" key={index}>
            <div className="card shadow border-0 h-100">
              <div className="card-body text-center">
                <div
                  style={{
                    fontSize: 60,
                  }}
                >
                  {item.icon}
                </div>

                <h4 className="mt-3">{item.title}</h4>

                <p className="text-secondary">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Service;

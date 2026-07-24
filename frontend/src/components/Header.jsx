function Header() {
  return (
    <header>
      {/* Top bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <a href="tel:0909123456">
            <i className="bi bi-telephone-fill"></i>
            0909 123 456
          </a>

          <a href="mailto:contact@hahongelevator.com">
            <i className="bi bi-envelope-fill"></i>
            contact@hahongelevator.com
          </a>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm main-navbar">
        <div className="container">
          <a className="navbar-brand" href="#trang-chu">
            <span className="brand-symbol">
              <i className="bi bi-building"></i>
            </span>

            <span className="brand-text">
              <strong>HÀ HỒNG</strong>
              <small>ELEVATOR</small>
            </span>
          </a>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#mainMenu"
            aria-controls="mainMenu"
            aria-expanded="false"
            aria-label="Mở menu"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div
            className="collapse navbar-collapse justify-content-end"
            id="mainMenu"
          >
            <ul className="navbar-nav align-items-lg-center">
              <li className="nav-item">
                <a className="nav-link active" href="#trang-chu">
                  Trang chủ
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#gioi-thieu">
                  Giới thiệu
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#dich-vu">
                  Dịch vụ
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#du-an">
                  Dự án
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="#lien-he">
                  Liên hệ
                </a>
              </li>

              <li className="nav-item ms-lg-3">
                <a className="btn navbar-quote-button" href="#lien-he">
                  Yêu cầu báo giá
                  <i className="bi bi-arrow-up-right ms-2"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

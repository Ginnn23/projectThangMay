import { useEffect, useMemo, useState } from "react";

import { API_BASE_URL, apiClient } from "../api/client";
import { anhDuAnMacDinh } from "../data/projectData";

const trangThaiLienHe = [
  { value: "New", label: "Mới gửi" },
  { value: "Contacted", label: "Đã liên hệ" },
  { value: "Processed", label: "Đã xử lý" },
  { value: "Cancelled", label: "Đã hủy" },
];

const dichVuRong = {
  name: "",
  slug: "",
  shortDescription: "",
  description: "",
  imageUrl: "",
  icon: "bi-tools",
  displayOrder: 0,
  isActive: true,
};

const duAnRong = {
  name: "",
  slug: "",
  category: "",
  location: "",
  description: "",
  priceRange: "",
  imageUrl: "",
  galleryImageUrls: ["", "", "", ""],
  completedAt: "",
  isFeatured: false,
  isActive: true,
};

const caiDatHeroRong = {
  mainImages: ["", "", ""],
  sideImages: ["", ""],
  badgeText: "Hỗ trợ kỹ thuật 24/7",
};

function layLoiApi(error) {
  return error?.response?.data?.message || "Không thể kết nối API. Kiểm tra backend và thử lại.";
}

function dinhDangNgay(value) {
  if (!value) return "Chưa có";
  return new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(value));
}

function layNhanTrangThai(status) {
  return trangThaiLienHe.find((item) => item.value === status)?.label || status;
}

function layClassTrangThaiLienHe(status) {
  return `admin-contact-status status-${String(status || "New").toLowerCase()}`;
}

function taoUrlAnhAdmin(imageUrl, fallbackImage = "") {
  if (imageUrl?.includes("source.unsplash.com")) return fallbackImage;
  if (!imageUrl) return "";
  if (/^https?:\/\//i.test(imageUrl) || imageUrl.startsWith("data:")) return imageUrl;
  if (imageUrl.startsWith("/src/") || imageUrl.startsWith("/assets/")) return imageUrl;
  return `${API_BASE_URL.replace(/\/api$/, "")}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
}

function taoFormCaiDatHero(data = {}) {
  const mainImages = Array.isArray(data.mainImages) ? data.mainImages : [];
  const sideImages = Array.isArray(data.sideImages) ? data.sideImages : [];

  return {
    mainImages: [...mainImages, "", "", ""].slice(0, 3),
    sideImages: [...sideImages, ""].slice(0, 2),
    badgeText: data.badgeText?.trim() || caiDatHeroRong.badgeText,
  };
}

async function layDichVuChoAdmin() {
  try {
    const response = await apiClient.get("/services/admin");
    return { data: response.data, dangDungApiCu: false };
  } catch (error) {
    if (error?.response?.status === 404) {
      const response = await apiClient.get("/services");
      return { data: response.data, dangDungApiCu: true };
    }

    throw error;
  }
}

function AdminImageUpload({ value, onChange, label = "Hình ảnh" }) {
  const [dangTaiAnh, setDangTaiAnh] = useState(false);
  const [loiAnh, setLoiAnh] = useState("");
  const [anhBiLoi, setAnhBiLoi] = useState(false);
  const previewUrl = taoUrlAnhAdmin(value);

  const chonAnh = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setDangTaiAnh(true);
    setLoiAnh("");
    setAnhBiLoi(false);

    try {
      const { data } = await apiClient.post("/uploads/image", formData);
      onChange(data.imageUrl);
    } catch (error) {
      setLoiAnh(layLoiApi(error));
    } finally {
      setDangTaiAnh(false);
    }
  };

  return (
    <div className="admin-image-upload admin-span-2">
      <label>{label}</label>
      <div className="admin-image-upload-body">
        <div className="admin-image-preview">
          {previewUrl && !anhBiLoi ? (
            <img src={previewUrl} alt="Ảnh đang chọn" onError={() => setAnhBiLoi(true)} />
          ) : (
            <div>
              <i className="bi bi-image"></i>
              <span>{value ? "Ảnh hiện tại không tải được" : "Chưa chọn ảnh"}</span>
            </div>
          )}
        </div>
        <div>
          <input type="file" accept="image/jpeg,image/png,image/webp" onChange={chonAnh} disabled={dangTaiAnh} />
          <p>Chọn file JPG, PNG hoặc WebP. Dung lượng tối đa 5 MB.</p>
          {dangTaiAnh && <span className="admin-upload-note">Đang tải ảnh lên...</span>}
          {loiAnh && <span className="admin-upload-error">{loiAnh}</span>}
        </div>
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [form, setForm] = useState({ username: "admin", password: "" });
  const [dangXuLy, setDangXuLy] = useState(false);
  const [loi, setLoi] = useState("");

  const dangNhap = async (event) => {
    event.preventDefault();
    setDangXuLy(true);
    setLoi("");

    try {
      const { data } = await apiClient.post("/auth/login", form);
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      onLogin(data);
    } catch (error) {
      setLoi(layLoiApi(error));
    } finally {
      setDangXuLy(false);
    }
  };

  return (
    <main className="admin-page admin-login-page">
      <section className="admin-login-panel">
        <span className="section-eyebrow">HÀ HỒNG ADMIN</span>
        <h1>Đăng nhập quản trị</h1>
        <p>Kết nối với API tại <strong>{API_BASE_URL}</strong></p>
        <form onSubmit={dangNhap}>
          {loi && <div className="alert alert-danger">{loi}</div>}
          <label htmlFor="adminUsername">Tài khoản</label>
          <input id="adminUsername" value={form.username} onChange={(event) => setForm((prev) => ({ ...prev, username: event.target.value }))} autoComplete="username" />
          <label htmlFor="adminPassword">Mật khẩu</label>
          <input id="adminPassword" type="password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} autoComplete="current-password" />
          <button className="btn hero-primary-button w-100" type="submit" disabled={dangXuLy}>
            {dangXuLy ? "Đang đăng nhập..." : "Đăng nhập"}
          </button>
        </form>
      </section>
    </main>
  );
}

function AdminToolbar({ activeTab, onChangeTab, user, onLogout }) {
  const tabs = [
    { key: "contacts", label: "Liên hệ", icon: "bi-inbox" },
    { key: "home", label: "Trang chủ", icon: "bi-house-gear" },
    { key: "services", label: "Dịch vụ", icon: "bi-tools" },
    { key: "projects", label: "Dự án", icon: "bi-buildings" },
  ];

  return (
    <div className="admin-toolbar">
      <div>
        <span>Quản trị website</span>
        <strong>{user?.fullName || user?.username || "Admin"}</strong>
      </div>
      <nav aria-label="Admin tabs">
        {tabs.map((tab) => (
          <button className={activeTab === tab.key ? "active" : ""} type="button" key={tab.key} onClick={() => onChangeTab(tab.key)}>
            <i className={`bi ${tab.icon}`}></i>
            {tab.label}
          </button>
        ))}
      </nav>
      <button className="admin-logout-button" type="button" onClick={onLogout}>
        <i className="bi bi-box-arrow-right"></i>
        Đăng xuất
      </button>
    </div>
  );
}

function LienHeAdmin({ contacts, loading, error, onChangeStatus, onDelete }) {
  return (
    <section className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-section-kicker">Tự động đồng bộ khi mở tab</span>
          <h2>Yêu cầu liên hệ</h2>
          <p>Theo dõi khách hàng gửi từ form trang Liên hệ.</p>
        </div>
        {loading && <span className="admin-loading-pill"><i className="bi bi-arrow-repeat"></i> Đang tải</span>}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <div className="admin-table-wrap">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Khách hàng</th>
              <th>Nội dung</th>
              <th>Trạng thái</th>
              <th>Ngày gửi</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((item) => (
              <tr key={item.id}>
                <td>
                  <strong>{item.fullName}</strong>
                  <span>{item.phoneNumber}</span>
                  {item.email && <span>{item.email}</span>}
                </td>
                <td>
                  <strong>{item.subject || "Yêu cầu tư vấn"}</strong>
                  <p>{item.message}</p>
                </td>
                <td>
                  <select className={layClassTrangThaiLienHe(item.status)} value={item.status} title={layNhanTrangThai(item.status)} onChange={(event) => onChangeStatus(item.id, event.target.value)}>
                    {trangThaiLienHe.map((status) => <option value={status.value} key={status.value}>{status.label}</option>)}
                  </select>
                </td>
                <td>{dinhDangNgay(item.createdAt)}</td>
                <td>
                  <button className="admin-icon-button danger" type="button" aria-label="Xóa liên hệ" onClick={() => onDelete(item.id)}>
                    <i className="bi bi-trash"></i>
                  </button>
                </td>
              </tr>
            ))}
            {!contacts.length && (
              <tr>
                <td colSpan="5" className="admin-empty">Chưa có yêu cầu liên hệ nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function DichVuAdmin({ services, form, editingId, loading, error, warning, onSubmit, onEdit, onToggleVisibility, onDelete, onChange, onReset }) {
  return (
    <section className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-section-kicker">Dữ liệu hiển thị ngoài website</span>
          <h2>Dịch vụ</h2>
          <p>Thêm và cập nhật các dịch vụ chính của Hà Hồng.</p>
        </div>
        {loading && <span className="admin-loading-pill"><i className="bi bi-arrow-repeat"></i> Đang tải</span>}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {warning && <div className="alert alert-warning">{warning}</div>}
      <form className="admin-form-grid" onSubmit={onSubmit}>
        <input className="admin-span-2" placeholder="Tên dịch vụ" value={form.name} onChange={(event) => onChange("name", event.target.value)} required />
        <label className="admin-check">
          <input type="checkbox" checked={form.isActive} onChange={(event) => onChange("isActive", event.target.checked)} />
          Đang hiển thị
        </label>
        <AdminImageUpload value={form.imageUrl} onChange={(imageUrl) => onChange("imageUrl", imageUrl)} label="Ảnh dịch vụ" />
        <textarea className="admin-span-2" placeholder="Mô tả ngắn" value={form.shortDescription} onChange={(event) => onChange("shortDescription", event.target.value)} required />
        <textarea className="admin-span-2" placeholder="Mô tả chi tiết" value={form.description} onChange={(event) => onChange("description", event.target.value)} required />
        <div className="admin-form-actions admin-span-2">
          <button className="btn hero-primary-button" type="submit">{editingId ? "Cập nhật" : "Thêm mới"}</button>
          <button className="btn admin-secondary-button" type="button" onClick={onReset}>Làm mới</button>
        </div>
      </form>
      <div className="admin-card-grid">
        {services.map((item) => (
          <article className={`admin-manage-card ${item.isActive ? "" : "is-hidden"}`} key={item.id}>
            <i className={`bi ${item.icon || "bi-tools"}`}></i>
            <div>
              <span className={`admin-status-badge ${item.isActive ? "is-active" : "is-hidden"}`}>
                {item.isActive ? "Đang hiển thị" : "Đang ẩn"}
              </span>
              <h3>{item.name}</h3>
              <p>{item.shortDescription}</p>
            </div>
            <div className="admin-card-actions">
              <button type="button" onClick={() => onEdit(item)}>Sửa</button>
              <button type="button" onClick={() => onToggleVisibility(item)}>
                {item.isActive ? "Ẩn" : "Hiện"}
              </button>
              <button className="danger" type="button" onClick={() => onDelete(item)}>
                Xóa
              </button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function DuAnAdmin({ projects, form, editingId, loading, error, onSubmit, onEdit, onDelete, onChange, onReset }) {
  const doiAnhPhuDuAn = (index, imageUrl) => {
    const nextImages = [...(form.galleryImageUrls || [])];
    nextImages[index] = imageUrl;
    onChange("galleryImageUrls", nextImages);
  };

  return (
    <section className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-section-kicker">Dự án có ảnh mới được hiển thị</span>
          <h2>Dự án</h2>
          <p>Quản lý danh sách dự án tiêu biểu và ảnh chi tiết.</p>
        </div>
        {loading && <span className="admin-loading-pill"><i className="bi bi-arrow-repeat"></i> Đang tải</span>}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form className="admin-form-grid" onSubmit={onSubmit}>
        <input className="admin-span-2" placeholder="Tên dự án" value={form.name} onChange={(event) => onChange("name", event.target.value)} required />
        <input placeholder="Loại công trình" value={form.category} onChange={(event) => onChange("category", event.target.value)} required />
        <input placeholder="Địa điểm" value={form.location} onChange={(event) => onChange("location", event.target.value)} required />
        <input className="admin-span-2" placeholder="Giá tham khảo, ví dụ Khoảng 320 - 520 triệu VNĐ" value={form.priceRange || ""} onChange={(event) => onChange("priceRange", event.target.value)} />
        <AdminImageUpload value={form.imageUrl} onChange={(imageUrl) => onChange("imageUrl", imageUrl)} label="Ảnh đại diện dự án" />
        <div className="admin-span-2 admin-project-gallery-editor">
          <h3>Ảnh chi tiết dự án</h3>
          <p>Các ảnh này sẽ tự chuyển qua lại ở trang chi tiết dự án. Có thể để trống ô không dùng.</p>
          <div className="admin-project-gallery-grid">
            {[0, 1, 2, 3].map((index) => (
              <AdminImageUpload
                key={`project-gallery-${index}`}
                value={form.galleryImageUrls?.[index] || ""}
                onChange={(imageUrl) => doiAnhPhuDuAn(index, imageUrl)}
                label={`Ảnh phụ ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <textarea className="admin-span-2" placeholder="Mô tả dự án" value={form.description} onChange={(event) => onChange("description", event.target.value)} required />
        <input type="date" value={form.completedAt || ""} onChange={(event) => onChange("completedAt", event.target.value)} />
        <label className="admin-check">
          <input type="checkbox" checked={form.isFeatured} onChange={(event) => onChange("isFeatured", event.target.checked)} />
          Dự án nổi bật
        </label>
        <label className="admin-check">
          <input type="checkbox" checked={form.isActive} onChange={(event) => onChange("isActive", event.target.checked)} />
          Đang hiển thị
        </label>
        <div className="admin-form-actions admin-span-2">
          <button className="btn hero-primary-button" type="submit">{editingId ? "Cập nhật" : "Thêm mới"}</button>
          <button className="btn admin-secondary-button" type="button" onClick={onReset}>Làm mới</button>
        </div>
      </form>
      <div className="admin-card-grid">
        {projects.map((item, index) => {
          const projectImageUrl = taoUrlAnhAdmin(item.imageUrl, anhDuAnMacDinh[index % anhDuAnMacDinh.length]);

          return (
            <article className="admin-manage-card project" key={item.id}>
              {projectImageUrl ? (
                <img src={projectImageUrl} alt={item.name} onError={(event) => { event.currentTarget.style.display = "none"; }} />
              ) : (
                <div className="admin-card-image-empty"><i className="bi bi-image"></i></div>
              )}
              <div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                {item.priceRange && <strong className="admin-price-text">{item.priceRange}</strong>}
                <span>{item.category} - {item.location}</span>
                {!!item.galleryImageUrls?.length && <span>{item.galleryImageUrls.length} ảnh chi tiết</span>}
              </div>
              <div className="admin-card-actions">
                <button type="button" onClick={() => onEdit(item)}>Sửa</button>
                <button type="button" onClick={() => onDelete(item.id)}>Ẩn</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

function TrangChuAdmin({ form, loading, error, message, onSave, onChangeImage, onChangeBadge }) {
  return (
    <section className="admin-section">
      <div className="admin-section-heading">
        <div>
          <span className="admin-section-kicker">Hero trang chủ</span>
          <h2>Trang chủ</h2>
          <p>Quản lý cụm ảnh Hero: ảnh lớn tự chuyển sau 3 giây và 2 ảnh nhỏ bên cạnh.</p>
        </div>
        {loading && <span className="admin-loading-pill"><i className="bi bi-arrow-repeat"></i> Đang tải</span>}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      {message && <div className="alert alert-success">{message}</div>}
      <div className="admin-home-editor">
        <div>
          <h3>Ảnh lớn tự chuyển</h3>
          <p>Chọn 1 đến 3 ảnh. Trang chủ sẽ tự đổi ảnh lớn sau mỗi 3 giây.</p>
          <div className="admin-home-image-grid">
            {[0, 1, 2].map((index) => (
              <AdminImageUpload
                key={`main-${index}`}
                value={form.mainImages[index] || ""}
                onChange={(imageUrl) => onChangeImage("mainImages", index, imageUrl)}
                label={`Ảnh lớn ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <div>
          <h3>Ảnh nhỏ bên cạnh</h3>
          <p>Hai ảnh này nằm bên phải ảnh lớn, nên ưu tiên ảnh cabin, sảnh hoặc công trình rõ nét.</p>
          <div className="admin-home-image-grid">
            {[0, 1].map((index) => (
              <AdminImageUpload
                key={`side-${index}`}
                value={form.sideImages[index] || ""}
                onChange={(imageUrl) => onChangeImage("sideImages", index, imageUrl)}
                label={`Ảnh nhỏ ${index + 1}`}
              />
            ))}
          </div>
        </div>
        <label className="admin-home-badge">
          <span>Nội dung badge</span>
          <input value={form.badgeText} onChange={(event) => onChangeBadge(event.target.value)} placeholder="Ví dụ: Hỗ trợ kỹ thuật 24/7" />
        </label>
        <button className="btn hero-primary-button admin-home-save" type="button" onClick={onSave} disabled={loading}>
          <i className="bi bi-save"></i>
          Lưu ảnh Hero
        </button>
      </div>
    </section>
  );
}

function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem("adminToken") || "");
  const [user, setUser] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("adminUser")) || null;
    } catch {
      return null;
    }
  });
  const [activeTab, setActiveTab] = useState("contacts");
  const [contacts, setContacts] = useState([]);
  const [services, setServices] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [serviceWarning, setServiceWarning] = useState("");
  const [homeMessage, setHomeMessage] = useState("");
  const [serviceForm, setServiceForm] = useState(dichVuRong);
  const [projectForm, setProjectForm] = useState(duAnRong);
  const [homeHeroForm, setHomeHeroForm] = useState(caiDatHeroRong);
  const [editingServiceId, setEditingServiceId] = useState(null);
  const [editingProjectId, setEditingProjectId] = useState(null);

  const thongKe = useMemo(() => ({
    contacts: contacts.length,
    services: services.filter((item) => item.isActive).length,
    projects: projects.length,
  }), [contacts, projects.length, services]);

  const taiLienHe = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await apiClient.get("/contacts");
      setContacts(data);
    } catch (err) {
      setError(layLoiApi(err));
    } finally {
      setLoading(false);
    }
  };

  const taiDichVu = async () => {
    setLoading(true);
    setError("");
    try {
      const { data, dangDungApiCu } = await layDichVuChoAdmin();
      setServices(data);
      setServiceWarning(dangDungApiCu ? "Backend đang chạy bản cũ nên admin tạm thời chỉ thấy dịch vụ đang hiển thị. Hãy restart backend để dùng nút Ẩn/Hiện đầy đủ." : "");
    } catch (err) {
      setError(layLoiApi(err));
    } finally {
      setLoading(false);
    }
  };

  const taiDuAn = async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await apiClient.get("/projects");
      setProjects(data.filter((item) => item.imageUrl && !item.imageUrl.includes("source.unsplash.com")));
    } catch (err) {
      setError(layLoiApi(err));
    } finally {
      setLoading(false);
    }
  };

  const xuLyDangNhap = (data) => {
    setToken(data.token);
    setUser(data.user);
    taiLienHe();
  };

  const dangXuat = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("adminUser");
    setToken("");
    setUser(null);
  };

  const doiTab = (tab) => {
    setActiveTab(tab);
    setError("");
    setHomeMessage("");
    setServiceWarning("");
  };

  useEffect(() => {
    if (!token) return;

    let dangHoatDong = true;

    const taiDuLieuTheoTab = async () => {
      setLoading(true);
      setError("");
      setHomeMessage("");

      try {
        const duongDan = activeTab === "contacts"
          ? "/contacts"
          : activeTab === "services"
            ? "/services/admin"
            : activeTab === "home"
              ? "/site-settings/home-hero"
              : "/projects";
        const response = activeTab === "services"
          ? await layDichVuChoAdmin()
          : await apiClient.get(duongDan);
        const data = response.data;

        if (!dangHoatDong) return;

        if (activeTab === "contacts") {
          setContacts(data);
        } else if (activeTab === "services") {
          setServices(data);
          setServiceWarning(response.dangDungApiCu ? "Backend đang chạy bản cũ nên admin tạm thời chỉ thấy dịch vụ đang hiển thị. Hãy restart backend để dùng nút Ẩn/Hiện đầy đủ." : "");
        } else if (activeTab === "home") {
          setHomeHeroForm(taoFormCaiDatHero(data));
        } else {
          setProjects(data.filter((item) => item.imageUrl && !item.imageUrl.includes("source.unsplash.com")));
        }
      } catch (err) {
        if (dangHoatDong) {
          setError(layLoiApi(err));
        }
      } finally {
        if (dangHoatDong) {
          setLoading(false);
        }
      }
    };

    taiDuLieuTheoTab();

    return () => {
      dangHoatDong = false;
    };
  }, [activeTab, token]);

  const capNhatTrangThaiLienHe = async (id, status) => {
    try {
      await apiClient.put(`/contacts/${id}/status`, { status });
      await taiLienHe();
    } catch (err) {
      setError(layLoiApi(err));
    }
  };

  const xoaLienHe = async (id) => {
    if (!window.confirm("Xóa yêu cầu liên hệ này?")) return;
    try {
      await apiClient.delete(`/contacts/${id}`);
      await taiLienHe();
    } catch (err) {
      setError(layLoiApi(err));
    }
  };

  const luuDichVu = async (event) => {
    event.preventDefault();
    const payload = { ...serviceForm, slug: "", icon: serviceForm.icon || "bi-tools", displayOrder: Number(serviceForm.displayOrder) || 0 };
    try {
      if (editingServiceId) {
        await apiClient.put(`/services/${editingServiceId}`, payload);
      } else {
        await apiClient.post("/services", payload);
      }
      setServiceForm(dichVuRong);
      setEditingServiceId(null);
      await taiDichVu();
    } catch (err) {
      setError(layLoiApi(err));
    }
  };

  const suaDichVu = (item) => {
    setEditingServiceId(item.id);
    setServiceForm({ ...dichVuRong, ...item });
  };

  const doiHienThiDichVu = async (item) => {
    const hienThiMoi = !item.isActive;
    if (!window.confirm(hienThiMoi ? "Hiện dịch vụ này trên website?" : "Ẩn dịch vụ này khỏi website?")) return;
    try {
      await apiClient.put(`/services/${item.id}/visibility`, { isActive: hienThiMoi });
      await taiDichVu();
    } catch (err) {
      if (err?.response?.status === 404) {
        setError("");
        setServiceWarning("Backend chưa được restart nên chưa dùng được nút Ẩn/Hiện. Hãy tắt backend đang chạy rồi chạy lại `dotnet run`.");
        return;
      }

      setError(layLoiApi(err));
    }
  };

  const xoaVinhVienDichVu = async (item) => {
    if (!window.confirm(`Xóa hẳn dịch vụ "${item.name}" khỏi database? Thao tác này không thể hoàn tác.`)) return;

    try {
      await apiClient.delete(`/services/${item.id}/permanent`);
      if (editingServiceId === item.id) {
        setServiceForm(dichVuRong);
        setEditingServiceId(null);
      }
      await taiDichVu();
    } catch (err) {
      if (err?.response?.status === 404) {
        setError("");
        setServiceWarning("Backend chưa được restart nên chưa dùng được nút Xóa. Hãy tắt backend đang chạy rồi chạy lại `dotnet run`.");
        return;
      }

      setError(layLoiApi(err));
    }
  };

  const luuDuAn = async (event) => {
    event.preventDefault();
    const payload = {
      ...projectForm,
      galleryImageUrls: (projectForm.galleryImageUrls || []).filter(Boolean),
      completedAt: projectForm.completedAt || null,
    };
    try {
      if (editingProjectId) {
        await apiClient.put(`/projects/${editingProjectId}`, payload);
      } else {
        await apiClient.post("/projects", payload);
      }
      setProjectForm(duAnRong);
      setEditingProjectId(null);
      await taiDuAn();
    } catch (err) {
      setError(layLoiApi(err));
    }
  };

  const suaDuAn = (item) => {
    setEditingProjectId(item.id);
    setProjectForm({
      ...duAnRong,
      ...item,
      completedAt: item.completedAt ? item.completedAt.slice(0, 10) : "",
      galleryImageUrls: [...(item.galleryImageUrls || []), "", "", "", ""].slice(0, 4),
    });
  };

  const xoaDuAn = async (id) => {
    if (!window.confirm("Ẩn dự án này khỏi website?")) return;
    try {
      await apiClient.delete(`/projects/${id}`);
      await taiDuAn();
    } catch (err) {
      setError(layLoiApi(err));
    }
  };

  const luuCaiDatHero = async () => {
    setLoading(true);
    setError("");
    setHomeMessage("");
    try {
      const payload = {
        mainImages: homeHeroForm.mainImages.filter(Boolean),
        sideImages: homeHeroForm.sideImages.filter(Boolean),
        badgeText: homeHeroForm.badgeText,
      };
      const { data } = await apiClient.put("/site-settings/home-hero", payload);
      setHomeHeroForm(taoFormCaiDatHero(data));
      setHomeMessage("Đã lưu ảnh Hero trang chủ.");
    } catch (err) {
      setError(layLoiApi(err));
    } finally {
      setLoading(false);
    }
  };

  const capNhatAnhHero = (field, index, imageUrl) => {
    setHomeHeroForm((prev) => {
      const nextImages = [...prev[field]];
      nextImages[index] = imageUrl;
      return { ...prev, [field]: nextImages };
    });
  };

  if (!token) {
    return <AdminLogin onLogin={xuLyDangNhap} />;
  }

  return (
    <main className="admin-page">
      <div className="admin-shell">
        <AdminToolbar activeTab={activeTab} onChangeTab={doiTab} user={user} onLogout={dangXuat} />

        <div className="admin-summary-grid">
          <article><span>Liên hệ</span><strong>{thongKe.contacts}</strong></article>
          <article><span>Dịch vụ đang hiện</span><strong>{thongKe.services}</strong></article>
          <article><span>Dự án</span><strong>{thongKe.projects}</strong></article>
        </div>

        {activeTab === "contacts" && (
          <LienHeAdmin
            contacts={contacts}
            loading={loading}
            error={error}
            onChangeStatus={capNhatTrangThaiLienHe}
            onDelete={xoaLienHe}
          />
        )}

        {activeTab === "home" && (
          <TrangChuAdmin
            form={homeHeroForm}
            loading={loading}
            error={error}
            message={homeMessage}
            onSave={luuCaiDatHero}
            onChangeImage={capNhatAnhHero}
            onChangeBadge={(value) => setHomeHeroForm((prev) => ({ ...prev, badgeText: value }))}
          />
        )}

        {activeTab === "services" && (
          <DichVuAdmin
            services={services}
            form={serviceForm}
            editingId={editingServiceId}
            loading={loading}
            error={error}
            warning={serviceWarning}
            onSubmit={luuDichVu}
            onEdit={suaDichVu}
            onToggleVisibility={doiHienThiDichVu}
            onDelete={xoaVinhVienDichVu}
            onChange={(field, value) => setServiceForm((prev) => ({ ...prev, [field]: value }))}
            onReset={() => { setServiceForm(dichVuRong); setEditingServiceId(null); }}
          />
        )}

        {activeTab === "projects" && (
          <DuAnAdmin
            projects={projects}
            form={projectForm}
            editingId={editingProjectId}
            loading={loading}
            error={error}
            onSubmit={luuDuAn}
            onEdit={suaDuAn}
            onDelete={xoaDuAn}
            onChange={(field, value) => setProjectForm((prev) => ({ ...prev, [field]: value }))}
            onReset={() => { setProjectForm(duAnRong); setEditingProjectId(null); }}
          />
        )}
      </div>
    </main>
  );
}

export default Admin;

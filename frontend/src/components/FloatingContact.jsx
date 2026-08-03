import { soDienThoaiCongTy, soDienThoaiLienKet } from "../data/contactInfo";

const zaloUrl = `https://zalo.me/${soDienThoaiLienKet}`;

function FloatingContact() {
  return (
    <div className="floating-contact" aria-label="Liên hệ nhanh">
      <a className="floating-contact-item floating-phone" href={`tel:${soDienThoaiLienKet}`} aria-label={`Gọi ${soDienThoaiCongTy}`}>
        <span className="floating-contact-icon">
          <i className="bi bi-telephone-fill"></i>
        </span>
        <span className="floating-contact-text">{soDienThoaiCongTy}</span>
      </a>

      <a className="floating-contact-item floating-zalo" href={zaloUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat Zalo với Hà Hồng">
        <span className="floating-contact-icon floating-zalo-icon">Zalo</span>
        <span className="floating-contact-text">Chat Zalo</span>
      </a>
    </div>
  );
}

export default FloatingContact;

import cabinImage from "../assets/images/elevator-doors.jpg";
import mainImage from "../assets/images/elevator-lobby.jpg";
import serviceImage from "../assets/images/elevator-hotel-lobby.jpg";
import { API_BASE_URL } from "../api/client";

export const homeHeroFallbackSettings = {
  mainImages: [mainImage, cabinImage, serviceImage],
  sideImages: [cabinImage, serviceImage],
  badgeText: "Hỗ trợ kỹ thuật 24/7",
};

export function taoUrlAnhTrangChu(imageUrl) {
  if (!imageUrl) return "";
  if (/^https?:\/\//i.test(imageUrl) || imageUrl.startsWith("data:")) return imageUrl;
  if (imageUrl.startsWith("/src/") || imageUrl.startsWith("/assets/")) return imageUrl;
  return `${API_BASE_URL.replace(/\/api$/, "")}${imageUrl.startsWith("/") ? imageUrl : `/${imageUrl}`}`;
}

export function chuanHoaCaiDatHero(settings) {
  const mainImages = Array.isArray(settings?.mainImages)
    ? settings.mainImages.map(taoUrlAnhTrangChu).filter(Boolean)
    : [];
  const sideImages = Array.isArray(settings?.sideImages)
    ? settings.sideImages.map(taoUrlAnhTrangChu).filter(Boolean)
    : [];

  return {
    mainImages: mainImages.length ? mainImages : homeHeroFallbackSettings.mainImages,
    sideImages: [
      sideImages[0] || homeHeroFallbackSettings.sideImages[0],
      sideImages[1] || homeHeroFallbackSettings.sideImages[1],
    ],
    badgeText: settings?.badgeText?.trim() || homeHeroFallbackSettings.badgeText,
  };
}

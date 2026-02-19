/**
 * Egyptian governorates (محافظات جمهورية مصر العربية)
 * Each governorate has Arabic name, English name, and shipping cost in EGP.
 * Cairo & Giza: 70 EGP | Other governorates: 80 EGP
 */
export const SHIPPING_DEFAULT_EGP = 70; // Before selecting governorate
export const SHIPPING_CAIRO_GIZA_EGP = 70;
export const SHIPPING_OTHER_EGP = 80;

// Governorate IDs that have 70 EGP shipping (Cairo & Giza)
const CHEAP_SHIPPING_IDS = ["cairo", "giza"];

/**
 * @param {string} governorateId - Governorate id (e.g. "cairo", "giza", "alexandria")
 * @returns {number} Shipping cost in EGP
 */
export const getShippingByGovernorate = (governorateId) => {
  if (!governorateId) return SHIPPING_DEFAULT_EGP;
  return CHEAP_SHIPPING_IDS.includes(governorateId.toLowerCase())
    ? SHIPPING_CAIRO_GIZA_EGP
    : SHIPPING_OTHER_EGP;
};

export const governorates = [
  { id: "cairo", ar: "القاهرة", en: "Cairo" },
  { id: "giza", ar: "الجيزة", en: "Giza" },
  { id: "alexandria", ar: "الإسكندرية", en: "Alexandria" },
  { id: "ismailia", ar: "الإسماعيلية", en: "Ismailia" },
  { id: "aswan", ar: "أسوان", en: "Aswan" },
  { id: "asyut", ar: "أسيوط", en: "Asyut" },
  { id: "suez", ar: "السويس", en: "Suez" },
  { id: "monufia", ar: "المنوفية", en: "Monufia" },
  { id: "dakahlia", ar: "الدقهلية", en: "Dakahlia" },
  { id: "damietta", ar: "دمياط", en: "Damietta" },
  { id: "sohag", ar: "سوهاج", en: "Sohag" },
  { id: "sharqia", ar: "الشرقية", en: "Sharqia" },
  { id: "matrouh", ar: "مطروح", en: "Matrouh" },
  { id: "minya", ar: "المنيا", en: "Minya" },
  { id: "newvalley", ar: "الوادي الجديد", en: "New Valley" },
  { id: "southsinai", ar: "جنوب سيناء", en: "South Sinai" },
  { id: "qena", ar: "قنا", en: "Qena" },
  { id: "luxor", ar: "الأقصر", en: "Luxor" },
  { id: "redsea", ar: "البحر الأحمر", en: "Red Sea" },
  { id: "beheira", ar: "البحيرة", en: "Beheira" },
  { id: "benisuef", ar: "بني سويف", en: "Beni Suef" },
  { id: "portsaid", ar: "بور سعيد", en: "Port Said" },
  { id: "gharbia", ar: "الغربية", en: "Gharbia" },
  { id: "fayoum", ar: "الفيوم", en: "Fayoum" },
  { id: "qalyubia", ar: "القليوبية", en: "Qalyubia" },
  { id: "kafrelsheikh", ar: "كفر الشيخ", en: "Kafr El Sheikh" },
  { id: "northsinai", ar: "شمال سيناء", en: "North Sinai" },
];

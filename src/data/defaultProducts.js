import photo1 from "../wood/photo1.png";
import photo2 from "../wood/photo2.jpg";
import photo3 from "../wood/photo3.jpg";
import photo4 from "../wood/photo4.jpg";
import photo5 from "../wood/photo5.jpg";
import photo6 from "../wood/photo6.jpg";
import photo7 from "../wood/photo7.jpg";
import photo8 from "../wood/photo8.jpg";
import photo9 from "../wood/photo9.jpg";

/**
 * Returns the default 9 products with translated title/description.
 * t: translation object (en or ar), language: 'en' | 'ar'
 */
export function getDefaultProducts(t, language) {
  const badgeEn = [
    "BEST SELLER",
    "NEW ARRIVAL",
    "ONLY TWO LEFT",
    "NEW ARRIVAL",
    "BEST SELLER",
    "POPULAR",
    "NEW ARRIVAL",
    "BEST SELLER",
    "LIMITED",
  ];
  const badgeAr = [
    "الأكثر مبيعاً",
    "وصل حديثاً",
    "بقي اثنان فقط",
    "وصل حديثاً",
    "الأكثر مبيعاً",
    "شائع",
    "وصل حديثاً",
    "الأكثر مبيعاً",
    "محدود",
  ];
  const badges = language === "ar" ? badgeAr : badgeEn;

  return [
    {
      id: 1,
      title: t.products.heritage.title,
      description: t.products.heritage.description,
      price: "$85",
      badge: badges[0],
      image: photo1,
      images: [photo1, photo2, photo3],
      features: [
        t.home.features.solidWalnut,
        t.home.features.edgeGrain,
        t.home.features.twoInchThick,
        t.home.features.handFinished,
      ],
      dimensions: '18" x 12" x 2"',
      weight: "5.2 lbs",
    },
    {
      id: 2,
      title: t.products.utensil.title,
      description: t.products.utensil.description,
      price: "$55",
      badge: badges[1],
      image: photo2,
      images: [photo2, photo4, photo5],
      features: [
        t.home.features.premiumWalnut,
        t.home.features.handFinished,
        t.home.features.comfortableGrip,
        t.home.features.setOfFive,
      ],
      dimensions: "Various sizes",
      weight: "1.8 lbs",
    },
    {
      id: 3,
      title: t.products.carving.title,
      description: t.products.carving.description,
      price: "$110",
      badge: badges[2],
      image: photo3,
      images: [photo3, photo6, photo7],
      features: [
        t.home.features.knifeRest,
        t.home.features.juiceGroove,
        t.home.features.endGrain,
        t.home.features.largeSurface,
      ],
      dimensions: '24" x 16" x 2.5"',
      weight: "8.5 lbs",
    },
    {
      id: 4,
      title: t.products.endGrain.title,
      description: t.products.endGrain.description,
      price: "$95",
      badge: badges[3],
      image: photo4,
      images: [photo4, photo8, photo9],
      features: [
        t.home.features.endGrain,
        t.home.features.thickHandConstruction,
        t.home.features.superiorKnifeProtection,
        t.home.features.naturalAntibacterial,
      ],
      dimensions: '20" x 14" x 2"',
      weight: "6.8 lbs",
    },
    {
      id: 5,
      title: t.products.premium.title,
      description: t.products.premium.description,
      price: "$120",
      badge: badges[4],
      image: photo5,
      images: [photo5, photo1, photo3],
      features: [
        t.home.features.premiumHardwood,
        t.home.features.elegantFinish,
        t.home.features.durableConstruction,
        t.home.features.easyMaintenance,
      ],
      dimensions: '22" x 15" x 2"',
      weight: "7.2 lbs",
    },
    {
      id: 6,
      title: t.products.classic.title,
      description: t.products.classic.description,
      price: "$75",
      badge: badges[5],
      image: photo6,
      images: [photo6, photo2, photo4],
      features: [
        t.home.features.timelessDesign,
        t.home.features.versatileUse,
        t.home.features.easyToClean,
        t.home.features.naturalWoodFinish,
      ],
      dimensions: '16" x 12" x 1.5"',
      weight: "4.5 lbs",
    },
    {
      id: 7,
      title: t.products.artisan.title,
      description: t.products.artisan.description,
      price: "$90",
      badge: badges[6],
      image: photo7,
      images: [photo7, photo5, photo8],
      features: [
        t.home.features.uniqueGrainPatterns,
        t.home.features.artisanCrafted,
        t.home.features.attentionToDetail,
        t.home.features.naturalBeauty,
      ],
      dimensions: '18" x 13" x 2"',
      weight: "5.8 lbs",
    },
    {
      id: 8,
      title: t.products.master.title,
      description: t.products.master.description,
      price: "$105",
      badge: badges[7],
      image: photo8,
      images: [photo8, photo9, photo1],
      features: [
        t.home.features.selectHardwood,
        t.home.features.masterCraftsmanship,
        t.home.features.premiumQuality,
        t.home.features.lifetimeDurability,
      ],
      dimensions: '20" x 14" x 2.5"',
      weight: "7.5 lbs",
    },
    {
      id: 9,
      title: t.products.signature.title,
      description: t.products.signature.description,
      price: "$135",
      badge: badges[8],
      image: photo9,
      images: [photo9, photo7, photo6],
      features: [
        t.home.features.signatureDesign,
        t.home.features.premiumQuality,
        t.home.features.discerningChefQuality,
        t.home.features.limitedEdition,
      ],
      dimensions: '24" x 16" x 2.5"',
      weight: "9.2 lbs",
    },
  ];
}

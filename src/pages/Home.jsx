import { useState, useRef, useMemo } from "react";
import { Link } from "../utils/Router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductsContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
import { getProductFirstImageUrl } from "../utils/productMedia";
import {
  getProductTitle,
  getProductShortDescription,
  getProductBadge,
  getProductPrice,
  getOriginalPrice,
  getDiscountPercentage,
} from "../utils/productText";
import { getDefaultProducts } from "../data/defaultProducts";
// Import images and videos from src/wood (bundled with the site when you deploy)
import photo1 from "../wood/photo1.png";
import photo2 from "../wood/photo2.jpg";
import photo3 from "../wood/photo3.jpg";
import photo4 from "../wood/photo4.jpg";
import photo5 from "../wood/photo5.jpg";
import photo7 from "../wood/photo7.jpg";
import photo8 from "../wood/photo8.jpg";
import photo9 from "../wood/photo9.jpg";
import video1 from "../wood/video1.mp4";
import video2 from "../wood/video2.mp4";
import video3 from "../wood/video3.mp4";
import video4 from "../wood/video4.mp4";

// Video Card Component
const VideoCard = ({ video }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.volume = 0.7; // Set volume to 70%
      videoRef.current
        .play()
        .catch((err) => console.log("Video play error:", err));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      className="relative rounded-lg overflow-hidden shadow-2xl group cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        className="w-full aspect-square object-cover transition-all duration-300"
        loop
        playsInline
        preload="auto"
        style={{
          transform: isPlaying ? "scale(1.02)" : "scale(1)",
          transition: "all 0.3s ease",
        }}
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      {!isPlaying && (
        <div className="absolute inset-0 bg-black/10 flex items-center justify-center backdrop-blur-[1px]">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-4">
            <svg
              className="w-16 h-16 text-white opacity-90"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}
      {isPlaying && (
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full p-2">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
          </svg>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;
  const { removedIds, customProducts } = useProducts();
  const defaultProducts = useMemo(
    () => getDefaultProducts(t, language),
    [t, language]
  );
  const products = useMemo(
    () => [
      ...defaultProducts.filter((p) => !removedIds.includes(p.id)),
      ...customProducts,
    ],
    [defaultProducts, removedIds, customProducts]
  );

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-24 pb-16 min-h-screen flex items-center overflow-hidden">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
        >
          <source src={video1} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[#F5F0E8]/90 z-10"></div>
        <div className="container mx-auto px-4 relative z-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              <h1 className="text-5xl md:text-7xl font-bold text-[#332B2B] leading-tight">
                {t.home.heroTitle}
                <br />
                {t.home.heroTitle2}
              </h1>
              <p className="text-lg text-[#5C4A37] leading-relaxed">
                {t.home.heroDescription}
              </p>
              <Link to="/shop">
                <button className="bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300">
                  {t.home.shopNow}
                </button>
              </Link>
            </div>

            {/* Right Content - Product Display */}
            <div className="relative">
              <div className="relative bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-2xl overflow-hidden">
                <img
                  src={photo5}
                  alt="Evergrain Product"
                  className="aspect-square w-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Crafted from Time Section */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <div className="space-y-6">
              <h2 className="text-5xl md:text-6xl font-bold text-[#332B2B]">
                {t.home.craftedFromTime}
              </h2>
              <p className="text-lg text-[#5C4A37] leading-relaxed">
                {t.home.craftedDescription}
              </p>
              <Link to="/shop">
                <button className="bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300">
                  {t.home.shopNow}
                </button>
              </Link>
            </div>

            {/* Right - Image */}
            <div className="relative">
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={photo1}
                  alt="Crafted from Time"
                  className="aspect-[4/3.5] w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Explore Our Collection Section */}
      <section
        className="py-40 px-4 relative overflow-hidden"
        style={{
          backgroundColor: "#1a1410",
          backgroundImage: `
          repeating-linear-gradient(0deg, rgba(30, 22, 16, 0.4) 0px, transparent 1px, transparent 3px, rgba(30, 22, 16, 0.4) 4px),
          repeating-linear-gradient(90deg, rgba(20, 15, 10, 0.6) 0px, transparent 1px, transparent 2px, rgba(20, 15, 10, 0.6) 3px),
          radial-gradient(ellipse at 25% 35%, rgba(61, 47, 31, 0.08) 0%, transparent 70%),
          radial-gradient(ellipse at 75% 65%, rgba(42, 31, 21, 0.08) 0%, transparent 70%),
          linear-gradient(135deg, #1a1410 0%, #15100b 20%, #1a1410 40%, #15100b 60%, #1a1410 80%, #15100b 100%)
        `,
          backgroundSize: "100% 100%, 100% 100%, 50% 50%, 50% 50%, 100% 100%",
          boxShadow: "inset 0 0 200px rgba(0, 0, 0, 0.5)",
        }}
      >
        {/* Subtle overlay for depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none"></div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h2
            className="text-6xl md:text-7xl font-serif text-white mb-10 leading-[1.1] tracking-tight"
            style={{
              textShadow:
                "0 2px 20px rgba(0, 0, 0, 0.8), 0 4px 40px rgba(0, 0, 0, 0.4)",
              letterSpacing: "-0.02em",
            }}
          >
            {t.home.exploreCollection}{" "}
            <span className="relative inline-block pb-3">
              {t.home.ourCollection}
              <span
                className="absolute bottom-1 left-0 right-0 h-[1.5px] bg-white/90"
                style={{
                  boxShadow: "0 1px 3px rgba(255, 255, 255, 0.3)",
                }}
              ></span>
            </span>
          </h2>
          <p
            className="text-xl md:text-2xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed font-sans font-light tracking-wide"
            style={{
              textShadow: "0 1px 10px rgba(0, 0, 0, 0.6)",
              letterSpacing: "0.01em",
            }}
          >
            {t.home.exploreDescription}
          </p>
          <Link to="/shop">
            <button
              className="bg-[#6B5A47] hover:bg-[#7A6752] active:bg-[#5C4A37] text-white px-12 py-5 rounded-sm font-semibold uppercase tracking-[0.15em] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.6),0_0_0_1px_rgba(255,255,255,0.05)] hover:shadow-[0_6px_30px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.1)] hover:translate-y-[-2px] text-sm"
              style={{
                letterSpacing: "0.2em",
              }}
            >
              {t.home.shopNow}
            </button>
          </Link>
        </div>
      </section>

      {/* Product Showcase Section */}
      <section id="shop" className="py-20 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-[#332B2B] mb-4">
            {t.home.discoverCollection}
          </h2>

          {/* Category Tabs */}
          {/* <div className="flex gap-4 mb-12 flex-wrap">
            <button className="px-6 py-2 bg-[#5C4A37] text-white rounded-lg font-medium">
              BEST SELLER
            </button>
            <button className="px-6 py-2 bg-white text-[#5C4A37] border-2 border-[#5C4A37] rounded-lg font-medium hover:bg-[#5C4A37] hover:text-white transition-colors duration-300">
              EQUIPMENT
            </button>
            <button className="px-6 py-2 bg-white text-[#5C4A37] border-2 border-[#5C4A37] rounded-lg font-medium hover:bg-[#5C4A37] hover:text-white transition-colors duration-300">
              KITCHENWARE
            </button>
            <button className="px-6 py-2 bg-white text-[#5C4A37] border-2 border-[#5C4A37] rounded-lg font-medium hover:bg-[#5C4A37] hover:text-white transition-colors duration-300">
              CHEF'S TOOLS
            </button>
          </div> */}

          {/* Product Grid */}
          {products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-[#5C4A37]">
                {language === "ar" ? "لا توجد منتجات متاحة حالياً" : "No products available at the moment"}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {products.map((product) => (
              <div
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                {/* Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#5C4A37] text-white px-3 py-1 rounded text-xs font-semibold">
                      {getProductBadge(product, language)}
                    </span>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    {getProductFirstImageUrl(product) ? (
                      <img
                        src={getProductFirstImageUrl(product)}
                        alt={getProductTitle(product, language)}
                        className="aspect-square w-full object-cover cursor-pointer"
                      />
                    ) : (
                      <div className="aspect-square w-full bg-[#F5F0E8] flex items-center justify-center text-[#8B7355] text-sm">
                        No image
                      </div>
                    )}
                  </Link>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-[#332B2B] mb-2 hover:text-[#5C4A37] transition-colors cursor-pointer">
                      {getProductTitle(product, language)}
                    </h3>
                  </Link>
                  <p className="text-[#5C4A37] text-sm mb-4">
                    {getProductShortDescription(product, language)}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="text-lg text-[#8B7355] line-through">
                          {getOriginalPrice(getProductPrice(product, language))}
                        </span>
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                          {getDiscountPercentage()}% OFF
                        </span>
                      </div>
                      <span className="text-2xl font-bold text-[#332B2B]">
                        {getProductPrice(product, language)}
                      </span>
                    </div>
                    <Link to={`/product/${product.id}`}>
                      <button className="bg-[#5C4A37] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4A3A2A] transition-colors duration-300">
                        {t.shop.viewDetails}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
            </div>
          )}

          {products.length > 0 && (
            <div className="text-center">
              <Link to="/shop">
                <button className="bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300">
                  {t.home.viewAll}
                </button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* Our Craft Section */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold text-[#332B2B] mb-4">
              {t.home.ourCraft}
            </h2>
            <p className="text-xl text-[#5C4A37] mb-4">{t.home.madeToLast}</p>
            <p className="text-lg text-[#5C4A37] max-w-3xl mx-auto">
              {t.home.craftDescription}
            </p>
          </div>

          {/* Feature List */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#5C4A37] rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#332B2B] mb-2">
                {t.home.solidWalnut}
              </h3>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#5C4A37] rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#332B2B] mb-2">
                {t.home.endGrain}
              </h3>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="w-16 h-16 bg-[#5C4A37] rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-[#332B2B] mb-2">
                {t.home.handFinished}
              </h3>
            </div>
          </div>

          {/* Product Gallery */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[photo7, photo8, photo9].map((photo, index) => (
              <div
                key={index}
                className="relative rounded-lg overflow-hidden shadow-lg group"
              >
                <img
                  src={photo}
                  alt={`Gallery ${index + 1}`}
                  className="aspect-[4/5] w-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>

          {/* Video Gallery Section */}
          <div className="mt-16">
            <h3 className="text-3xl md:text-4xl font-bold text-[#332B2B] mb-8 text-center">
              {t.home.craftsmanshipMotion}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[video2, video3, video4].map((video, index) => (
                <VideoCard key={index} video={video} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;

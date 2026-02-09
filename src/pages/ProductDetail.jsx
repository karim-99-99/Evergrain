import { useState, useEffect, useMemo } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link, useRouter } from "../utils/Router";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductsContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
import { getDefaultProducts } from "../data/defaultProducts";
import {
  getProductMedia,
  getVideoEmbedUrl,
  isDirectVideoUrl,
} from "../utils/productMedia";
import {
  getProductTitle,
  getProductDescription,
  getProductBadge,
  getProductFeatures,
  getProductPrice,
  getOriginalPrice,
  getDiscountPercentage,
} from "../utils/productText";

const ProductDetail = () => {
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;
  const { removedIds, customProducts } = useProducts();
  const defaultProducts = useMemo(
    () => getDefaultProducts(t, language),
    [t, language]
  );
  const allProducts = useMemo(
    () => [
      ...defaultProducts.filter((p) => !removedIds.includes(p.id)),
      ...customProducts,
    ],
    [defaultProducts, removedIds, customProducts]
  );

  const [product, setProduct] = useState(null);
  const [selectedMediaIndex, setSelectedMediaIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const { addToCart } = useCart();
  const currentPath = useRouter();

  useEffect(() => {
    // Get product ID from URL
    const productId = parseInt(currentPath.split("/product/")[1], 10);
    const found = allProducts.find((p) => p.id === productId);
    // Normalize for detail view: ensure images and features
    const foundProduct = found
      ? {
          ...found,
          images:
            found.images && found.images.length > 0
              ? found.images
              : found.image
              ? [found.image]
              : [],
          features:
            found.features && found.features.length > 0 ? found.features : [],
        }
      : null;
    if (foundProduct && (!product || product.id !== foundProduct.id)) {
      setSelectedMediaIndex(0);
    }
    setProduct(foundProduct);
  }, [currentPath, allProducts, product]);

  const media = useMemo(() => getProductMedia(product), [product]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      // Show success notification
      setShowNotification(true);
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    }
  };

  const mediaCount = media.length || 1;
  const handleNextMedia = () => {
    if (product && mediaCount > 0) {
      setSelectedMediaIndex((prev) => (prev + 1) % mediaCount);
    }
  };

  const handlePrevMedia = () => {
    if (product && mediaCount > 0) {
      setSelectedMediaIndex((prev) => (prev - 1 + mediaCount) % mediaCount);
    }
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (!isLightboxOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        handleNextMedia();
      } else if (e.key === "ArrowLeft") {
        handlePrevMedia();
      } else if (e.key === "Escape") {
        setIsLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, product]);

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <Header />
        <div className="pt-24 pb-12 text-center">
          <p className="text-2xl text-[#5C4A37]">{t.productDetail.notFound}</p>
          <Link
            to="/shop"
            className="text-[#5C4A37] hover:text-[#332B2B] mt-4 inline-block"
          >
            {t.productDetail.backToShop}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />

      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-[#5C4A37] text-white px-6 py-4 rounded-lg shadow-2xl flex items-center gap-4 min-w-[300px] max-w-md">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div className="flex-1">
              <p className="font-semibold text-lg">
                {quantity}{" "}
                {quantity === 1
                  ? getProductTitle(product, language)
                  : `${getProductTitle(product, language)}(s)`}{" "}
                {t.productDetail.addedToCart}
              </p>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="flex-shrink-0 text-white/80 hover:text-white transition-colors"
              aria-label="Close notification"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      )}

      <section className="pt-24 pb-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-[#5C4A37]">
            <Link to="/" className="hover:text-[#332B2B]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-[#332B2B]">
              Shop
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[#332B2B]">
              {getProductTitle(product, language)}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product media (images + videos in order) */}
            <div>
              {/* Main media */}
              <div className="mb-4 bg-white rounded-lg overflow-hidden shadow-lg relative group">
                {media.length > 0 ? (
                  (() => {
                    const item = media[selectedMediaIndex];
                    if (!item) return null;
                    if (item.type === "video") {
                      const embedUrl = getVideoEmbedUrl(item.url);
                      const isDirect = isDirectVideoUrl(item.url);
                      return (
                        <div
                          className="w-full h-[500px] bg-black flex items-center justify-center cursor-pointer"
                          onClick={() => setIsLightboxOpen(true)}
                        >
                          {embedUrl ? (
                            <iframe
                              src={embedUrl}
                              title="Product video"
                              className="w-full h-full max-w-full"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          ) : isDirect ? (
                            <video
                              src={item.url}
                              controls
                              className="w-full h-full object-contain"
                              playsInline
                            />
                          ) : (
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-white underline"
                            >
                              {item.url}
                            </a>
                          )}
                        </div>
                      );
                    }
                    return (
                      <img
                        src={item.url}
                        alt={getProductTitle(product, language)}
                        className="w-full h-[500px] object-cover cursor-pointer"
                        onClick={() => setIsLightboxOpen(true)}
                      />
                    );
                  })()
                ) : (
                  <div className="w-full h-[500px] bg-[#F5F0E8] flex items-center justify-center text-[#8B7355]">
                    No media
                  </div>
                )}
                {mediaCount > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handlePrevMedia();
                      }}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Previous"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 19l-7-7 7-7"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleNextMedia();
                      }}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      aria-label="Next"
                    >
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnails */}
              {media.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {media.map((item, index) => (
                    <div
                      key={index}
                      onClick={() => setSelectedMediaIndex(index)}
                      className={`relative bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 ${
                        selectedMediaIndex === index
                          ? "ring-4 ring-[#5C4A37] ring-offset-2 scale-105"
                          : "ring-2 ring-transparent hover:ring-[#8B7355]/50"
                      }`}
                    >
                      {item.type === "image" ? (
                        <img
                          src={item.url}
                          alt={`${product.title} ${index + 1}`}
                          className={`w-full h-32 object-cover transition-opacity duration-300 pointer-events-none ${
                            selectedMediaIndex === index
                              ? "opacity-100"
                              : "opacity-80 hover:opacity-100"
                          }`}
                        />
                      ) : (
                        <div className="w-full h-32 bg-[#332B2B] flex items-center justify-center pointer-events-none">
                          <svg
                            className="w-12 h-12 text-white/80"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                          </svg>
                        </div>
                      )}
                      {selectedMediaIndex === index && (
                        <div className="absolute inset-0 bg-[#5C4A37]/10 pointer-events-none" />
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              <div className="mb-4">
                <span className="bg-[#5C4A37] text-white px-3 py-1 rounded text-xs font-semibold">
                  {product.badge}
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-[#332B2B] mb-4">
                {product.title}
              </h1>

              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <div className="mb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-2xl text-[#8B7355] line-through">
                    {getOriginalPrice(getProductPrice(product, language))}
                  </span>
                  <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded">
                    {getDiscountPercentage()}% OFF
                  </span>
                </div>
                <p className="text-3xl font-bold text-[#332B2B]">
                  {getProductPrice(product, language)}
                </p>
              </div>

              <p className="text-lg text-[#5C4A37] leading-relaxed mb-8">
                {getProductDescription(product, language)}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#332B2B] mb-4">
                  {t.productDetail.features}
                </h3>
                <ul className="space-y-2">
                  {getProductFeatures(product, language).map(
                    (feature, index) => (
                      <li
                        key={index}
                        className="flex items-center text-[#5C4A37]"
                      >
                        <svg
                          className="w-5 h-5 text-[#5C4A37] mr-2"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {feature}
                      </li>
                    )
                  )}
                </ul>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="border-t border-[#8B7355]/20 pt-8">
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-lg font-medium text-[#332B2B]">
                    {t.productDetail.quantity}
                  </label>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 border border-[#8B7355] rounded flex items-center justify-center hover:bg-[#5C4A37] hover:text-white transition-colors"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) =>
                        setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                      }
                      min="1"
                      className="w-20 text-center border border-[#8B7355] rounded px-2 py-2 text-[#332B2B] focus:outline-none focus:border-[#5C4A37]"
                    />
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-10 h-10 border border-[#8B7355] rounded flex items-center justify-center hover:bg-[#5C4A37] hover:text-white transition-colors"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="w-full bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300 mb-4"
                >
                  {t.productDetail.addToCart}
                </button>

                <Link
                  to="/shop"
                  className="block text-center text-[#5C4A37] hover:text-[#332B2B] transition-colors"
                >
                  {t.productDetail.continueShopping}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsLightboxOpen(false)}
        >
          {/* Close Button */}
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors z-10"
            aria-label="Close lightbox"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>

          {/* Main media container */}
          <div
            className="relative max-w-7xl w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {media.length > 0 &&
              (() => {
                const item = media[selectedMediaIndex];
                if (!item) return null;
                if (item.type === "video") {
                  const embedUrl = getVideoEmbedUrl(item.url);
                  const isDirect = isDirectVideoUrl(item.url);
                  return (
                    <div className="w-full h-full max-h-[90vh] flex items-center justify-center">
                      {embedUrl ? (
                        <iframe
                          src={embedUrl}
                          title="Product video"
                          className="w-full max-w-4xl aspect-video"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      ) : isDirect ? (
                        <video
                          src={item.url}
                          controls
                          className="max-w-full max-h-[90vh]"
                          playsInline
                        />
                      ) : (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-white underline"
                        >
                          {item.url}
                        </a>
                      )}
                    </div>
                  );
                }
                return (
                  <img
                    src={item.url}
                    alt={getProductTitle(product, language)}
                    className="max-w-full max-h-full object-contain"
                  />
                );
              })()}

            {/* Navigation Arrows */}
            {mediaCount > 1 && (
              <>
                <button
                  onClick={handlePrevMedia}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors duration-300"
                  aria-label="Previous"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleNextMedia}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-4 rounded-full transition-colors duration-300"
                  aria-label="Next"
                >
                  <svg
                    className="w-8 h-8"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {selectedMediaIndex + 1} / {media.length}
            </div>

            {/* Thumbnail strip */}
            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 max-w-full overflow-x-auto px-4">
              {media.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMediaIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedMediaIndex === index
                      ? "border-white scale-110"
                      : "border-white/50 hover:border-white/75"
                  }`}
                >
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#332B2B] flex items-center justify-center">
                      <svg
                        className="w-8 h-8 text-white/80"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;

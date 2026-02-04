import { useState, useEffect, useMemo } from "react";
import { Link, useRouter } from "../utils/Router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useLanguage } from "../context/LanguageContext";
import { useProducts } from "../context/ProductsContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
import { getDefaultProducts } from "../data/defaultProducts";
import { getProductFirstImageUrl } from "../utils/productMedia";
import {
  getProductTitle,
  getProductDescription,
  getProductShortDescription,
  getProductBadge,
  getProductPrice,
  getOriginalPrice,
  getDiscountPercentage,
} from "../utils/productText";

const Shop = () => {
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

  const currentPath = useRouter();
  const allCategoryLabel = language === "ar" ? "الكل" : "ALL";
  const [selectedCategory, setSelectedCategory] = useState(allCategoryLabel);
  const [searchQuery, setSearchQuery] = useState("");

  // Build category list from actual product badges so any category you add in Admin appears here
  const categories = useMemo(() => {
    const badges = [
      allCategoryLabel,
      ...Array.from(
        new Set(
          allProducts
            .map((p) => getProductBadge(p, language))
            .filter((b) => b != null && String(b).trim() !== "")
        )
      ),
    ];
    return badges;
  }, [allProducts, allCategoryLabel, language]);

  // Read URL parameters on mount and when path changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get("category");
    const searchParam = urlParams.get("search");

    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSearchQuery("");
    } else if (searchParam) {
      setSearchQuery(searchParam);
      setSelectedCategory(allCategoryLabel);
    }
  }, [currentPath, allCategoryLabel]);

  // If current selection is no longer in the list (e.g. category was removed), switch to ALL
  useEffect(() => {
    if (categories.length > 0 && !categories.includes(selectedCategory)) {
      setSelectedCategory(allCategoryLabel);
    }
  }, [categories, selectedCategory, allCategoryLabel]);

  // Filter products based on category and search
  const filteredProducts = allProducts.filter((product) => {
    const productBadge = getProductBadge(product, language);
    const matchesCategory =
      selectedCategory === allCategoryLabel ||
      productBadge === selectedCategory;
    const productTitle = getProductTitle(product, language);
    const productDesc = getProductDescription(product, language);
    const productShortDesc = getProductShortDescription(product, language);
    const matchesSearch =
      !searchQuery ||
      productTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productDesc.toLowerCase().includes(searchQuery.toLowerCase()) ||
      productShortDesc.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />

      {/* Shop Header */}
      <section className="pt-24 pb-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-[#332B2B] mb-4">
            {t.shop.title}
          </h1>
          <p className="text-lg text-[#5C4A37] max-w-2xl">
            {t.shop.description}
          </p>
          {searchQuery && (
            <div className="mt-4">
              <p className="text-[#5C4A37]">
                {t.shop.searchResults}{" "}
                <span className="font-semibold text-[#332B2B]">
                  "{searchQuery}"
                </span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    window.history.pushState({}, "", "/shop");
                    window.dispatchEvent(new PopStateEvent("popstate"));
                  }}
                  className="ml-2 text-[#5C4A37] hover:text-[#332B2B] underline"
                >
                  {t.shop.clear}
                </button>
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Category Tabs */}
      <section className="py-8 bg-[#F5F0E8] border-b border-[#8B7355]/20">
        <div className="container mx-auto px-4">
          <div className="flex gap-4 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-300 ${
                  selectedCategory === category
                    ? "bg-[#5C4A37] text-white"
                    : "bg-white text-[#5C4A37] border-2 border-[#5C4A37] hover:bg-[#5C4A37] hover:text-white"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-20 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Shop;

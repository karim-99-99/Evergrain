import { useState, useEffect, useRef } from "react";
import { Link } from "../utils/Router";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";
import { useAuth } from "../context/AuthContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const { language, toggleLanguage } = useLanguage();
  const { isAdmin, logout } = useAuth();
  const t = language === "ar" ? ar : en;

  const categories =
    language === "ar"
      ? [
          "الكل",
          "الأكثر مبيعاً",
          "وصل حديثاً",
          "شائع",
          "محدود",
          "بقي اثنان فقط",
        ]
      : [
          "ALL",
          "BEST SELLER",
          "NEW ARRIVAL",
          "POPULAR",
          "LIMITED",
          "ONLY TWO LEFT",
        ];

  const handleCategoryClick = (category) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    // Navigate to shop with category
    window.history.pushState({}, "", `/shop?category=${category}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      // Navigate to shop with search query
      window.history.pushState(
        {},
        "",
        `/shop?search=${encodeURIComponent(searchQuery)}`
      );
      window.dispatchEvent(new PopStateEvent("popstate"));
      setSearchQuery("");
    }
  };

  // Close search when clicking outside
  const searchRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    if (isSearchOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#8B7355]/20">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between min-w-0">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1 sm:gap-2 md:gap-3 min-w-0 shrink-0">
            <img
              src="/logo.png"
              alt="Evergrain Logo"
              className="h-6 sm:h-8 md:h-10 w-auto object-contain shrink-0"
              style={{
                mixBlendMode: "multiply",
                filter: "contrast(1.1) brightness(0.95)",
              }}
            />
            <span className="text-sm sm:text-lg md:text-2xl font-bold text-[#332B2B] tracking-wide truncate">
              EVERGRAIN
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/shop"
              className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium"
            >
              {t.nav.shop}
            </Link>
            <Link
              to="/about"
              className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium"
            >
              {t.nav.about}
            </Link>
            <Link
              to="/contact"
              className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium"
            >
              {t.nav.contact}
            </Link>
            {isAdmin && (
              <Link
                to="/admin"
                className="text-[#5C4A37] hover:text-[#332B2B] transition-colors duration-300 font-medium font-semibold"
              >
                Admin
              </Link>
            )}
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 px-2 py-0.5 sm:px-3 sm:py-1 rounded border border-[#8B7355]/30 hover:border-[#5C4A37] text-xs sm:text-sm font-medium"
            >
              {language === "ar" ? "EN" : "عربي"}
            </button>
            <div className="relative mt-2">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Search Dropdown */}
              {isSearchOpen && (
                <div
                  ref={searchRef}
                  className="absolute  right-0 mt-8 w-96 bg-white rounded-lg shadow-2xl border border-[#8B7355]/20 z-50"
                >
                  <div className="p-4">
                    <form onSubmit={handleSearchSubmit} className="mb-4">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          placeholder={t.search.placeholder}
                          className="flex-1 px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                          autoFocus
                        />
                        <button
                          type="submit"
                          className="bg-[#5C4A37] text-white px-4 py-2 rounded-lg hover:bg-[#4A3A2A] transition-colors"
                        >
                          {t.search.search}
                        </button>
                      </div>
                    </form>

                    <div className="border-t border-[#8B7355]/20 pt-4">
                      <p className="text-sm font-semibold text-[#332B2B] mb-3">
                        {t.search.browseCategory}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => handleCategoryClick(category)}
                            className="px-4 py-2 text-sm bg-[#F5F0E8] text-[#5C4A37] rounded-lg hover:bg-[#5C4A37] hover:text-white transition-colors duration-300 text-left"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            {/* Login (when not admin) / Logout (when admin) */}
            {!isAdmin ? (
              <Link
                to="/admin"
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300"
                title={t.admin.signIn}
                aria-label={t.admin.signIn}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
              </Link>
            ) : (
              <button
                type="button"
                onClick={logout}
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300"
                title={t.admin.signOut}
                aria-label={t.admin.signOut}
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4"
                  />
                </svg>
              </button>
            )}
            <Link
              to="/cart"
              className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 relative"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 sm:-top-2 sm:-right-2 bg-[#5C4A37] text-white text-[10px] sm:text-xs rounded-full w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#332B2B]"
            >
              <svg
                className="w-5 h-5 sm:w-6 sm:h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#8B7355]/20">
            <nav className="flex flex-col gap-4 mt-4">
              <Link
                to="/shop"
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium"
              >
                {t.nav.shop}
              </Link>
              <Link
                to="/about"
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium"
              >
                {t.nav.about}
              </Link>
              <Link
                to="/contact"
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium"
              >
                {t.nav.contact}
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="text-[#5C4A37] hover:text-[#332B2B] transition-colors duration-300 font-medium font-semibold"
                >
                  Admin
                </Link>
              )}
              {!isAdmin ? (
                <Link
                  to="/admin"
                  className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium"
                >
                  {t.admin.signIn}
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setIsMenuOpen(false);
                    logout();
                  }}
                  className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium text-left"
                >
                  {t.admin.signOut}
                </button>
              )}
              <button
                onClick={toggleLanguage}
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium text-left"
              >
                {language === "ar" ? "English" : "العربية"}
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

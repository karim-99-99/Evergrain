import { useState, useEffect, useRef } from 'react';
import { Link, useRouter } from '../utils/Router';
import { useCart } from '../context/CartContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { getCartCount } = useCart();
  const cartCount = getCartCount();
  const currentPath = useRouter();

  const categories = ['ALL', 'BEST SELLER', 'NEW ARRIVAL', 'POPULAR', 'LIMITED', 'ONLY TWO LEFT'];

  const handleCategoryClick = (category) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    // Navigate to shop with category
    window.history.pushState({}, '', `/shop?category=${category}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchOpen(false);
      // Navigate to shop with search query
      window.history.pushState({}, '', `/shop?search=${encodeURIComponent(searchQuery)}`);
      window.dispatchEvent(new PopStateEvent('popstate'));
      setSearchQuery('');
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
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSearchOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#F5F0E8]/95 backdrop-blur-sm border-b border-[#8B7355]/20">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Evergrain Logo" 
              className="h-10 w-auto object-contain"
              style={{ 
                mixBlendMode: 'multiply',
                filter: 'contrast(1.1) brightness(0.95)'
              }}
            />
            <span className="text-2xl font-bold text-[#332B2B] tracking-wide">EVERGRAIN</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link to="/shop" className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium">
              Shop
            </Link>
            <Link to="/about" className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium">
              About
            </Link>
            <Link to="/contact" className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium">
              Contact
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
              
              {/* Search Dropdown */}
              {isSearchOpen && (
                <div ref={searchRef} className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-2xl border border-[#8B7355]/20 z-50">
                <div className="p-4">
                  <form onSubmit={handleSearchSubmit} className="mb-4">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search products..."
                        className="flex-1 px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                        autoFocus
                      />
                      <button
                        type="submit"
                        className="bg-[#5C4A37] text-white px-4 py-2 rounded-lg hover:bg-[#4A3A2A] transition-colors"
                      >
                        Search
                      </button>
                    </div>
                  </form>
                  
                  <div className="border-t border-[#8B7355]/20 pt-4">
                    <p className="text-sm font-semibold text-[#332B2B] mb-3">Browse by Category:</p>
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
            <button className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </button>
            <Link to="/cart" className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 relative">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#5C4A37] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-[#332B2B]"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-[#8B7355]/20">
            <nav className="flex flex-col gap-4 mt-4">
              <Link to="/shop" className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium">
                Shop
              </Link>
              <Link to="/about" className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium">
                About
              </Link>
              <Link to="/contact" className="text-[#332B2B] hover:text-[#8B7355] transition-colors duration-300 font-medium">
                Contact
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;




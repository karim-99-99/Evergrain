import { useState, useEffect } from 'react';
import { Link, useRouter } from '../utils/Router';
import Header from '../components/Header';
import Footer from '../components/Footer';
// Import all images
import photo1 from '../assets/photo1.png';
import photo2 from '../assets/photo2.jpg';
import photo3 from '../assets/photo3.jpg';
import photo4 from '../assets/photo4.jpg';
import photo5 from '../assets/photo5.jpg';
import photo6 from '../assets/photo6.jpg';
import photo7 from '../assets/photo7.jpg';
import photo8 from '../assets/photo8.jpg';
import photo9 from '../assets/photo9.jpg';

const Shop = () => {
  // All products using all available photos
  const allProducts = [
    {
      id: 1,
      title: "Heritage Cutting Board",
      description: "Solid walnut, edge grain Fine Detail.",
      price: "$85",
      badge: "BEST SELLER",
      image: photo1
    },
    {
      id: 2,
      title: "Walnut Utensil Set",
      description: "Source material, Hand-finished, comfortable.",
      price: "$55",
      badge: "NEW ARRIVAL",
      image: photo2
    },
    {
      id: 3,
      title: "Walnut Carving Board",
      description: "Knife rest, designed for carving.",
      price: "$110",
      badge: "ONLY TWO LEFT",
      image: photo3
    },
    {
      id: 4,
      title: "Walnut End Grain Board",
      description: "Solid walnut, edge grain. Made of thick hand construction.",
      price: "$95",
      badge: "NEW ARRIVAL",
      image: photo4
    },
    {
      id: 5,
      title: "Premium Cutting Board",
      description: "Handcrafted from premium hardwood with elegant finish.",
      price: "$120",
      badge: "BEST SELLER",
      image: photo5
    },
    {
      id: 6,
      title: "Classic Wooden Board",
      description: "Timeless design, perfect for any kitchen.",
      price: "$75",
      badge: "POPULAR",
      image: photo6
    },
    {
      id: 7,
      title: "Artisan Kitchen Board",
      description: "Beautifully crafted with attention to detail.",
      price: "$90",
      badge: "NEW ARRIVAL",
      image: photo7
    },
    {
      id: 8,
      title: "Master Craft Board",
      description: "Expertly made from select hardwood materials.",
      price: "$105",
      badge: "BEST SELLER",
      image: photo8
    },
    {
      id: 9,
      title: "Signature Collection Board",
      description: "Premium quality, designed for the discerning chef.",
      price: "$135",
      badge: "LIMITED",
      image: photo9
    }
  ];

  const currentPath = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['ALL', 'BEST SELLER', 'NEW ARRIVAL', 'POPULAR', 'LIMITED', 'ONLY TWO LEFT'];

  // Read URL parameters on mount and when path changes
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryParam = urlParams.get('category');
    const searchParam = urlParams.get('search');
    
    if (categoryParam) {
      setSelectedCategory(categoryParam);
      setSearchQuery('');
    } else if (searchParam) {
      setSearchQuery(searchParam);
      setSelectedCategory('ALL');
    }
  }, [currentPath]);

  // Filter products based on category and search
  const filteredProducts = allProducts.filter(product => {
    const matchesCategory = selectedCategory === 'ALL' || product.badge === selectedCategory;
    const matchesSearch = !searchQuery || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />
      
      {/* Shop Header */}
      <section className="pt-24 pb-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-[#332B2B] mb-4">
            Our Complete Collection
          </h1>
          <p className="text-lg text-[#5C4A37] max-w-2xl">
            Explore our full range of handcrafted wooden kitchenware, each piece carefully made from the finest hardwoods.
          </p>
          {searchQuery && (
            <div className="mt-4">
              <p className="text-[#5C4A37]">
                Search results for: <span className="font-semibold text-[#332B2B]">"{searchQuery}"</span>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    window.history.pushState({}, '', '/shop');
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  className="ml-2 text-[#5C4A37] hover:text-[#332B2B] underline"
                >
                  Clear
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
                    ? 'bg-[#5C4A37] text-white'
                    : 'bg-white text-[#5C4A37] border-2 border-[#5C4A37] hover:bg-[#5C4A37] hover:text-white'
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
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
                {/* Badge */}
                <div className="relative">
                  <div className="absolute top-4 left-4 z-10">
                    <span className="bg-[#5C4A37] text-white px-3 py-1 rounded text-xs font-semibold">
                      {product.badge}
                    </span>
                  </div>
                  <Link to={`/product/${product.id}`}>
                    <img 
                      src={product.image} 
                      alt={product.title}
                      className="aspect-square w-full object-cover cursor-pointer"
                    />
                  </Link>
                </div>
                
                {/* Product Info */}
                <div className="p-6">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-xl font-bold text-[#332B2B] mb-2 hover:text-[#5C4A37] transition-colors cursor-pointer">{product.title}</h3>
                  </Link>
                  <p className="text-[#5C4A37] text-sm mb-4">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-[#332B2B]">{product.price}</span>
                    <Link to={`/product/${product.id}`}>
                      <button className="bg-[#5C4A37] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#4A3A2A] transition-colors duration-300">
                        View Details
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


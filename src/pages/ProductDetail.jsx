import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useRouter } from '../utils/Router';
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

// All products data
const allProducts = [
  {
    id: 1,
    title: "Heritage Cutting Board",
    description: "Solid walnut, edge grain Fine Detail. This premium cutting board is crafted from the finest American walnut hardwood, featuring elegant edge grain construction that showcases the natural beauty of the wood.",
    price: "$85",
    badge: "BEST SELLER",
    images: [photo1, photo2, photo3],
    features: ["Solid American walnut hardwood", "Edge grain construction", "2-inch thick", "Hand-finished"],
    dimensions: "18\" x 12\" x 2\"",
    weight: "5.2 lbs"
  },
  {
    id: 2,
    title: "Walnut Utensil Set",
    description: "Source material, Hand-finished, comfortable. A complete set of kitchen utensils crafted from premium walnut, designed for both functionality and aesthetic appeal.",
    price: "$55",
    badge: "NEW ARRIVAL",
    images: [photo2, photo4, photo5],
    features: ["Premium walnut wood", "Hand-finished", "Comfortable grip", "Set of 5 pieces"],
    dimensions: "Various sizes",
    weight: "1.8 lbs"
  },
  {
    id: 3,
    title: "Walnut Carving Board",
    description: "Knife rest, designed for carving. This specialized carving board features a built-in knife rest and juice groove, perfect for carving meats and serving.",
    price: "$110",
    badge: "ONLY TWO LEFT",
    images: [photo3, photo6, photo7],
    features: ["Built-in knife rest", "Juice groove", "End grain construction", "Large surface area"],
    dimensions: "24\" x 16\" x 2.5\"",
    weight: "8.5 lbs"
  },
  {
    id: 4,
    title: "Walnut End Grain Board",
    description: "Solid walnut, edge grain. Made of thick hand construction. This end grain board is the ultimate choice for serious chefs, offering superior knife protection.",
    price: "$95",
    badge: "NEW ARRIVAL",
    images: [photo4, photo8, photo9],
    features: ["End grain construction", "Thick hand construction", "Superior knife protection", "Natural antibacterial properties"],
    dimensions: "20\" x 14\" x 2\"",
    weight: "6.8 lbs"
  },
  {
    id: 5,
    title: "Premium Cutting Board",
    description: "Handcrafted from premium hardwood with elegant finish. This board combines beauty and durability for the modern kitchen.",
    price: "$120",
    badge: "BEST SELLER",
    images: [photo5, photo1, photo3],
    features: ["Premium hardwood", "Elegant finish", "Durable construction", "Easy maintenance"],
    dimensions: "22\" x 15\" x 2\"",
    weight: "7.2 lbs"
  },
  {
    id: 6,
    title: "Classic Wooden Board",
    description: "Timeless design, perfect for any kitchen. A versatile board that works for cutting, chopping, and serving.",
    price: "$75",
    badge: "POPULAR",
    images: [photo6, photo2, photo4],
    features: ["Timeless design", "Versatile use", "Easy to clean", "Natural wood finish"],
    dimensions: "16\" x 12\" x 1.5\"",
    weight: "4.5 lbs"
  },
  {
    id: 7,
    title: "Artisan Kitchen Board",
    description: "Beautifully crafted with attention to detail. Each board is unique, showcasing the natural grain patterns of the wood.",
    price: "$90",
    badge: "NEW ARRIVAL",
    images: [photo7, photo5, photo8],
    features: ["Unique grain patterns", "Artisan crafted", "Attention to detail", "Natural beauty"],
    dimensions: "18\" x 13\" x 2\"",
    weight: "5.8 lbs"
  },
  {
    id: 8,
    title: "Master Craft Board",
    description: "Expertly made from select hardwood materials. This board represents the pinnacle of craftsmanship and quality.",
    price: "$105",
    badge: "BEST SELLER",
    images: [photo8, photo9, photo1],
    features: ["Select hardwood", "Master craftsmanship", "Premium quality", "Lifetime durability"],
    dimensions: "20\" x 14\" x 2.5\"",
    weight: "7.5 lbs"
  },
  {
    id: 9,
    title: "Signature Collection Board",
    description: "Premium quality, designed for the discerning chef. This signature piece combines elegance with functionality.",
    price: "$135",
    badge: "LIMITED",
    images: [photo9, photo7, photo6],
    features: ["Signature design", "Premium quality", "Discerning chef quality", "Limited edition"],
    dimensions: "24\" x 16\" x 2.5\"",
    weight: "9.2 lbs"
  }
];

const ProductDetail = () => {
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const currentPath = useRouter();

  useEffect(() => {
    // Get product ID from URL
    const productId = parseInt(currentPath.split('/product/')[1]);
    const foundProduct = allProducts.find(p => p.id === productId);
    setProduct(foundProduct);
    if (foundProduct) {
      setSelectedImage(0);
    }
  }, [currentPath]);

  const handleAddToCart = () => {
    if (product) {
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      // Show success message or navigate to cart
      alert(`${quantity} ${product.title}(s) added to cart!`);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <Header />
        <div className="pt-24 pb-12 text-center">
          <p className="text-2xl text-[#5C4A37]">Product not found</p>
          <Link to="/shop" className="text-[#5C4A37] hover:text-[#332B2B] mt-4 inline-block">
            Back to Shop
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />
      
      <section className="pt-24 pb-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-6 text-sm text-[#5C4A37]">
            <Link to="/" className="hover:text-[#332B2B]">Home</Link>
            <span className="mx-2">/</span>
            <Link to="/shop" className="hover:text-[#332B2B]">Shop</Link>
            <span className="mx-2">/</span>
            <span className="text-[#332B2B]">{product.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              {/* Main Image */}
              <div className="mb-4 bg-white rounded-lg overflow-hidden shadow-lg">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.title}
                  className="w-full h-[500px] object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow ${
                      selectedImage === index ? 'ring-2 ring-[#5C4A37]' : ''
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.title} view ${index + 1}`}
                      className="w-full h-32 object-cover"
                    />
                  </button>
                ))}
              </div>
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
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                  </svg>
                ))}
                <span className="text-sm text-[#5C4A37] ml-2">(17 reviews)</span>
              </div>
              
              <p className="text-3xl font-bold text-[#332B2B] mb-6">{product.price}</p>
              
              <p className="text-lg text-[#5C4A37] leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#332B2B] mb-4">Features:</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-[#5C4A37]">
                      <svg className="w-5 h-5 text-[#5C4A37] mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Specifications */}
              <div className="mb-8 p-4 bg-white rounded-lg shadow-md">
                <h3 className="text-lg font-bold text-[#332B2B] mb-3">Specifications:</h3>
                <div className="grid grid-cols-2 gap-4 text-[#5C4A37]">
                  <div>
                    <span className="font-medium">Dimensions:</span>
                    <p>{product.dimensions}</p>
                  </div>
                  <div>
                    <span className="font-medium">Weight:</span>
                    <p>{product.weight}</p>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="border-t border-[#8B7355]/20 pt-8">
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-lg font-medium text-[#332B2B]">Quantity:</label>
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
                      onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
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
                  Add to Cart
                </button>
                
                <Link to="/shop" className="block text-center text-[#5C4A37] hover:text-[#332B2B] transition-colors">
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ProductDetail;


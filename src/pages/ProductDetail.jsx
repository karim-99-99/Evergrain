import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link, useRouter } from '../utils/Router';
import { useLanguage } from '../context/LanguageContext';
import { en } from '../translations/en';
import { ar } from '../translations/ar';
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

const ProductDetail = () => {
  const { language } = useLanguage();
  const t = language === 'ar' ? ar : en;
  
  // All products data with translations
  const allProducts = [
  {
    id: 1,
    title: t.products.heritage.title,
    description: t.products.heritage.description,
    price: "$85",
      badge: language === 'ar' ? 'الأكثر مبيعاً' : "BEST SELLER",
    images: [photo1, photo2, photo3],
    features: [t.home.features.solidWalnut, t.home.features.edgeGrain, t.home.features.twoInchThick, t.home.features.handFinished],
    dimensions: "18\" x 12\" x 2\"",
    weight: "5.2 lbs"
  },
  {
    id: 2,
    title: t.products.utensil.title,
    description: t.products.utensil.description,
    price: "$55",
      badge: language === 'ar' ? 'وصل حديثاً' : "NEW ARRIVAL",
    images: [photo2, photo4, photo5],
    features: [t.home.features.premiumWalnut, t.home.features.handFinished, t.home.features.comfortableGrip, t.home.features.setOfFive],
    dimensions: "Various sizes",
    weight: "1.8 lbs"
  },
  {
    id: 3,
    title: t.products.carving.title,
    description: t.products.carving.description,
    price: "$110",
      badge: language === 'ar' ? 'بقي اثنان فقط' : "ONLY TWO LEFT",
    images: [photo3, photo6, photo7],
    features: [t.home.features.knifeRest, t.home.features.juiceGroove, t.home.features.endGrain, t.home.features.largeSurface],
    dimensions: "24\" x 16\" x 2.5\"",
    weight: "8.5 lbs"
  },
  {
    id: 4,
    title: t.products.endGrain.title,
    description: t.products.endGrain.description,
    price: "$95",
      badge: language === 'ar' ? 'وصل حديثاً' : "NEW ARRIVAL",
    images: [photo4, photo8, photo9],
    features: [t.home.features.endGrain, t.home.features.thickHandConstruction, t.home.features.superiorKnifeProtection, t.home.features.naturalAntibacterial],
    dimensions: "20\" x 14\" x 2\"",
    weight: "6.8 lbs"
  },
  {
    id: 5,
    title: t.products.premium.title,
    description: t.products.premium.description,
    price: "$120",
      badge: language === 'ar' ? 'الأكثر مبيعاً' : "BEST SELLER",
    images: [photo5, photo1, photo3],
    features: [t.home.features.premiumHardwood, t.home.features.elegantFinish, t.home.features.durableConstruction, t.home.features.easyMaintenance],
    dimensions: "22\" x 15\" x 2\"",
    weight: "7.2 lbs"
  },
  {
    id: 6,
    title: t.products.classic.title,
    description: t.products.classic.description,
    price: "$75",
      badge: language === 'ar' ? 'شائع' : "POPULAR",
    images: [photo6, photo2, photo4],
    features: [t.home.features.timelessDesign, t.home.features.versatileUse, t.home.features.easyToClean, t.home.features.naturalWoodFinish],
    dimensions: "16\" x 12\" x 1.5\"",
    weight: "4.5 lbs"
  },
  {
    id: 7,
    title: t.products.artisan.title,
    description: t.products.artisan.description,
    price: "$90",
      badge: language === 'ar' ? 'وصل حديثاً' : "NEW ARRIVAL",
    images: [photo7, photo5, photo8],
    features: [t.home.features.uniqueGrainPatterns, t.home.features.artisanCrafted, t.home.features.attentionToDetail, t.home.features.naturalBeauty],
    dimensions: "18\" x 13\" x 2\"",
    weight: "5.8 lbs"
  },
  {
    id: 8,
    title: t.products.master.title,
    description: t.products.master.description,
    price: "$105",
      badge: language === 'ar' ? 'الأكثر مبيعاً' : "BEST SELLER",
    images: [photo8, photo9, photo1],
    features: [t.home.features.selectHardwood, t.home.features.masterCraftsmanship, t.home.features.premiumQuality, t.home.features.lifetimeDurability],
    dimensions: "20\" x 14\" x 2.5\"",
    weight: "7.5 lbs"
  },
  {
    id: 9,
    title: t.products.signature.title,
    description: t.products.signature.description,
    price: "$135",
      badge: language === 'ar' ? 'محدود' : "LIMITED",
    images: [photo9, photo7, photo6],
    features: [t.home.features.signatureDesign, t.home.features.premiumQuality, t.home.features.discerningChefQuality, t.home.features.limitedEdition],
    dimensions: "24\" x 16\" x 2.5\"",
    weight: "9.2 lbs"
  }
];

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
  }, [currentPath, allProducts]);

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
          <p className="text-2xl text-[#5C4A37]">{t.productDetail.notFound}</p>
          <Link to="/shop" className="text-[#5C4A37] hover:text-[#332B2B] mt-4 inline-block">
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
                <span className="text-sm text-[#5C4A37] ml-2">(17 {t.productDetail.reviews})</span>
              </div>
              
              <p className="text-3xl font-bold text-[#332B2B] mb-6">{product.price}</p>
              
              <p className="text-lg text-[#5C4A37] leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-xl font-bold text-[#332B2B] mb-4">{t.productDetail.features}</h3>
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
                <h3 className="text-lg font-bold text-[#332B2B] mb-3">{t.productDetail.specifications}</h3>
                <div className="grid grid-cols-2 gap-4 text-[#5C4A37]">
                  <div>
                    <span className="font-medium">{t.productDetail.dimensions}</span>
                    <p>{product.dimensions}</p>
                  </div>
                  <div>
                    <span className="font-medium">{t.productDetail.weight}</span>
                    <p>{product.weight}</p>
                  </div>
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="border-t border-[#8B7355]/20 pt-8">
                <div className="flex items-center gap-4 mb-6">
                  <label className="text-lg font-medium text-[#332B2B]">{t.productDetail.quantity}</label>
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
                  {t.productDetail.addToCart}
                </button>
                
                <Link to="/shop" className="block text-center text-[#5C4A37] hover:text-[#332B2B] transition-colors">
                  {t.productDetail.continueShopping}
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


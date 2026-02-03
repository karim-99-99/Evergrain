import { useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "../utils/Router";
import { useLanguage } from "../context/LanguageContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
// Import all images
import photo1 from "../wood/photo1.png";
import photo2 from "../wood/photo2.jpg";
import photo3 from "../wood/photo3.jpg";
import photo4 from "../wood/photo4.jpg";
import photo5 from "../wood/photo5.jpg";
import photo6 from "../wood/photo6.jpg";
import photo7 from "../wood/photo7.jpg";
import photo8 from "../wood/photo8.jpg";
import photo9 from "../wood/photo9.jpg";

// Product image mapping
const productImages = {
  1: photo1,
  2: photo2,
  3: photo3,
  4: photo4,
  5: photo5,
  6: photo6,
  7: photo7,
  8: photo8,
  9: photo9,
};

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, getCartTotal } = useCart();
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(false);

  const subtotal = getCartTotal() || 0;
  const shipping = subtotal >= 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleApplyDiscount = () => {
    if (discountCode.trim()) {
      setAppliedDiscount(true);
      // You can add discount logic here
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    updateQuantity(productId, parseInt(newQuantity) || 1);
  };

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />

      {/* Cart Header */}
      <section
        className="pt-24 pb-12 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/photo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-[#F5F0E8]/85"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center justify-between">
            <h1
              className="text-5xl md:text-6xl font-bold text-[#332B2B]"
              style={{
                textShadow: "2px 2px 4px rgba(255, 255, 255, 0.8)",
              }}
            >
              {t.cart.title}
            </h1>
            <div className="hidden md:block">
              <div className="w-32 h-32 bg-gradient-to-br from-[#8B7355] to-[#5C4A37] rounded-lg opacity-20 blur-sm"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-2xl text-[#5C4A37] mb-8">{t.cart.empty}</p>
              <Link to="/shop">
                <button className="bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300">
                  {t.cart.continueShopping}
                </button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cartItems.map((item) => {
                  if (!item || !item.id) return null;

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg p-6 shadow-lg flex flex-col md:flex-row gap-6"
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={
                            (item.images && item.images[0]) ??
                            item.image ??
                            productImages[item.id] ??
                            photo1
                          }
                          alt={item.title || "Product"}
                          className="w-32 h-32 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col md:flex-row justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-[#332B2B] mb-2">
                            {item.title || "Product"}
                          </h3>
                          <p className="text-sm text-[#5C4A37] mb-3">
                            {item.description || ""}
                          </p>
                          <div className="flex items-center gap-1 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <svg
                                key={i}
                                className="w-4 h-4 text-yellow-400 fill-current"
                                viewBox="0 0 20 20"
                              >
                                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                              </svg>
                            ))}
                            <span className="text-sm text-[#5C4A37] ml-2">
                              (17)
                            </span>
                          </div>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                          <div className="text-right">
                            <p className="text-2xl font-bold text-[#332B2B]">
                              {item.price}
                            </p>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                              <label className="text-sm text-[#5C4A37]">
                                {t.cart.quantity}
                              </label>
                              <select
                                value={item.quantity}
                                onChange={(e) =>
                                  handleQuantityChange(item.id, e.target.value)
                                }
                                className="border border-[#8B7355] rounded px-3 py-1 text-[#332B2B] focus:outline-none focus:border-[#5C4A37]"
                              >
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                                  <option key={num} value={num}>
                                    {num}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <p className="text-xl font-bold text-[#332B2B]">
                              $
                              {(
                                (parseFloat(
                                  (item.price || "$0").replace("$", "")
                                ) || 0) * (item.quantity || 1)
                              ).toFixed(2)}
                            </p>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-600 hover:text-red-800 transition-colors"
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
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg p-6 shadow-lg sticky top-24">
                  {/* Discount Code */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-[#332B2B] mb-2">
                      {t.cart.discountCode}
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={discountCode}
                        onChange={(e) => setDiscountCode(e.target.value)}
                        placeholder={t.cart.enterCode}
                        className="w-full border border-[#8B7355] rounded px-4 py-2 pr-24 md:pr-28 text-[#332B2B] focus:outline-none focus:border-[#5C4A37]"
                      />
                      <button
                        onClick={handleApplyDiscount}
                        className="absolute right-1 top-1/2 -translate-y-1/2 bg-[#5C4A37] text-white px-4 md:px-6 py-1.5 md:py-2 rounded font-semibold hover:bg-[#4A3A2A] transition-colors duration-300 text-sm md:text-base"
                      >
                        {t.cart.apply}
                      </button>
                    </div>
                  </div>

                  {/* Order Summary */}
                  <div className="border-t border-[#8B7355]/20 pt-6 mb-6">
                    <h3 className="text-lg font-bold text-[#332B2B] mb-4">
                      {t.cart.orderSummary}
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between text-[#5C4A37]">
                        <span>{t.cart.subtotal}</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-[#5C4A37]">
                        <span>{t.cart.shipping}:</span>
                        <span>
                          {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="border-t border-[#8B7355]/20 pt-3 flex justify-between">
                        <span className="text-lg font-bold text-[#332B2B]">
                          {t.cart.total}:
                        </span>
                        <span className="text-lg font-bold text-[#332B2B]">
                          ${total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Link to="/checkout" className="block w-full">
                    <button className="w-full bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors duration-300 mb-4">
                      {t.cart.proceedCheckout}
                    </button>
                  </Link>

                  <Link
                    to="/shop"
                    className="block text-center text-[#5C4A37] hover:text-[#332B2B] transition-colors"
                  >
                    {t.cart.continueShopping}
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Guarantees Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
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
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  />
                </svg>
              </div>
              <p className="text-[#332B2B] font-medium">
                Free Shipping on Orders Over $100
              </p>
            </div>
            <div className="flex flex-col items-center">
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
              <p className="text-[#332B2B] font-medium">{t.cart.moneyBack}</p>
            </div>
            <div className="flex flex-col items-center">
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
                    d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243 4.243 3 3 0 004.243-4.243zm0-5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z"
                  />
                </svg>
              </div>
              <p className="text-[#332B2B] font-medium">{t.cart.handcrafted}</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Cart;

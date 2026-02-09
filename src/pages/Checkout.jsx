import { useState, useMemo } from "react";
import { useCart } from "../context/CartContext";
import { useProducts } from "../context/ProductsContext";
import { getDefaultProducts } from "../data/defaultProducts";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "../utils/Router";
import { useLanguage } from "../context/LanguageContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
import { sendOrderEmail } from "../utils/emailService";
import { getProductPrice, getProductTitle } from "../utils/productText";

const Checkout = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const { removedIds, customProducts } = useProducts();
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;

  // Get all products (default + custom) similar to other pages
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

  // Enrich cart items with full product data from ProductsContext
  const enrichedCartItems = useMemo(() => {
    if (!allProducts || !Array.isArray(allProducts)) return [];
    return cartItems
      .map((cartItem) => {
        if (!cartItem || !cartItem.id) return null;
        const fullProduct = allProducts.find((p) => p && p.id === cartItem.id);
        if (fullProduct) {
          return { ...fullProduct, quantity: cartItem.quantity || 1 };
        }
        // If product not found, return minimal cart item
        return { ...cartItem, quantity: cartItem.quantity || 1 };
      })
      .filter((item) => item && item.id); // Filter out null/undefined items
  }, [cartItems, allProducts]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Calculate subtotal from cart items with discounted prices
  const calculateSubtotal = () => {
    let subtotal = 0;
    enrichedCartItems.forEach((item) => {
      const priceStr = getProductPrice(item, language);
      const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
      subtotal += priceNum * (item.quantity || 1);
    });
    return subtotal;
  };

  const subtotal = calculateSubtotal();

  // Total is just the subtotal (no shipping)
  const shipping = 0;
  const total = subtotal;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleConfirmOrder = async (e) => {
    e.preventDefault();
    if (
      !formData.name.trim() ||
      !formData.email.trim() ||
      !formData.phone.trim() ||
      !formData.location.trim()
    ) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      // Prepare order items using enrichedCartItems to get full product data including title
      const orderItems = enrichedCartItems.map((item) => {
        if (!item || !item.id) return null;
        const priceStr = getProductPrice(item, language);
        const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
        const qty = item.quantity || 1;
        const lineTotal = (priceNum * qty).toFixed(2);
        return {
          title: getProductTitle(item, language) || "Product",
          quantity: qty,
          price: priceStr,
          lineTotal,
        };
      }).filter(item => item !== null); // Filter out null items

      // Send email via EmailJS
      await sendOrderEmail({
        customerName: formData.name.trim(),
        customerEmail: formData.email.trim(),
        customerPhone: formData.phone.trim(),
        customerLocation: formData.location.trim(),
        items: orderItems,
        subtotal,
        shipping,
        total,
      });

      // Success - clear cart and show thank you
      setOrderPlaced(true);
      clearCart();
    } catch (error) {
      console.error("Failed to send order email:", error);
      setSubmitError(
        error.message ||
          t.checkout.emailError ||
          "Failed to send order. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (enrichedCartItems.length === 0 && !orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <Header />
        <section className="pt-24 pb-12 min-h-[50vh] flex items-center justify-center">
          <div className="container mx-auto px-4 text-center">
            <p className="text-2xl text-[#5C4A37] mb-6">
              {t.checkout.emptyCart}
            </p>
            <Link to="/cart">
              <button className="bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors">
                {t.checkout.backToCart}
              </button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <Header />
        <section className="pt-24 pb-12 min-h-[60vh] flex items-center justify-center">
          <div className="container mx-auto px-4 text-center max-w-lg">
            <div className="bg-white rounded-lg p-8 shadow-lg">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
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
              <h2 className="text-2xl font-bold text-[#332B2B] mb-2">
                {t.checkout.thankYou}
              </h2>
              <p className="text-[#5C4A37] mb-6">{t.checkout.orderConfirmed}</p>
              <Link to="/shop">
                <button className="bg-[#5C4A37] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors">
                  {t.checkout.continueShopping}
                </button>
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />

      <section
        className="pt-24 pb-12 relative overflow-hidden"
        style={{
          backgroundImage: 'url("/photo.jpg")',
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[#F5F0E8]/85" />
        <div className="container mx-auto px-4 relative z-10">
          <h1
            className="text-5xl md:text-6xl font-bold text-[#332B2B]"
            style={{ textShadow: "2px 2px 4px rgba(255,255,255,0.8)" }}
          >
            {t.checkout.title}
          </h1>
          <p className="text-lg text-[#5C4A37] mt-2">
            {t.checkout.description}
          </p>
        </div>
      </section>

      <section className="py-12 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <form
            onSubmit={handleConfirmOrder}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Delivery details */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg p-8 shadow-lg">
                <h2 className="text-2xl font-bold text-[#332B2B] mb-6">
                  {t.checkout.deliveryDetails}
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-[#332B2B] mb-2">
                      {t.checkout.name} *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                      placeholder={t.checkout.namePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#332B2B] mb-2">
                      {t.checkout.email} *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                      placeholder={t.checkout.emailPlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#332B2B] mb-2">
                      {t.checkout.phone} *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                      placeholder={t.checkout.phonePlaceholder}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#332B2B] mb-2">
                      {t.checkout.location} *
                    </label>
                    <textarea
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full px-4 py-3 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B] resize-none"
                      placeholder={t.checkout.locationPlaceholder}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg p-6 shadow-lg sticky top-24">
                <h3 className="text-xl font-bold text-[#332B2B] mb-4">
                  {t.checkout.orderSummary}
                </h3>
                <div className="space-y-2 mb-4 max-h-48 overflow-y-auto">
                  {enrichedCartItems.map((item) => {
                    const priceStr = getProductPrice(item, language);
                    const priceNum =
                      parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
                    const currencyMatch = priceStr.match(/(\$|جنيه|EG|ج\.م)/);
                    const currency = currencyMatch
                      ? currencyMatch[0]
                      : language === "ar"
                      ? "جنيه"
                      : "EG";
                    const total = priceNum * (item.quantity || 1);
                    const formatPrice = (num) => {
                      if (currency === "$") {
                        return `$${num.toFixed(2)}`;
                      }
                      return `${num.toFixed(2)} ${currency}`;
                    };
                    return (
                      <div
                        key={item.id}
                        className="flex justify-between text-sm text-[#5C4A37]"
                      >
                        <span className="truncate flex-1 mr-2">
                          {getProductTitle(item, language)} × {item.quantity}
                        </span>
                        <span className="font-medium text-[#332B2B]">
                          {formatPrice(total)}
                        </span>
                      </div>
                    );
                  })}
                </div>
                <div className="border-t border-[#8B7355]/20 pt-4 space-y-2">
                  <div className="flex justify-between text-[#5C4A37]">
                    <span>{t.cart.subtotal}</span>
                    <span>
                      {subtotal.toFixed(2)} {language === "ar" ? "جنيه" : "EG"}
                    </span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-[#332B2B] pt-2 border-t border-[#8B7355]/20">
                    <span>{t.cart.total}</span>
                    <span>
                      {total.toFixed(2)} {language === "ar" ? "جنيه" : "EG"}
                    </span>
                  </div>
                </div>
                {submitError && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{submitError}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-6 bg-[#5C4A37] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? t.checkout.sending || "Sending..."
                    : t.checkout.confirmOrder}
                </button>
                <Link
                  to="/cart"
                  className="block text-center text-[#5C4A37] hover:text-[#332B2B] mt-3 text-sm"
                >
                  {t.checkout.backToCart}
                </Link>
              </div>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Checkout;

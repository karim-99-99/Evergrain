/**
 * Get product text field in the current language
 * Supports both bilingual format (title_en, title_ar) and legacy format (title)
 * @param {Object} product - Product object
 * @param {string} field - Field name (e.g., 'title', 'description')
 * @param {string} language - Current language ('en' or 'ar')
 * @returns {string} Text in the requested language, or fallback
 */
export const getProductText = (product, field, language = "en") => {
  if (!product) return "";

  // Try bilingual format first (title_en, title_ar)
  const bilingualKey = `${field}_${language}`;
  if (
    product[bilingualKey] !== undefined &&
    product[bilingualKey] !== null &&
    product[bilingualKey] !== ""
  ) {
    return product[bilingualKey];
  }

  // Fallback to legacy format (title, description, etc.)
  if (
    product[field] !== undefined &&
    product[field] !== null &&
    product[field] !== ""
  ) {
    return product[field];
  }

  // Try other language as last resort
  const otherLang = language === "en" ? "ar" : "en";
  const otherBilingualKey = `${field}_${otherLang}`;
  if (
    product[otherBilingualKey] !== undefined &&
    product[otherBilingualKey] !== null &&
    product[otherBilingualKey] !== ""
  ) {
    return product[otherBilingualKey];
  }

  return "";
};

/**
 * Get product title in current language
 */
export const getProductTitle = (product, language = "en") => {
  return getProductText(product, "title", language) || "Product";
};

/**
 * Get product description in current language
 */
export const getProductDescription = (product, language = "en") => {
  return getProductText(product, "description", language);
};

/**
 * Get product short description in current language
 */
export const getProductShortDescription = (product, language = "en") => {
  return (
    getProductText(product, "shortDescription", language) ||
    getProductDescription(product, language)
  );
};

/**
 * Get product badge in current language
 */
export const getProductBadge = (product, language = "en") => {
  return (
    getProductText(product, "badge", language) ||
    (language === "ar" ? "وصل حديثاً" : "NEW ARRIVAL")
  );
};

/**
 * Get product features in current language
 * Returns array of features
 */
export const getProductFeatures = (product, language = "en") => {
  if (!product) return [];

  // Try bilingual format
  const bilingualKey = `features_${language}`;
  if (Array.isArray(product[bilingualKey])) {
    return product[bilingualKey];
  }

  // Fallback to legacy format
  if (Array.isArray(product.features)) {
    return product.features;
  }

  // Try other language
  const otherLang = language === "en" ? "ar" : "en";
  const otherBilingualKey = `features_${otherLang}`;
  if (Array.isArray(product[otherBilingualKey])) {
    return product[otherBilingualKey];
  }

  return [];
};

/**
 * Get product price in current language
 */
export const getProductPrice = (product, language = "en") => {
  if (!product) return "$0";

  // Try bilingual format first
  const priceKey = `price_${language}`;
  if (
    product[priceKey] !== undefined &&
    product[priceKey] !== null &&
    product[priceKey] !== ""
  ) {
    return product[priceKey];
  }

  // Fallback to legacy format
  if (
    product.price !== undefined &&
    product.price !== null &&
    product.price !== ""
  ) {
    return product.price;
  }

  // Try other language as last resort
  const otherLang = language === "en" ? "ar" : "en";
  const otherPriceKey = `price_${otherLang}`;
  if (
    product[otherPriceKey] !== undefined &&
    product[otherPriceKey] !== null &&
    product[otherPriceKey] !== ""
  ) {
    return product[otherPriceKey];
  }

  return "$0";
};

/**
 * Calculate original price (current price + 20%)
 * @param {string} priceStr - Current price string (e.g., "$100" or "600 جنيه")
 * @returns {string} Original price string
 */
export const getOriginalPrice = (priceStr) => {
  if (!priceStr) return "$0";

  // Extract number from price string
  const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, "")) || 0;
  if (priceNum === 0) return priceStr;

  // Calculate original price (add 20%)
  const originalPrice = priceNum * 1.2;

  // Preserve currency format
  if (priceStr.includes("$")) {
    return `$${originalPrice.toFixed(2)}`;
  } else if (
    priceStr.includes("جنيه") ||
    priceStr.includes("EG") ||
    priceStr.includes("ج.م")
  ) {
    const currencyMatch = priceStr.match(/(جنيه|EG|ج\.م)/);
    const currency = currencyMatch ? currencyMatch[0] : "جنيه";
    return `${originalPrice.toFixed(2)} ${currency}`;
  }

  // Default: return with 2 decimal places
  return originalPrice.toFixed(2);
};

/**
 * Get discount percentage (always 20% for now)
 */
export const getDiscountPercentage = () => {
  return 20;
};

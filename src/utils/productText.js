// Helper function to detect if text contains Arabic characters
const containsArabic = (text) => {
  if (!text || typeof text !== "string") return false;
  const arabicRegex = /[\u0600-\u06FF]/;
  return arabicRegex.test(text);
};

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
  const bilingualValue = product[bilingualKey];
  
  if (
    bilingualValue !== undefined &&
    bilingualValue !== null &&
    bilingualValue !== ""
  ) {
    // If requesting English but field contains Arabic, try Arabic field instead
    if (language === "en" && containsArabic(bilingualValue)) {
      const arValue = product[`${field}_ar`];
      if (arValue && arValue.trim() && !containsArabic(arValue)) {
        // Arabic field has English content - use it
        return arValue;
      }
      // Otherwise, check legacy field
      const legacyValue = product[field];
      if (legacyValue && !containsArabic(legacyValue)) {
        return legacyValue;
      }
    }
    // If requesting Arabic but field contains English, try English field instead
    if (language === "ar" && !containsArabic(bilingualValue)) {
      const enValue = product[`${field}_en`];
      if (enValue && enValue.trim() && containsArabic(enValue)) {
        // English field has Arabic content - use it
        return enValue;
      }
    }
    return bilingualValue;
  }

  // Fallback to legacy format (title, description, etc.)
  const legacyValue = product[field];
  if (
    legacyValue !== undefined &&
    legacyValue !== null &&
    legacyValue !== ""
  ) {
    // Check if legacy value matches requested language
    if (language === "en" && !containsArabic(legacyValue)) {
      return legacyValue;
    }
    if (language === "ar" && containsArabic(legacyValue)) {
      return legacyValue;
    }
  }

  // Try other language as last resort
  const otherLang = language === "en" ? "ar" : "en";
  const otherBilingualKey = `${field}_${otherLang}`;
  const otherValue = product[otherBilingualKey];
  if (
    otherValue !== undefined &&
    otherValue !== null &&
    otherValue !== ""
  ) {
    // Check if other language value matches requested language
    if (language === "en" && !containsArabic(otherValue)) {
      return otherValue;
    }
    if (language === "ar" && containsArabic(otherValue)) {
      return otherValue;
    }
    // If no match, return anyway as last resort
    return otherValue;
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
  const badge = getProductText(product, "badge", language);
  if (badge) {
    // Verify badge matches requested language
    const hasArabic = containsArabic(badge);
    if (language === "en" && hasArabic) {
      // Badge is Arabic but we want English - try other sources
      const enBadge = product.badge_en;
      if (enBadge && !containsArabic(enBadge)) {
        return enBadge;
      }
      return "NEW ARRIVAL"; // Default English
    }
    if (language === "ar" && !hasArabic) {
      // Badge is English but we want Arabic - try other sources
      const arBadge = product.badge_ar;
      if (arBadge && containsArabic(arBadge)) {
        return arBadge;
      }
      return "وصل حديثاً"; // Default Arabic
    }
    return badge;
  }
  return language === "ar" ? "وصل حديثاً" : "NEW ARRIVAL";
};

/**
 * Get product features in current language
 * Returns array of features
 */
export const getProductFeatures = (product, language = "en") => {
  if (!product) return [];

  // Try bilingual format
  const bilingualKey = `features_${language}`;
  const bilingualFeatures = product[bilingualKey];
  
  if (Array.isArray(bilingualFeatures) && bilingualFeatures.length > 0) {
    // Check if English features contain Arabic
    if (language === "en") {
      const hasArabic = bilingualFeatures.some(f => containsArabic(String(f)));
      if (hasArabic) {
        // Try Arabic field instead
        const arFeatures = product.features_ar;
        if (Array.isArray(arFeatures) && arFeatures.length > 0) {
          const arHasArabic = arFeatures.some(f => containsArabic(String(f)));
          if (!arHasArabic) {
            // Arabic field has English content - use it
            return arFeatures;
          }
        }
        // Try legacy features
        if (Array.isArray(product.features)) {
          const legacyHasArabic = product.features.some(f => containsArabic(String(f)));
          if (!legacyHasArabic) {
            return product.features;
          }
        }
      }
    }
    // Check if Arabic features contain English
    if (language === "ar") {
      const hasArabic = bilingualFeatures.some(f => containsArabic(String(f)));
      if (!hasArabic) {
        // Try English field instead
        const enFeatures = product.features_en;
        if (Array.isArray(enFeatures) && enFeatures.length > 0) {
          const enHasArabic = enFeatures.some(f => containsArabic(String(f)));
          if (enHasArabic) {
            // English field has Arabic content - use it
            return enFeatures;
          }
        }
      }
    }
    return bilingualFeatures;
  }

  // Fallback to legacy format
  if (Array.isArray(product.features) && product.features.length > 0) {
    const hasArabic = product.features.some(f => containsArabic(String(f)));
    if (language === "en" && !hasArabic) {
      return product.features;
    }
    if (language === "ar" && hasArabic) {
      return product.features;
    }
  }

  // Try other language
  const otherLang = language === "en" ? "ar" : "en";
  const otherBilingualKey = `features_${otherLang}`;
  const otherFeatures = product[otherBilingualKey];
  if (Array.isArray(otherFeatures) && otherFeatures.length > 0) {
    const hasArabic = otherFeatures.some(f => containsArabic(String(f)));
    if (language === "en" && !hasArabic) {
      return otherFeatures;
    }
    if (language === "ar" && hasArabic) {
      return otherFeatures;
    }
    // Return anyway as last resort
    return otherFeatures;
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
  const priceValue = product[priceKey];
  
  if (
    priceValue !== undefined &&
    priceValue !== null &&
    priceValue !== ""
  ) {
    // If requesting English but price contains Arabic (جنيه, etc.)
    if (language === "en" && containsArabic(String(priceValue))) {
      // Try Arabic field instead
      const arPrice = product.price_ar;
      if (arPrice && !containsArabic(String(arPrice))) {
        return arPrice;
      }
      // Try legacy price
      const legacyPrice = product.price;
      if (legacyPrice && !containsArabic(String(legacyPrice))) {
        return legacyPrice;
      }
    }
    // If requesting Arabic but price contains English ($, EG)
    if (language === "ar" && !containsArabic(String(priceValue))) {
      // Try English field instead
      const enPrice = product.price_en;
      if (enPrice && containsArabic(String(enPrice))) {
        return enPrice;
      }
    }
    return priceValue;
  }

  // Fallback to legacy format
  const legacyPrice = product.price;
  if (
    legacyPrice !== undefined &&
    legacyPrice !== null &&
    legacyPrice !== ""
  ) {
    const hasArabic = containsArabic(String(legacyPrice));
    if (language === "en" && !hasArabic) {
      return legacyPrice;
    }
    if (language === "ar" && hasArabic) {
      return legacyPrice;
    }
  }

  // Try other language as last resort
  const otherLang = language === "en" ? "ar" : "en";
  const otherPriceKey = `price_${otherLang}`;
  const otherPrice = product[otherPriceKey];
  if (
    otherPrice !== undefined &&
    otherPrice !== null &&
    otherPrice !== ""
  ) {
    const hasArabic = containsArabic(String(otherPrice));
    if (language === "en" && !hasArabic) {
      return otherPrice;
    }
    if (language === "ar" && hasArabic) {
      return otherPrice;
    }
    // Return anyway as last resort
    return otherPrice;
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

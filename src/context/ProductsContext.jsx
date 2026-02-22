import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "evergrain_products";

// localStorage has ~5MB limit; product data with base64 images/videos often exceeds it — never crash, just skip saving
const safeSaveToStorage = (payload) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // QuotaExceededError or other — data stays in memory; use initial-products.json in repo for persistence
  }
};

const loadSaved = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { removedIds: [], customProducts: [] };
    const data = JSON.parse(raw);
    return {
      removedIds: Array.isArray(data.removedIds) ? data.removedIds : [],
      customProducts: Array.isArray(data.customProducts)
        ? data.customProducts
        : [],
    };
  } catch {
    return { removedIds: [], customProducts: [] };
  }
};

const ProductsContext = createContext();

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductsProvider");
  }
  return context;
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2000;

export const ProductsProvider = ({ children }) => {
  // Load from localStorage FIRST for instant display, then update from initial-products.json
  const saved = loadSaved();
  const [removedIds, setRemovedIds] = useState(saved.removedIds || []);
  const [customProducts, setCustomProducts] = useState(saved.customProducts || []);
  // Show loading only when we have no cached data (e.g. first mobile visit)
  const [isLoading, setIsLoading] = useState(saved.customProducts?.length === 0);

  // Load from Django API (if VITE_API_URL set) or initial-products.json
  useEffect(() => {
    const base =
      typeof import.meta.env !== "undefined" && import.meta.env.BASE_URL
        ? import.meta.env.BASE_URL
        : "/";
    const apiBase = (typeof import.meta.env !== "undefined" && import.meta.env.VITE_API_URL) || "";
    const url = apiBase
      ? `${apiBase.replace(/\/$/, "")}/api/initial-products.json`
      : `${base}initial-products.json`;

    const doFetch = (attempt = 0) => {
      const cacheBuster = `?v=${Date.now()}`;
      fetch(`${url}${cacheBuster}`, { cache: "no-cache" })
        .then((r) => {
          if (!r.ok) throw new Error(`HTTP error! status: ${r.status}`);
          return r.json();
        })
        .then((data) => {
          if (data) {
            const products = Array.isArray(data.customProducts)
              ? data.customProducts
              : [];
            const ids = Array.isArray(data.removedIds) ? data.removedIds : [];
            console.log(`Loaded ${products.length} products from ${apiBase ? "API" : "initial-products.json"}`);
            setCustomProducts(products);
            setRemovedIds(ids);
            safeSaveToStorage({ removedIds: ids, customProducts: products });
          } else {
            console.warn("initial-products.json is empty, using localStorage fallback");
            if (saved.customProducts.length > 0 || saved.removedIds.length > 0) {
              setCustomProducts(saved.customProducts);
              setRemovedIds(saved.removedIds);
            }
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(`Failed to load products (attempt ${attempt + 1}/${MAX_RETRIES}):`, error);
          if (attempt < MAX_RETRIES - 1) {
            setTimeout(() => doFetch(attempt + 1), RETRY_DELAY_MS);
          } else {
            if (saved.customProducts.length > 0 || saved.removedIds.length > 0) {
              setCustomProducts(saved.customProducts);
              setRemovedIds(saved.removedIds);
            }
            setIsLoading(false);
          }
        });
    };
    doFetch();
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    safeSaveToStorage({ removedIds, customProducts });
  }, [removedIds, customProducts]);

  const addProduct = (product) => {
    const maxId = Math.max(0, ...customProducts.map((p) => p.id), 9);
    const media =
      Array.isArray(product.media) && product.media.length > 0
        ? product.media.filter(
            (m) => m && (m.type === "image" || m.type === "video") && m.url
          )
        : (Array.isArray(product.images)
            ? product.images
            : product.image
            ? [product.image]
            : []
          )
            .filter(Boolean)
            .map((url) => ({ type: "image", url }));
    const imageUrls = media.filter((m) => m.type === "image").map((m) => m.url);
    const firstImageUrl = imageUrls[0] || media[0]?.url || "";
    const newProduct = {
      id: maxId + 1,
      // Bilingual fields
      title_en: product.title_en || product.title || "New Product",
      title_ar: product.title_ar || "",
      description_en: product.description_en || product.description || "",
      description_ar: product.description_ar || "",
      shortDescription_en:
        product.shortDescription_en || product.shortDescription || "",
      shortDescription_ar: product.shortDescription_ar || "",
      badge_en: product.badge_en || product.badge || "NEW ARRIVAL",
      badge_ar: product.badge_ar || "",
      features_en: product.features_en || product.features || [],
      features_ar: product.features_ar || [],
      // Legacy fields for backward compatibility
      title: product.title_en || product.title || "New Product",
      description: product.description_en || product.description || "",
      shortDescription:
        product.shortDescription_en || product.shortDescription || "",
      badge: product.badge_en || product.badge || "NEW ARRIVAL",
      features: product.features_en || product.features || [],
      // Price fields - bilingual
      price_en: product.price_en || product.price || "$0",
      price_ar: product.price_ar || "",
      // Legacy price field for backward compatibility
      price: product.price_en || product.price || "$0",
      media: media.length > 0 ? media : [],
      image: firstImageUrl,
      images:
        imageUrls.length > 0 ? imageUrls : firstImageUrl ? [firstImageUrl] : [],
    };
    setCustomProducts((prev) => [...prev, newProduct]);
  };

  const removeProduct = (id) => {
    if (id >= 1 && id <= 9) {
      setRemovedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
    } else {
      setCustomProducts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const updateProduct = (id, updates) => {
    if (id >= 1 && id <= 9) return;
    setCustomProducts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const next = { ...p, ...updates };
        if (Array.isArray(next.media) && next.media.length > 0) {
          const imageUrls = next.media
            .filter((m) => m.type === "image")
            .map((m) => m.url);
          next.image = imageUrls[0] || next.media[0]?.url || "";
          next.images =
            imageUrls.length > 0 ? imageUrls : next.image ? [next.image] : [];
        }
        return next;
      })
    );
  };

  return (
    <ProductsContext.Provider
      value={{
        removedIds,
        customProducts,
        isLoading,
        addProduct,
        removeProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

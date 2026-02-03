import { createContext, useContext, useState, useEffect } from "react";

const STORAGE_KEY = "evergrain_products";

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

export const ProductsProvider = ({ children }) => {
  const [removedIds, setRemovedIds] = useState(() => loadSaved().removedIds);
  const [customProducts, setCustomProducts] = useState(
    () => loadSaved().customProducts
  );

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ removedIds, customProducts })
    );
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
      title: product.title || "New Product",
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      price: product.price || "$0",
      badge: product.badge || "NEW ARRIVAL",
      media: media.length > 0 ? media : [],
      image: firstImageUrl,
      images:
        imageUrls.length > 0 ? imageUrls : firstImageUrl ? [firstImageUrl] : [],
      features: product.features || [],
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
    if (id >= 1 && id <= 9) return; // default products not editable
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
        addProduct,
        removeProduct,
        updateProduct,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

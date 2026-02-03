import { useState } from "react";
import { Link } from "../utils/Router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";
import { useProducts } from "../context/ProductsContext";
import { useLanguage } from "../context/LanguageContext";
import { en } from "../translations/en";
import { ar } from "../translations/ar";
import { getDefaultProducts } from "../data/defaultProducts";
import { getProductMedia } from "../utils/productMedia";

const Admin = () => {
  const { language } = useLanguage();
  const t = language === "ar" ? ar : en;
  const { isAdmin, login, logout } = useAuth();
  const {
    removedIds,
    customProducts,
    addProduct,
    removeProduct,
    updateProduct,
  } = useProducts();

  const [editingId, setEditingId] = useState(null); // product id when editing
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newShortDescription, setNewShortDescription] = useState("");
  const [newPrice, setNewPrice] = useState("");
  const [newBadge, setNewBadge] = useState("NEW ARRIVAL");
  const [newFeatures, setNewFeatures] = useState("");
  const [mediaItems, setMediaItems] = useState([]); // { type: 'image'|'video', url: string }[] in order of insert
  const [newImageUrlInput, setNewImageUrlInput] = useState("");
  const [newVideoUrlInput, setNewVideoUrlInput] = useState("");

  const defaultProducts = getDefaultProducts(t, language);
  const allProducts = [
    ...defaultProducts.filter((p) => !removedIds.includes(p.id)),
    ...customProducts,
  ];

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    if (!login(username, password)) {
      setError(t.admin.invalidCredentials);
    }
  };

  const resetForm = () => {
    setEditingId(null);
    setNewTitle("");
    setNewDescription("");
    setNewShortDescription("");
    setNewPrice("");
    setNewBadge("NEW ARRIVAL");
    setNewFeatures("");
    setMediaItems([]);
    setNewImageUrlInput("");
    setNewVideoUrlInput("");
  };

  const startEdit = (product) => {
    if (product.id >= 1 && product.id <= 9) return; // default products not editable
    setEditingId(product.id);
    setNewTitle(product.title || "");
    setNewDescription(product.description || "");
    setNewShortDescription(product.shortDescription || "");
    setNewPrice(product.price || "");
    setNewBadge(product.badge || "NEW ARRIVAL");
    setNewFeatures((product.features || []).join("\n"));
    setMediaItems(getProductMedia(product));
    setNewImageUrlInput("");
    setNewVideoUrlInput("");
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    const features = newFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    addProduct({
      title: newTitle.trim() || "New Product",
      description: newDescription.trim(),
      shortDescription: newShortDescription.trim(),
      price: newPrice.trim() || "$0",
      badge: newBadge.trim() || "NEW ARRIVAL",
      features: features.length > 0 ? features : [],
      media: mediaItems.length > 0 ? mediaItems : undefined,
    });
    resetForm();
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    const features = newFeatures
      .split("\n")
      .map((f) => f.trim())
      .filter(Boolean);
    updateProduct(editingId, {
      title: newTitle.trim() || "New Product",
      description: newDescription.trim(),
      shortDescription: newShortDescription.trim(),
      price: newPrice.trim() || "$0",
      badge: newBadge.trim() || "NEW ARRIVAL",
      features: features.length > 0 ? features : [],
      media: mediaItems.length > 0 ? mediaItems : undefined,
    });
    resetForm();
  };

  const addMediaItem = (type, url) => {
    const u = typeof url === "string" ? url.trim() : "";
    if (!u) return;
    setMediaItems((prev) => [...prev, { type, url: u }]);
  };
  const removeMediaItem = (index) =>
    setMediaItems((prev) => prev.filter((_, i) => i !== index));

  const MAX_IMAGE_SIZE_MB = 2;
  const MAX_VIDEO_SIZE_MB = 20;
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const maxBytes = MAX_IMAGE_SIZE_MB * 1024 * 1024;
    const validFiles = files.filter((f) => f.size <= maxBytes);
    const readAsDataURL = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    Promise.all(validFiles.map(readAsDataURL)).then((dataUrls) => {
      setMediaItems((prev) => [
        ...prev,
        ...dataUrls.map((url) => ({ type: "image", url })),
      ]);
    });
    e.target.value = "";
  };
  const handleVideoFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;
    const maxBytes = MAX_VIDEO_SIZE_MB * 1024 * 1024;
    const validFiles = files.filter((f) => f.size <= maxBytes);
    const readAsDataURL = (file) =>
      new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.readAsDataURL(file);
      });
    Promise.all(validFiles.map(readAsDataURL)).then((dataUrls) => {
      setMediaItems((prev) => [
        ...prev,
        ...dataUrls.map((url) => ({ type: "video", url })),
      ]);
    });
    e.target.value = "";
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-[#F5F0E8]">
        <Header />
        <section className="pt-24 pb-12 min-h-[60vh] flex items-center justify-center">
          <div className="container mx-auto px-4 max-w-md">
            <h1 className="text-3xl font-bold text-[#332B2B] mb-6 text-center">
              {t.admin.login}
            </h1>
            <form
              onSubmit={handleLogin}
              className="bg-white rounded-lg shadow-lg border border-[#8B7355]/20 p-6 space-y-4"
            >
              {error && (
                <p className="text-red-600 text-sm bg-red-50 p-2 rounded">
                  {error}
                </p>
              )}
              <div>
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.username}
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.password}
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-[#5C4A37] text-white py-3 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors"
              >
                {t.admin.signIn}
              </button>
            </form>
            <p className="mt-4 text-center text-sm text-[#5C4A37]">
              Default: admin / admin
            </p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0E8]">
      <Header />
      <section className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <h1 className="text-4xl font-bold text-[#332B2B]">
              {t.admin.title}
            </h1>
            <div className="flex gap-3">
              <Link
                to="/shop"
                className="bg-white text-[#5C4A37] border-2 border-[#5C4A37] px-4 py-2 rounded-lg font-medium hover:bg-[#5C4A37] hover:text-white transition-colors"
              >
                {t.admin.backToShop}
              </Link>
              <button
                onClick={logout}
                className="bg-[#332B2B] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#5C4A37] transition-colors"
              >
                {t.admin.signOut}
              </button>
            </div>
          </div>

          {/* Export: localhost → Vercel (download file, put in repo, push) */}
          <div className="bg-[#5C4A37]/10 border border-[#5C4A37]/30 rounded-lg p-4 mb-6">
            <h3 className="font-bold text-[#332B2B] mb-2">
              {t.admin.exportForVercel}
            </h3>
            <p className="text-sm text-[#5C4A37] mb-3">
              {t.admin.exportForVercelHint}
            </p>
            <ol className="text-sm text-[#5C4A37] list-decimal list-inside mb-3 space-y-1">
              <li>{t.admin.exportStep1}</li>
              <li>{t.admin.exportStep2}</li>
              <li>{t.admin.exportStep3}</li>
            </ol>
            <button
              type="button"
              onClick={() => {
                const data = { removedIds, customProducts };
                const blob = new Blob([JSON.stringify(data, null, 2)], {
                  type: "application/json",
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement("a");
                a.href = url;
                a.download = "initial-products.json";
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="bg-[#5C4A37] text-white px-4 py-2 rounded-lg font-medium hover:bg-[#4A3A2A] transition-colors"
            >
              {t.admin.downloadProductsJson}
            </button>
          </div>

          {/* Add / Edit Product Form */}
          <div className="bg-white rounded-lg shadow-lg border border-[#8B7355]/20 p-6 mb-10">
            <h2 className="text-xl font-bold text-[#332B2B] mb-4">
              {editingId ? t.admin.editProductTitle : t.admin.addProduct}
            </h2>
            <form
              onSubmit={editingId ? handleSaveEdit : handleAddProduct}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              <div>
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.newTitle}
                </label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                  placeholder="e.g. Oak Cutting Board"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.newPrice}
                </label>
                <input
                  type="text"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                  placeholder="$99"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.newDescription}
                </label>
                <textarea
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  className="w-full min-h-[120px] px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B] resize-y"
                  placeholder="Add your product description (multiple lines supported)"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.newShortDescription}
                </label>
                <p className="text-xs text-[#5C4A37] mb-1">
                  {t.admin.shortDescriptionHint}
                </p>
                <textarea
                  value={newShortDescription}
                  onChange={(e) => setNewShortDescription(e.target.value)}
                  className="w-full min-h-[80px] px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B] resize-y"
                  placeholder={t.admin.shortDescriptionPlaceholder}
                  rows={2}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.newBadge}
                </label>
                <input
                  type="text"
                  value={newBadge}
                  onChange={(e) => setNewBadge(e.target.value)}
                  className="w-full px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B]"
                  placeholder="NEW ARRIVAL"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.newFeatures}
                </label>
                <textarea
                  value={newFeatures}
                  onChange={(e) => setNewFeatures(e.target.value)}
                  className="w-full min-h-[120px] px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B] resize-y"
                  placeholder="Add features, one per line (e.g. Solid walnut hardwood)"
                  rows={4}
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#332B2B] mb-1">
                  {t.admin.imagesAndVideos}
                </label>
                <p className="text-xs text-[#5C4A37] mb-2">
                  {t.admin.mediaOrderHint}
                </p>
                {mediaItems.length > 0 && (
                  <ul className="space-y-2 mb-3">
                    {mediaItems.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-center gap-2 flex-wrap bg-[#F5F0E8]/50 rounded-lg p-2"
                      >
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-medium ${
                            item.type === "video"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-[#5C4A37]/10 text-[#5C4A37]"
                          }`}
                        >
                          {item.type === "video"
                            ? t.admin.video
                            : t.admin.image}
                        </span>
                        <span className="flex-1 min-w-0 truncate text-sm text-[#332B2B]">
                          {item.url.startsWith("data:")
                            ? t.admin.uploadedImage
                            : item.url}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeMediaItem(index)}
                          className="px-2 py-1 text-red-600 hover:text-red-700 border border-[#8B7355]/30 rounded"
                          title={t.admin.removeProduct}
                        >
                          ×
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex flex-wrap gap-2 items-end">
                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="url"
                      value={newImageUrlInput}
                      onChange={(e) => setNewImageUrlInput(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                      className="w-full px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B] text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addMediaItem("image", newImageUrlInput);
                        setNewImageUrlInput("");
                      }}
                      className="mt-1 text-sm text-[#5C4A37] hover:text-[#332B2B] font-medium"
                    >
                      + {t.admin.addImageUrl}
                    </button>
                  </div>
                  <div className="flex-1 min-w-[200px]">
                    <input
                      type="url"
                      value={newVideoUrlInput}
                      onChange={(e) => setNewVideoUrlInput(e.target.value)}
                      placeholder="https://youtube.com/... or .mp4 URL"
                      className="w-full px-4 py-2 border border-[#8B7355] rounded-lg focus:outline-none focus:border-[#5C4A37] text-[#332B2B] text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        addMediaItem("video", newVideoUrlInput);
                        setNewVideoUrlInput("");
                      }}
                      className="mt-1 text-sm text-[#5C4A37] hover:text-[#332B2B] font-medium"
                    >
                      + {t.admin.addVideoUrl}
                    </button>
                  </div>
                </div>
                <p className="mt-3 text-sm text-[#5C4A37] font-medium">
                  {t.admin.uploadFromPc}
                </p>
                <div className="mt-2 flex flex-wrap gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#F5F0E8] text-[#5C4A37] rounded-lg border border-[#8B7355]/30 hover:bg-[#5C4A37] hover:text-white transition-colors">
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
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    {t.admin.chooseImages}
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                  <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-[#F5F0E8] text-[#5C4A37] rounded-lg border border-[#8B7355]/30 hover:bg-[#5C4A37] hover:text-white transition-colors">
                    <svg
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
                    </svg>
                    {t.admin.chooseVideos}
                    <input
                      type="file"
                      accept="video/*"
                      multiple
                      onChange={handleVideoFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
                <p className="mt-1 text-xs text-[#8B7355]">
                  {t.admin.uploadSizeHint}
                </p>
              </div>
              <div className="md:col-span-2 flex justify-end gap-3">
                {editingId && (
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-6 py-2 rounded-lg font-semibold border-2 border-[#8B7355] text-[#5C4A37] hover:bg-[#F5F0E8] transition-colors"
                  >
                    {t.admin.cancelEdit}
                  </button>
                )}
                <button
                  type="submit"
                  className="bg-[#5C4A37] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#4A3A2A] transition-colors"
                >
                  {editingId ? t.admin.saveEdit : t.admin.submitAdd}
                </button>
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-white rounded-lg shadow-lg border border-[#8B7355]/20 overflow-hidden">
            <h2 className="text-xl font-bold text-[#332B2B] p-4 border-b border-[#8B7355]/20">
              {t.admin.productList}
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#F5F0E8] text-left text-sm font-semibold text-[#332B2B]">
                    <th className="p-4">#</th>
                    <th className="p-4">Image</th>
                    <th className="p-4">Title</th>
                    <th className="p-4">Price</th>
                    <th className="p-4">Badge</th>
                    <th className="p-4">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {allProducts.map((product) => (
                    <tr
                      key={product.id}
                      className="border-b border-[#8B7355]/10 hover:bg-[#F5F0E8]/50"
                    >
                      <td className="p-4 font-medium text-[#5C4A37]">
                        {product.id}
                      </td>
                      <td className="p-4">
                        <div className="relative inline-block">
                          {(product.images && product.images[0]) ||
                          product.image ? (
                            <img
                              src={
                                typeof (
                                  product.images?.[0] ?? product.image
                                ) === "string"
                                  ? product.images?.[0] ?? product.image
                                  : product.images?.[0] ?? product.image
                              }
                              alt={product.title}
                              className="w-14 h-14 object-cover rounded"
                            />
                          ) : (
                            <span className="text-[#8B7355] text-sm">—</span>
                          )}
                          {(product.images?.length ?? 0) > 1 && (
                            <span className="absolute bottom-0 right-0 bg-[#5C4A37] text-white text-xs px-1 rounded">
                              {product.images.length}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-4 text-[#332B2B]">{product.title}</td>
                      <td className="p-4 text-[#5C4A37] font-medium">
                        {product.price}
                      </td>
                      <td className="p-4">
                        <span className="bg-[#5C4A37]/10 text-[#5C4A37] px-2 py-1 rounded text-xs font-medium">
                          {product.badge}
                        </span>
                      </td>
                      <td className="p-4 flex flex-wrap gap-2">
                        {product.id > 9 && (
                          <button
                            type="button"
                            onClick={() => startEdit(product)}
                            className="text-[#5C4A37] hover:text-[#332B2B] font-medium text-sm"
                          >
                            {t.admin.editProduct}
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => removeProduct(product.id)}
                          className="text-red-600 hover:text-red-700 font-medium text-sm"
                        >
                          {t.admin.removeProduct}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {allProducts.length === 0 && (
              <p className="p-6 text-center text-[#5C4A37]">
                No products. Add one above or restore defaults by clearing
                removed items.
              </p>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Admin;

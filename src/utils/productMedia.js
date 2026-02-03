/**
 * Normalize product to an ordered list of media items (images and videos).
 * Order is preserved from product.media, or from product.images (all as image) for legacy products.
 * @param {{ media?: { type: 'image'|'video', url: string }[], images?: string[], image?: string }} product
 * @returns {{ type: 'image'|'video', url: string }[]}
 */
export function getProductMedia(product) {
  if (!product) return [];
  if (Array.isArray(product.media) && product.media.length > 0) {
    return product.media
      .map((m) => ({
        type: m.type === "video" ? "video" : "image",
        url: typeof m.url === "string" ? m.url : "",
      }))
      .filter((m) => m.url);
  }
  const images = product.images?.length
    ? product.images
    : product.image
    ? [product.image]
    : [];
  return images
    .filter((url) => typeof url === "string" && url)
    .map((url) => ({ type: "image", url }));
}

/**
 * Get first image URL from product (for cards/thumbnails).
 */
export function getProductFirstImageUrl(product) {
  const media = getProductMedia(product);
  const firstImage = media.find((m) => m.type === "image");
  return firstImage ? firstImage.url : media[0]?.url || "";
}

/**
 * Check if a URL is a YouTube or Vimeo URL for embed.
 */
export function getVideoEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const u = url.trim();
  // YouTube: watch or youtu.be
  const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0`;
  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  return null;
}

/**
 * Check if URL is likely a direct video file.
 */
export function isDirectVideoUrl(url) {
  if (!url || typeof url !== "string") return false;
  return /\.(mp4|webm|ogg)(\?|$)/i.test(url) || url.startsWith("data:video/");
}

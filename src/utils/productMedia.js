/**
 * Extract Google Drive FILE_ID from view/share/download links.
 */
function extractGoogleDriveFileId(url) {
  if (!url || typeof url !== "string") return null;
  const u = url.trim();
  const fileMatch = u.match(/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/);
  if (fileMatch) return fileMatch[1];
  const openMatch = u.match(/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/);
  if (openMatch) return openMatch[1];
  const ucMatch = u.match(/drive\.google\.com\/uc\?[^&]*id=([a-zA-Z0-9_-]+)/);
  if (ucMatch) return ucMatch[1];
  const thumbMatch = u.match(/drive\.google\.com\/thumbnail\?id=([a-zA-Z0-9_-]+)/);
  if (thumbMatch) return thumbMatch[1];
  return null;
}

/**
 * Check if URL is a Google Drive link (view or share).
 */
export function isGoogleDriveUrl(url) {
  return !!extractGoogleDriveFileId(url);
}

/** Image size for Drive thumbnails: small = fast load for cards, large = quality for detail */
const DRIVE_IMAGE_SIZES = { small: "w400", medium: "w800", large: "w1200" };

/**
 * Convert Google Drive view links to displayable URLs.
 * Images: thumbnail (works in Chrome, Firefox). Use size 'small' for cards/thumbnails to load faster.
 * Videos: iframe preview (works in Chrome, Firefox)
 */
export function toDisplayableDriveUrl(url, type, size = "large") {
  const fileId = extractGoogleDriveFileId(url);
  if (!fileId) return url;
  if (type === "video") {
    return `https://drive.google.com/file/d/${fileId}/view`;
  }
  const sz = DRIVE_IMAGE_SIZES[size] || DRIVE_IMAGE_SIZES.large;
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=${sz}`;
}

/**
 * Normalize product to an ordered list of media items (images and videos).
 * imageSize: 'small' for thumbnails (faster), 'large' for main detail view.
 */
export function getProductMedia(product, imageSize = "large") {
  if (!product) return [];
  const rawMedia = Array.isArray(product.media) && product.media.length > 0
    ? product.media.map((m) => ({
        type: m.type === "video" ? "video" : "image",
        url: typeof m.url === "string" ? m.url : "",
      }))
    : (product.images?.length ? product.images : product.image ? [product.image] : [])
        .filter((url) => typeof url === "string" && url)
        .map((url) => ({ type: "image", url }));

  return rawMedia
    .filter((m) => m.url)
    .map((m) => ({
      ...m,
      url: toDisplayableDriveUrl(m.url, m.type, m.type === "image" ? imageSize : "large"),
    }));
}

/**
 * Get first image URL from product. Use size 'small' for cards (faster), 'large' for detail.
 */
export function getProductFirstImageUrl(product, size = "small") {
  const media = getProductMedia(product, size);
  const firstImage = media.find((m) => m.type === "image");
  return firstImage ? firstImage.url : media[0]?.url || "";
}

/**
 * Get embed URL for videos (YouTube, Vimeo, Google Drive).
 */
export function getVideoEmbedUrl(url) {
  if (!url || typeof url !== "string") return null;
  const u = url.trim();
  const ytMatch = u.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s?]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=0`;
  const vimeoMatch = u.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
  const driveId = extractGoogleDriveFileId(u);
  if (driveId) return `https://drive.google.com/file/d/${driveId}/preview`;
  return null;
}

/**
 * Check if URL is a direct playable video (native video tag).
 */
export function isDirectVideoUrl(url) {
  if (!url || typeof url !== "string") return false;
  return (
    /\.(mp4|webm|ogg)(\?|$)/i.test(url) ||
    url.startsWith("data:video/")
  );
}

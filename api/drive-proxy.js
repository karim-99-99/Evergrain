/**
 * Same-origin proxy for Google Drive files.
 * Fixes Safari/Firefox blocking. Supports Range requests for Safari video playback.
 * Requires GOOGLE_DRIVE_API_KEY in Vercel Environment Variables.
 */
export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const fileId = req.query.id;
  if (!fileId) {
    return res.status(400).json({ error: "Missing id parameter" });
  }

  const apiKey = process.env.GOOGLE_DRIVE_API_KEY || process.env.VITE_GOOGLE_DRIVE_API_KEY;
  if (!apiKey) {
    return res.status(503).json({
      error: "Proxy not configured. Add GOOGLE_DRIVE_API_KEY or VITE_GOOGLE_DRIVE_API_KEY in Vercel → Settings → Environment Variables.",
    });
  }

  const driveUrl = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
  const rangeHeader = req.headers.range;

  const fetchHeaders = { "User-Agent": "Evergrain/1.0" };
  if (rangeHeader) fetchHeaders["Range"] = rangeHeader;

  try {
    const response = await fetch(driveUrl, { headers: fetchHeaders });

    if (!response.ok) {
      return res.status(response.status).json({
        error: `Drive API error: ${response.status}`,
      });
    }

    const contentType = response.headers.get("content-type") || "application/octet-stream";
    res.setHeader("Content-Type", contentType);
    res.setHeader("Cache-Control", "public, max-age=3600");
    res.setHeader("Accept-Ranges", "bytes");
    res.setHeader("Access-Control-Allow-Origin", "*");

    const buffer = await response.arrayBuffer();
    const bufferLength = buffer.byteLength;

    if (response.status === 206) {
      const contentRange = response.headers.get("content-range");
      if (contentRange) res.setHeader("Content-Range", contentRange);
      res.setHeader("Content-Length", bufferLength);
      res.status(206);
    }

    res.send(Buffer.from(buffer));
  } catch (err) {
    console.error("Drive proxy error:", err);
    return res.status(502).json({ error: "Failed to fetch from Drive" });
  }
}

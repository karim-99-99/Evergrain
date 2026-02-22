/**
 * Remove all images and videos from products in initial-products.json
 * Run: node scripts/remove-product-media.js
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const filePath = join(__dirname, "..", "public", "initial-products.json");

const data = JSON.parse(readFileSync(filePath, "utf-8"));
const products = data.customProducts || [];

let removedCount = 0;
products.forEach((product) => {
  const keysToRemove = ["media", "images", "image"];
  keysToRemove.forEach((key) => {
    if (key in product) {
      delete product[key];
      removedCount++;
    }
  });
});

writeFileSync(filePath, JSON.stringify(data), "utf-8");
console.log(`Done. Removed all images/videos from ${products.length} products.`);

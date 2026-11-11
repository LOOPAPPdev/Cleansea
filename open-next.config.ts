import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssetsIncrementalCache from "@opennextjs/cloudflare/overrides/incremental-cache/static-assets-incremental-cache";

/**
 * Prerendered pages (SSG with dynamicParams = false) MUST be served from an incremental
 * cache on Workers; without one they return 404 (NoFallbackError).
 * The site has no ISR/revalidation, so the read-only static-assets cache is enough.
 * Switch to R2 or KV when pages start to revalidate. See https://opennext.js.org/cloudflare/caching
 */
export default defineCloudflareConfig({
	incrementalCache: staticAssetsIncrementalCache,
	enableCacheInterception: true,
});

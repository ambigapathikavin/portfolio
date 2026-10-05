/**
 * Deployment-safe helpers for referencing files that live in /public.
 *
 * Why this exists:
 * Vite builds this app with `base: './'` so it can be hosted from a subpath
 * (e.g. https://<user>.github.io/<repo>/). Hardcoding a root-relative path
 * like '/images/tomato/healthy.jpg' resolves against the DOMAIN ROOT, not the
 * app folder, so it 404s on every subpath deploy and on `vite preview`.
 * `import.meta.env.BASE_URL` carries the correct public base at build time.
 *
 * For files inside src/ keep using a plain `import url from './file.png'` -
 * Vite fingerprints and rewrites those automatically. Do not pass them
 * through this helper.
 */

/** Normalised public base path, always with a single trailing slash. */
const getBase = (): string => {
  const base = import.meta.env.BASE_URL || '/';
  return base.endsWith('/') ? base : `${base}/`;
};

/**
 * Prefixes a public-folder-relative path with the build's base path.
 * Safe to call repeatedly; already-prefixed values are returned untouched.
 *
 * @example publicAsset('images/tomato/healthy.jpg')  // -> '/repo/images/tomato/healthy.jpg'
 * @example publicAsset('/portfolio.webp')            // -> '/repo/portfolio.webp'
 */
export const publicAsset = (path: string): string => {
  if (!path) return path;
  if (/^(https?:)?\/\//i.test(path) || path.startsWith('data:')) return path;

  const base = getBase();
  const relative = path.startsWith('/') ? path.slice(1) : path;
  const prefix = base === '/' ? '/' : base;

  // Don't double-prefix if the value is already base-qualified.
  if (relative.startsWith(prefix.slice(1)) && prefix !== '/') return relative;

  return `${prefix}${relative}`;
};

/**
 * Builds an `srcset`/`sizes` aware URL map for images in /public.
 * Returns entries in ascending width order, which is what browsers expect.
 */
export const publicImageSrcSet = (
  entries: Array<{ path: string; width: number }>
): string =>
  entries
    .map(({ path, width }) => `${publicAsset(path)} ${width}w`)
    .join(', ');

/**
 * Resolves a project's `imageUrl` from src/data/portfolioData.ts.
 *
 * That field accepts either shape:
 *   - a remote URL  -> 'https://images.unsplash.com/photo-...?w=1200'  (used as-is)
 *   - a local file  -> 'images/projects/power-bi-dashboard.png'      (base-prefixed)
 *
 * Local files must live in /public. Because the value is a plain string in a
 * data module, Vite cannot rewrite it the way it rewrites a literal `src`
 * attribute, so it has to be base-prefixed here or it will 404 on a subpath
 * deploy such as https://<user>.github.io/<repo>/.
 */
export const resolveProjectImage = (url?: string): string | undefined => {
  if (!url) return undefined;
  if (/^(https?:)?\/\//i.test(url) || url.startsWith('data:')) return url;
  return publicAsset(url);
};

/**
  * Deterministic fallback tile for a project image that fails to load (for
 * example the file was renamed but imageUrl was not updated).
  *
  * Returning a 1x1 transparent GIF and hiding the <img> means the surrounding
  * card keeps its shape and shows its text, instead of a browser broken-image
  * icon. Accent is the project's own accentColor so the fallback still looks
  * deliberate.
  */
export const BROKEN_IMAGE_FALLBACK =
  'data:image/gif;base64,R0lGODlhAQABAIAAAMLCwgAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==';

export const projectImageAccent = (accentColor?: string): string =>
  accentColor && /^#[0-9a-f]{6}$/i.test(accentColor) ? accentColor : '#06b6d4';
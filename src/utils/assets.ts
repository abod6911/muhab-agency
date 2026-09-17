/**
 * Universal Asset URL Resolver
 * Ensures all images and static assets load seamlessly across:
 * 1. GitHub Pages repository subpaths (e.g. https://user.github.io/repo-name/)
 * 2. Vercel & custom domain root paths (e.g. https://muhab.org/)
 * 3. Localhost development environments
 */
export const getAssetUrl = (path: string): string => {
  if (!path) return '';
  // Remote URLs (https://, http://, data:) remain unchanged
  if (/^(https?:|data:|\/\/)/.test(path)) {
    return path;
  }

  // Strip leading slash so it resolves cleanly relative to base
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const base = import.meta.env.BASE_URL || './';
  
  if (base.endsWith('/')) {
    return `${base}${cleanPath}`;
  }
  return `${base}/${cleanPath}`;
};

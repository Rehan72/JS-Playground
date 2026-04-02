import LZString from 'lz-string';

/**
 * Compress tabs data and encode into a URL-safe hash.
 */
export function encodeShareURL(tabs) {
  try {
    const data = JSON.stringify(tabs);
    const compressed = LZString.compressToEncodedURIComponent(data);
    const url = `${window.location.origin}${window.location.pathname}#code=${compressed}`;
    return url;
  } catch {
    return null;
  }
}

/**
 * Decode shared code from URL hash.
 * Returns array of tab objects or null.
 */
export function decodeShareURL() {
  try {
    const hash = window.location.hash;
    if (!hash || !hash.startsWith('#code=')) return null;
    const compressed = hash.slice(6);
    const data = LZString.decompressFromEncodedURIComponent(compressed);
    if (!data) return null;
    const tabs = JSON.parse(data);
    // Clean URL after loading
    window.history.replaceState(null, '', window.location.pathname);
    return tabs;
  } catch {
    return null;
  }
}

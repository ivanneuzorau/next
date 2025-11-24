/**
 * Dynamic loader for standalone web component from CDN
 * This allows apps to load the component from an external source
 */

export interface LoadWebComponentOptions {
  cdnUrl?: string;
  onLoad?: () => void;
  onError?: (error: Error) => void;
}

// Default CDN URL - GitHub Pages
const DEFAULT_CDN_URL = 'https://ivanneuzorau.github.io/next/sk8-pipelines.js';

let isLoaded = false;
let isLoading = false;
const loadCallbacks: Array<() => void> = [];
const errorCallbacks: Array<(error: Error) => void> = [];

export async function loadWebComponent(
  options: LoadWebComponentOptions = {}
): Promise<void> {
  const { cdnUrl = DEFAULT_CDN_URL, onLoad, onError } = options;

  // If already loaded, call callback immediately
  if (isLoaded) {
    onLoad?.();
    return Promise.resolve();
  }

  // Check if custom element is already defined
  if (typeof window !== 'undefined' && customElements.get('sk8-pipelines')) {
    isLoaded = true;
    onLoad?.();
    return Promise.resolve();
  }

  // If currently loading, queue the callback
  if (isLoading) {
    return new Promise((resolve, reject) => {
      if (onLoad) loadCallbacks.push(() => { onLoad(); resolve(); });
      if (onError) errorCallbacks.push((err) => { onError(err); reject(err); });
    });
  }

  isLoading = true;

  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = cdnUrl;
    script.async = true;

    script.onload = () => {
      isLoaded = true;
      isLoading = false;
      onLoad?.();
      loadCallbacks.forEach((cb) => cb());
      loadCallbacks.length = 0;
      resolve();
    };

    script.onerror = () => {
      isLoading = false;
      const error = new Error(`Failed to load web component from ${cdnUrl}`);
      onError?.(error);
      errorCallbacks.forEach((cb) => cb(error));
      errorCallbacks.length = 0;
      reject(error);
    };

    document.head.appendChild(script);
  });
}

/**
 * Check if web component is already loaded
 */
export function isWebComponentLoaded(): boolean {
  if (typeof window === 'undefined') return false;
  return isLoaded || customElements.get('sk8-pipelines') !== undefined;
}

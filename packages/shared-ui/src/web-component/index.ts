// Import types for web component
import './types';

// Export web component registration
export { default as PipelinesWebComponent } from './pipelines-web-component';

// Re-export for standalone usage
export { default } from './pipelines-web-component';

// Export CDN loader utilities
export { loadWebComponent, isWebComponentLoaded } from './loader';
export { WebComponentLoader } from './loader';


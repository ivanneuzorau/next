// TypeScript declarations for the sk8-pipelines web component
import 'react';

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'sk8-pipelines': React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          mode?: 'admin' | 'embedded';
          theme?: 'green' | 'blue';
          'tenant-id'?: string;
          'api-base-url'?: string;
        },
        HTMLElement
      >;
    }
  }
}

export {};


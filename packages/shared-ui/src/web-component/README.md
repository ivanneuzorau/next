# Pipelines Web Component

This directory contains the web component implementation of the Pipelines component.

## Files

- `pipelines-web-component.tsx` - Main web component implementation using `react-to-webcomponent`
- `standalone.ts` - Standalone bundle entry point
- `index.ts` - Module exports

## Usage

### In HTML

```html
<script type="module">
  import { PipelinesWebComponent } from '@sk8-workspace/shared-ui/web-component';
</script>

<sk8-pipelines 
  mode="embedded" 
  theme="blue" 
  tenant-id="xxx-ten-1">
</sk8-pipelines>
```

### In React/Next.js

```tsx
import '@sk8-workspace/shared-ui/web-component';

// Use as JSX
<sk8-pipelines mode="embedded" theme="blue" tenant-id="xxx-ten-1" />
```

## Attributes

- `mode`: `"admin"` | `"embedded"` (default: `"embedded"`)
- `theme`: `"green"` | `"blue"` (default: `"blue"`)
- `tenant-id`: string (required for embedded mode)
- `api-base-url`: string (optional, for standalone usage)

## Building

The web component is included in the main library build. To use it:

1. Build the shared-ui library: `npx nx build shared-ui`
2. Import from the build output: `import '@sk8-workspace/shared-ui/web-component'`

## API Configuration

The component expects an API endpoint at `/api/pipelines`. For standalone usage:

1. Set up a proxy server that forwards to the AWS API
2. Pass the proxy URL via `api-base-url` attribute
3. The component will use `${apiBaseUrl}/api/pipelines` instead of `/api/pipelines`


# Pipelines Web Component

The Pipelines component can be used as a web component (custom element) in any HTML page or framework.

## Two Usage Modes

1. **Standalone Bundle** (recommended for external users) - Single JavaScript file, no dependencies
2. **Module Import** (for React/Next.js apps) - Import as ES module

## Standalone Bundle (Recommended for External Use)

The standalone version is a single JavaScript file that includes everything needed. Perfect for embedding in any website.

### Building

```bash
npx nx build-web-component shared-ui
```

Output: `dist/packages/shared-ui/web-component/sk8-pipelines.js`

### Usage

```html
<script src="https://cdn.tailwindcss.com"></script>
<script src="./sk8-pipelines.js"></script>

<sk8-pipelines mode="embedded" theme="blue" tenant-id="xxx-ten-1"></sk8-pipelines>
```

See `STANDALONE.md` for complete standalone documentation.

---

## Module Import (For React/Next.js Apps)

## Installation

```bash
npm install @sk8-workspace/shared-ui react react-dom react-to-webcomponent
```

## Usage

### Option 1: Direct Import (ES Modules)

```html
<!DOCTYPE html>
<html>
<head>
  <script type="module">
    import { PipelinesWebComponent } from './path/to/shared-ui/dist/web-component/index.js';
    // Component is auto-registered as <sk8-pipelines>
  </script>
  <!-- Include Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <sk8-pipelines 
    mode="embedded" 
    theme="blue" 
    tenant-id="xxx-ten-1">
  </sk8-pipelines>
</body>
</html>
```

### Option 2: Standalone Script

```html
<!DOCTYPE html>
<html>
<head>
  <script src="./path/to/pipelines-web-component.js"></script>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <sk8-pipelines 
    mode="admin" 
    theme="green">
  </sk8-pipelines>
</body>
</html>
```

### Option 3: React/Next.js Application

```tsx
import { PipelinesWebComponent } from '@sk8-workspace/shared-ui/web-component';

// Component is auto-registered, use in JSX:
<sk8-pipelines mode="embedded" theme="blue" tenant-id="xxx-ten-1" />
```

## Attributes

All attributes are passed as strings and converted internally. Use kebab-case in HTML:

- `mode` - `"admin"` or `"embedded"` (default: `"embedded"`)
- `theme` - `"green"` or `"blue"` (default: `"blue"`)
- `tenant-id` - Tenant ID string (required for `embedded` mode)
- `api-base-url` - Optional API base URL for standalone usage (default: uses relative `/api/pipelines`)

**Note**: In HTML, use kebab-case (`tenant-id`, `api-base-url`). In React/JSX, you can use camelCase (`tenantId`, `apiBaseUrl`).

## API Configuration

The web component uses the same API endpoint logic as the React component. For standalone usage, you may need to:

1. **Set up API proxy**: Create an API endpoint that proxies requests to avoid CORS
2. **Configure base URL**: Modify the component to accept `api-base-url` attribute

Example with API base URL:

```html
<sk8-pipelines 
  mode="embedded" 
  theme="blue" 
  tenant-id="xxx-ten-1"
  api-base-url="https://your-api-proxy.com">
</sk8-pipelines>
```

**Important**: For standalone usage (outside Next.js), you need to:
1. Set up an API proxy that forwards requests to `https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines`
2. Pass the proxy URL via `api-base-url` attribute
3. The proxy should handle CORS and forward the `tenantId` query parameter

## Styling

The component uses Tailwind CSS. You need to include Tailwind in your page:

```html
<script src="https://cdn.tailwindcss.com"></script>
```

Or use your own Tailwind build that includes the component's classes.

## Browser Support

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 10.3+, macOS 10.13+)

## Limitations

1. **API Routes**: The component expects `/api/pipelines` endpoint. For standalone usage, you'll need to:
   - Set up a proxy server
   - Or modify `fetchPipelines` to use a configurable base URL

2. **Styling**: Tailwind CSS must be available globally. Shadow DOM is not used to allow Tailwind classes to work.

3. **React Dependency**: The web component still requires React and ReactDOM to be loaded.

## Building

To build the web component bundle:

```bash
npx nx build shared-ui
```

The web component will be available in the build output.

## Example: Vanilla HTML

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SK8 Pipelines Web Component</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <div class="container mx-auto p-4">
    <h1>My Application</h1>
    
    <sk8-pipelines 
      mode="embedded" 
      theme="blue" 
      tenant-id="xxx-ten-1">
    </sk8-pipelines>
  </div>
  
  <script type="module">
    // Import and register the component
    import './path/to/pipelines-web-component.js';
  </script>
</body>
</html>
```

## Example: Vue.js

```vue
<template>
  <div>
    <sk8-pipelines 
      :mode="'embedded'"
      :theme="'blue'"
      :tenant-id="tenantId">
    </sk8-pipelines>
  </div>
</template>

<script setup>
import '@sk8-workspace/shared-ui/web-component';
import { ref } from 'vue';

const tenantId = ref('xxx-ten-1');
</script>
```

## Example: Angular

```typescript
// component.ts
import { Component } from '@angular/core';
import '@sk8-workspace/shared-ui/web-component';

@Component({
  selector: 'app-pipelines',
  template: `
    <sk8-pipelines 
      [attr.mode]="'embedded'"
      [attr.theme]="'blue'"
      [attr.tenant-id]="tenantId">
    </sk8-pipelines>
  `,
})
export class PipelinesComponent {
  tenantId = 'xxx-ten-1';
}
```


# External Usage Guide

This guide shows how external customers can use the SK8 Pipelines component in their own applications.

## Quick Start

### Option 1: Direct Script Include (Simplest)

```html
<!DOCTYPE html>
<html>
<head>
  <title>My Application</title>
  <!-- Required: Tailwind CSS -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <h1>My Pipelines</h1>
  
  <!-- Include SK8 Pipelines Component -->
  <script src="https://ivanneuzorau.github.io/next/sk8-pipelines.js"></script>
  
  <!-- Use the component -->
  <sk8-pipelines 
    mode="embedded" 
    theme="blue" 
    tenant-id="your-tenant-id"
    api-base-url="https://your-api-proxy.com">
  </sk8-pipelines>
</body>
</html>
```

### Option 2: React/Next.js Application

```tsx
'use client';

import { useEffect } from 'react';

export default function PipelinesPage() {
  useEffect(() => {
    // Load the web component from CDN
    const script = document.createElement('script');
    script.src = 'https://ivanneuzorau.github.io/next/sk8-pipelines.js';
    script.async = true;
    document.head.appendChild(script);
    
    return () => {
      // Cleanup if needed
      document.head.removeChild(script);
    };
  }, []);

  return (
    <div>
      <h1>My Pipelines</h1>
      <sk8-pipelines 
        mode="embedded" 
        theme="blue" 
        tenant-id="your-tenant-id"
        api-base-url="https://your-api-proxy.com">
      </sk8-pipelines>
    </div>
  );
}
```

### Option 3: Using the Loader Utility (Recommended for React Apps)

If you have access to the `@sk8-workspace/shared-ui` package:

```tsx
import { WebComponentLoader } from '@sk8-workspace/shared-ui/web-component';

export default function PipelinesPage() {
  return (
    <WebComponentLoader 
      cdnUrl="https://ivanneuzorau.github.io/next/sk8-pipelines.js"
      fallback={<div>Loading pipelines...</div>}
    >
      <sk8-pipelines 
        mode="embedded" 
        theme="blue" 
        tenant-id="your-tenant-id"
        api-base-url="https://your-api-proxy.com">
      </sk8-pipelines>
    </WebComponentLoader>
  );
}
```

## Component Attributes

| Attribute | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| `mode` | `"admin"` \| `"embedded"` | No | `"embedded"` | Operation mode |
| `theme` | `"green"` \| `"blue"` | No | `"blue"` | Color theme |
| `tenant-id` | `string` | Yes (for embedded) | - | Your tenant ID |
| `api-base-url` | `string` | Yes | - | Your API proxy URL |

## API Proxy Setup

The component needs an API endpoint. You must set up a proxy server that:

1. Forwards requests to: `https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines`
2. Handles CORS
3. Forwards the `tenantId` query parameter

### Example: Express.js Proxy

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.get('/api/pipelines', async (req, res) => {
  const tenantId = req.query.tenantId;
  const url = tenantId
    ? `https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines?tenantId=${tenantId}`
    : 'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(3000);
```

### Example: Vercel Serverless Function

Create `api/pipelines.js`:

```javascript
export default async function handler(req, res) {
  const tenantId = req.query.tenantId;
  const url = tenantId
    ? `https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines?tenantId=${tenantId}`
    : 'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines';
  
  try {
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
```

## CDN URLs

### GitHub Pages (Latest)
```
https://ivanneuzorau.github.io/next/sk8-pipelines.js
```

### jsDelivr (Versioned)
```
https://cdn.jsdelivr.net/gh/ivanneuzorau/next@latest/dist/packages/shared-ui/web-component/sk8-pipelines.js
```

## Complete Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Application with SK8 Pipelines</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    sk8-pipelines {
      display: block;
      width: 100%;
    }
  </style>
</head>
<body>
  <div class="container mx-auto p-8">
    <h1 class="text-3xl font-bold mb-6">My Application</h1>
    
    <div class="bg-white rounded-lg shadow p-6">
      <h2 class="text-xl font-semibold mb-4">Pipelines</h2>
      <sk8-pipelines 
        mode="embedded" 
        theme="blue" 
        tenant-id="your-tenant-id"
        api-base-url="https://your-api-proxy.com">
      </sk8-pipelines>
    </div>
  </div>
  
  <script src="https://ivanneuzorau.github.io/next/sk8-pipelines.js"></script>
</body>
</html>
```

## Framework Examples

### Vue.js

```vue
<template>
  <div>
    <sk8-pipelines 
      :mode="'embedded'"
      :theme="'blue'"
      :tenant-id="tenantId"
      :api-base-url="apiBaseUrl">
    </sk8-pipelines>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

const tenantId = 'your-tenant-id';
const apiBaseUrl = 'https://your-api-proxy.com';

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://ivanneuzorau.github.io/next/sk8-pipelines.js';
  document.head.appendChild(script);
});
</script>
```

### Angular

```typescript
// component.ts
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pipelines',
  template: `
    <sk8-pipelines 
      [attr.mode]="'embedded'"
      [attr.theme]="'blue'"
      [attr.tenant-id]="tenantId"
      [attr.api-base-url]="apiBaseUrl">
    </sk8-pipelines>
  `,
})
export class PipelinesComponent implements OnInit {
  tenantId = 'your-tenant-id';
  apiBaseUrl = 'https://your-api-proxy.com';

  ngOnInit() {
    const script = document.createElement('script');
    script.src = 'https://ivanneuzorau.github.io/next/sk8-pipelines.js';
    document.head.appendChild(script);
  }
}
```

## Troubleshooting

### Component not appearing
- Check browser console for errors
- Verify script is loaded: `customElements.get('sk8-pipelines')`
- Ensure Tailwind CSS is loaded before the component

### API errors
- Verify `api-base-url` is correct
- Check proxy server is running
- Verify CORS is enabled on proxy

### Styling issues
- Ensure Tailwind CSS CDN is loaded
- Check network tab for failed CSS requests

## Support

For issues or questions, contact the SK8 team or check the repository:
https://github.com/ivanneuzorau/next


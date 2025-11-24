# CDN Deployment Guide

This guide explains how to deploy the standalone web component to CDN and use it in applications.

## Architecture

```
┌─────────────────────────────────────┐
│  GitHub Repository                   │
│  ┌───────────────────────────────┐   │
│  │  Standalone Web Component     │   │
│  │  (sk8-pipelines.js)           │   │
│  └───────────────────────────────┘   │
└──────────────┬────────────────────────┘
               │
               │ GitHub Pages / CDN
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
┌─────────────┐  ┌─────────────┐
│  Admin App  │  │ Vendor App  │
│  (Next.js)  │  │  (Next.js)  │
└─────────────┘  └─────────────┘
       │                │
       └────────┬───────┘
                │
                ▼
        ┌───────────────┐
        │  External     │
        │  Customers     │
        │  (Any Website) │
        └───────────────┘
```

## Deployment Options

### Option 1: GitHub Pages (Recommended)

The component is automatically deployed to GitHub Pages via GitHub Actions.

**URL**: `https://ivanneuzorau.github.io/next/sk8-pipelines.js`

**How it works**:
1. Push changes to `main` branch
2. GitHub Actions builds the component
3. Deploys to GitHub Pages
4. Component available at: `https://ivanneuzorau.github.io/next/sk8-pipelines.js`

### Option 2: jsDelivr CDN (via GitHub Releases)

1. Build the component: `npx nx build-web-component shared-ui`
2. Create a GitHub release
3. Upload `sk8-pipelines.js` to the release
4. Use: `https://cdn.jsdelivr.net/gh/ivanneuzorau/next@latest/dist/packages/shared-ui/web-component/sk8-pipelines.js`

### Option 3: Vercel (Separate Project)

1. Create a new Vercel project
2. Point to the repository
3. Set build command: `npx nx build-web-component shared-ui`
4. Set output directory: `dist/packages/shared-ui/web-component`
5. Deploy

## Using in Applications

### In Admin App / Vendor App

The apps can load the component from CDN instead of bundling it:

```tsx
import { WebComponentLoader } from '@sk8-workspace/shared-ui/web-component/loader';

export function MainContent() {
  return (
    <WebComponentLoader cdnUrl="https://ivanneuzorau.github.io/next/sk8-pipelines.js">
      <sk8-pipelines mode="admin" theme="green" />
    </WebComponentLoader>
  );
}
```

### In External Websites (Any Framework)

Simply include the script:

```html
<script src="https://ivanneuzorau.github.io/next/sk8-pipelines.js"></script>
<script src="https://cdn.tailwindcss.com"></script>

<sk8-pipelines 
  mode="embedded" 
  theme="blue" 
  tenant-id="xxx-ten-1"
  api-base-url="https://your-api-proxy.com">
</sk8-pipelines>
```

## API Proxy Setup

Since the component needs to call the API, you need to set up a proxy:

### Option 1: Use Existing Next.js API Routes

If using in admin-app or vendor-app, the existing `/api/pipelines` routes work.

### Option 2: Create Standalone Proxy

Deploy a simple proxy server:

```javascript
// Example: Express.js proxy
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

Then use: `<sk8-pipelines api-base-url="https://your-proxy.com" ... />`

## Versioning

### GitHub Pages
- Always serves the latest version from `main` branch
- URL: `https://ivanneuzorau.github.io/next/sk8-pipelines.js`

### GitHub Releases (jsDelivr)
- Pin to specific version: `@v1.0.0`
- Latest: `@latest`
- URL: `https://cdn.jsdelivr.net/gh/ivanneuzorau/next@v1.0.0/dist/packages/shared-ui/web-component/sk8-pipelines.js`

## Testing

1. Build locally: `npx nx build-web-component shared-ui`
2. Test with example: Open `dist/packages/shared-ui/web-component/index.html`
3. Or use the deployed version in your apps

## Monitoring

- Check GitHub Actions for build status
- Monitor GitHub Pages deployment
- Test the CDN URL in browser: `https://ivanneuzorau.github.io/next/sk8-pipelines.js`

## Troubleshooting

### Component not loading
- Check browser console for errors
- Verify CDN URL is accessible
- Check CORS settings if loading from different domain

### API errors
- Ensure `api-base-url` is set correctly
- Verify proxy server is running
- Check network tab for failed requests

### Styling issues
- Ensure Tailwind CSS is loaded: `<script src="https://cdn.tailwindcss.com"></script>`
- Check that Tailwind CDN is loaded before the component script


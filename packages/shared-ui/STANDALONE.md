# Standalone Web Component

The Pipelines component can be used as a **standalone web component** - a single JavaScript file that can be included in any HTML page without requiring React, Next.js, or any build tools.

## Building the Standalone Bundle

```bash
npx nx build-web-component shared-ui
```

This creates a single file: `dist/packages/shared-ui/web-component/sk8-pipelines.js`

## Usage

### 1. Include the Script

Simply include the bundled JavaScript file in your HTML:

```html
<script src="./sk8-pipelines.js"></script>
```

### 2. Use the Component

Use the `<sk8-pipelines>` custom element anywhere in your HTML:

```html
<!DOCTYPE html>
<html>
<head>
  <title>My App</title>
  <!-- Tailwind CSS is required for styling -->
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body>
  <sk8-pipelines 
    mode="embedded" 
    theme="blue" 
    tenant-id="xxx-ten-1">
  </sk8-pipelines>
  
  <script src="./sk8-pipelines.js"></script>
</body>
</html>
```

## Attributes

- `mode` - `"admin"` or `"embedded"` (default: `"embedded"`)
- `theme` - `"green"` or `"blue"` (default: `"blue"`)
- `tenant-id` - Tenant ID string (required for `embedded` mode)
- `api-base-url` - Optional API base URL (default: uses relative `/api/pipelines`)

## API Configuration

The component expects an API endpoint. For standalone usage, you have two options:

### Option 1: Use API Base URL Attribute

```html
<sk8-pipelines 
  mode="embedded" 
  theme="blue" 
  tenant-id="xxx-ten-1"
  api-base-url="https://your-api-proxy.com">
</sk8-pipelines>
```

### Option 2: Set Up a Proxy Server

Create a simple proxy server that forwards requests to the AWS API:

```javascript
// Example: Express.js proxy
app.get('/api/pipelines', async (req, res) => {
  const tenantId = req.query.tenantId;
  const url = tenantId
    ? `https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines?tenantId=${tenantId}`
    : 'https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines';
  
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});
```

Then use the component without `api-base-url` (it will use relative paths).

## Requirements

1. **Tailwind CSS**: The component uses Tailwind CSS classes. Include Tailwind in your page:
   ```html
   <script src="https://cdn.tailwindcss.com"></script>
   ```
   Or use your own Tailwind build.

2. **Modern Browser**: Requires support for:
   - Custom Elements
   - ES6 Modules (if using module version)
   - Fetch API

## File Size

The standalone bundle includes:
- React
- ReactDOM
- All component code
- All dependencies

The file size is larger (~200-300KB minified) but provides complete independence.

## Examples

See `example-standalone.html` for a complete working example.

## Distribution

To distribute the standalone component:

1. Build it: `npx nx build-web-component shared-ui`
2. Copy `dist/packages/shared-ui/web-component/sk8-pipelines.js` to your CDN or server
3. Users include it with: `<script src="https://your-cdn.com/sk8-pipelines.js"></script>`

## Advantages

✅ **No Dependencies**: Works in any HTML page  
✅ **Framework Agnostic**: Can be used with Vue, Angular, vanilla JS, etc.  
✅ **Easy Integration**: Just include one script tag  
✅ **Self-Contained**: All code bundled together  

## Limitations

⚠️ **File Size**: Larger than module version (includes React)  
⚠️ **Styling**: Requires Tailwind CSS to be available  
⚠️ **API**: Needs API proxy or CORS-enabled endpoint  


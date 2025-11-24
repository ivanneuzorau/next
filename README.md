# SK8 Pipelines - Dual Deployment Monorepo

Monorepo with a pipeline management component that can be used in two modes:
- **Admin App** - multi-tenant mode for SK8 administrators (green theme)
- **Vendor App** - single-tenant mode for embedding into customer applications (blue theme)

## Project Structure

```
/
├── apps/
│   ├── admin-app/        # SK8 Admin (Next.js 15)
│   └── vendor-app/       # Vendor App (Next.js 15)
├── packages/
│   └── shared-ui/        # Shared Pipelines component
└── nx.json               # Nx configuration
```

## Technologies

- **Nx** - monorepo
- **Next.js 15** - App Router
- **TypeScript**
- **React** - client components
- **Tailwind CSS** - styling

## Installation

```bash
npm install
```

## Running Applications

### Admin App (Multi-tenant, Green Theme)

```bash
npx nx dev admin-app
```

Open [http://localhost:3000](http://localhost:3000) (or the port specified in the output)

### Vendor App (Single-tenant, Blue Theme)

```bash
npx nx dev vendor-app --port=3001
```

Open [http://localhost:3001](http://localhost:3001)

## API

The component uses a REST API:
- **Endpoint**: `https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines`
- **Method**: GET
- **Parameters**: 
  - `tenantId` (optional) - filter by tenant

## Pipelines Component

### Props

```typescript
interface PipelinesProps {
  mode: 'admin' | 'embedded';  // Operation mode
  theme: 'green' | 'blue';      // Color theme
  tenantId?: string;            // Tenant ID (only for embedded mode)
}
```

### Features

- **Admin mode**: Shows all pipelines from all tenants, includes Tenant ID column
- **Embedded mode**: Shows pipelines only for the specified tenant, without Tenant ID column
- **Theming**: Green theme for admin, blue for embedded
- **API integration**: Automatic data loading with tenant filtering
- **Responsive design**: Table view on desktop, card view on mobile
- **Toggle switches**: Clickable switches to activate/deactivate pipelines

## Component Structure

The Pipelines component is organized into modular components:

```
packages/shared-ui/src/ui/pipelines/
├── desktop-table/        # Desktop table view component
├── mobile-cards/         # Mobile cards view component
└── pipelines.tsx         # Main component
```

## Hooks

- **`usePipelines(tenantId?)`**: Fetches pipeline data from API
- **`useThemeColors(theme)`**: Returns theme colors and CSS variables style object
- **`useTheme()`**: Accesses theme from ThemeProvider context (used in app components)

## Building

```bash
# Build shared-ui library
npx nx build shared-ui

# Build admin-app
npx nx build admin-app

# Build vendor-app
npx nx build vendor-app
```

## Development

The component is located in `packages/shared-ui/src/ui/pipelines/` and can be used in both applications with different configurations.

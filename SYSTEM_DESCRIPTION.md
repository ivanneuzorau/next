# SK8 Pipelines System Description

## Overview

The system is a monorepo with a reusable pipeline management component that can operate in two modes:
1. **Admin mode** - for SK8 administrators (multi-tenant)
2. **Embedded mode** - for embedding into customer applications (single-tenant)

## Architecture

### Project Structure

```
/
├── apps/
│   ├── admin-app/          # SK8 Admin application (multi-tenant, green theme)
│   └── vendor-app/          # Vendor application (single-tenant, blue theme)
├── packages/
│   └── shared-ui/          # Shared Pipelines component
│       └── src/
│           ├── ui/         # UI components
│           ├── hooks/      # Custom hooks
│           ├── api/        # API functions
│           ├── types/      # TypeScript types
│           └── theme/      # Theming system
└── nx.json                 # Nx monorepo configuration
```

### Technology Stack

- **Nx** - monorepo and project management
- **Next.js 15** - framework with App Router
- **TypeScript** - type safety
- **React** - UI library
- **CSS Modules** - component styling

## Pipelines Component

### Location
`packages/shared-ui/src/ui/pipelines/pipelines.tsx`

### Props

```typescript
interface PipelinesProps {
  mode: 'admin' | 'embedded';    // Operation mode
  theme: 'green' | 'blue';        // Color theme
  tenantId?: string;              // Tenant ID (only for embedded mode)
}
```

### Functionality

#### 1. Data Loading
- Uses `usePipelines` hook to load data via API
- In `admin` mode: loads all pipelines from all tenants (without `tenantId`)
- In `embedded` mode: loads pipelines only for the specified `tenantId`

#### 2. Data Display
- **Admin mode**:
  - Shows "TENANT ID" column for tenant identification
  - Displays all pipelines from all tenants
  - Header: "Tenant Pipelines"
  
- **Embedded mode**:
  - Hides "TENANT ID" column
  - Shows only pipelines for the current tenant
  - Header: "My Pipelines"

#### 3. Status Management
- Toggle switches for activating/deactivating pipelines
- Local state updates on click
- Active pipelines counter updates automatically
- `handleToggle` function switches pipeline status

#### 4. Theming
- **Green theme** (admin):
  - Green accents (#10b981)
  - Green toggle switches
  - Green table headers
  
- **Blue theme** (embedded):
  - Blue accents (#3b82f6)
  - Blue toggle switches
  - Blue table headers

## API Integration

### Structure

1. **Client Component** (`packages/shared-ui/src/api/pipelines.ts`)
   - Makes request to local Next.js API route
   - URL: `/api/pipelines` or `/api/pipelines?tenantId=xxx`

2. **Next.js API Routes** (in each application)
   - `apps/admin-app/src/app/api/pipelines/route.ts`
   - `apps/vendor-app/src/app/api/pipelines/route.ts`
   - Proxy requests to external API
   - Solve CORS issues

3. **External API**
   - Endpoint: `https://4y6vut7106.execute-api.us-east-1.amazonaws.com/v1/pipelines`
   - Supports optional `tenantId` parameter

### Data Flow

```
Pipelines Component
    ↓
usePipelines hook
    ↓
fetchPipelines (api/pipelines.ts)
    ↓
Next.js API Route (/api/pipelines)
    ↓
External API (AWS Lambda)
    ↓
Return data back through the chain
```

## Theming System

### Theme Provider

The theming system uses React Context to provide theme colors throughout the application:

- **Location**: `packages/shared-ui/src/theme/`
- **Components**:
  - `theme-provider.tsx` - ThemeProvider and useTheme hook
  - `types.ts` - Theme type definitions
  - `themes.ts` - Predefined themes (greenTheme, blueTheme)

### Usage

Each application wraps its layout with `ThemeProvider`:

```tsx
// apps/admin-app/src/app/layout.tsx
<ThemeProvider theme={greenTheme}>
  {children}
</ThemeProvider>

// apps/vendor-app/src/app/layout.tsx
<ThemeProvider theme={blueTheme}>
  {children}
</ThemeProvider>
```

Components use `useTheme()` hook to access theme colors via CSS variables.

## Admin App (Multi-tenant)

### Location
`apps/admin-app/`

### Features

1. **Multi-tenant mode**
   - Component used with `mode="admin"`
   - No `tenantId` passed → loads all pipelines
   - Displays "TENANT ID" column

2. **Green theme**
   - `theme="green"`
   - Green accents in all UI elements

3. **Page structure**
   - PageHeader component (full width)
   - Sidebar with navigation (project-specific)
   - MainContent with Pipelines component
   - Layout with "SK8 Admin" title

4. **API Route**
   - `/api/pipelines` - without parameters
   - Returns data for all tenants

### Usage

```tsx
<Pipelines mode="admin" theme="green" />
```

## Vendor App (Single-tenant)

### Location
`apps/vendor-app/`

### Features

1. **Single-tenant mode**
   - Component used with `mode="embedded"`
   - `tenantId="xxx-ten-1"` passed (hardcoded)
   - "TENANT ID" column hidden

2. **Blue theme**
   - `theme="blue"`
   - Blue accents in all UI elements

3. **Page structure**
   - PageHeader component (full width)
   - Sidebar with navigation and tenant information (project-specific)
   - MainContent with Pipelines component
   - Layout with "Amazing Vendor 1 App Using Sk8" title

4. **API Route**
   - `/api/pipelines?tenantId=xxx-ten-1`
   - Returns data only for the specified tenant

### Usage

```tsx
<Pipelines mode="embedded" theme="blue" tenantId="xxx-ten-1" />
```

## Key Mode Differences

| Aspect | Admin Mode | Embedded Mode |
|--------|------------|---------------|
| **Tenancy** | Multi-tenant | Single-tenant |
| **Tenant ID** | Not passed | Required parameter |
| **Tenant ID Column** | Displayed | Hidden |
| **Header** | "Tenant Pipelines" | "My Pipelines" |
| **Theme** | Green | Blue |
| **API Request** | Without tenantId | With tenantId |
| **Data** | All tenants | Only one tenant |

## Application Components

### Component Structure

Both applications use the same structure:

```
src/components/pipelines/
├── sidebar/
│   ├── index.tsx
│   └── sidebar.module.css
├── nav-item/
│   ├── index.tsx
│   └── nav-item.module.css
├── page-header/
│   ├── index.tsx
│   └── page-header.module.css
└── main-content/
    ├── index.tsx
    ├── main-content.module.css
    └── types.ts (only in vendor-app)
```

### Naming Convention

- All components in kebab-case (with dashes)
- Each component in a separate folder
- Component file: `index.tsx`
- Types: `types.ts` in the same folder

### Sidebar Components

Each application has its own sidebar component:
- **Admin App**: `apps/admin-app/src/components/pipelines/sidebar/`
  - Shows "Sk8 Admin" title with "PIPELINES" badge
  - Navigation: All Pipelines, Tenant Activity, Sync History
  - Footer with vendor info
  
- **Vendor App**: `apps/vendor-app/src/components/pipelines/sidebar/`
  - Shows "FEATURES" section title
  - Navigation: My Pipelines, Analytics, Billing
  - Footer with tenant info and button

## Running Applications

### Admin App

```bash
npx nx dev admin-app
```

Open: http://localhost:3000/pipelines

### Vendor App

```bash
npx nx dev vendor-app --port=3001
```

Open: http://localhost:3001/pipelines

## Functionality

### ✅ Implemented

1. **Reusable Pipelines Component**
   - Support for two operation modes
   - Theming (green/blue)
   - Adaptive display (with/without Tenant ID column)
   - Responsive design (table on desktop, cards on mobile)

2. **Multi/Single Tenancy**
   - Admin mode: shows all tenants
   - Embedded mode: filters by tenantId

3. **API Integration**
   - Proxying through Next.js API routes
   - CORS issue resolution
   - Support for filtering by tenantId

4. **Status Management**
   - Clickable toggle switches
   - Local state updates
   - Automatic active pipelines recalculation

5. **Project Structure**
   - Monorepo with Nx
   - Separation into apps and packages
   - TypeScript typing
   - Modular component structure

6. **Theming System**
   - Context-based theme provider
   - CSS variables for dynamic styling
   - Predefined green and blue themes

7. **Responsive Design**
   - Desktop: table layout with full height
   - Mobile: card layout
   - Adaptive sidebar and main content

### 🔄 Initialization

**Admin App:**
- Component initializes without `tenantId`
- Loads all pipelines on mount

**Vendor App:**
- Component initializes with `tenantId="xxx-ten-1"`
- Loads only pipelines for this tenant

### 🚀 Deployment

Both applications can be deployed independently:

```bash
# Build Admin App
npx nx build admin-app

# Build Vendor App
npx nx build vendor-app
```

## Architecture Benefits

1. **Code Reusability**
   - One component for two scenarios
   - Unified logic and styles

2. **Flexibility**
   - Easy to add new themes
   - Easy to extend functionality

3. **Scalability**
   - Monorepo simplifies management
   - Nx ensures efficient builds

4. **Type Safety**
   - TypeScript at all levels
   - Typed props and API

5. **Maintainability**
   - Clear separation of concerns
   - Modular structure (ui, hooks, api, types)
   - Project-specific components where needed

## Conclusion

The system successfully implements the task requirements:
- ✅ Component reused in two modes
- ✅ Multi-tenant mode for Admin App
- ✅ Single-tenant mode for Vendor App
- ✅ Different themes (green/blue)
- ✅ Correct data filtering
- ✅ Functional toggle switches
- ✅ CORS issue resolution through API routes
- ✅ Responsive design
- ✅ Full-height desktop layout
- ✅ Project-specific sidebars and headers

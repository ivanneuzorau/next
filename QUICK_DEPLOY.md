# Quick Deploy Guide

## 1. Push to Git

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## 2. Deploy to Vercel

### For Admin App:
1. Go to https://vercel.com/new
2. Import your Git repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: (leave empty)
   - **Build Command**: `npx nx build admin-app`
   - **Output Directory**: `apps/admin-app/.next`
   - **Install Command**: `npm install`
4. Click Deploy

### For Vendor App:
1. Create a new project in Vercel
2. Import the same repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: (leave empty)
   - **Build Command**: `npx nx build vendor-app`
   - **Output Directory**: `apps/vendor-app/.next`
   - **Install Command**: `npm install`
4. Click Deploy

### For Widget App:
1. Create a new project in Vercel
2. Import the same repository
3. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: (leave empty)
   - **Build Command**: `npx nx build widget-app`
   - **Output Directory**: `apps/widget-app/.next`
   - **Install Command**: `npm install`
4. Click Deploy

## Important Notes

- Each app needs to be a separate Vercel project
- Node.js version should be 18+ (set in Vercel project settings)
- The root `vercel.json` is for reference only - configure in Vercel Dashboard
- Widget App can be embedded as iframe or used as standalone service

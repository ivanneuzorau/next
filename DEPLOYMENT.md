# Deployment Guide

This guide explains how to deploy the SK8 Pipelines monorepo to Vercel.

## Prerequisites

- Git repository (GitHub, GitLab, or Bitbucket)
- Vercel account

## Deployment Options

### Option 1: Deploy Both Apps as Separate Vercel Projects (Recommended)

This approach allows you to deploy each application independently with separate URLs.

#### Admin App Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave empty (root of monorepo)
   - **Build Command**: `npx nx build admin-app`
   - **Output Directory**: `apps/admin-app/.next`
   - **Install Command**: `npm install`
5. Click "Deploy"

#### Vendor App Deployment

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import the same Git repository
4. Configure the project:
   - **Framework Preset**: Next.js
   - **Root Directory**: Leave empty (root of monorepo)
   - **Build Command**: `npx nx build vendor-app`
   - **Output Directory**: `apps/vendor-app/.next`
   - **Install Command**: `npm install`
5. Click "Deploy"

### Option 2: Deploy Using Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy Admin App:
   ```bash
   cd apps/admin-app
   vercel
   ```
   Follow the prompts and use:
   - Build Command: `cd ../.. && npx nx build admin-app`
   - Output Directory: `.next`

4. Deploy Vendor App:
   ```bash
   cd ../vendor-app
   vercel
   ```
   Follow the prompts and use:
   - Build Command: `cd ../.. && npx nx build vendor-app`
   - Output Directory: `.next`

## Environment Variables

If you need to add environment variables:

1. Go to your project settings in Vercel Dashboard
2. Navigate to "Environment Variables"
3. Add any required variables

## Build Configuration

The build process automatically:
- Installs dependencies
- Builds the shared-ui library
- Builds the Next.js application
- Outputs to `.next` directory

## Troubleshooting

### Build Fails

- Ensure Node.js version is 18+ (check in Vercel project settings)
- Verify all dependencies are in `package.json`
- Check that `tailwind.config.js` and `postcss.config.js` are in the root

### Styling Not Working

- Ensure Tailwind CSS is properly configured
- Check that `global.css` files import Tailwind directives
- Verify PostCSS configuration is correct

### Shared Library Not Found

- Ensure `shared-ui` is built before the app (Nx handles this automatically)
- Check that `tsconfig.base.json` has correct path mappings

## Git Push

Before deploying, commit and push your changes:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

## Continuous Deployment

Once connected to Vercel:
- Every push to `main` branch will trigger automatic deployment
- Pull requests will create preview deployments
- You can configure branch-specific settings in Vercel Dashboard


import { Pipeline } from '../types';

// Global API base URL (can be set for web component usage)
let apiBaseUrl = '';

export function setApiBaseUrl(baseUrl: string) {
  apiBaseUrl = baseUrl;
}

export function getApiBaseUrl(): string {
  return apiBaseUrl;
}

export async function fetchPipelines(
  tenantId?: string,
  baseUrl?: string
): Promise<Pipeline[]> {
  // Use provided baseUrl, or global apiBaseUrl, or default to relative path
  const base = baseUrl || apiBaseUrl || '';
  
  // Use local API route to avoid CORS issues (for Next.js apps)
  // Or use provided base URL (for standalone web component)
  const url = tenantId
    ? `${base}/api/pipelines?tenantId=${encodeURIComponent(tenantId)}`
    : `${base}/api/pipelines`;

  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch pipelines: ${response.statusText}`);
  }

  return response.json();
}


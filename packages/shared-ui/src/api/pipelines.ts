import { Pipeline } from '../types';

export async function fetchPipelines(tenantId?: string): Promise<Pipeline[]> {
  // Use local API route to avoid CORS issues
  const url = tenantId
    ? `/api/pipelines?tenantId=${encodeURIComponent(tenantId)}`
    : `/api/pipelines`;

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


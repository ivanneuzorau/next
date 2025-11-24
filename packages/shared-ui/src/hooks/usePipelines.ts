'use client';

import { useEffect, useState } from 'react';
import { Pipeline } from '../types';
import { fetchPipelines } from '../api/pipelines';

export function usePipelines(tenantId?: string) {
  const [pipelines, setPipelines] = useState<Pipeline[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadPipelines() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchPipelines(tenantId);
        if (!cancelled) {
          setPipelines(data);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error('Unknown error'));
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadPipelines();

    return () => {
      cancelled = true;
    };
  }, [tenantId]);

  return { pipelines, loading, error };
}


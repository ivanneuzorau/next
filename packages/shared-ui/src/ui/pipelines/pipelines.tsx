'use client';

import { useState, useEffect } from 'react';
import { usePipelines } from '../../hooks/usePipelines';
import { useThemeColors } from '../../hooks/useThemeColors';
import { PipelinesProps } from '../../types';
import { DesktopTable } from './desktop-table';
import { MobileCards } from './mobile-cards';

export function Pipelines({ mode, theme, tenantId }: PipelinesProps) {
  const { pipelines: initialPipelines, loading, error } = usePipelines(
    mode === 'embedded' ? tenantId : undefined
  );
  const [pipelines, setPipelines] = useState(initialPipelines);
  const { colors, themeStyle } = useThemeColors(theme);

  useEffect(() => {
    setPipelines(initialPipelines);
  }, [initialPipelines]);

  const handleToggle = (pipelineId: string) => {
    setPipelines((prev) =>
      prev.map((p) =>
        p.pipelineId === pipelineId ? { ...p, isActive: !p.isActive } : p
      )
    );
  };

  if (loading) {
    return (
      <div className="w-full p-6" style={themeStyle}>
        Loading pipelines...
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6" style={themeStyle}>
        Error: {error.message}
      </div>
    );
  }

  return (
    <div className="w-full p-6 md:p-6" style={themeStyle}>
      <DesktopTable
        pipelines={pipelines}
        mode={mode}
        colors={colors}
        onToggle={handleToggle}
      />
      <MobileCards
        pipelines={pipelines}
        mode={mode}
        colors={colors}
        onToggle={handleToggle}
      />
    </div>
  );
}

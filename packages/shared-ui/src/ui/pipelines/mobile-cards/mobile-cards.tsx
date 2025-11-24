'use client';

import { MobileCardsProps } from './types';

export function MobileCards({
  pipelines,
  mode,
  colors,
  onToggle,
}: MobileCardsProps) {
  return (
    <div className="block md:hidden space-y-3">
      {pipelines.map((pipeline) => (
        <div
          key={pipeline.pipelineId}
          className="bg-white rounded-lg p-4 shadow-sm"
        >
          <div className="flex justify-between items-center mb-3 pb-3 border-b border-gray-100">
            <div className="font-semibold text-sm" style={{ color: colors.text }}>
              {pipeline.pipelineName}
            </div>
            <label className="relative inline-block w-11 h-6 cursor-pointer">
              <input
                type="checkbox"
                checked={pipeline.isActive}
                onChange={() => onToggle(pipeline.pipelineId)}
                className="opacity-0 w-0 h-0"
              />
              <span
                className={`absolute top-0 left-0 right-0 bottom-0 rounded-full transition-all duration-300 ${
                  pipeline.isActive ? '' : 'bg-gray-300'
                }`}
                style={
                  pipeline.isActive ? { backgroundColor: colors.primary } : {}
                }
              >
                <span
                  className={`absolute h-[18px] w-[18px] left-[3px] bottom-[3px] bg-white rounded-full transition-transform duration-300 ${
                    pipeline.isActive ? 'translate-x-5' : ''
                  }`}
                ></span>
              </span>
            </label>
          </div>
          <div className="flex justify-between items-center py-2 text-sm">
            <span
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: colors.textSecondary }}
            >
              Pipeline ID
            </span>
            <span style={{ color: colors.text }}>{pipeline.pipelineId}</span>
          </div>
          {mode === 'admin' && (
            <div className="flex justify-between items-center py-2 text-sm">
              <span
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: colors.textSecondary }}
              >
                Tenant ID
              </span>
              <span
                className="flex items-center gap-1.5"
                style={{ color: colors.text }}
              >
                <span
                  className="w-2 h-2 rounded-full inline-block"
                  style={{ backgroundColor: colors.primary }}
                ></span>
                {pipeline.tenantId}
              </span>
            </div>
          )}
          <div className="flex justify-between items-center pt-2 mt-2 border-t border-gray-100">
            <span
              className="text-xs font-medium uppercase tracking-wide"
              style={{ color: colors.textSecondary }}
            >
              Status
            </span>
            <span style={{ color: colors.text }}>
              {pipeline.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}


'use client';

import { DesktopTableProps } from './types';

export function DesktopTable({
  pipelines,
  mode,
  colors,
  onToggle,
}: DesktopTableProps) {
  return (
    <div className="hidden md:block overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
        <thead>
          <tr>
            {mode === 'admin' && (
              <th
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide"
                style={{ color: colors.primaryDark }}
              >
                TENANT ID
              </th>
            )}
            <th
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide"
              style={{ color: colors.primaryDark }}
            >
              PIPELINE ID
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide"
              style={{ color: colors.primaryDark }}
            >
              PIPELINE NAME
            </th>
            <th
              className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide"
              style={{ color: colors.primaryDark }}
            >
              STATUS
            </th>
          </tr>
        </thead>
        <tbody>
          {pipelines.map((pipeline, index) => (
            <tr
              key={pipeline.pipelineId}
              style={{
                backgroundColor:
                  index % 2 === 1
                    ? colors.tableEvenRowBg || 'rgba(0, 0, 0, 0.02)'
                    : 'white',
              }}
            >
              {mode === 'admin' && (
                <td className="px-4 py-3 text-sm border-t flex items-center gap-2">
                  <span
                    className="w-2 h-2 rounded-full inline-block"
                    style={{ backgroundColor: colors.primary }}
                  ></span>
                  {pipeline.tenantId}
                </td>
              )}
              <td className="px-4 py-3 text-sm border-t">
                {pipeline.pipelineId}
              </td>
              <td className="px-4 py-3 text-sm border-t">
                {pipeline.pipelineName}
              </td>
              <td className="px-4 py-3 text-sm border-t">
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
                      pipeline.isActive
                        ? { backgroundColor: colors.primary }
                        : {}
                    }
                  >
                    <span
                      className={`absolute h-[18px] w-[18px] left-[3px] bottom-[3px] bg-white rounded-full transition-transform duration-300 ${
                        pipeline.isActive ? 'translate-x-5' : ''
                      }`}
                    ></span>
                  </span>
                </label>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}


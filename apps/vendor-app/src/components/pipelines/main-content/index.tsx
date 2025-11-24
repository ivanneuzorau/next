import { Pipelines } from '@sk8-workspace/shared-ui';
import { MainContentProps } from './types';

export function MainContent({ tenantId }: MainContentProps) {
  return (
    <main className="flex-1 p-4 md:p-8 bg-white">
      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold text-gray-900 m-0 mb-4 md:mb-6 flex flex-wrap items-center gap-2">
          My Pipelines
          <span className="px-2 py-0.5 bg-blue-100 text-blue-600 rounded-lg text-[9px] md:text-[10px] font-medium">
            Embedded Sk8 component
          </span>
        </h2>
      </div>

      <Pipelines mode="embedded" theme="blue" tenantId={tenantId} />
    </main>
  );
}

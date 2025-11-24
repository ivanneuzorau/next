import { Pipelines } from '@sk8-workspace/shared-ui';
import { PageHeader } from '../page-header';

export function MainContent() {
  return (
    <main className="flex-1 p-4 md:p-8 bg-white flex flex-col overflow-y-auto md:h-full">
      <PageHeader />
      <Pipelines mode="admin" theme="green" />
    </main>
  );
}

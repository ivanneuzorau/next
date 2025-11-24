import { Sidebar } from '../../components/pipelines/sidebar';
import { MainContent } from '../../components/pipelines/main-content';
import { PageHeader } from '../../components/pipelines/page-header';

export default function PipelinesPage() {
  // Hardcoded tenant ID for embedded mode
  const tenantId = 'xxx-ten-1';

  return (
    <div className="flex flex-col min-h-screen h-screen">
      <PageHeader />
      <div className="flex flex-1 flex-col overflow-hidden min-h-0 md:flex-row">
        <div className="w-full max-w-full flex flex-col min-h-0 md:w-60 md:max-w-[240px]">
          <Sidebar />
        </div>
        <div className="flex-1 min-w-0 flex flex-col overflow-y-auto min-h-0 md:overflow-y-auto">
          <MainContent tenantId={tenantId} />
        </div>
      </div>
    </div>
  );
}

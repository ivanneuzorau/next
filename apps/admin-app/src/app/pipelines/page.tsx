import { Sidebar } from '../../components/pipelines/sidebar';
import { MainContent } from '../../components/pipelines/main-content';

export default function PipelinesPage() {
  return (
    <div className="flex min-h-screen h-screen flex-col overflow-hidden md:flex-row md:h-screen">
      <div className="w-full max-w-full flex flex-col min-h-0 md:w-60 md:max-w-[240px]">
        <Sidebar />
      </div>
      <div className="flex-1 min-w-0 flex flex-col overflow-y-auto min-h-0 md:overflow-y-auto">
        <MainContent />
      </div>
    </div>
  );
}

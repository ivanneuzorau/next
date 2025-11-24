export interface Pipeline {
  tenantId: string;
  pipelineId: string;
  pipelineName: string;
  isActive: boolean;
  name: string;
}

export type PipelinesMode = 'admin' | 'embedded';
export type PipelinesTheme = 'green' | 'blue';

export interface PipelinesProps {
  mode: PipelinesMode;
  theme: PipelinesTheme;
  tenantId?: string;
}

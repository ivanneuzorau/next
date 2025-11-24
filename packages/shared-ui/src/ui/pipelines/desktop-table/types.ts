import { Pipeline, PipelinesMode } from '../../../types';
import { ThemeColors } from '../../../theme';

export interface DesktopTableProps {
  pipelines: Pipeline[];
  mode: PipelinesMode;
  colors: ThemeColors;
  onToggle: (pipelineId: string) => void;
}


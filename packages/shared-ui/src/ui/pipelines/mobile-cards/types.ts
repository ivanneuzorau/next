import { Pipeline, PipelinesMode } from '../../../types';
import { ThemeColors } from '../../../theme';

export interface MobileCardsProps {
  pipelines: Pipeline[];
  mode: PipelinesMode;
  colors: ThemeColors;
  onToggle: (pipelineId: string) => void;
}


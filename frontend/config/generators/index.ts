import type { GeneratorConfig } from '@/types/generator.types';
import { noteVerbaleConfig } from './noteVerbale';
import { meetingBriefConfig } from './meetingBrief';
import { meetingSummaryConfig } from './meetingSummary';
import { speechConfig } from './speech';
import { diplomaticLetterConfig } from './diplomaticLetter';
import { talkingPointsConfig } from './talkingPoints';
import { invitationConfig } from './invitation';

export const GENERATOR_CONFIGS: Record<string, GeneratorConfig> = {
  'note-verbale': noteVerbaleConfig,
  'meeting-brief': meetingBriefConfig,
  'meeting-summary': meetingSummaryConfig,
  speech: speechConfig,
  'diplomatic-letter': diplomaticLetterConfig,
  'talking-points': talkingPointsConfig,
  invitation: invitationConfig,
};

export function getAllGenerators(): GeneratorConfig[] {
  return Object.values(GENERATOR_CONFIGS);
}

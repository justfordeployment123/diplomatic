import type { GeneratorConfig } from '@/types/generator.types';

export const talkingPointsConfig: GeneratorConfig = {
  id: 'talking-points',
  title: 'Talking Points',
  description: 'Structured talking points for negotiations, press briefings, and meetings',
  icon: 'ListOrdered',
  sections: [
    {
      id: 'context',
      title: 'Context',
      fields: [
        { id: 'topic', type: 'text', label: 'Topic', required: true },
        { id: 'date', type: 'date', label: 'Date' },
        { id: 'audience', type: 'text', label: 'Audience / Setting', required: true },
        { id: 'position', type: 'textarea', label: "Our Position / Stance", required: true, rows: 3 },
      ],
    },
    {
      id: 'points',
      title: 'Points',
      fields: [
        { id: 'keyArguments', type: 'multilist', label: 'Key Arguments', placeholder: 'Add argument...', required: true },
        { id: 'supportingFacts', type: 'multilist', label: 'Supporting Facts / Data', placeholder: 'Add fact...' },
        { id: 'concessions', type: 'textarea', label: 'Potential Concessions / Red Lines', rows: 3 },
      ],
    },
  ],
  confidentialFields: ['topic', 'position', 'keyArguments', 'supportingFacts', 'concessions'],
};

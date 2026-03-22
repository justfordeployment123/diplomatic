import type { GeneratorConfig } from '@/types/generator.types';

export const meetingSummaryConfig: GeneratorConfig = {
  id: 'meeting-summary',
  title: 'Meeting Summary',
  description: 'Official record of decisions and action items from diplomatic meetings',
  icon: 'FileCheck',
  sections: [
    {
      id: 'meeting-info',
      title: 'Meeting Information',
      fields: [
        { id: 'title', type: 'text', label: 'Meeting Title', required: true },
        { id: 'date', type: 'date', label: 'Date', required: true },
        { id: 'attendees', type: 'multilist', label: 'Attendees', placeholder: 'Add attendee...' },
      ],
    },
    {
      id: 'summary',
      title: 'Summary',
      fields: [
        { id: 'decisions', type: 'multilist', label: 'Key Decisions', placeholder: 'Add decision...', required: true },
        { id: 'actionItems', type: 'multilist', label: 'Action Items', placeholder: 'Add action item...' },
        { id: 'nextSteps', type: 'textarea', label: 'Next Steps', rows: 3 },
      ],
    },
  ],
  confidentialFields: ['title', 'attendees', 'decisions', 'actionItems', 'nextSteps'],
};

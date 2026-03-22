import type { GeneratorConfig } from '@/types/generator.types';

export const meetingBriefConfig: GeneratorConfig = {
  id: 'meeting-brief',
  title: 'Meeting Brief',
  description: 'Pre-meeting briefing document for diplomatic engagements',
  icon: 'ClipboardList',
  sections: [
    {
      id: 'meeting-details',
      title: 'Meeting Details',
      fields: [
        { id: 'title', type: 'text', label: 'Meeting Title', required: true },
        { id: 'date', type: 'date', label: 'Date', required: true },
        { id: 'time', type: 'time', label: 'Time' },
        { id: 'location', type: 'text', label: 'Location / Venue' },
        { id: 'participants', type: 'multilist', label: 'Participants', placeholder: 'Add participant...' },
      ],
    },
    {
      id: 'briefing',
      title: 'Briefing Content',
      fields: [
        { id: 'objectives', type: 'multilist', label: 'Meeting Objectives', placeholder: 'Add objective...', required: true },
        { id: 'background', type: 'textarea', label: 'Background', rows: 4 },
        { id: 'keyMessages', type: 'multilist', label: 'Key Messages', placeholder: 'Add key message...' },
        {
          id: 'tone',
          type: 'select',
          label: 'Tone',
          required: true,
          options: ['Formal', 'Collaborative', 'Assertive', 'Conciliatory'],
        },
      ],
    },
  ],
  confidentialFields: ['title', 'participants', 'objectives', 'background', 'keyMessages'],
};

import type { GeneratorConfig } from '@/types/generator.types';

export const speechConfig: GeneratorConfig = {
  id: 'speech',
  title: 'Speech',
  description: 'Formal diplomatic speeches for events, summits, and official occasions',
  icon: 'Mic',
  sections: [
    {
      id: 'event',
      title: 'Event Details',
      fields: [
        { id: 'eventName', type: 'text', label: 'Event Name', required: true },
        { id: 'date', type: 'date', label: 'Date' },
        { id: 'occasion', type: 'text', label: 'Occasion / Theme', required: true },
        {
          id: 'audience',
          type: 'multi-select',
          label: 'Main Audience',
          options: ['Diplomats', 'Government Officials', 'General Public', 'Press', 'International Delegates', 'Business Leaders', 'NGOs'],
        },
      ],
    },
    {
      id: 'content',
      title: 'Speech Content',
      fields: [
        { id: 'mainTheme', type: 'textarea', label: 'Main Theme / Message', required: true, rows: 3 },
        { id: 'keyPoints', type: 'multilist', label: 'Key Points', placeholder: 'Add key point...' },
        {
          id: 'tone',
          type: 'select',
          label: 'Tone',
          required: true,
          options: ['Formal & Ceremonial', 'Inspirational', 'Assertive', 'Conciliatory', 'Commemorative'],
        },
        { id: 'duration', type: 'number', label: 'Approximate Duration (minutes)', min: 1, max: 60 },
        { id: 'vipMentions', type: 'toggle', label: 'Include VIP Mentions' },
        {
          id: 'vipNamesConditional',
          type: 'conditional',
          label: '',
          controlledBy: 'vipMentions',
          showWhen: true,
          childField: {
            id: 'vipNames',
            type: 'multilist',
            label: 'VIP Names to Mention',
            placeholder: 'Add VIP name...',
          },
        },
      ],
    },
  ],
  confidentialFields: ['eventName', 'mainTheme', 'keyPoints', 'vipNames'],
};

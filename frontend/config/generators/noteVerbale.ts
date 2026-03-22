import type { GeneratorConfig } from '@/types/generator.types';

export const noteVerbaleConfig: GeneratorConfig = {
  id: 'note-verbale',
  title: 'Note Verbale',
  description: 'Formal diplomatic note following standard third-person protocol',
  icon: 'ScrollText',
  sections: [
    {
      id: 'parties',
      title: 'Parties',
      fields: [
        { id: 'sender', type: 'text', label: 'Sender', required: true, placeholder: 'Embassy of...' },
        { id: 'recipient', type: 'text', label: 'Recipient', required: true, placeholder: 'Ministry of Foreign Affairs of...' },
        { id: 'refNumber', type: 'text', label: 'Reference Number', mono: true, placeholder: 'REF-2026-001' },
        { id: 'date', type: 'date', label: 'Date', required: true },
      ],
    },
    {
      id: 'content',
      title: 'Content',
      fields: [
        { id: 'subject', type: 'text', label: 'Subject / Topic', required: true },
        { id: 'purpose', type: 'textarea', label: 'Purpose of the Note', required: true, rows: 4 },
        { id: 'details', type: 'textarea', label: 'Key Details', rows: 4 },
        {
          id: 'tone',
          type: 'select',
          label: 'Tone',
          required: true,
          options: ['Very Formal', 'Neutral Diplomatic', 'Friendly Diplomatic', 'Expressing Concern'],
        },
      ],
    },
  ],
  confidentialFields: ['sender', 'recipient', 'subject', 'purpose', 'details'],
};

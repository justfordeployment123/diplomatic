import type { GeneratorConfig } from '@/types/generator.types';

export const diplomaticLetterConfig: GeneratorConfig = {
  id: 'diplomatic-letter',
  title: 'Diplomatic Letter',
  description: 'Official correspondence between diplomatic missions and ministries',
  icon: 'Mail',
  sections: [
    {
      id: 'correspondence',
      title: 'Correspondence Details',
      fields: [
        { id: 'from', type: 'text', label: 'From', required: true, placeholder: 'H.E. Ambassador...' },
        { id: 'to', type: 'text', label: 'To', required: true, placeholder: 'His Excellency...' },
        { id: 'date', type: 'date', label: 'Date', required: true },
        { id: 'subject', type: 'text', label: 'Subject', required: true },
        { id: 'refNumber', type: 'text', label: 'Reference Number', mono: true },
      ],
    },
    {
      id: 'body',
      title: 'Letter Body',
      fields: [
        { id: 'purpose', type: 'textarea', label: 'Purpose / Opening', required: true, rows: 3 },
        { id: 'body', type: 'textarea', label: 'Main Body', rows: 6 },
        { id: 'closing', type: 'text', label: 'Closing Phrase' },
        {
          id: 'tone',
          type: 'select',
          label: 'Tone',
          required: true,
          options: ['Very Formal', 'Formal', 'Friendly Formal', 'Protest / Concern'],
        },
      ],
    },
  ],
  confidentialFields: ['from', 'to', 'subject', 'purpose', 'body'],
};

import type { GeneratorConfig } from '@/types/generator.types';

export const invitationConfig: GeneratorConfig = {
  id: 'invitation',
  title: 'Invitation',
  description: 'Formal diplomatic invitations for receptions, dinners, and official events',
  icon: 'PartyPopper',
  sections: [
    {
      id: 'event',
      title: 'Event Details',
      fields: [
        { id: 'eventName', type: 'text', label: 'Event Name', required: true },
        { id: 'date', type: 'date', label: 'Date', required: true },
        { id: 'time', type: 'time', label: 'Time', required: true },
        { id: 'venue', type: 'text', label: 'Venue', required: true },
      ],
    },
    {
      id: 'guest',
      title: 'Guest Details',
      fields: [
        { id: 'hostName', type: 'text', label: 'Host Name / Organisation', required: true },
        { id: 'honoree', type: 'text', label: 'Guest of Honour (optional)' },
        { id: 'dresscode', type: 'text', label: 'Dress Code' },
        { id: 'rsvpDate', type: 'date', label: 'RSVP By' },
        { id: 'rsvpContact', type: 'text', label: 'RSVP Contact (email / phone)' },
      ],
    },
  ],
  confidentialFields: ['eventName', 'hostName', 'honoree'],
};

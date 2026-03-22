import type { Document, DocumentListItem, PaginatedDocuments } from '@/types/document.types';

export const MOCK_USER = {
  id: 'mock-user-1',
  name: 'Ambassador Sarah Chen',
  email: 's.chen@embassy.gov',
  role: 'user' as const,
};

export const MOCK_TOKEN = 'mock-jwt-token-dev';

// Sample generated text for each generator type
export const MOCK_GENERATED_TEXT: Record<string, string> = {
  'note-verbale': `The Embassy of the Republic of Aldoria presents its compliments to the Ministry of Foreign Affairs of the Republic of Belmoria and has the honour to refer to the ongoing bilateral discussions concerning the facilitation of trade relations between the two countries.

The Embassy of the Republic of Aldoria wishes to bring to the attention of the Ministry of Foreign Affairs of the Republic of Belmoria that the Government of the Republic of Aldoria has carefully reviewed the proposals submitted on 15 March 2026 and is pleased to express its willingness to proceed with the establishment of a Joint Economic Commission, as previously discussed during the diplomatic consultations held in the capital.

The Embassy of the Republic of Aldoria avails itself of this opportunity to renew to the Ministry of Foreign Affairs of the Republic of Belmoria the assurances of its highest consideration.

Embassy of the Republic of Aldoria
Ref: ALB/2026/0142
22 March 2026`,

  'meeting-brief': `MEETING BRIEF — CONFIDENTIAL

Meeting: Bilateral Consultations on Climate Cooperation Framework
Date: 25 March 2026 | Time: 10:00 AM | Venue: Ministry of Foreign Affairs, Conference Room B

PARTICIPANTS
Delegation A: H.E. Ambassador Sarah Chen, Deputy Chief of Mission, Senior Political Advisor
Delegation B: Director General of Multilateral Affairs, Head of Climate Division

OBJECTIVES
1. Finalise the draft text of the Climate Cooperation Memorandum of Understanding
2. Agree on the timeline for the joint working group establishment
3. Discuss financing mechanisms for technology transfer initiatives

BACKGROUND
Both parties have expressed commitment to advancing bilateral cooperation on climate resilience following the joint declaration signed at the 2025 Summit. Three rounds of technical-level discussions have yielded consensus on 80% of the draft MOU text.

KEY MESSAGES
• Our side reaffirms commitment to the 2030 emission reduction targets
• We support the establishment of a joint monitoring mechanism
• Technology transfer must be accompanied by capacity building provisions

TONE: Collaborative and results-oriented`,

  'meeting-summary': `MEETING SUMMARY

Meeting Title: Bilateral Consultations on Climate Cooperation Framework
Date: 25 March 2026
Venue: Ministry of Foreign Affairs, Conference Room B

ATTENDEES
H.E. Ambassador Sarah Chen (Chair), Deputy Chief of Mission, Director General of Multilateral Affairs, Head of Climate Division, Senior Legal Advisor (Observer)

KEY DECISIONS
1. Both parties agreed to finalise the MOU text by 15 April 2026
2. A Joint Working Group on Climate Technology will be established by 1 June 2026
3. Annual review mechanism to be incorporated into the MOU framework
4. Financing modalities to be addressed in a separate technical annex

ACTION ITEMS
• Legal teams from both sides to circulate revised draft MOU by 5 April 2026
• Each party to nominate working group members by 20 April 2026
• Host country to circulate proposed agenda for inaugural working group meeting

NEXT STEPS
A follow-up technical meeting is proposed for mid-April to address outstanding drafting issues. The finalised MOU will be presented for signature at the Ministerial level in May 2026.`,

  speech: `Distinguished guests, Excellencies, ladies and gentlemen,

It is with great honour and a profound sense of responsibility that I stand before you today at this historic occasion. The bonds that unite our two nations transcend the formal structures of diplomacy — they are rooted in a shared vision of a more peaceful, prosperous, and equitable world.

The journey that has brought us to this moment has not been without its challenges. Yet it is precisely through the navigation of those challenges that the true character of our partnership has been revealed — steadfast, principled, and enduring.

Today, we reaffirm our collective commitment to the values that bind us: the rule of law, the peaceful resolution of disputes, and the belief that cooperation, not confrontation, is the pathway to lasting security and shared development.

As we look to the future, let us be guided by the wisdom of those who came before us, and the responsibility we bear to those who will come after. The agreements we reach today, the partnerships we deepen, and the trust we build will define the world our children inherit.

I invite you to join me in this shared endeavour — with optimism, with resolve, and with the conviction that together, we can achieve far more than any of us could alone.

Thank you.`,

  'diplomatic-letter': `[SENDER LETTERHEAD]

22 March 2026
Ref: DL/2026/089

His Excellency
Dr. Antoine Moreau
Minister of Foreign Affairs
Republic of Beaumont

Your Excellency,

I have the honour to address Your Excellency on the occasion of the forthcoming Ministerial Forum on Regional Integration, scheduled to convene in the city of Valletta on 12–14 April 2026.

On behalf of the Government of the Republic of Aldoria, I wish to express our strong support for the agenda proposed by the Forum Secretariat and our commitment to engaging constructively in the deliberations on the establishment of a Regional Free Trade Area.

In this regard, I would welcome the opportunity to hold a bilateral meeting with Your Excellency on the margins of the Forum, with a view to exchanging views on matters of mutual interest, including the proposed harmonisation of customs procedures and the facilitation of people-to-people exchanges between our two countries.

I avail myself of this opportunity to convey to Your Excellency the assurances of my highest esteem and consideration.

Faithfully yours,

H.E. Ambassador Sarah Chen
Embassy of the Republic of Aldoria`,

  'talking-points': `TALKING POINTS — FOR OFFICIAL USE ONLY

Topic: Regional Security Framework Negotiations
Audience: Bilateral Consultations — Senior Officials Level
Date: 25 March 2026

OPENING POSITION
• Aldoria reaffirms its full commitment to the principles enshrined in the Regional Security Pact of 2020
• We approach these negotiations in a spirit of constructive engagement and mutual respect
• Our objective is a framework that enhances collective security while preserving national sovereignty

KEY ARGUMENTS
1. Any new security arrangement must be underpinned by transparent information-sharing protocols
2. The proposed rapid response mechanism should include equitable burden-sharing provisions
3. Civil society oversight mechanisms are essential to ensure legitimacy and public trust
4. Economic dimensions of security cannot be decoupled from political and military considerations

SUPPORTING FACTS
• 73% of regional security incidents in 2025 involved cross-border dimensions requiring coordinated response
• Joint exercises under the existing framework have demonstrated a 40% improvement in response times
• All six regional partners have endorsed the principle of proportional contribution

POTENTIAL CONCESSIONS
• Flexibility on the timeline for the phased implementation of new commitments
• Openness to an independent monitoring mechanism as proposed by neutral parties`,

  invitation: `The Embassy of the Republic of Aldoria
requests the honour of your presence at a

RECEPTION
to mark the occasion of the
National Day of the Republic of Aldoria

Thursday, the twenty-second of April, two thousand and twenty-six
at seven o'clock in the evening

Residence of the Ambassador
12 Diplomatic Quarter, Embassy Row

Dress Code: Lounge Suit / Smart Casual

RSVP by 10 April 2026
protocol@aldoria-embassy.gov | +1 (202) 555-0174

The pleasure of a reply is requested`,
};

export const MOCK_TONE_IMPROVED =
  `Following a thorough review of the matter at hand, it is our considered position that the proposed framework merits further deliberation at the appropriate level. We would welcome the opportunity to engage in constructive dialogue with a view to achieving a mutually satisfactory outcome, consistent with the established principles governing our bilateral relationship.`;

export const MOCK_DOCUMENTS: DocumentListItem[] = [
  { id: '1', type: 'note-verbale', subject: 'Bilateral Trade Facilitation — Joint Commission Proposal', createdAt: '2026-03-20T10:30:00Z' },
  { id: '2', type: 'meeting-brief', subject: 'Climate Cooperation Framework Consultations', createdAt: '2026-03-18T14:00:00Z' },
  { id: '3', type: 'speech', subject: 'National Day Reception — Welcoming Remarks', createdAt: '2026-03-15T09:00:00Z' },
  { id: '4', type: 'diplomatic-letter', subject: 'Ministerial Forum on Regional Integration — Bilateral Meeting Request', createdAt: '2026-03-12T11:45:00Z' },
  { id: '5', type: 'talking-points', subject: 'Regional Security Framework Negotiations', createdAt: '2026-03-10T16:20:00Z' },
  { id: '6', type: 'meeting-summary', subject: 'Technical Working Group — MOU Drafting Session', createdAt: '2026-03-07T13:00:00Z' },
  { id: '7', type: 'invitation', subject: 'National Day Reception — April 2026', createdAt: '2026-03-05T10:00:00Z' },
];

export const MOCK_PAGINATED: PaginatedDocuments = {
  data: MOCK_DOCUMENTS,
  total: 7,
  page: 1,
  pageSize: 10,
  totalPages: 1,
};

export const MOCK_FULL_DOCUMENT: Record<string, Document> = {
  '1': { id: '1', type: 'note-verbale', subject: 'Bilateral Trade Facilitation — Joint Commission Proposal', content: MOCK_GENERATED_TEXT['note-verbale'], createdAt: '2026-03-20T10:30:00Z', updatedAt: '2026-03-20T10:30:00Z', userId: 'mock-user-1' },
  '2': { id: '2', type: 'meeting-brief', subject: 'Climate Cooperation Framework Consultations', content: MOCK_GENERATED_TEXT['meeting-brief'], createdAt: '2026-03-18T14:00:00Z', updatedAt: '2026-03-18T14:00:00Z', userId: 'mock-user-1' },
  '3': { id: '3', type: 'speech', subject: 'National Day Reception — Welcoming Remarks', content: MOCK_GENERATED_TEXT['speech'], createdAt: '2026-03-15T09:00:00Z', updatedAt: '2026-03-15T09:00:00Z', userId: 'mock-user-1' },
  '4': { id: '4', type: 'diplomatic-letter', subject: 'Ministerial Forum on Regional Integration', content: MOCK_GENERATED_TEXT['diplomatic-letter'], createdAt: '2026-03-12T11:45:00Z', updatedAt: '2026-03-12T11:45:00Z', userId: 'mock-user-1' },
  '5': { id: '5', type: 'talking-points', subject: 'Regional Security Framework Negotiations', content: MOCK_GENERATED_TEXT['talking-points'], createdAt: '2026-03-10T16:20:00Z', updatedAt: '2026-03-10T16:20:00Z', userId: 'mock-user-1' },
  '6': { id: '6', type: 'meeting-summary', subject: 'Technical Working Group — MOU Drafting Session', content: MOCK_GENERATED_TEXT['meeting-summary'], createdAt: '2026-03-07T13:00:00Z', updatedAt: '2026-03-07T13:00:00Z', userId: 'mock-user-1' },
  '7': { id: '7', type: 'invitation', subject: 'National Day Reception — April 2026', content: MOCK_GENERATED_TEXT['invitation'], createdAt: '2026-03-05T10:00:00Z', updatedAt: '2026-03-05T10:00:00Z', userId: 'mock-user-1' },
};

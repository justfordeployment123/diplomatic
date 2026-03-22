# Diplomatic Document Platform — Frontend Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the complete Next.js 16 frontend for the Diplomatic Document Platform — a formal document generation tool for embassy staff and government officials.

**Architecture:** Pure Next.js 16 App Router frontend (no API routes) that talks to a separate Express backend via `NEXT_PUBLIC_API_URL`. Route groups `(auth)`, `(main)`, and `(protected)` each have their own layout. A schema-driven `<GeneratorForm>` renders all 7 document generators from config files.

**Tech Stack:** Next.js 16.2.1, React 19, TypeScript 5, Tailwind CSS 4, Zustand 4, TanStack Query 5, react-hook-form 7, zod 3, axios 1.6, lucide-react, sonner, clsx, date-fns

---

## File Map

```
app/
├── layout.tsx                          MODIFY — fonts, providers, toaster
├── (auth)/
│   ├── layout.tsx                      CREATE — navy bg, centered card
│   ├── login/page.tsx                  CREATE
│   └── signup/page.tsx                 CREATE
├── (main)/
│   ├── layout.tsx                      CREATE — SiteHeader + SiteFooter
│   ├── page.tsx                        CREATE — Homepage
│   ├── generators/[type]/page.tsx      CREATE — await params (Next.js 16)
│   └── tone-improver/page.tsx          CREATE
└── (protected)/
    ├── layout.tsx                      CREATE — server auth guard
    └── dashboard/
        ├── page.tsx                    CREATE
        └── [id]/page.tsx               CREATE

components/
├── atoms/
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Textarea.tsx
│   ├── Select.tsx
│   ├── DatePicker.tsx
│   ├── TimePicker.tsx
│   ├── Toggle.tsx
│   ├── Badge.tsx
│   ├── Spinner.tsx
│   └── Tooltip.tsx
├── molecules/
│   ├── FormField.tsx
│   ├── MultiListInput.tsx
│   ├── MultiSelect.tsx
│   ├── ConditionalField.tsx
│   ├── FormSection.tsx
│   ├── ConfidentialModeBar.tsx
│   ├── DocumentCard.tsx
│   └── GeneratorCard.tsx
└── organisms/
    ├── SiteHeader.tsx
    ├── SiteFooter.tsx
    ├── AuthModal.tsx
    ├── GeneratorForm.tsx
    ├── OutputPanel.tsx
    ├── TranslationPanel.tsx
    ├── DashboardTable.tsx
    └── ToneImprover.tsx

config/generators/
├── index.ts
├── noteVerbale.ts
├── meetingBrief.ts
├── meetingSummary.ts
├── speech.ts
├── diplomaticLetter.ts
├── talkingPoints.ts
└── invitation.ts

lib/
├── apiClient.ts
├── streamGenerate.ts
└── confidentialMode.ts

stores/
├── authStore.ts
└── generatorStore.ts

hooks/
├── useGenerate.ts
├── useDocuments.ts
├── useTranslate.ts
└── useExport.ts

types/
├── generator.types.ts
├── document.types.ts
└── auth.types.ts

app/globals.css                         MODIFY — full design system tokens
components/providers.tsx                CREATE — QueryClientProvider wrapper
```

---

### Task 1: Install Dependencies

**Files:** `package.json`

- [ ] Run install:
```bash
cd /e/diplomatic/frontend && npm install zustand @tanstack/react-query react-hook-form zod axios lucide-react sonner clsx date-fns
```
- [ ] Verify package.json has all deps, then commit:
```bash
git add package.json package-lock.json
git commit -m "feat: install project dependencies"
```

---

### Task 2: Design System — globals.css + Root Layout

**Files:**
- Modify: `app/globals.css`
- Modify: `app/layout.tsx`
- Create: `components/providers.tsx`

- [ ] Replace `app/globals.css` with full design system (color tokens, typography, Tailwind 4 `@theme` block, base resets)
- [ ] Update `app/layout.tsx`: import Playfair Display + DM Sans + JetBrains Mono from `next/font/google`, wrap children in `<Providers>`, add `<Toaster>` from sonner
- [ ] Create `components/providers.tsx` — `'use client'` QueryClientProvider wrapper
- [ ] Commit:
```bash
git add app/globals.css app/layout.tsx components/providers.tsx
git commit -m "feat: design system tokens and root layout"
```

---

### Task 3: TypeScript Types

**Files:**
- Create: `types/generator.types.ts`
- Create: `types/document.types.ts`
- Create: `types/auth.types.ts`

- [ ] Write `types/generator.types.ts` — `FieldType`, `FieldConfig`, `SectionConfig`, `GeneratorConfig`
- [ ] Write `types/document.types.ts` — `Document`, `DocumentListResponse`, `PaginatedDocuments`
- [ ] Write `types/auth.types.ts` — `SafeUser`, `AuthResponse`, `LoginInput`, `SignupInput`
- [ ] Commit:
```bash
git add types/
git commit -m "feat: TypeScript type definitions"
```

---

### Task 4: Lib Layer

**Files:**
- Create: `lib/apiClient.ts`
- Create: `lib/streamGenerate.ts`
- Create: `lib/confidentialMode.ts`
- Create: `.env.local`

- [ ] Create `.env.local`:
```
NEXT_PUBLIC_API_URL=http://localhost:5000
API_URL=http://localhost:5000
```
- [ ] Write `lib/apiClient.ts` — Axios instance with `withCredentials: true`, request interceptor attaches Bearer token from authStore, response interceptor calls `clearAuth()` on 401
- [ ] Write `lib/streamGenerate.ts` — async generator using native fetch + ReadableStream
- [ ] Write `lib/confidentialMode.ts` — `applyConfidentialMode(formData, sensitiveFields)` replaces field values with `[FIELD NAME]` tags
- [ ] Commit:
```bash
git add lib/ .env.local
git commit -m "feat: API client, streaming helper, confidential mode util"
```

---

### Task 5: Zustand Stores

**Files:**
- Create: `stores/authStore.ts`
- Create: `stores/generatorStore.ts`

- [ ] Write `stores/authStore.ts` — `user`, `token` (memory only, never localStorage), `isAuthenticated`, `setAuth`, `clearAuth`
- [ ] Write `stores/generatorStore.ts` — `formData`, `isConfidentialMode`, `isGenerating`, `generatedOutput`, `editedOutput`, `setFormData`, `toggleConfidentialMode`, `appendOutput`, `setOutput`, `setEditedOutput`, `clearOutput`
- [ ] Commit:
```bash
git add stores/
git commit -m "feat: Zustand stores for auth and generator state"
```

---

### Task 6: Atom Components

**Files:** `components/atoms/` (10 files)

- [ ] `Button.tsx` — variants: `primary | secondary | ghost | danger`, sizes: `sm | md | lg`, accepts `isLoading` prop (shows Spinner)
- [ ] `Input.tsx` — label, helper text, error state, optional left/right icon, `mono` variant for reference numbers
- [ ] `Textarea.tsx` — auto-grow via `onInput` resize, optional `maxLength` + char count display
- [ ] `Select.tsx` — custom styled dropdown, keyboard-accessible, renders options array
- [ ] `DatePicker.tsx` — wraps `<input type="date">` with design-system styling
- [ ] `TimePicker.tsx` — wraps `<input type="time">` with HH:MM display
- [ ] `Toggle.tsx` — `role="switch"`, `aria-checked`, gold accent when on
- [ ] `Badge.tsx` — document type labels, status chips; variants: `default | success | danger | warning | info`
- [ ] `Spinner.tsx` — sizes: `sm | md | lg`, navy border + gold spinning segment
- [ ] `Tooltip.tsx` — wraps children, shows tooltip on hover/focus, portal-free absolute positioning
- [ ] Commit:
```bash
git add components/atoms/
git commit -m "feat: atom component library"
```

---

### Task 7: Molecule Components

**Files:** `components/molecules/` (8 files)

- [ ] `FormField.tsx` — wraps any atom with `<label>`, optional helper text, error message; accepts `id`, `label`, `error`, `helper`, `required`
- [ ] `MultiListInput.tsx` — dynamic add/remove rows for lists (Topics, Key Messages, Participants); each row is an Input + remove button; add button at bottom
- [ ] `MultiSelect.tsx` — checkbox-group in a dropdown; accepts `options[]`, renders checkboxes, shows selected count in trigger
- [ ] `ConditionalField.tsx` — renders `children` only when `show` prop is true, with smooth height transition
- [ ] `FormSection.tsx` — collapsible card with `title`, chevron toggle, contains form fields in a grid
- [ ] `ConfidentialModeBar.tsx` — sticky gold bar at top of page; only renders when `isConfidentialMode` is true in generatorStore; explains mode is active
- [ ] `DocumentCard.tsx` — dashboard row: type `Badge`, formatted date, subject truncated, "View" + "Download" icon buttons
- [ ] `GeneratorCard.tsx` — homepage tile: Lucide icon, generator title, short description, links to `/generators/[type]`
- [ ] Commit:
```bash
git add components/molecules/
git commit -m "feat: molecule component library"
```

---

### Task 8: SiteHeader + SiteFooter

**Files:**
- Create: `components/organisms/SiteHeader.tsx`
- Create: `components/organisms/SiteFooter.tsx`

- [ ] `SiteHeader.tsx` — `'use client'`. Logo text ("DiploDocs") in Playfair Display gold, nav links (Home, Tone Improver, Dashboard — dashboard hidden if not authenticated), user menu (avatar initials + logout) when authenticated, Login button when not. Uses `useAuthStore`.
- [ ] `SiteFooter.tsx` — minimal footer: logo + copyright, navy background
- [ ] Commit:
```bash
git add components/organisms/SiteHeader.tsx components/organisms/SiteFooter.tsx
git commit -m "feat: SiteHeader and SiteFooter"
```

---

### Task 9: Generator Config System

**Files:** `config/generators/` (8 files)

- [ ] Write `types/generator.types.ts` already done in Task 3 — verify FieldType union covers all needed types
- [ ] Write `config/generators/noteVerbale.ts` — sections: Parties (sender, recipient, refNumber, date), Content (subject, purpose, details, tone select)
- [ ] Write `config/generators/meetingBrief.ts` — sections: Meeting Details (title, date, time, location, participants multilist), Briefing (objectives multilist, background textarea, keyMessages multilist, tone select)
- [ ] Write `config/generators/meetingSummary.ts` — sections: Meeting Info (title, date, attendees multilist), Summary (decisions multilist, actionItems multilist, nextSteps textarea)
- [ ] Write `config/generators/speech.ts` — sections: Event (eventName, date, occasion, audience multi-select), Content (mainTheme, keyPoints multilist, tone, vipMentions toggle + conditional vipNames multilist, duration number)
- [ ] Write `config/generators/diplomaticLetter.ts` — sections: Correspondence (from, to, date, subject, refNumber), Body (purpose, body textarea, closing, tone)
- [ ] Write `config/generators/talkingPoints.ts` — sections: Context (topic, date, audience, position), Points (keyArguments multilist, supportingFacts multilist, concessions textarea)
- [ ] Write `config/generators/invitation.ts` — sections: Event (eventName, date, time, venue), Guest (hostName, honoree, dresscode, rsvpDate, rsvpContact)
- [ ] Write `config/generators/index.ts` — `GENERATOR_CONFIGS` record + `getAllGenerators()` helper returning array for homepage display
- [ ] Commit:
```bash
git add config/ types/
git commit -m "feat: generator config system for all 7 document types"
```

---

### Task 10: GeneratorForm Organism

**Files:**
- Create: `components/organisms/GeneratorForm.tsx`
- Create: `hooks/useGenerate.ts`

- [ ] Write `hooks/useGenerate.ts` — takes `config: GeneratorConfig`; reads `isConfidentialMode` from store; on submit: applies confidential mode if on, calls `streamGenerate`, calls `appendOutput` per chunk, sets `isGenerating` flag, handles errors
- [ ] Write `components/organisms/GeneratorForm.tsx` — `'use client'`. Receives `config: GeneratorConfig`. Uses react-hook-form. Renders each `SectionConfig` as a `<FormSection>`. Renders each `FieldConfig` as the correct atom (text→Input, textarea→Textarea, select→Select, multi-select→MultiSelect, multilist→MultiListInput, date→DatePicker, time→TimePicker, toggle→Toggle, conditional→ConditionalField, number→Input type=number). Confidential Mode Toggle at bottom. Submit button calls `useGenerate`.
- [ ] Commit:
```bash
git add components/organisms/GeneratorForm.tsx hooks/useGenerate.ts
git commit -m "feat: schema-driven GeneratorForm with streaming hook"
```

---

### Task 11: OutputPanel Organism

**Files:**
- Create: `components/organisms/OutputPanel.tsx`
- Create: `components/organisms/TranslationPanel.tsx`
- Create: `hooks/useTranslate.ts`
- Create: `hooks/useExport.ts`

- [ ] Write `hooks/useTranslate.ts` — TanStack Query mutation: `POST /api/translate` via apiClient
- [ ] Write `hooks/useExport.ts` — mutation: `POST /api/export/:format`, triggers browser download via `<a download>` with blob URL
- [ ] Write `components/organisms/TranslationPanel.tsx` — language Select (20 languages) + translated output display; only renders after translation is triggered
- [ ] Write `components/organisms/OutputPanel.tsx` — `'use client'`. Four states: **empty** (illustrated placeholder), **streaming** (text appears chunk by chunk + blinking cursor), **complete** (full text + action bar), **error** (message + retry). Action bar: Copy (clipboard API + sonner toast), Edit (toggle textarea mode, save to editedOutput), Translate (shows TranslationPanel), Download (docx/pdf dropdown), Email (modal with pre-populated To/Subject/Body → `POST /api/send-email`). Parses `[PLACEHOLDER]` tags in output and renders them as gold-styled editable `<span>` chips.
- [ ] Commit:
```bash
git add components/organisms/OutputPanel.tsx components/organisms/TranslationPanel.tsx hooks/
git commit -m "feat: OutputPanel with streaming states and action bar"
```

---

### Task 12: Auth Pages + AuthModal

**Files:**
- Create: `app/(auth)/layout.tsx`
- Create: `app/(auth)/login/page.tsx`
- Create: `app/(auth)/signup/page.tsx`
- Create: `components/organisms/AuthModal.tsx`

- [ ] Write `app/(auth)/layout.tsx` — navy background, vertically centered card
- [ ] Write `app/(auth)/login/page.tsx` — `'use client'`. react-hook-form + zod: email (valid email) + password (min 8). On submit: `POST /api/auth/login` via apiClient → `setAuth(user, token)` → `router.push('/dashboard')`
- [ ] Write `app/(auth)/signup/page.tsx` — same pattern: name + email + password + confirmPassword. On success: auto-login then redirect
- [ ] Write `components/organisms/AuthModal.tsx` — modal version of login/signup for unauthenticated users trying to access protected actions; uses same form logic
- [ ] Commit:
```bash
git add app/\(auth\)/ components/organisms/AuthModal.tsx
git commit -m "feat: auth pages (login, signup) and AuthModal"
```

---

### Task 13: Route Groups — Layouts + Protected Guard

**Files:**
- Create: `app/(main)/layout.tsx`
- Create: `app/(protected)/layout.tsx`

- [ ] Write `app/(main)/layout.tsx` — renders `<SiteHeader>` above `{children}` above `<SiteFooter>`; wraps in `<ConfidentialModeBar>`
- [ ] Write `app/(protected)/layout.tsx` — **server component**: in Next.js 16 `cookies()` is async, so `const cookieStore = await cookies()` then `cookieStore.get('session')?.value`. Fetches `${process.env.API_URL}/api/auth/me` with cookie header, `cache: 'no-store'`; redirects to `/login` if missing or 401
- [ ] Commit:
```bash
git add app/\(main\)/ app/\(protected\)/
git commit -m "feat: route group layouts with protected auth guard"
```

---

### Task 14: Homepage

**Files:**
- Modify: `app/(main)/page.tsx`

- [ ] Write `app/(main)/page.tsx` — hero section (Playfair Display heading, subtitle, CTA), then a responsive grid of `<GeneratorCard>` for each generator from `getAllGenerators()`, then a Tone Improver link card. Server component — no `'use client'` needed.
- [ ] Commit:
```bash
git add app/\(main\)/page.tsx
git commit -m "feat: homepage with hero and generator card grid"
```

---

### Task 15: Generator Pages

**Files:**
- Create: `app/(main)/generators/[type]/page.tsx`

- [ ] Write `app/(main)/generators/[type]/page.tsx` — **`params` is a Promise in Next.js 16**: `const { type } = await params`. Look up `GENERATOR_CONFIGS[type]`, call `notFound()` if missing. `generateStaticParams()` returns all 7 types. Layout: two-column on desktop (GeneratorForm left, OutputPanel right), stacked on mobile.
- [ ] Commit:
```bash
git add app/\(main\)/generators/
git commit -m "feat: dynamic generator pages for all 7 document types"
```

---

### Task 16: Tone Improver Page + Organism

**Files:**
- Create: `app/(main)/tone-improver/page.tsx`
- Create: `components/organisms/ToneImprover.tsx`

- [ ] Write `components/organisms/ToneImprover.tsx` — `'use client'`. Large Textarea for rough text input, tone Select (Formal / Neutral / Friendly / Urgent), Generate button. Calls `POST /api/tone-improve` via apiClient (or streaming if backend supports it). Read-only output below. Copy button on output.
- [ ] Write `app/(main)/tone-improver/page.tsx` — renders `<ToneImprover>` with page header
- [ ] Commit:
```bash
git add app/\(main\)/tone-improver/ components/organisms/ToneImprover.tsx
git commit -m "feat: tone improver page and organism"
```

---

### Task 17: Dashboard Pages

**Files:**
- Create: `app/(protected)/dashboard/page.tsx`
- Create: `app/(protected)/dashboard/[id]/page.tsx`
- Create: `components/organisms/DashboardTable.tsx`
- Create: `hooks/useDocuments.ts`

- [ ] Write `hooks/useDocuments.ts` — `useDocumentHistory(page)` query: `GET /api/documents?page=N`, staleTime 5 min. `useDocument(id)` query: `GET /api/documents/:id`. `useSendEmailMutation()` mutation: `POST /api/send-email`.
- [ ] Write `components/organisms/DashboardTable.tsx` — `'use client'`. Renders `<DocumentCard>` rows from query data. Pagination controls. Loading skeleton (5 placeholder rows). Empty state ("No documents yet — start generating!").
- [ ] Write `app/(protected)/dashboard/page.tsx` — page title + `<DashboardTable>`
- [ ] Write `app/(protected)/dashboard/[id]/page.tsx` — **server component** (no `'use client'`): `const { id } = await params`, fetch document server-side via `fetch(${process.env.API_URL}/api/documents/${id})` with cookie header. Pass data as props to a `'use client'` child `<DocumentView>` component that renders `<OutputPanel>` in read-only mode (no Edit action), re-download and re-send-email buttons.
- [ ] Commit:
```bash
git add app/\(protected\)/ components/organisms/DashboardTable.tsx hooks/useDocuments.ts
git commit -m "feat: dashboard pages with document history table"
```

---

### Task 18: Move Homepage to (main) Route Group

**Files:**
- Move default `app/page.tsx` logic into `app/(main)/page.tsx`
- Delete/empty the root `app/page.tsx` or redirect

- [ ] The default `app/page.tsx` conflicts with `app/(main)/page.tsx`. Delete content of `app/page.tsx` and add a redirect to `/` (or delete it if route group catches `/`). Verify dev server routes correctly.
- [ ] Commit:
```bash
git add app/page.tsx
git commit -m "fix: remove conflicting root page, route / through (main) group"
```

---

### Task 19: Polish & Wiring

- [ ] Add `'use client'` directives to all interactive components (double-check)
- [ ] Add `aria-label` to all icon buttons (Copy, Download, Email, Edit)
- [ ] Add `role="switch"` + `aria-checked` to Toggle (should be there from Task 6)
- [ ] Add error boundaries to generator pages: `app/(main)/generators/[type]/error.tsx`
- [ ] Add loading skeleton: `app/(protected)/dashboard/loading.tsx`
- [ ] Final commit:
```bash
git add .
git commit -m "feat: accessibility, error boundaries, loading states"
```

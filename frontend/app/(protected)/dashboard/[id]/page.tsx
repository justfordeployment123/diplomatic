import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import DocumentView from './DocumentView';
import type { Document } from '@/types/document.types';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DocumentPage({ params }: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;

  const res = await fetch(`${process.env.API_URL}/api/documents/${id}`, {
    headers: { Cookie: session ? `session=${session}` : '' },
    cache: 'no-store',
  });

  if (res.status === 404) notFound();
  if (!res.ok) throw new Error('Failed to load document');

  const document: Document = await res.json();

  return <DocumentView document={document} />;
}

import { notFound } from 'next/navigation';
import { MOCK_FULL_DOCUMENT } from '@/lib/mockData';
import DocumentView from './DocumentView';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function DocumentPage({ params }: Props) {
  const { id } = await params;
  const document = MOCK_FULL_DOCUMENT[id];

  if (!document) notFound();

  return <DocumentView document={document} />;
}

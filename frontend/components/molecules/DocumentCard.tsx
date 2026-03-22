import Link from 'next/link';
import { FileText, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';
import Badge from '@/components/atoms/Badge';
import type { DocumentListItem } from '@/types/document.types';

const typeLabels: Record<string, string> = {
  'note-verbale': 'Note Verbale',
  'meeting-brief': 'Meeting Brief',
  'meeting-summary': 'Meeting Summary',
  speech: 'Speech',
  'diplomatic-letter': 'Diplomatic Letter',
  'talking-points': 'Talking Points',
  invitation: 'Invitation',
};

interface DocumentCardProps {
  document: DocumentListItem;
  onDownload?: (id: string) => void;
}

export default function DocumentCard({ document, onDownload }: DocumentCardProps) {
  const label = typeLabels[document.type] || document.type;

  return (
    <div className="flex items-center gap-4 px-5 py-4 bg-white border-b border-border-light hover:bg-surface transition-colors">
      <FileText size={18} className="text-navy-400 shrink-0" />

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-text-primary truncate">{document.subject}</p>
        <p className="text-xs text-text-muted mt-0.5">
          {format(new Date(document.createdAt), 'dd MMM yyyy')}
        </p>
      </div>

      <Badge variant="default">{label}</Badge>

      <div className="flex items-center gap-2 shrink-0">
        <Link
          href={`/dashboard/${document.id}`}
          className="p-2 rounded-[var(--radius-sm)] text-text-muted hover:text-navy-700 hover:bg-surface-2 transition-colors"
          aria-label="View document"
        >
          <Eye size={16} />
        </Link>
        {onDownload && (
          <button
            type="button"
            onClick={() => onDownload(document.id)}
            className="p-2 rounded-[var(--radius-sm)] text-text-muted hover:text-navy-700 hover:bg-surface-2 transition-colors"
            aria-label="Download document"
          >
            <Download size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

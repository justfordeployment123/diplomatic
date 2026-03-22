'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, FileText } from 'lucide-react';
import { useDocumentHistory } from '@/hooks/useDocuments';
import DocumentCard from '@/components/molecules/DocumentCard';
import Button from '@/components/atoms/Button';
import { useExportMutation as useExport } from '@/hooks/useExport';

// Skeleton row
function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-5 py-4 border-b border-border-light animate-pulse">
      <div className="w-5 h-5 bg-navy-100 rounded" />
      <div className="flex-1">
        <div className="h-4 bg-navy-100 rounded w-2/3 mb-2" />
        <div className="h-3 bg-navy-050 rounded w-1/4" />
      </div>
      <div className="h-5 w-20 bg-navy-050 rounded" />
      <div className="flex gap-2">
        <div className="w-8 h-8 bg-navy-050 rounded" />
        <div className="w-8 h-8 bg-navy-050 rounded" />
      </div>
    </div>
  );
}

export default function DashboardTable() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isError } = useDocumentHistory(page);
  const { mutateAsync: downloadDocx } = useExport('docx');

  if (isError) {
    return (
      <div className="flex items-center justify-center py-16 text-danger text-sm">
        Failed to load documents. Please try again.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-white border border-border rounded-[var(--radius-xl)] overflow-hidden shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <h2 className="text-base font-semibold text-navy-800">Document History</h2>
          {data && (
            <span className="text-sm text-text-muted">{data.total} documents</span>
          )}
        </div>

        {/* Rows */}
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} />)
        ) : data?.data.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-3 py-16">
            <div className="w-14 h-14 rounded-full bg-navy-050 flex items-center justify-center">
              <FileText size={24} className="text-navy-200" />
            </div>
            <p className="text-sm font-medium text-text-secondary">No documents yet</p>
            <p className="text-xs text-text-muted">Start generating documents to see them here</p>
          </div>
        ) : (
          data?.data.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDownload={(id) => downloadDocx(`document-${id}`)}
            />
          ))
        )}
      </div>

      {/* Pagination */}
      {data && data.totalPages > 1 && (
        <div className="flex items-center justify-between">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            <ChevronLeft size={14} /> Previous
          </Button>
          <span className="text-sm text-text-muted">
            Page {page} of {data.totalPages}
          </span>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setPage((p) => Math.min(data.totalPages, p + 1))}
            disabled={page === data.totalPages}
          >
            Next <ChevronRight size={14} />
          </Button>
        </div>
      )}
    </div>
  );
}

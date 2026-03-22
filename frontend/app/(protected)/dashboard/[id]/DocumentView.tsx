'use client';

import Link from 'next/link';
import { ArrowLeft, Download, Mail } from 'lucide-react';
import { format } from 'date-fns';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import type { Document } from '@/types/document.types';
import { useGeneratorStore } from '@/stores/generatorStore';
import { useExportMutation } from '@/hooks/useExport';
import { useSendEmailMutation } from '@/hooks/useDocuments';
import Badge from '@/components/atoms/Badge';
import Button from '@/components/atoms/Button';

const typeLabels: Record<string, string> = {
  'note-verbale': 'Note Verbale',
  'meeting-brief': 'Meeting Brief',
  'meeting-summary': 'Meeting Summary',
  speech: 'Speech',
  'diplomatic-letter': 'Diplomatic Letter',
  'talking-points': 'Talking Points',
  invitation: 'Invitation',
};

interface DocumentViewProps {
  document: Document;
}

export default function DocumentView({ document }: DocumentViewProps) {
  const { setOutput } = useGeneratorStore();
  const { mutateAsync: downloadDocx, isPending: docxLoading } = useExportMutation('docx');
  const { mutateAsync: downloadPdf, isPending: pdfLoading } = useExportMutation('pdf');
  const { mutateAsync: sendEmail, isPending: emailLoading } = useSendEmailMutation();

  const [showEmailModal, setShowEmailModal] = useState(false);
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState(document.subject);

  // Pre-populate store so OutputPanel can read the content
  useEffect(() => { setOutput(document.content); }, [document.content, setOutput]);

  const label = typeLabels[document.type] || document.type;

  const handleSendEmail = async () => {
    if (!emailTo) { toast.error('Enter recipient email'); return; }
    try {
      await sendEmail({ to: emailTo, subject: emailSubject, body: document.content });
      toast.success('Email sent');
      setShowEmailModal(false);
    } catch {
      toast.error('Failed to send email');
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6">
      {/* Back link */}
      <Link
        href="/dashboard"
        className="inline-flex items-center gap-2 text-sm text-text-muted hover:text-navy-700 transition-colors"
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </Link>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Badge variant="default">{label}</Badge>
            <span className="text-sm text-text-muted">
              {format(new Date(document.createdAt), 'dd MMMM yyyy')}
            </span>
          </div>
          <h1
            className="text-2xl font-bold text-navy-900"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {document.subject}
          </h1>
        </div>

        <div className="flex gap-2 shrink-0">
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadDocx(document.content)}
            isLoading={docxLoading}
          >
            <Download size={14} />
            .docx
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => downloadPdf(document.content)}
            isLoading={pdfLoading}
          >
            <Download size={14} />
            .pdf
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => setShowEmailModal(true)}
          >
            <Mail size={14} />
            Email
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="bg-white border border-border rounded-[var(--radius-xl)] p-8 shadow-sm">
        <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
          {document.content}
        </div>
      </div>

      {/* Email modal */}
      {showEmailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[var(--radius-xl)] shadow-lg w-full max-w-md mx-4 p-6 flex flex-col gap-4">
            <h2 className="text-lg font-semibold text-text-primary">Send via Email</h2>
            <input
              type="email"
              placeholder="Recipient email"
              value={emailTo}
              onChange={(e) => setEmailTo(e.target.value)}
              className="h-10 px-3 border border-border rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            />
            <input
              type="text"
              placeholder="Subject"
              value={emailSubject}
              onChange={(e) => setEmailSubject(e.target.value)}
              className="h-10 px-3 border border-border rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40"
            />
            <div className="flex justify-end gap-3">
              <Button variant="ghost" onClick={() => setShowEmailModal(false)}>Cancel</Button>
              <Button onClick={handleSendEmail} isLoading={emailLoading}>Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

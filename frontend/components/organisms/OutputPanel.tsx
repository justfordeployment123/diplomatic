'use client';

import { useState, Fragment } from 'react';
import { Copy, Edit3, Languages, Download, Mail, RefreshCw, FileText, ChevronDown } from 'lucide-react';
import { toast } from 'sonner';
import { useGeneratorStore } from '@/stores/generatorStore';
import { useExportMutation } from '@/hooks/useExport';
import { useSendEmailMutation } from '@/hooks/useDocuments';
import TranslationPanel from './TranslationPanel';
import Button from '@/components/atoms/Button';
import Spinner from '@/components/atoms/Spinner';

interface EmailModalProps {
  body: string;
  onClose: () => void;
}

function EmailModal({ body, onClose }: EmailModalProps) {
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [emailBody, setEmailBody] = useState(body);
  const { mutateAsync, isPending } = useSendEmailMutation();

  const handleSend = async () => {
    if (!to) { toast.error('Please enter a recipient'); return; }
    try {
      await mutateAsync({ to, subject, body: emailBody });
      toast.success('Email sent');
      onClose();
    } catch {
      toast.error('Failed to send email');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-navy-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-[var(--radius-xl)] shadow-lg w-full max-w-lg mx-4 p-6 flex flex-col gap-4">
        <h2 className="text-lg font-semibold text-text-primary">Send via Email</h2>
        <input
          type="email"
          placeholder="To"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="h-10 px-3 border border-border rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
        />
        <input
          type="text"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="h-10 px-3 border border-border rounded-[var(--radius-md)] text-sm focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
        />
        <textarea
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
          rows={8}
          className="px-3 py-2 border border-border rounded-[var(--radius-md)] text-sm resize-none focus:outline-none focus:ring-2 focus:ring-gold-500/40 focus:border-gold-500"
        />
        <div className="flex justify-end gap-3">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSend} isLoading={isPending}>Send</Button>
        </div>
      </div>
    </div>
  );
}

/** Parse output string — wrap [PLACEHOLDER] tags in editable gold chips */
function renderWithChips(text: string) {
  const parts = text.split(/(\[[A-Z][A-Z\s]*\])/g);
  return parts.map((part, i) => {
    if (/^\[[A-Z][A-Z\s]*\]$/.test(part)) {
      return (
        <span
          key={i}
          contentEditable
          suppressContentEditableWarning
          className="placeholder-chip"
        >
          {part}
        </span>
      );
    }
    return <Fragment key={i}>{part}</Fragment>;
  });
}

interface OutputPanelProps {
  readOnly?: boolean;
  initialContent?: string;
}

export default function OutputPanel({ readOnly = false, initialContent }: OutputPanelProps) {
  const { generatedOutput, isGenerating, editedOutput, setEditedOutput } =
    useGeneratorStore();

  const content = initialContent ?? (editedOutput ?? generatedOutput);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState('');
  const [showTranslation, setShowTranslation] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [showDownloadMenu, setShowDownloadMenu] = useState(false);

  const { mutateAsync: exportDocx, isPending: exportingDocx } = useExportMutation('docx');
  const { mutateAsync: exportPdf, isPending: exportingPdf } = useExportMutation('pdf');

  const copy = () => {
    navigator.clipboard.writeText(content);
    toast.success('Copied to clipboard');
  };

  const startEdit = () => {
    setEditValue(content);
    setIsEditing(true);
  };

  const saveEdit = () => {
    setEditedOutput(editValue);
    setIsEditing(false);
  };

  const cancelEdit = () => setIsEditing(false);

  // ── Empty state ──────────────────────────────────────────────────────
  if (!isGenerating && !content) {
    return (
      <div className="flex flex-col items-center justify-center gap-4 h-80 bg-white border border-dashed border-border rounded-[var(--radius-xl)] text-center p-8">
        <div className="w-16 h-16 rounded-full bg-navy-050 flex items-center justify-center">
          <FileText size={28} className="text-navy-200" />
        </div>
        <div>
          <p className="text-base font-medium text-text-secondary">Fill the form to generate</p>
          <p className="text-sm text-text-muted mt-1">Your document will appear here</p>
        </div>
      </div>
    );
  }

  // ── Streaming state ──────────────────────────────────────────────────
  if (isGenerating) {
    return (
      <div className="bg-white border border-border rounded-[var(--radius-xl)] p-6 min-h-80 flex flex-col gap-3">
        <div className="flex items-center gap-2 text-sm text-text-muted">
          <Spinner size="sm" />
          Generating document...
        </div>
        <div className="text-sm text-text-primary whitespace-pre-wrap leading-relaxed blink-cursor">
          {generatedOutput}
        </div>
      </div>
    );
  }

  // ── Complete state ───────────────────────────────────────────────────
  return (
    <>
      <div className="bg-white border border-border rounded-[var(--radius-xl)] flex flex-col shadow-sm">
        {/* Action bar */}
        {!readOnly && (
          <div className="flex items-center gap-1 px-4 py-3 border-b border-border-light flex-wrap">
            <button
              onClick={copy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-navy-700 hover:bg-surface-2 rounded transition-colors"
              aria-label="Copy document"
            >
              <Copy size={13} /> Copy
            </button>

            {!isEditing ? (
              <button
                onClick={startEdit}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-navy-700 hover:bg-surface-2 rounded transition-colors"
                aria-label="Edit document"
              >
                <Edit3 size={13} /> Edit
              </button>
            ) : (
              <>
                <Button size="sm" variant="primary" onClick={saveEdit}>Save edits</Button>
                <Button size="sm" variant="ghost" onClick={cancelEdit}>Cancel</Button>
              </>
            )}

            <button
              onClick={() => setShowTranslation(!showTranslation)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-navy-700 hover:bg-surface-2 rounded transition-colors"
              aria-label="Translate document"
            >
              <Languages size={13} /> Translate
            </button>

            <div className="relative">
              <button
                onClick={() => setShowDownloadMenu(!showDownloadMenu)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-navy-700 hover:bg-surface-2 rounded transition-colors"
                aria-label="Download document"
              >
                <Download size={13} />
                Download
                <ChevronDown size={11} />
              </button>
              {showDownloadMenu && (
                <div className="absolute top-full mt-1 left-0 bg-white border border-border rounded-[var(--radius-md)] shadow-md z-20 w-36">
                  <button
                    onClick={async () => { await exportDocx(content); setShowDownloadMenu(false); }}
                    disabled={exportingDocx}
                    className="w-full px-3 py-2 text-sm text-left text-text-primary hover:bg-surface-2 transition-colors disabled:opacity-50"
                  >
                    {exportingDocx ? 'Exporting...' : '.docx'}
                  </button>
                  <button
                    onClick={async () => { await exportPdf(content); setShowDownloadMenu(false); }}
                    disabled={exportingPdf}
                    className="w-full px-3 py-2 text-sm text-left text-text-primary hover:bg-surface-2 transition-colors disabled:opacity-50"
                  >
                    {exportingPdf ? 'Exporting...' : '.pdf'}
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setShowEmailModal(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-text-secondary hover:text-navy-700 hover:bg-surface-2 rounded transition-colors"
              aria-label="Send document via email"
            >
              <Mail size={13} /> Email
            </button>
          </div>
        )}

        {/* Content */}
        <div className="p-6 flex-1">
          {isEditing ? (
            <textarea
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full min-h-96 text-sm text-text-primary leading-relaxed whitespace-pre-wrap resize-none border-none focus:outline-none"
              autoFocus
            />
          ) : (
            <div className="text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
              {renderWithChips(content)}
            </div>
          )}
        </div>

        {showTranslation && !readOnly && (
          <div className="px-6 pb-6">
            <TranslationPanel sourceText={content} />
          </div>
        )}
      </div>

      {showEmailModal && (
        <EmailModal body={content} onClose={() => setShowEmailModal(false)} />
      )}
    </>
  );
}

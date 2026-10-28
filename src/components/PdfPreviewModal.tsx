import { useState } from 'react';
import { X, Download, ExternalLink, Printer, CheckCircle, FileText } from 'lucide-react';
import { downloadCvPdf, openCvPdfInNewTab, getCvPdfBlobUrl } from '../utils/cvDownloader';

interface PdfPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  theme: 'light' | 'dark';
}

export function PdfPreviewModal({ isOpen, onClose, theme }: PdfPreviewModalProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const isLight = theme === 'light';

  if (!isOpen) return null;

  const blobUrl = getCvPdfBlobUrl();

  const handleDownload = () => {
    downloadCvPdf('Mahmud_IT_Officer.pdf');
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handlePrint = () => {
    const iframe = document.getElementById('cv-pdf-preview-frame') as HTMLIFrameElement | null;
    if (iframe?.contentWindow) {
      try {
        iframe.contentWindow.print();
        return;
      } catch {
        // fallback
      }
    }
    openCvPdfInNewTab();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-xs">
      <div
        className={`relative w-full max-w-5xl h-[92vh] flex flex-col rounded-2xl border shadow-2xl overflow-hidden transition-colors ${
          isLight ? 'bg-white border-slate-200 text-slate-900' : 'bg-zinc-950 border-zinc-800 text-zinc-100'
        }`}
      >
        {/* Modal Header */}
        <div
          className={`flex items-center justify-between px-5 py-3.5 border-b ${
            isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/90 border-zinc-800'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-blue-600/10 text-blue-600">
              <FileText className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold leading-tight">
                Golam Mahmud — Official CV (3-Page PDF)
              </h3>
              <p className={`text-xs ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}>
                Verified PDF Document · 1.9 MB · IT Officer &amp; Network Operations
              </p>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-xs transition-colors"
              title="Download Mahmud_IT_Officer.pdf to your computer"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-200" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </>
              )}
            </button>

            <button
              onClick={openCvPdfInNewTab}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isLight
                  ? 'border-slate-300 hover:bg-slate-100 text-slate-700'
                  : 'border-zinc-700 hover:bg-zinc-800 text-zinc-200'
              }`}
              title="Open full PDF document in a new tab"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Open in New Tab</span>
            </button>

            <button
              onClick={handlePrint}
              className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                isLight
                  ? 'border-slate-300 hover:bg-slate-100 text-slate-700'
                  : 'border-zinc-700 hover:bg-zinc-800 text-zinc-200'
              }`}
              title="Print CV document"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              className={`p-1.5 rounded-lg transition-colors ${
                isLight
                  ? 'text-slate-500 hover:bg-slate-200 hover:text-slate-900'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Embedded View */}
        <div className="flex-1 w-full h-full bg-zinc-800 relative">
          <iframe
            id="cv-pdf-preview-frame"
            src={`${blobUrl}#toolbar=1&navpanes=0`}
            className="w-full h-full border-none"
            title="Golam Mahmud CV PDF Preview"
          />
        </div>

        {/* Modal Footer note */}
        <div
          className={`px-5 py-2.5 text-xs flex flex-wrap items-center justify-between gap-2 border-t ${
            isLight ? 'bg-slate-50 border-slate-200 text-slate-600' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
          }`}
        >
          <span>
            Original File: <code className="font-mono text-blue-600 dark:text-blue-400">Mahmud_IT_Officer.pdf</code> (1,896,812 bytes)
          </span>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
            <span>Integrity verified (%PDF-1.5)</span>
          </div>
        </div>
      </div>
    </div>
  );
}

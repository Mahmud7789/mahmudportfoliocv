import { CV_PDF_BASE64 } from '../data/cvBase64';

let cachedBlobUrl: string | null = null;

export function getCvPdfBlob(): Blob {
  const binaryString = atob(CV_PDF_BASE64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return new Blob([bytes], { type: 'application/pdf' });
}

export function getCvPdfBlobUrl(): string {
  if (!cachedBlobUrl) {
    const blob = getCvPdfBlob();
    cachedBlobUrl = URL.createObjectURL(blob);
  }
  return cachedBlobUrl;
}

/**
 * Downloads the official, uncorrupted 3-page CV PDF using an in-memory Blob.
 * This completely avoids cross-origin iframe sandbox/cookie redirect issues that
 * corrupt PDF downloads into HTML login redirects in AI Studio and preview environments.
 */
export function downloadCvPdf(filename = 'Mahmud_IT_Officer.pdf'): boolean {
  try {
    const blob = getCvPdfBlob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.setAttribute('rel', 'noopener noreferrer');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }, 1500);
    return true;
  } catch (error) {
    console.error('In-memory Blob download failed, falling back:', error);
    const fallbackLink = document.createElement('a');
    fallbackLink.href = '/assets/aistudio/Mahmud_IT_Officer.pdf';
    fallbackLink.download = filename;
    fallbackLink.target = '_blank';
    fallbackLink.rel = 'noopener noreferrer';
    document.body.appendChild(fallbackLink);
    fallbackLink.click();
    setTimeout(() => document.body.removeChild(fallbackLink), 1000);
    return false;
  }
}

/**
 * Opens the official PDF in a new browser tab using an in-memory Blob URL.
 */
export function openCvPdfInNewTab(): void {
  try {
    const blobUrl = getCvPdfBlobUrl();
    window.open(blobUrl, '_blank');
  } catch {
    window.open('/assets/aistudio/Mahmud_IT_Officer.pdf', '_blank');
  }
}

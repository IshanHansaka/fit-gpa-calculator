'use client';

import { useState } from 'react';

interface HtmlImporterProps {
  onImportComplete: (gradesMap: Record<string, string>) => void;
}

export default function HtmlImporter({ onImportComplete }: HtmlImporterProps) {
  const [showInstructions, setShowInstructions] = useState(false);
  const [deviceTab, setDeviceTab] = useState<'desktop' | 'mobile'>('desktop');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (event) => {
      try {
        const htmlText = event.target?.result as string;
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');

        const gradesMap: Record<string, string> = {};
        const rows = doc.querySelectorAll('tr');

        rows.forEach((row) => {
          const cells = row.querySelectorAll('td');
          if (cells.length >= 4) {
            const title = cells[1].textContent?.trim().toLowerCase();
            const grade = cells[2].textContent?.trim();

            if (title && grade && grade !== 'Pending' && grade.length <= 2) {
              gradesMap[title] = grade;
            }
          }
        });

        onImportComplete(gradesMap);
      } catch (error) {
        console.error('Failed to parse HTML:', error);
        alert('Failed to parse the file.');
      } finally {
        setIsProcessing(false);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6 border border-fuchsia-200 dark:border-fuchsia-900 text-sm">
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h3 className="font-bold text-fuchsia-700 dark:text-fuchsia-400 text-base">
            Auto-Sync from LearnOrg
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Import your official results directly from your LMS.
          </p>
        </div>

        <div className="flex gap-3 w-full md:w-auto justify-end">
          <button
            onClick={() => setShowInstructions(!showInstructions)}
            className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md font-semibold hover:bg-gray-200 transition-colors flex-1 md:flex-none"
          >
            How to do this?
          </button>

          <label className="px-4 py-2 bg-fuchsia-600 text-white rounded-md font-semibold hover:bg-fuchsia-700 transition-colors cursor-pointer flex items-center justify-center min-w-[120px] flex-1 md:flex-none">
            {isProcessing ? 'Reading...' : 'Upload File'}
            {/* Added .mhtml and .webarchive for mobile browser support */}
            <input
              type="file"
              accept=".html,.htm,.mhtml,.webarchive"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
        </div>
      </div>

      {showInstructions && (
        <div className="mt-4 p-4 bg-fuchsia-50 dark:bg-slate-900 rounded-md border border-fuchsia-100 dark:border-slate-700 text-gray-700 dark:text-gray-300">
          {/* Desktop/Mobile Toggle */}
          <div className="flex gap-4 mb-3 border-b border-fuchsia-200 dark:border-slate-600 pb-2">
            <button
              onClick={() => setDeviceTab('desktop')}
              className={`font-semibold pb-1 border-b-2 transition-colors ${deviceTab === 'desktop' ? 'text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-600 dark:border-fuchsia-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'}`}
            >
              Desktop
            </button>
            <button
              onClick={() => setDeviceTab('mobile')}
              className={`font-semibold pb-1 border-b-2 transition-colors ${deviceTab === 'mobile' ? 'text-fuchsia-700 dark:text-fuchsia-400 border-fuchsia-600 dark:border-fuchsia-400' : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 border-transparent'}`}
            >
              Mobile
            </button>
          </div>

          {/* Instructions Content */}
          {deviceTab === 'desktop' ? (
            <ol className="list-decimal list-inside space-y-1">
              <li>
                Log in to <strong>LearnOrg</strong> on your computer.
              </li>
              <li>
                Navigate to <strong>View My Results</strong>.
              </li>
              <li>
                Press <strong>Ctrl + S</strong> (Windows) or{' '}
                <strong>Cmd + S</strong> (Mac) to save the webpage.
              </li>
              <li>
                Ensure the format is set to{' '}
                <strong>&quot;Webpage, HTML Only&quot;</strong>.
              </li>
              <li>Upload that saved file using the button above.</li>
            </ol>
          ) : (
            <ol className="list-decimal list-inside space-y-2">
              <li>
                Log in to <strong>LearnOrg</strong> on your mobile browser.
              </li>
              <li>
                Navigate to <strong>View My Results</strong>.
              </li>
              <li>
                <strong>Android (Chrome):</strong> Tap the 3-dot menu (⋮) at the
                top right and tap the Download (⬇️) icon.
              </li>
              <li>
                <strong>iOS (Safari):</strong> Tap the Share button, select{' '}
                <strong>Options</strong>, choose <strong>Web Archive</strong>,
                then tap <strong>Save to Files</strong>.
              </li>
              <li>
                Tap the upload button above and select the saved file from your
                device.
              </li>
            </ol>
          )}
        </div>
      )}
    </div>
  );
}

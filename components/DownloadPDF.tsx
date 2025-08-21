'use client';

import React, { useState } from 'react';
import {
  University,
  universityLogos,
  Degree,
  degrees,
} from '../constants/constraint';
import Image from 'next/image';

const DownloadPDF = ({
  totalCredits,
  result,
  summary,
  tableHtml,
}: {
  totalCredits: number;
  result: string;
  summary: string;
  tableHtml: string;
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [degree, setDegree] = useState<Degree | ''>('');
  const [university, setUniversity] = useState<University>(
    'University of Moratuwa'
  );

  const handleDownload = () => {
    setShowPopup(true);
  };

  const handleConfirm = async () => {
    setShowPopup(false);
    const html2pdf = (await import('html2pdf.js')).default;

    const element = document.createElement('div');
    element.style.position = 'relative';
    element.style.padding = '0px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.background = '#fff';

    element.innerHTML = `
      <div style='position:relative; z-index:1; font-family: Arial, sans-serif; background: #fff;'>
        <div style='display:flex;align-items:center;gap:16px;margin-bottom:24px;'>
          <img src='${
            universityLogos[university] || ''
          }' alt='logo' style='height:64px;'/>
          <div>
            <div style='font-size:2rem;font-weight:bold;color:#a21caf;'>${degree}</div>
            <div style='font-size:1.2rem;color:#333;'>${university}</div>
          </div>
        </div>
        <hr style='margin:16px 0;border-color:#a21caf;'>
        <div style='margin-top:3px;font-size:1.1rem;color:#a21caf;font-weight:bold;'>${result}</div>
        <div style='margin-top:3px;font-size:1.1rem;color:#a21caf;font-weight:bold;'>Total Credits: ${totalCredits}</div>
        <div style='margin-top:3px;margin-bottom:16px;font-size:1.1rem;color:#a21caf;font-weight:bold;'>${
          summary || ''
        }</div>
        <div style='margin-bottom:24px;'>${tableHtml || ''}</div>
        <footer style='margin-bottom:5px;text-align:center;opacity:0.5;font-size:1rem;color:#333;'>
          Generate by FIT GPA Calculator &copy; ${new Date().getFullYear()}
        </footer>
      </div>
    `;

    html2pdf()
      .set({
        margin: [35, 25, 60, 25], // add padding, esp. bottom
        filename: 'gpa-summary.pdf',
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'pt', format: 'a4', orientation: 'portrait' },
      })
      .from(element)
      .save();
  };

  return (
    <div className="w-full flex justify-center md:justify-end mb-5 px-4 sm:px-0">
      <button
        onClick={handleDownload}
        className="w-full sm:w-auto min-w-0 px-3 sm:px-4 py-2.5 sm:py-2 bg-fuchsia-600 dark:bg-fuchsia-600 hover:bg-fuchsia-700 dark:hover:bg-fuchsia-700 text-white rounded-md font-semibold flex gap-2 items-center justify-center transition-all duration-200 active:scale-95 touch-manipulation"
      >
        <Image
          src="/download.svg"
          width={20}
          height={20}
          className="sm:w-6 sm:h-6 flex-shrink-0"
          alt="download"
        />
        <span className="text-sm sm:text-base whitespace-nowrap overflow-hidden text-ellipsis">
          Export GPA Summary
        </span>
      </button>
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center z-50 px-6 bg-black bg-opacity-80 backdrop-blur-sm">
          <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col justify-center items-center relative transition-colors duration-300">
            <h2 className="text-2xl font-extrabold mb-6 text-fuchsia-600 dark:text-fuchsia-400 text-center">
              Export GPA Summary
            </h2>

            {/* University */}
            <div className="w-full mb-4">
              <label className="block mb-2 font-semibold text-sm text-gray-900 dark:text-gray-200">
                University
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value as University)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-fuchsia-500 transition-colors"
              >
                {Object.keys(universityLogos).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>

            {/* Degree */}
            <div className="w-full mb-6">
              <label className="block mb-2 font-semibold text-sm text-gray-900 dark:text-gray-200">
                Degree
              </label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value as Degree)}
                className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-fuchsia-500 transition-colors"
              >
                <option value="" disabled>
                  Select your degree
                </option>
                {degrees.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full justify-between">
              <button
                onClick={handleConfirm}
                disabled={!degree}
                className={`flex-1 py-2.5 rounded-lg font-semibold text-white text-sm sm:text-base transition-all duration-200 shadow-md
                  ${
                    degree
                      ? 'bg-fuchsia-600 hover:bg-fuchsia-700 active:scale-95'
                      : 'bg-fuchsia-400 cursor-not-allowed'
                  }
          `}
              >
                Confirm & Download
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="flex-1 py-2.5 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 font-semibold text-sm sm:text-base transition-all duration-200 shadow-md active:scale-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadPDF;

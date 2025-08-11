'use client';

import React, { useState } from 'react';
import { University, universityLogos, Degree, degrees } from '../constraint';
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
    element.style.padding = '32px';
    element.style.fontFamily = 'Arial, sans-serif';
    element.style.background = '#fff';
    element.innerHTML = `
			<div style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:4rem;color:#a21caf22;pointer-events:none;z-index:0;font-weight:bold;white-space:nowrap;'>FIT GPA Calculator</div>
			<div style='position:relative;z-index:1;'>
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
				<div style='margin-bottom:16px;'>${summary || ''}</div>
						<div style='margin-bottom:24px;'>
							${tableHtml || ''}
						</div>
				<div style='margin-top:24px;font-size:1.1rem;color:#a21caf;font-weight:bold;'>Total Credits: ${totalCredits}</div>
				<div style='margin-top:8px;font-size:1.1rem;color:#a21caf;font-weight:bold;'>Result: ${result}</div>
				<footer style='margin-top:32px;text-align:center;opacity:0.5;font-size:1rem;'>FIT GPA Calculator &copy; ${new Date().getFullYear()}</footer>
			</div>
		`;
    html2pdf()
      .set({
        margin: 0,
        filename: 'gpa-summary.pdf',
        html2canvas: { scale: 2 },
      })
      .from(element)
      .save();
  };

  return (
    <div className="w-full flex md:justify-end justify-center mb-5">
      <button
        onClick={handleDownload}
        className="px-4 py-2 bg-fuchsia-600 dark:bg-fuchsia-600 hover:bg-fuchsia-700 dark:hover:bg-fuchsia-700 text-white rounded-md font-semibold flex gap-2 items-center"
      >
        <Image src="/download.svg" width={24} height={24} alt="download" />
        Export GPA Summary
      </button>
      {showPopup && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          style={{ backdropFilter: 'blur(6px)' }}
        >
          <div className="bg-purple-50 dark:bg-slate-900 p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-sm sm:max-w-md mx-4">
            <h2 className="text-lg font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-500 text-center">
              Export GPA Summary
            </h2>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-900 dark:text-white">
                University
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value as University)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 hover:border-fuchsia-600 cursor-pointer"
              >
                {Object.keys(universityLogos).map((u) => (
                  <option key={u} value={u}>
                    {u}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1 font-semibold text-gray-900 dark:text-white">
                Degree
              </label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value as Degree)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 focus:border-fuchsia-500 hover:border-fuchsia-600 cursor-pointer"
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

            <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center">
              <button
                onClick={handleConfirm}
                disabled={!degree}
                className={`w-full sm:w-auto px-4 py-2 rounded-md font-semibold text-white
                  ${
                    degree
                      ? 'bg-fuchsia-600 cursor-pointer hover:bg-fuchsia-700'
                      : 'bg-fuchsia-400 cursor-not-allowed'
                  }
                `}
              >
                Confirm & Download
              </button>
              <button
                onClick={() => setShowPopup(false)}
                className="w-full sm:w-auto px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-300 font-semibold"
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

import React, { useState } from 'react';
import html2pdf from 'html2pdf.js';
import { universityLogos } from '../constraint';
import Image from 'next/image';

const DownloadPDF = ({ totalCredits, result, summary, tableHtml }: { totalCredits: number, result: string, summary: string, tableHtml: string }) => {
	const [showPopup, setShowPopup] = useState(false);
	const [degree, setDegree] = useState('');
	const [university, setUniversity] = useState<'University of Moratuwa' | 'University of Colombo' | 'University of Peradeniya'>('University of Moratuwa');

	const handleDownload = () => {
		setShowPopup(true);
	};

	const handleConfirm = () => {
		setShowPopup(false);
		const element = document.createElement('div');
		element.style.position = 'relative';
		element.style.padding = '32px';
		element.style.fontFamily = 'Arial, sans-serif';
		element.style.background = '#fff';
		element.innerHTML = `
			<div style='position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-size:4rem;color:#a21caf22;pointer-events:none;z-index:0;font-weight:bold;white-space:nowrap;'>FIT GPA Calculator</div>
			<div style='position:relative;z-index:1;'>
				<div style='display:flex;align-items:center;gap:16px;margin-bottom:24px;'>
					<img src='${universityLogos[university] || ''}' alt='logo' style='height:64px;'/>
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
		html2pdf().set({ margin: 0, filename: 'gpa-summary.pdf', html2canvas: { scale: 2 } }).from(element).save();
	};

		return (
			<>
				<button
					onClick={handleDownload}
					className="px-4 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-700 font-semibold"
				>
					Download PDF
				</button>
				{showPopup && (
					   <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50" style={{ backdropFilter: 'blur(6px)' }}>
						<div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
							<h2 className="text-xl font-bold mb-4 text-fuchsia-700 text-center">Download PDF</h2>
							<div className="mb-4">
								<label className="block mb-1 font-semibold">Degree</label>
								<input
									type="text"
									value={degree}
									onChange={e => setDegree(e.target.value)}
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-fuchsia-500"
									placeholder="e.g. BSc in IT"
								/>
							</div>
							<div className="mb-4">
								<label className="block mb-1 font-semibold">University</label>
								<select
									value={university}
									onChange={e => setUniversity(e.target.value as 'University of Moratuwa' | 'University of Colombo' | 'University of Peradeniya')}
									className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-fuchsia-500"
								>
									{Object.keys(universityLogos).map(u => (
										<option key={u} value={u}>{u}</option>
									))}
								</select>
							</div>
							<div className="flex gap-4 mt-6 items-center justify-center">
								<button
									onClick={handleConfirm}
									className="px-4 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-700 font-semibold"
									disabled={!degree}
								>
									Confirm & Download
								</button>
								<button
									onClick={() => setShowPopup(false)}
									className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 font-semibold"
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				)}
			</>
	);
};

export default DownloadPDF;

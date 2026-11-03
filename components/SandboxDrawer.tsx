'use client';

import { useState, useEffect } from 'react';
import Class from './Class';
import Semester from './Semester';
import { SemesterType } from '@/types/Semester';
import { gradeToPoint } from '@/constants/grades';

interface SandboxDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  realSemesters: SemesterType[];
}

export default function SandboxDrawer({ isOpen, onClose, realSemesters }: SandboxDrawerProps) {
  const [sandboxSemesters, setSandboxSemesters] = useState<SemesterType[]>([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  // 1. Initialize data ONLY on the very first open so it saves the user's progress
  // 2. Lock the background scrolling on the main page
  useEffect(() => {
    if (isOpen) {
      if (!hasInitialized) {
        setSandboxSemesters(JSON.parse(JSON.stringify(realSemesters)));
        setHasInitialized(true);
      }
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, hasInitialized, realSemesters]);

  // Dedicated reset function to clear the sandbox and fetch the actual data again
  const handleReset = () => {
    setSandboxSemesters(JSON.parse(JSON.stringify(realSemesters)));
  };

  const calculateCreditsAndGPA = (semesters: SemesterType[]) => {
    let totalGPACredits = 0;
    let totalNGPACredits = 0;
    let totalGradePoints = 0;

    semesters.forEach((semester) => {
      semester.modules.forEach((module) => {
        const credits = parseFloat(module.credits) || 0;
        const gradePoint = gradeToPoint[module.grade] || 0;

        if (module.gpa === 'GPA') {
          totalGPACredits += credits;
          totalGradePoints += gradePoint * credits;
        } else if (module.gpa === 'NGPA') {
          totalNGPACredits += credits;
        }
      });
    });

    return { totalGPACredits, totalNGPACredits, totalGradePoints };
  };

  const { totalGPACredits, totalNGPACredits, totalGradePoints } = calculateCreditsAndGPA(sandboxSemesters);
  const overallGPA = totalGPACredits > 0 ? parseFloat((totalGradePoints / totalGPACredits).toFixed(2)) : 0.0;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center bg-black bg-opacity-80 backdrop-blur-sm transition-opacity p-0 md:p-6">
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="relative w-full h-[90vh] md:h-auto md:max-h-[85vh] bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col max-w-4xl transform transition-transform overflow-hidden border-t-2 md:border-2 border-violet-400 dark:border-violet-600">
        
        {/* Header with Title and Buttons */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 md:px-8 border-b border-gray-300 dark:border-gray-700 bg-white/40 dark:bg-black/20 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400">Plan Target GPA</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Test future grades safely. Actual data will not be affected.</p>
          </div>
          
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {/* New Reset Button */}
            <button 
              onClick={handleReset}
              className="flex items-center gap-2 px-3 py-1.5 bg-violet-100 hover:bg-violet-200 dark:bg-violet-900/50 dark:hover:bg-violet-800 text-violet-700 dark:text-violet-300 text-sm font-bold rounded-md transition-colors border border-violet-300 dark:border-violet-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset Data
            </button>
            
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-red-100 hover:text-red-600 text-gray-500 shadow-sm transition-all border border-gray-200 dark:border-gray-700"
              aria-label="Close Sandbox"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6 hide-scrollbar">
          <Class
            totalGPACredits={totalGPACredits}
            totalNGPACredits={totalNGPACredits}
            overallGPA={overallGPA}
          />
          <Semester 
            semesters={sandboxSemesters} 
            setSemesters={setSandboxSemesters} 
          />
        </div>
      </div>
    </div>
  );
}
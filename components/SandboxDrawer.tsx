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

  // 1. Reset data when opened
  // 2. Lock the background scrolling on the main page
  useEffect(() => {
    if (isOpen) {
      setSandboxSemesters(JSON.parse(JSON.stringify(realSemesters)));
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function in case component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, realSemesters]);

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
      {/* Click outside to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Modal Container: Bottom sheet on mobile, Centered on desktop */}
      <div className="relative w-full h-[90vh] md:h-auto md:max-h-[85vh] bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 rounded-t-3xl md:rounded-2xl shadow-2xl flex flex-col max-w-4xl transform transition-transform overflow-hidden border-t-2 md:border-2 border-violet-400 dark:border-violet-600">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 md:px-8 border-b border-gray-300 dark:border-gray-700 bg-white/40 dark:bg-black/20">
          <div>
            <h2 className="text-2xl font-bold text-violet-700 dark:text-violet-400">Sandbox Mode</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300 font-medium">Test future grades safely. Actual data will not be affected.</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 bg-white dark:bg-gray-800 rounded-full hover:bg-red-100 hover:text-red-600 text-gray-500 shadow-sm transition-all"
            aria-label="Close Sandbox"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
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
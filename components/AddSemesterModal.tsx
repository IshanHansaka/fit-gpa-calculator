'use client';

import { useState, useEffect, useCallback } from 'react';
import { Degree, degreeMap } from '../constants/constraint';
import { SemesterType } from '@/types/Semester';
import Toast from './Toast';

interface AddSemesterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddSemester: (semester: SemesterType) => void;
  existingSemesters: SemesterType[];
}

type ToastType = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
} | null;

type UserContext = {
  degree: Degree;
  level: number;
  semester: number;
};

export default function AddSemesterModal({
  isOpen,
  onClose,
  onAddSemester,
  existingSemesters,
}: AddSemesterModalProps) {
  const [degree, setDegree] = useState<Degree | ''>('');
  const [level, setLevel] = useState<number | ''>('');
  const [semester, setSemester] = useState<number | ''>('');
  const [toast, setToast] = useState<ToastType>(null);
  const [hasContext, setHasContext] = useState(false);
  const [autoNextSemester, setAutoNextSemester] = useState<{level: number, semester: number} | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  const handleClose = useCallback(() => {
    setDegree('');
    setLevel('');
    setSemester('');
    setToast(null);
    setHasContext(false);
    setAutoNextSemester(null);
    setIsAdding(false);
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (isOpen) {
      // Check if we have user context stored (means user used template)
      const storedContext = localStorage.getItem('userContext');
      
      if (storedContext) {
        // User started with template - use automatic progression with degree data
        try {
          const userContext: UserContext = JSON.parse(storedContext);
          setHasContext(true);
          setDegree(userContext.degree);
          
          if (existingSemesters.length > 0) {
            // Find the last semester in the existing semesters
            const lastSemester = existingSemesters[existingSemesters.length - 1];
            
            // Calculate next semester
            let nextLevel = lastSemester.level;
            let nextSem = lastSemester.semester;
            
            if (nextSem === 2) {
              // Move to next level, semester 1
              nextLevel += 1;
              nextSem = 1;
            } else {
              // Stay in same level, move to semester 2
              nextSem = 2;
            }
            
            // Special case: IT and ITM only have data up to Level 4 Semester 1
            // Allow Level 4 Semester 2 to be added manually with empty modules
            const isITorITM = userContext.degree === 'BSc. Hons in Information Technology' || 
                             userContext.degree === 'BSc. Hons in IT & Management';
            
            if (isITorITM && nextLevel === 4 && nextSem === 2) {
              // Allow adding L4S2 with empty modules
              setAutoNextSemester({ level: nextLevel, semester: nextSem });
              setLevel(nextLevel);
              setSemester(nextSem);
              return;
            }
            
            // Check if next semester exists in the degree data
            const nextSemesterId = (nextLevel - 1) * 2 + nextSem;
            const selectedDegree = degreeMap[userContext.degree];
            const nextSemesterTemplate = selectedDegree.find((s: SemesterType) => s.id === nextSemesterId);
            
            if (!nextSemesterTemplate) {
              // No more semesters available in this degree
              setToast({
                message: `You have completed all available semesters for ${userContext.degree}!`,
                type: 'success'
              });
              setAutoNextSemester(null);
              // Close modal after showing message
              setTimeout(() => {
                handleClose();
              }, 2000);
            } else {
              setAutoNextSemester({ level: nextLevel, semester: nextSem });
              setLevel(nextLevel);
              setSemester(nextSem);
            }
          }
        } catch (error) {
          console.error('Failed to parse user context:', error);
          setHasContext(false);
        }
      } else {
        // User started without template - will create empty semesters
        setHasContext(false);
        
        if (existingSemesters.length > 0) {
          // Calculate next semester number without degree data
          const lastSemester = existingSemesters[existingSemesters.length - 1];
          let nextLevel = lastSemester.level;
          let nextSem = lastSemester.semester;
          
          if (nextSem === 2) {
            nextLevel += 1;
            nextSem = 1;
          } else {
            nextSem = 2;
          }
          
          if (nextLevel <= 4) {
            setAutoNextSemester({ level: nextLevel, semester: nextSem });
            setLevel(nextLevel);
            setSemester(nextSem);
          } else {
            setToast({
              message: 'You have completed all semesters (up to Level 4 - Semester 2)!',
              type: 'success'
            });
            setAutoNextSemester(null);
            // Close modal after showing message
            setTimeout(() => {
              handleClose();
            }, 2000);
          }
        } else {
          // First semester without template - start at Level 1, Semester 1
          setAutoNextSemester({ level: 1, semester: 1 });
          setLevel(1);
          setSemester(1);
        }
      }
    }
  }, [isOpen, existingSemesters, handleClose]);

  const handleAdd = () => {
    if (!level || !semester || isAdding) return;
    setIsAdding(true);
    
    // Process immediately without setTimeout to prevent UI updates
    processAddSemester();
  };

  const processAddSemester = () => {
    const storedContext = localStorage.getItem('userContext');
    
    // Create a new semester with a unique ID
    const newId =
      existingSemesters.length > 0
        ? Math.max(...existingSemesters.map((s) => s.id)) + 1
        : 1;

    let newSemester: SemesterType;

    if (storedContext && degree) {
      // Check if this is IT/ITM Level 4 Semester 2 (no template data available)
      const isITorITM = degree === 'BSc. Hons in Information Technology' || 
                       degree === 'BSc. Hons in IT & Management';
      const isL4S2 = Number(level) === 4 && Number(semester) === 2;
      
      if (isITorITM && isL4S2) {
        // Create empty semester for IT/ITM L4S2
        const semesterExists = existingSemesters.some(
          (s) => s.level === 4 && s.semester === 2
        );

        if (semesterExists) {
          setToast({
            message: `Level ${level} - Semester ${semester} already exists!`,
            type: 'warning'
          });
          setIsAdding(false);
          return;
        }

        newSemester = {
          id: newId,
          level: 4,
          semester: 2,
          modules: [] // Empty modules for manual addition
        };
      } else {
        // User used template - get modules from degree data
        const semesterId = (Number(level) - 1) * 2 + Number(semester);
        const selectedDegree = degreeMap[degree as Degree];
        const semesterTemplate = selectedDegree.find((s: SemesterType) => s.id === semesterId);

        if (!semesterTemplate) {
          setToast({
            message: 'Semester template not found for the selected options.',
            type: 'error'
          });
          setIsAdding(false);
          return;
        }

        // Check if semester already exists
        const semesterExists = existingSemesters.some(
          (s) => s.level === semesterTemplate.level && s.semester === semesterTemplate.semester
        );

        if (semesterExists) {
          setToast({
            message: `Level ${level} - Semester ${semester} already exists!`,
            type: 'warning'
          });
          setIsAdding(false);
          return;
        }

        newSemester = {
          ...semesterTemplate,
          id: newId,
        };
      }
    } else {
      // User didn't use template - create empty semester
      const semesterExists = existingSemesters.some(
        (s) => s.level === Number(level) && s.semester === Number(semester)
      );

      if (semesterExists) {
        setToast({
          message: `Level ${level} - Semester ${semester} already exists!`,
          type: 'warning'
        });
        setIsAdding(false);
        return;
      }

      newSemester = {
        id: newId,
        level: Number(level),
        semester: Number(semester),
        modules: [] // Empty modules array for manual addition
      };
    }

    // Add the semester and close modal immediately
    onAddSemester(newSemester);
    
    // Show success toast and close modal right away
    setToast({
      message: `Level ${level} - Semester ${semester} added successfully!`,
      type: 'success'
    });
    
    // Close immediately to prevent showing next semester in this modal
    setTimeout(() => {
      setIsAdding(false);
      handleClose();
    }, 300);
  };

  if (!isOpen) return null;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-6 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col justify-center items-center relative transition-colors duration-300">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-extrabold text-fuchsia-600 dark:text-fuchsia-400 mb-2">
            Add Next Semester
          </h2>
          {autoNextSemester && (
            <p className="text-2xl font-semibold text-fuchsia-700 dark:text-fuchsia-300">
              Level {autoNextSemester.level} Semester {autoNextSemester.semester}
            </p>
          )}
        </div>
        
        

        <div className="flex justify-between gap-4 w-full">
          <button
            onClick={handleAdd}
            disabled={!semester || !level || (hasContext && !degree) || !autoNextSemester || isAdding}
            className="flex-1 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-colors shadow-md flex items-center justify-center gap-2"
          >
            {isAdding ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Adding...</span>
              </>
            ) : (
              'Add Semester'
            )}
          </button>
          <button
            onClick={handleClose}
            disabled={isAdding}
            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md disabled:opacity-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

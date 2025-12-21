'use client';

import { useState } from 'react';
import { Degree, degrees, degreeMap } from '../constants/constraint';
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

  const handleAdd = () => {
    if (!degree || !level || !semester) return;

    const semesterId = (Number(level) - 1) * 2 + Number(semester);
    const selectedDegree = degreeMap[degree as Degree];
    const semesterTemplate = selectedDegree.find((s: SemesterType) => s.id === semesterId);

    if (!semesterTemplate) {
      setToast({
        message: 'Semester template not found for the selected options.',
        type: 'error'
      });
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
      return;
    }

    // Create a new semester with a unique ID
    const newId =
      existingSemesters.length > 0
        ? Math.max(...existingSemesters.map((s) => s.id)) + 1
        : 1;

    const newSemester: SemesterType = {
      ...semesterTemplate,
      id: newId,
    };

    onAddSemester(newSemester);
    setToast({
      message: `Level ${level} - Semester ${semester} added successfully!`,
      type: 'success'
    });
    setTimeout(() => {
      handleClose();
    }, 500);
  };

  const handleClose = () => {
    setDegree('');
    setLevel('');
    setSemester('');
    setToast(null);
    onClose();
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
        <h2 className="text-3xl font-extrabold mb-4 text-fuchsia-600 dark:text-fuchsia-400 text-center">
          Add New Semester
        </h2>
        <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-sm">
          Select your degree, level, and semester to add the relevant modules.
        </p>

        {/* Degree */}
        <div className="w-full mb-4">
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

        {/* Level */}
        <div className="w-full mb-4">
          <label className="block mb-2 font-semibold text-sm text-gray-900 dark:text-gray-200">
            Level
          </label>
          <select
            value={level}
            onChange={(e) => setLevel(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-fuchsia-500 transition-colors"
          >
            <option value="" disabled>
              Select level
            </option>
            {[1, 2, 3, 4].map((l) => (
              <option key={l} value={l}>
                Level {l}
              </option>
            ))}
          </select>
        </div>

        {/* Semester */}
        <div className="w-full mb-6">
          <label className="block mb-2 font-semibold text-sm text-gray-900 dark:text-gray-200">
            Semester
          </label>
          <select
            value={semester}
            onChange={(e) => setSemester(Number(e.target.value))}
            className="w-full px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-fuchsia-500 transition-colors"
          >
            <option value="" disabled>
              Select semester
            </option>
            {[1, 2].map((s) => (
              <option key={s} value={s}>
                Semester {s}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-between gap-4 w-full">
          <button
            onClick={handleAdd}
            disabled={!degree || !semester || !level}
            className="flex-1 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-colors shadow-md"
          >
            Add Semester
          </button>
          <button
            onClick={handleClose}
            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </>
  );
}

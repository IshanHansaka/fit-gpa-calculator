'use client';

import { useEffect, useState } from 'react';
import { Degree, degrees, degreeMap } from '../constants/constraint';

export default function InitialModal() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [degree, setDegree] = useState<Degree | ''>('');
  const [level, setLevel] = useState<number | ''>('');
  const [semester, setSemester] = useState<number | ''>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) setShowModal(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSkip = () => {
    localStorage.setItem('hasVisited', 'true');
    setShowModal(false);
  };

  const handleNext = () => step === 1 && setStep(2);

  const handlePrevious = () => step === 2 && setStep(1);

  const handleStart = () => {
    if (!degree || !level || !semester) return;

    const maxSemesterId = (Number(level) - 1) * 2 + Number(semester);
    const selectedDegree = degreeMap[degree];
    const selectedSemesters = selectedDegree.filter(
      (s) => s.id <= maxSemesterId
    );

    localStorage.setItem('semester', JSON.stringify(selectedSemesters));
    localStorage.setItem('hasVisited', 'true');
    setShowModal(false);
    window.location.reload();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 px-6 bg-black bg-opacity-80 backdrop-blur-sm">
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-cyan-50 dark:bg-gradient-to-r dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col justify-center items-center relative transition-colors duration-300">
        {step === 1 && (
          <>
            <h2 className="text-3xl font-semibold mb-4 text-fuchsia-600 dark:text-fuchsia-400 text-center">
              Simplify Your Semester!
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-4 text-center text-sm">
              Welcome to the FIT GPA Calculator!
              <br /> Quick setup with pre-filled templates or full customization
              your GPA calculation, your way.
            </p>

            {/* Warning for existing users */}
            <div className="w-full text-left mb-4">
              <p className="text-sm flex gap-2 text-yellow-800 dark:text-yellow-200 font-medium bg-yellow-50/30 dark:bg-yellow-900/30 px-4 py-3 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                ⚠️
                <span>
                  Important: Choosing a template will{' '}
                  <span className="font-semibold text-yellow-900 dark:text-yellow-300">
                    replace your existing data
                  </span>
                  . If you want to keep your current records, start without a
                  template.
                </span>
              </p>
            </div>

            <div className="flex flex-col gap-2 w-full">
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 transition-colors shadow-md"
              >
                Choose Template
              </button>
              <button
                onClick={handleSkip}
                className="px-6 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md"
              >
                Start Without Template
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-3xl font-extrabold mb-4 text-fuchsia-600 dark:text-fuchsia-400 text-center">
              Setup Your Template
            </h2>

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
                {[1, 2, 3, 4].map((s) => (
                  <option key={s} value={s}>
                    Level {s}
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

            {/* Warning for existing users */}
            <div className="w-full text-left mb-4">
              <p className="text-sm flex gap-2 text-yellow-800 dark:text-yellow-200 font-medium bg-yellow-50/30 dark:bg-yellow-900/30 px-4 py-3 rounded-lg border-l-4 border-yellow-500 shadow-sm">
                ⚠️
                <span>
                  Important: Choosing a template will{' '}
                  <span className="font-semibold text-yellow-900 dark:text-yellow-300">
                    replace your existing data
                  </span>
                  . If you want to keep your current records, start without a
                  template.
                </span>
              </p>
            </div>

            <div className="flex justify-between gap-4">
              <button
                onClick={handleStart}
                disabled={!degree || !semester || !level}
                className="w-36 py-2 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-colors shadow-md"
              >
                Get Started
              </button>
              <button
                onClick={handlePrevious}
                className="w-36 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors shadow-md"
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

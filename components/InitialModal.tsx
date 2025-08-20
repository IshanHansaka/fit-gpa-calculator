'use client';

import { useEffect, useState } from 'react';
import { Degree, degrees, degreeMap } from '../app/constraint';

export default function InitialModal() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [degree, setDegree] = useState<Degree | ''>('');
  const [level, setLevel] = useState<number | ''>('');
  const [semester, setSemester] = useState<number | ''>('');

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) setShowModal(true);
  }, []);

  const handleSkip = () => {
    localStorage.setItem('hasVisited', 'true');
    setShowModal(false);
  };

  const handleNext = () => step === 1 && setStep(2);

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
      <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-2xl max-w-md w-full flex flex-col justify-center items-center relative transition-colors duration-300">
        {/* Skip button */}
        <button
          onClick={handleSkip}
          className="absolute top-4 right-4 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white transition-colors"
        >
          Skip
        </button>

        {step === 1 && (
          <>
            <h2 className="text-3xl font-extrabold mb-4 text-fuchsia-600 dark:text-fuchsia-400 text-center">
              Welcome 🎓
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-center text-base">
              Get started by choosing a template or continue without one.
            </p>
            <div className="flex flex-col gap-4 w-full">
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

            <button
              onClick={handleStart}
              disabled={!degree || !semester || !level}
              className="px-6 py-3 bg-fuchsia-600 text-white rounded-lg hover:bg-fuchsia-700 disabled:opacity-50 transition-colors shadow-md"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';
import { Degree, degrees } from '../app/constraint';
import { Semester01 } from '@/data/L1S1';

export default function InitialModal() {
  const [showModal, setShowModal] = useState(false);
  const [step, setStep] = useState(1);
  const [degree, setDegree] = useState<Degree | ''>('');
  const [level, setLevel] = useState<number | ''>('');
  const [semester, setSemester] = useState<number | ''>('');

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (!hasVisited) {
      setShowModal(true);
    }
  }, []);

  const handleSkip = () => {
    localStorage.setItem('hasVisited', 'true');
    setShowModal(false);
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
    }
  };

  const handleStart = () => {
    // Save chosen template into localStorage
    if (
      degree === 'BSc. Hons in Information Technology' &&
      level === 1 &&
      semester === 1
    ) {
      localStorage.setItem('semester', JSON.stringify(Semester01));
    }
    // You can extend here for L1S2, L2S1, etc later

    localStorage.setItem('hasVisited', 'true');
    setShowModal(false);
    window.location.reload();
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 px-6">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full flex flex-col justify-center items-center relative">
        {/* Skip text */}
        <button
          onClick={handleSkip}
          className="absolute top-3 right-3 text-md text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
        >
          Skip
        </button>

        {step === 1 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400 text-center">
              Welcome 🎓
            </h2>
            <p className="text-gray-700 dark:text-gray-300 mb-6 text-base text-center">
              Get started by choosing a template or continue without one.
            </p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-700"
              >
                Choose Template
              </button>
              <button
                onClick={handleSkip}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              >
                Start Without Template
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-fuchsia-600 dark:text-fuchsia-400 text-center">
              Setup Your Template
            </h2>

            <div className="w-full mb-3">
              <label className="block mb-2 font-semibold text-sm text-gray-900 dark:text-white">
                Degree
              </label>
              <select
                value={degree}
                onChange={(e) => setDegree(e.target.value as Degree)}
                className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-fuchsia-500"
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

            <div className="w-full mb-3">
              <label className="block mb-2 font-semibold text-sm text-gray-900 dark:text-white">
                Level
              </label>
              <select
                value={level}
                onChange={(e) => setLevel(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-fuchsia-500"
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

            <div className="w-full mb-6">
              <label className="block mb-2 font-semibold text-sm text-gray-900 dark:text-white">
                Semester
              </label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-md focus:ring-2 focus:ring-fuchsia-500"
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
              className="px-6 py-2 bg-fuchsia-600 text-white rounded-md hover:bg-fuchsia-700 disabled:opacity-50"
            >
              Get Started
            </button>
          </>
        )}
      </div>
    </div>
  );
}

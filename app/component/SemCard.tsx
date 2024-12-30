"use client";

import { useState } from 'react';
import Image from 'next/image';
import Module from './Module';

interface ModuleType {
  id: number;
}

const SemCard = () => {
  const [modules, setModules] = useState<ModuleType[]>([]);

  const handleAddModule = () => {
    setModules([...modules, { id: Date.now() }]);
  };

  const handleRemoveModule = (id: number) => {
    setModules(modules.filter((module) => module.id !== id));
  };

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-lg md:text-xl font-semibold mb-2 text-blue-700 dark:text-blue-300">
          L1 - S1
        </div>
        <div className="flex flex-col md:flex-row items-center gap-0 md:gap-6">
          <div className="mb-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            Semester Credits:
          </div>
          <div className="mb-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            Semester GPA:
            <span className="font-semibold text-blue-600 dark:text-blue-400"></span>
          </div>
        </div>
      </div>
      <div className="text-green-600 dark:text-green-400 font-semibold text-xs md:text-lg mt-2">
        Congratulations! You are on the Dean&apos;s List 🎉
      </div>
      <div className="mt-6 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg">
        <div className="flex flex-wrap items-center gap-2 md:gap-4 font-semibold border-b pb-2 mb-2 text-blue-600 dark:text-blue-400 text-xs md:text-sm">
          <div className="flex-1">Module Name</div>
          <div className="w-14 md:w-20 text-center">Credits</div>
          <div className="w-12 md:w-20 text-center">Grade</div>
          <div className="w-5 md:w-8 text-center"></div>
        </div>

        {modules.map((module) => (
          <Module
            key={module.id}
            id={module.id}
            onRemove={handleRemoveModule}
          />
        ))}

        <div className="flex justify-center mt-4">
          <button onClick={handleAddModule} className="px-2 py-1 md:px-4 md:py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none flex items-center justify-center gap-2 text-sm md:text-base">
            <Image src="/add.svg" width={20} height={20} alt="add icon" />
            <span className="hidden md:block">Add Module</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default SemCard;

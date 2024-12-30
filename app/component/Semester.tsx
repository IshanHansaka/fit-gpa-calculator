'use client';

import { useState } from 'react';
import SemCard from './SemCard';
import Image from 'next/image';

interface SemType {
  id: string;
}

const Semester = () => {
  const [semesters, setSemesters] = useState<SemType[]>([]);

  const handleAddSemester = () => {
    if (semesters.length < 8) {
      setSemesters([...semesters, { id: (semesters.length + 1).toString() }]);
    }
  };

  const handleRemoveSemester = () => {
    setSemesters(semesters.slice(0, -1));
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-3 md:p-6 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl md:text-2xl font-semibold text-blue-600 dark:text-blue-400">
          Semesters
        </div>
      </div>
      <div className="text-sm md:text-xs text-gray-600 dark:text-gray-400 mb-4">
        * Add your modules for each semester to calculate your GPA. Please
        don&apos;t forget to add the credits for each module.
      </div>

      {semesters.map((semester) => (
        <SemCard key={semester.id} id={semester.id} />
      ))}

      <div className="flex items-center justify-between w-full mt-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap mb-4 md:mb-0">
          <button
            onClick={handleAddSemester}
            className="px-3 py-2 md:px-6 md:py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300 focus:outline-none flex items-center justify-center gap-2"
          >
            <Image src="/add.svg" width={20} height={20} alt="add icon" />
            <span className="hidden md:block">Add Semester</span>
          </button>
          <button
            onClick={handleRemoveSemester}
            className="px-3 py-2 md:px-6 md:py-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300 focus:outline-none flex items-center justify-center gap-2"
          >
            <Image src="/remove.svg" width={20} height={20} alt="remove icon" />
            <span className="hidden md:block">Remove Semester</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Semester;

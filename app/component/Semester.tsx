'use client';

import { useState, useEffect } from 'react';
import SemCard from './SemCard';
import Image from 'next/image';

interface ModuleType {
  name: string;
  gpa: string;
  credits: string;
  grade: string;
}

interface SemesterType {
  id: number;
  level: number;
  semester: number;
  modules: ModuleType[];
}

const Semester = () => {
  const loadSemesters = () => {
    const storedSemesters = localStorage.getItem('semester');
    return storedSemesters ? JSON.parse(storedSemesters) : [];
  };

  const [semesters, setSemesters] = useState<SemesterType[]>(loadSemesters);

  useEffect(() => {
    if (semesters.length > 0) {
      localStorage.setItem('semester', JSON.stringify(semesters));
    }
  }, [semesters]);

  const handleAddSemester = () => {
    if (semesters.length < 8) {
      const nextId = semesters.length + 1;
      const level = Math.ceil(nextId / 2);
      const semester = nextId % 2 === 1 ? 1 : 2;
      const newSemesters = [...semesters, { id: nextId, level, semester, modules: [] }];
      setSemesters(newSemesters);
    }
  };

  const handleRemoveSemester = () => {
    const newSemesters = semesters.slice(0, -1);
    setSemesters(newSemesters);
  };

  const updateSemesterModules = (index: number, modules: ModuleType[]) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index].modules = modules;
    setSemesters(updatedSemesters);
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

      {semesters.map((semester, index) => (
        <SemCard
          key={index}
          level={semester.level}
          semester={semester.semester}
          modules={semester.modules}
          onModulesChange={(modules) => updateSemesterModules(index, modules)}
        />
      ))}

      <div className="flex items-center justify-between w-full mt-4 flex-wrap">
        <div className="flex items-center gap-4 flex-wrap mb-4 md:mb-0">
          <button
            onClick={handleAddSemester}
            className="px-3 py-2 md:px-6 md:py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300 focus:outline-none flex items-center justify-center gap-2"
          >
            <Image src="/add.svg" width={20} height={20} alt="add icon" />
            <span>Add Semester</span>
          </button>
          <button
            onClick={handleRemoveSemester}
            className="px-3 py-2 md:px-6 md:py-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300 focus:outline-none flex items-center justify-center gap-2"
          >
            <Image src="/remove.svg" width={20} height={20} alt="remove icon" />
            <span>Remove Semester</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Semester;

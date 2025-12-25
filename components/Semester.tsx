'use client';

import SemCard from './SemCard';
import Image from 'next/image';
import { MAX_SEMESTERS } from '../constants/grades';
import { SemesterType, ModuleType } from '@/types/Semester';
import ConfirmDialog from './ConfirmDialog';
import {
  Degree,
  DegreeCode,
  degreeMap,
  degreeMapByCode,
} from '@/constants/constraint';
import { useState } from 'react';

type SemesterProps = {
  semesters: SemesterType[];
  setSemesters: React.Dispatch<React.SetStateAction<SemesterType[]>>;
};

const Semester: React.FC<SemesterProps> = ({ semesters, setSemesters }) => {
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);

  const handleAddSemester = () => {
    if (semesters.length < MAX_SEMESTERS) {
      const nextId = semesters.length + 1;
      const level = Math.ceil(nextId / 2);
      const semester = nextId % 2 === 1 ? 1 : 2;
      let newSem: SemesterType = { id: nextId, level, semester, modules: [] };
      try {
        const storedDegree = localStorage.getItem('degree');
        if (storedDegree) {
          if ((storedDegree as Degree) in degreeMap) {
            const template = degreeMap[storedDegree as Degree].find(
              (s) => s.id === nextId
            );
            if (template) {
              newSem = {
                id: template.id,
                level: template.level,
                semester: template.semester,
                modules: template.modules,
              };
            }
          } else if ((storedDegree as DegreeCode) in degreeMapByCode) {
            const template = degreeMapByCode[storedDegree as DegreeCode].find(
              (s) => s.id === nextId
            );
            if (template) {
              newSem = {
                id: template.id,
                level: template.level,
                semester: template.semester,
                modules: template.modules,
              };
            }
          }
        }
      } catch (err) {
        console.warn('Failed to apply degree template', err);
      }

      setSemesters([...semesters, newSem]);
    }
  };

  const handleRemoveSemester = () => {
    setShowRemoveConfirm(true);
  };

  const confirmRemove = () => {
    setSemesters(semesters.slice(0, -1));
    setShowRemoveConfirm(false);
  };

  const cancelRemove = () => setShowRemoveConfirm(false);

  const updateSemesterModules = (index: number, modules: ModuleType[]) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index].modules = modules;
    setSemesters(updatedSemesters);
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-3 md:p-6 shadow-lg rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <div className="text-xl md:text-2xl font-semibold text-fuchsia-600 dark:text-fuchsia-400">
          Semesters
        </div>
      </div>
      <div className="text-md md:text-xs text-gray-600 dark:text-gray-400 mb-4">
        * Add your modules for each semester to calculate your GPA, and
        don&apos;t forget to include the credits for each module.
        <br />
        <br />
        * Your data is auto-saved, so you can close the tab and return anytime!
        <br />
        <br />
      </div>

      {semesters.map((semester, index) => (
        <SemCard
          key={semester.id}
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
            disabled={semesters.length >= MAX_SEMESTERS}
            className="px-3 py-2 md:px-6 md:py-3 bg-green-500 text-white rounded-md hover:bg-green-600 disabled:bg-green-300 focus:outline-none flex items-center justify-center gap-2"
          >
            <Image src="/add.svg" width={20} height={20} alt="add icon" />
            <span>Add Semester</span>
          </button>
          <button
            onClick={handleRemoveSemester}
            disabled={semesters.length === 0}
            className="px-3 py-2 md:px-6 md:py-3 bg-red-500 text-white rounded-md hover:bg-red-600 disabled:bg-red-300 focus:outline-none flex items-center justify-center gap-2"
          >
            <Image src="/remove.svg" width={20} height={20} alt="remove icon" />
            <span>Remove Semester</span>
          </button>
        </div>
      </div>
      {/* Remove confirmation dialog */}
      <ConfirmDialog
        isOpen={showRemoveConfirm}
        title="Remove Semester"
        message="Are you sure you want to remove the last semester? This action cannot be undone."
        onConfirm={confirmRemove}
        onCancel={cancelRemove}
        confirmText="Remove"
        cancelText="Cancel"
      />
    </div>
  );
};

export default Semester;

import { useState, useMemo, useEffect } from 'react';
import SemCard from './SemCard';
import Image from 'next/image';
import { MAX_SEMESTERS } from '../constants/grades';
import { SemesterType, ModuleType } from '@/types/Semester';
import AddSemesterModal from './AddSemesterModal';
import ConfirmDialog from './ConfirmDialog';
import Toast from './Toast';
import { degreeMap, Degree } from '../constants/constraint';

type SemesterProps = {
  semesters: SemesterType[];
  setSemesters: React.Dispatch<React.SetStateAction<SemesterType[]>>;
};

type ToastType = {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
} | null;

const Semester: React.FC<SemesterProps> = ({ semesters, setSemesters }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [toast, setToast] = useState<ToastType>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Check if more semesters can be added
  const canAddMoreSemesters = useMemo(() => {
    if (!mounted) return false;
    if (semesters.length >= MAX_SEMESTERS) return false;
    
    // Check if user has a degree context (used template)
    if (typeof window === 'undefined') return false;
    
    const storedContext = localStorage.getItem('userContext');
    
    if (storedContext && semesters.length > 0) {
      try {
        const userContext = JSON.parse(storedContext);
        const degree = userContext.degree as Degree;
        const degreeData = degreeMap[degree];
        
        // Find the last semester
        const lastSemester = semesters[semesters.length - 1];
        
        // Calculate what the next semester would be
        let nextLevel = lastSemester.level;
        let nextSem = lastSemester.semester;
        
        if (nextSem === 2) {
          nextLevel += 1;
          nextSem = 1;
        } else {
          nextSem = 2;
        }
        
        // Don't allow beyond Level 4 Semester 2
        if (nextLevel > 4 || (nextLevel === 4 && nextSem > 2)) {
          return false;
        }
        
        // For IT and ITM, allow Level 4 Semester 2 to be added manually (empty modules)
        if ((degree === 'BSc. Hons in Information Technology' || degree === 'BSc. Hons in IT & Management') 
            && nextLevel === 4 && nextSem === 2) {
          return true;
        }
        
        // Check if next semester exists in degree data
        const nextSemesterId = (nextLevel - 1) * 2 + nextSem;
        const nextSemesterExists = degreeData.some((s: SemesterType) => s.id === nextSemesterId);
        
        return nextSemesterExists;
      } catch (error) {
        console.error('Error checking semester availability:', error);
        // If error, allow adding if not at MAX_SEMESTERS
        return semesters.length < MAX_SEMESTERS;
      }
    }
    
    // For non-template users, allow up to Level 4 Semester 2
    if (semesters.length > 0) {
      const lastSemester = semesters[semesters.length - 1];
      // Check if we're at Level 4 Semester 2
      if (lastSemester.level === 4 && lastSemester.semester === 2) {
        return false;
      }
    }
    
    return true;
  }, [semesters, mounted]);

  const handleAddSemester = () => {
    if (canAddMoreSemesters) {
      setIsModalOpen(true);
    }
  };

  const handleAddSemesterFromModal = (newSemester: SemesterType) => {
    setSemesters([...semesters, newSemester]);
  };

  const handleRemoveSemester = () => {
    if (semesters.length === 0) return;
    setShowConfirmDialog(true);
  };

  const confirmRemoveSemester = () => {
    const removedSemester = semesters[semesters.length - 1];
    setSemesters(semesters.slice(0, -1));
    setShowConfirmDialog(false);
    setToast({
      message: `Level ${removedSemester.level} - Semester ${removedSemester.semester} removed successfully!`,
      type: 'info'
    });
  };

  const updateSemesterModules = (index: number, modules: ModuleType[]) => {
    const updatedSemesters = [...semesters];
    updatedSemesters[index].modules = modules;
    setSemesters(updatedSemesters);
  };

  return (
    <div className="mt-8 bg-white dark:bg-gray-800 p-3 md:p-6 shadow-lg rounded-lg">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <AddSemesterModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddSemester={handleAddSemesterFromModal}
        existingSemesters={semesters}
      />
      <ConfirmDialog
        isOpen={showConfirmDialog}
        title="Remove Semester"
        message={`Are you sure you want to remove Level ${semesters.length > 0 ? semesters[semesters.length - 1].level : ''} - Semester ${semesters.length > 0 ? semesters[semesters.length - 1].semester : ''}? This action cannot be undone.`}
        onConfirm={confirmRemoveSemester}
        onCancel={() => setShowConfirmDialog(false)}
        confirmText="Remove"
        cancelText="Cancel"
      />
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
            disabled={!canAddMoreSemesters}
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
    </div>
  );
};

export default Semester;

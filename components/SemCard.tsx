import Image from 'next/image';
import Module from './Module';

interface ModuleType {
  name: string;
  gpa: string;
  credits: string;
  grade: string;
}

interface SemCardProps {
  level: number;
  semester: number;
  modules: ModuleType[];
  onModulesChange: (modules: ModuleType[]) => void;
}

const gradeToPoint: Record<string, number> = {
  'A+': 4.0,
  'A' : 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B' : 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C' : 2.0,
  'C-': 1.7,
  'D' : 1.0,
  'I' : 0.0,
};

const SemCard: React.FC<SemCardProps> = ({ level, semester, modules, onModulesChange, }) => {
  const handleAddModule = () => {
    if (modules.length < 10) {
      const newModule: ModuleType = { name: '', gpa: 'GPA', credits: '', grade: '' };
      onModulesChange([...modules, newModule]);
    }
  };

  const handleRemoveModule = (index: number) => {
    const updatedModules = modules.filter((_, i) => i !== index);
    onModulesChange(updatedModules);
  };

  const handleModuleChange = ( index: number, field: keyof ModuleType, value: string | number ) => {
    const updatedModules = [...modules];
    updatedModules[index] = { ...updatedModules[index], [field]: value };
    onModulesChange(updatedModules);
  };

  const totalGPACredits = modules.reduce((total, module) => {
    const credits = parseFloat(module.credits) || 0;
    return module.gpa === 'GPA' ? total + credits : total;
  }, 0);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const totalNGPACredits = modules.reduce((total, module) => {
    const credits = parseFloat(module.credits) || 0;
    return module.gpa === 'NGPA' ? total + credits : total;
  }, 0);

  const totalGradePoints = modules.reduce((total, module) => {
    const credits = parseFloat(module.credits) || 0;
    const gradePoint = gradeToPoint[module.grade] || 0;
    return module.gpa === 'GPA' ? total + gradePoint * credits : total;
  }, 0);

  const semesterGPA =
    totalGPACredits > 0
      ? (totalGradePoints / totalGPACredits).toFixed(2)
      : '0.00';

  return (
    <div className="bg-fuchsia-50 dark:bg-slate-900 p-4 rounded-lg shadow-lg mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="text-lg md:text-xl font-semibold mb-2 text-fuchsia-700 dark:text-fuchsia-300">
          Level {level} - Semester {semester}
        </div>
        <div className="flex flex-col md:flex-row items-center gap-0 md:gap-6">
          <div className="mb-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            Total GPA Credits: {totalGPACredits}
          </div>
          <div className="mb-2 text-xs md:text-sm text-gray-700 dark:text-gray-300">
            Semester GPA:{' '}
            <span className="font-semibold text-fuchsia-600 dark:text-fuchsia-400">
              {semesterGPA}
            </span>
          </div>
        </div>
      </div>

      {parseFloat(semesterGPA) >= 3.8 && totalGPACredits >= 12 && (
        <div className="text-green-600 dark:text-green-400 font-semibold text-xs md:text-lg mt-2">
          Congratulations! You are on the Dean&apos;s List 🎉
        </div>
      )}

      <div className="mt-6 bg-white dark:bg-gray-700 p-2 rounded-lg shadow-lg">
        <div className="flex flex-wrap items-center gap-2 md:gap-4 font-semibold border-b pb-2 mb-2 text-fuchsia-600 dark:text-fuchsia-400 text-xs md:text-sm">
          <div className="flex-1">Module Name</div>
          <div className="w-12 md:w-20 text-center">GPA/NGPA</div>
          <div className="w-14 md:w-20 text-center">Credits</div>
          <div className="w-12 md:w-20 text-center">Grade</div>
          <div className="w-5 md:w-8 text-center"></div>
        </div>
        {modules.map((module, index) => (
          <Module
            key={index}
            module={module}
            onRemove={() => handleRemoveModule(index)}
            onChange={(field, value) => handleModuleChange(index, field, value)}
          />
        ))}
      </div>
      <div className="flex justify-center mt-4">
          <button
            onClick={handleAddModule}
            className="px-2 py-1 md:px-4 md:py-2 bg-fuchsia-500 text-white rounded-md hover:bg-fuchsia-600 focus:outline-none flex items-center justify-center gap-2 text-sm md:text-base"
          >
            <Image src="/add.svg" width={20} height={20} alt="add icon" />
            <span>Add Module</span>
          </button>
        </div>
    </div>
  );
};

export default SemCard;

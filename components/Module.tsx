import Image from 'next/image';
import { ModuleType, gradeOptions } from '@/constants/grades';

interface ModuleProps {
  module: ModuleType;
  onRemove: () => void;
  onChange: (field: keyof ModuleType, value: string | number) => void;
}

const Module: React.FC<ModuleProps> = ({ module, onRemove, onChange }) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 mb-1 text-xs md:text-sm">
      <div className="flex-1">
        <input
          type="text"
          value={module.name}
          onChange={(e) => onChange('name', e.target.value)}
          className="w-full p-1.5 border border-fuchsia-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-fuchsia-100 text-gray-800 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
          placeholder="Module Name"
        />
      </div>
      <div className="w-12 md:w-20 text-center">
        <select
          value={module.gpa}
          onChange={(e) => onChange('gpa', e.target.value)}
          className="w-full p-1.5 border border-fuchsia-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-fuchsia-100 text-gray-800 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
        >
          <option value="GPA">GPA</option>
          <option value="NGPA">NGPA</option>
        </select>
      </div>
      <div className="w-14 md:w-20 text-center">
        <input
          type="text"
          value={module.credits}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d{0,1}$/.test(value)) {
              onChange('credits', value);
            }
          }}
          inputMode="decimal"
          className="w-full p-1.5 border border-fuchsia-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-fuchsia-100 text-gray-800 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
          placeholder="Credits"
        />
      </div>
      <div className="w-12 md:w-20 text-center">
        <select
          value={module.grade}
          onChange={(e) => onChange('grade', e.target.value)}
          className="w-full p-1.5 border border-fuchsia-300 rounded-md focus:outline-none focus:ring-2 focus:ring-fuchsia-500 bg-fuchsia-100 text-gray-800 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
        >
          <option value="" disabled hidden>
            Select
          </option>
          {gradeOptions.map((grade) => (
            <option key={grade} value={grade}>
              {grade}
            </option>
          ))}
        </select>
      </div>
      <div className="w-5 md:w-8 text-center">
        <button onClick={onRemove}>
          <Image
            src="/remove-red.svg"
            width={20}
            height={20}
            alt="Remove icon"
          />
        </button>
      </div>
    </div>
  );
};

export default Module;

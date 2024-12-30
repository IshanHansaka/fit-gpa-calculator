import Image from 'next/image';

interface ModuleType {
  id: string;
  name: string;
  gpa: string;
  credits: string;
  grade: string;
  onRemove: (id: string) => void;
  onChange: (
    id: string,
    field: 'name' | 'gpa' | 'credits' | 'grade',
    value: string
  ) => void;
}

const Module: React.FC<ModuleType> = ({ id, name, gpa, credits, grade, onRemove, onChange,}) => {
  return (
    <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 mb-1 text-xs md:text-sm">
      <div className="flex-1">
        <input
          type="text"
          value={name}
          onChange={(e) => onChange(id, 'name', e.target.value)}
          className="w-full p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
          placeholder="Module Name"
        />
      </div>
      <div className="w-12 md:w-20 text-center">
        <select
          value={gpa}
          onChange={(e) => onChange(id, 'gpa', e.target.value)}
          className="w-full p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
        >
          <option value="GPA">GPA</option>
          <option value="NGPA">NGPA</option>
        </select>
      </div>
      <div className="w-14 md:w-20 text-center">
        <input
          type="text"
          value={credits}
          onChange={(e) => {
            const value = e.target.value;
            if (/^\d*\.?\d{0,1}$/.test(value)) {
              onChange(id, 'credits', value);
            }
          }}
          inputMode="decimal"
          className="w-full p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
          placeholder="Credit"
        />
      </div>
      <div className="w-12 md:w-20 text-center">
        <select
          value={grade}
          onChange={(e) => onChange(id, 'grade', e.target.value)}
          className="w-full p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
        >
          <option value="A+">A+</option>
          <option value="A">A</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B">B</option>
          <option value="B-">B-</option>
          <option value="C+">C+</option>
          <option value="C">C</option>
          <option value="C-">C-</option>
          <option value="D">D</option>
          <option value="I">I</option>
        </select>
      </div>
      <div className="w-5 md:w-8 text-center">
        <button onClick={() => onRemove(id)}>
          <Image src="/remove-red.svg" width={20} height={20} alt="remove icon" />
        </button>
      </div>
    </div>
  );
};

export default Module;

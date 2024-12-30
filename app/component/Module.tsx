import Image from 'next/image';

const Module = () => {
  return (
    <>
      <div className="flex flex-wrap md:flex-nowrap items-center gap-2 md:gap-4 mb-1 text-xs md:text-sm">
        <div className="flex-1">
          <input
            type="text"
            className="w-full p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
            placeholder="Module Name"
          />
        </div>
        <div className="w-14 md:w-20 text-center">
          <input
            type="text"
            inputMode="decimal"
            className="w-full p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200"
            placeholder="Credit"
          />
        </div>
        <div className="w-12 md:w-20 text-center">
          <select className="w-full p-1.5 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 text-sm dark:text-gray-200">
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
          <button>
            <Image src="/remove.svg" width={20} height={20} alt="remove icon" />
          </button>
        </div>
      </div>
    </>
  );
};

export default Module;

const Table = () => {
  return (
    <div className="bg-fuchsia-50 dark:bg-gray-800 p-3 md:p-6 shadow-lg rounded-lg">
      <div className="text-2xl font-semibold mb-4 text-fuchsia-700 dark:text-fuchsia-400">
        Grade Point System
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-1 gap-8">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="bg-fuchsia-200 dark:bg-slate-900">
                <th className="px-6 py-3 text-left font-semibold text-fuchsia-700 dark:text-fuchsia-400">
                  Grade
                </th>
                <th className="px-6 py-3 text-left font-semibold text-fuchsia-700 dark:text-fuchsia-400">
                  Grade Point
                </th>
                <th className="px-6 py-3 text-left font-semibold text-fuchsia-700 dark:text-fuchsia-400">
                  Marks Range
                </th>
              </tr>
            </thead>
            <tbody className="bg-fuchsia-50 dark:bg-gray-700">
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">A+</td>
                <td className="px-6 py-2">4.0</td>
                <td className="px-6 py-2">85 - 100</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">A</td>
                <td className="px-6 py-2">4.0</td>
                <td className="px-6 py-2">75 - 84</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">A-</td>
                <td className="px-6 py-2">3.7</td>
                <td className="px-6 py-2">70 - 74</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">B+</td>
                <td className="px-6 py-2">3.3</td>
                <td className="px-6 py-2">65 - 69</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">B</td>
                <td className="px-6 py-2">3.0</td>
                <td className="px-6 py-2">60 - 64</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">B-</td>
                <td className="px-6 py-2">2.7</td>
                <td className="px-6 py-2">55 - 59</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">C+</td>
                <td className="px-6 py-2">2.3</td>
                <td className="px-6 py-2">50 - 54</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">C</td>
                <td className="px-6 py-2">2.0</td>
                <td className="px-6 py-2">45 - 49</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">C-</td>
                <td className="px-6 py-2">1.7</td>
                <td className="px-6 py-2">40 - 44</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">D</td>
                <td className="px-6 py-2">1.0</td>
                <td className="px-6 py-2">35 - 39</td>
              </tr>
              <tr className="border-t hover:bg-fuchsia-100 dark:hover:bg-fuchsia-800">
                <td className="px-6 py-2">I</td>
                <td className="px-6 py-2">0.0</td>
                <td className="px-6 py-2">00 - 34</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
          <div className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-400">
            Classes
          </div>
          <ul className="list-inside list-disc">
            <li>
              <strong>First Class - </strong>
              Overall GPA ≥ 3.70
            </li>
            <li>
              <strong>Second Class Upper Division - </strong>
              3.69 ≥ Overall GPA ≥ 3.30
            </li>
            <li>
              <strong>Second Class Lower Division - </strong>
              3.29 ≥ Overall GPA ≥ 3.00
            </li>
            <li>
              <strong>General - </strong>
              2.99 ≥ Overall GPA ≥ 2.0
            </li>
          </ul>
          <div className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-400">
            Dean&apos;s List
          </div>
          <ul className="list-inside list-disc">
            <li>
              <strong>Dean&apos;s List - </strong>
              Semester GPA ≥ 3.8
            </li>
          </ul>
          <div className="text-lg font-semibold text-fuchsia-700 dark:text-fuchsia-400">
            Pass Grades
          </div>
          <ul className="list-inside list-disc">
            <li>
              The grade D or above is required to earn credit for a module.
            </li>
          </ul>
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>
              For more information on the grading system, visit the{" "}
              <a
                href="https://uom.lk/itfac/ugs/performance-criteria"
                target="_blank"
                className="text-fuchsia-600 hover:text-fuchsia-800 font-semibold dark:text-fuchsia-400 dark:hover:text-fuchsia-500 hover:underline"
              >
                FIT Performance Criteria.
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

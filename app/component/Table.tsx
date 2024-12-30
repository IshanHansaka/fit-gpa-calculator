const Table = () => {
  return (
    <div className="mt-8 bg-blue-50 dark:bg-gray-800 p-3 md:p-6 shadow-lg rounded-lg">
      <div className="text-2xl font-semibold mb-4 text-blue-700 dark:text-blue-400">
        Grade Point System
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse text-sm text-gray-700 dark:text-gray-300">
            <thead>
              <tr className="bg-blue-100 dark:bg-slate-900">
                <th className="px-6 py-3 text-left font-semibold text-blue-700 dark:text-blue-400">
                  Grade
                </th>
                <th className="px-6 py-3 text-left font-semibold text-blue-700 dark:text-blue-400">
                  Grade Point
                </th>
                <th className="px-6 py-3 text-left font-semibold text-blue-700 dark:text-blue-400">
                  Marks Range
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-50 dark:bg-gray-700">
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">A+</td>
                <td className="px-6 py-2">4.0</td>
                <td className="px-6 py-2">85 - 100</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">A</td>
                <td className="px-6 py-2">4.0</td>
                <td className="px-6 py-2">75 - 84</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">A-</td>
                <td className="px-6 py-2">3.7</td>
                <td className="px-6 py-2">70 - 74</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">B+</td>
                <td className="px-6 py-2">3.3</td>
                <td className="px-6 py-2">65 - 69</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">B</td>
                <td className="px-6 py-2">3.0</td>
                <td className="px-6 py-2">60 - 64</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">B-</td>
                <td className="px-6 py-2">2.7</td>
                <td className="px-6 py-2">55 - 59</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">C+</td>
                <td className="px-6 py-2">2.3</td>
                <td className="px-6 py-2">50 - 54</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">C</td>
                <td className="px-6 py-2">2.0</td>
                <td className="px-6 py-2">45 - 49</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">C-</td>
                <td className="px-6 py-2">1.7</td>
                <td className="px-6 py-2">40 - 44</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">D</td>
                <td className="px-6 py-2">1.0</td>
                <td className="px-6 py-2">35 - 39</td>
              </tr>
              <tr className="border-t hover:bg-blue-50 dark:hover:bg-blue-800">
                <td className="px-6 py-2">I</td>
                <td className="px-6 py-2">0.0</td>
                <td className="px-6 py-2">00 - 34</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="text-sm text-gray-700 dark:text-gray-300 space-y-4">
          <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            Dean&apos;s List
          </div>
          <ul className="list-inside list-disc">
            <li>
              <strong>Dean&apos;s List - </strong>
              Semester GPA ≥ 3.8
            </li>
          </ul>
          <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
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
          <div className="text-sm text-gray-600 dark:text-gray-400">
            * Faculty of Humanities and Sciences relies on the CGPA system to
            decide the final class of the degree.
          </div>
          <div className="text-lg font-semibold text-blue-700 dark:text-blue-400">
            Pass Grades
          </div>
          <ul className="list-inside list-disc">
            <li>Grade C or above is considered a pass grade.</li>
          </ul>
          <div className="mt-6 text-sm text-gray-600 dark:text-gray-400">
            <p>
              For more information on the grading system, visit the{' '}
              <a
                href="https://uom.lk/itfac/ugs/performance-criteria"
                target="_blank"
                className="text-blue-600 hover:text-blue-800 font-semibold dark:text-blue-400 dark:hover:text-blue-500"
              >
                FIT Performance Criteria
              </a>
              .
            </p>
          </div>
          <div className="text-sm text-gray-600 dark:text-gray-400 mt-4 bg-yellow-100 dark:bg-yellow-900 border-l-4 border-yellow-500 dark:border-yellow-500 p-4 rounded-lg">
            <div className="font-semibold text-yellow-800 dark:text-yellow-200">
              Important Notice: This is a third-party site and is not affiliated
              with SLIIT. Please refer to official SLIIT sources for accurate
              and up-to-date information.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;

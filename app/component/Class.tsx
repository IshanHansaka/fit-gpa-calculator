import ClassCard from './ClassCard';

interface ClassProps {
  totalGPACredits: number;
  totalNGPACredits: number;
  semesterGPA: string;
}

const Class: React.FC<ClassProps> = ({ totalGPACredits, totalNGPACredits, semesterGPA }) => {
  const totalCredits = totalGPACredits + totalNGPACredits;

  const overallGPA = semesterGPA;
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-3 gap-6">
          <ClassCard title="Overall GPA" value={overallGPA} description="" />
          <ClassCard title="Class" value="First Class" description="" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-3">
          <ClassCard title="Total Credits" value={totalCredits} description="" />
          <ClassCard title="Total GPA Credits" value={totalGPACredits} description="" />
          <ClassCard title="Total Non GPA Credits" value={totalNGPACredits} description="" />
        </div>
      </div>
    </div>
  );
};

export default Class;

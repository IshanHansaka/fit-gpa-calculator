import ClassCard from "./ClassCard";

interface ClassProps {
  totalGPACredits: number;
  totalNGPACredits: number;
  overallGPA: number;
}

const Class: React.FC<ClassProps> = ({
  totalGPACredits,
  totalNGPACredits,
  overallGPA,
}) => {
  const totalCredits = totalGPACredits + totalNGPACredits;
  const className =
    totalCredits < 135
      ? "Pending"
      : overallGPA >= 3.7
      ? "First Class"
      : overallGPA >= 3.3
      ? "Second Class - Upper Division"
      : overallGPA >= 3
      ? "Second Class - Lower Division"
      : overallGPA >= 2
      ? "Pass"
      : overallGPA >= 0
      ? "Fail"
      : "Error";

  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="grid grid-cols-1 md:grid-cols-2 md:col-span-3 gap-6">
          <ClassCard
            title="Overall GPA"
            value={overallGPA}
            description={
              overallGPA >= 2
                ? `Your hard work has brought you here with an impressive GPA.`
                : null
            }
          />
          <ClassCard
            title="Class"
            value={className}
            description={
              className === "Pending"
                ? "Your class will be displayed here once you have completed all your semesters."
                : `Congratulations on your ${className}! 🎉`
            }
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:col-span-3">
          <ClassCard
            title="Total Credits"
            value={totalCredits}
            description=""
          />
          <ClassCard
            title="Total GPA Credits"
            value={totalGPACredits}
            description=""
          />
          <ClassCard
            title="Total Non-GPA Credits"
            value={totalNGPACredits}
            description=""
          />
        </div>
      </div>
    </div>
  );
};

export default Class;

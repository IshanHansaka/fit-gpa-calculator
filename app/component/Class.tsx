import ClassCard from './ClassCard';

const Class = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <ClassCard title="Total Credits" value={100} />
        <ClassCard title="Overall GPA" value={1} />
        <ClassCard title="Class" value="First Class" />
      </div>
    </div>
  );
};

export default Class;

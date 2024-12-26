import ClassCard from './ClassCard';

const Class = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 md:p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <ClassCard />
        <ClassCard />
        <div className="col-span-1 md:col-span-2">
          <ClassCard />
        </div>
      </div>
    </div>
  );
};

export default Class;

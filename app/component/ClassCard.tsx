interface ClassCardProps {
  title: string;
  value: string | number;
}

const ClassCard: React.FC<ClassCardProps> = ({ title, value }) => {
  return (
    <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg shadow-sm dark:bg-opacity-20 dark:border-blue-400 backdrop-blur-sm bg-opacity-60 dark:border">
      <div className="text-lg font-semibold text-blue-600 dark:text-blue-400">
        {title}
      </div>
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        {value}
      </div>
    </div>
  );
};

export default ClassCard;

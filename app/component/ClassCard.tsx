interface ClassCardProps {
  title: string;
  value: string | number;
  description: string | null;
  color: "cyan" | "lime" | "fuchsia" | "violet" | "amber";
}

const colorClasses: Record<ClassCardProps["color"], { bg: string; text: string }> = {
  cyan: { bg: "bg-cyan-100 dark:bg-cyan-900 dark:border-cyan-400", text: "text-cyan-700 dark:text-cyan-300" },
  lime: { bg: "bg-lime-100 dark:bg-lime-900 dark:border-lime-400", text: "text-lime-700 dark:text-lime-300" },
  fuchsia: { bg: "bg-fuchsia-100 dark:bg-fuchsia-900 dark:border-fuchsia-400", text: "text-fuchsia-700 dark:text-fuchsia-300" },
  violet: { bg: "bg-violet-100 dark:bg-violet-900 dark:border-violet-400", text: "text-violet-700 dark:text-violet-300" },
  amber: { bg: "bg-amber-100 dark:bg-amber-900 dark:border-amber-400", text: "text-amber-700 dark:text-amber-300" },
};

const ClassCard: React.FC<ClassCardProps> = ({ title, value, description, color }) => {
  return (
    <div className={`p-4 rounded-lg shadow-sm dark:bg-opacity-20 backdrop-blur-sm bg-opacity-60 dark:border ${colorClasses[color].bg}`}>
      <div className={`text-lg font-semibold ${colorClasses[color].text}`}>
        {title}
      </div>
      <div className="text-2xl font-bold text-gray-800 dark:text-gray-200">
        {value}
      </div>
      {description && (
        <div className="block font-bold text-sm text-gray-600 dark:text-gray-400 mt-2">
          {description}
        </div>
      )}
    </div>
  );
};

export default ClassCard;

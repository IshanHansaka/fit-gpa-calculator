interface ClassCardProps {
  title: string;
  value: string | number;
  description: string | null;
  color: 'cyan' | 'lime' | 'fuchsia' | 'violet' | 'amber';
}

const colorClasses: Record<
  ClassCardProps['color'],
  { bg: string; text: string }
> = {
  cyan: { bg: 'bg-cyan-900 border-cyan-400', text: 'text-cyan-300' },
  lime: { bg: 'bg-lime-900 border-lime-400', text: 'text-lime-300' },
  fuchsia: {
    bg: 'bg-fuchsia-900 border-fuchsia-400',
    text: 'text-fuchsia-300',
  },
  violet: { bg: 'bg-violet-900 border-violet-400', text: 'text-violet-300' },
  amber: { bg: 'bg-amber-900 border-amber-400', text: 'text-amber-300' },
};

const ClassCard: React.FC<ClassCardProps> = ({
  title,
  value,
  description,
  color,
}) => {
  return (
    <div
      className={`p-4 rounded-lg shadow-sm bg-opacity-20 backdrop-blur-sm border ${colorClasses[color].bg}`}
    >
      <div className={`text-lg font-semibold ${colorClasses[color].text}`}>
        {title}
      </div>
      <div className="text-2xl font-bold text-gray-200">
        {value}
      </div>
      {description && (
        <div className="block font-bold text-sm text-gray-400 mt-2">
          {description}
        </div>
      )}
    </div>
  );
};

export default ClassCard;

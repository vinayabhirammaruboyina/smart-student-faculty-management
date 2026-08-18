export default function ProgressBar({ value, max = 100, color = 'indigo', size = 'md', showLabel = false, animated = true, className = '' }) {
  const percentage = Math.min(Math.round((value / max) * 100), 100);
  const colorMap = {
    indigo: 'bg-indigo-500',
    emerald: 'bg-emerald-500',
    amber: 'bg-amber-500',
    red: 'bg-red-500',
    rose: 'bg-rose-500',
    blue: 'bg-blue-500',
    success: 'bg-emerald-500',
    warning: 'bg-amber-500',
    danger: 'bg-rose-500',
  };
  const getAutoColor = () => {
    if (percentage >= 85) return 'bg-emerald-500';
    if (percentage >= 75) return 'bg-indigo-500';
    if (percentage >= 60) return 'bg-amber-500';
    return 'bg-rose-500';
  };
  const barColor = color === 'auto' ? getAutoColor() : (colorMap[color] || colorMap.indigo);
  const heights = { sm: 'h-1.5', md: 'h-2', lg: 'h-3', xl: 'h-4' };
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
          <span>{percentage}%</span>
        </div>
      )}
      <div className={`w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden ${heights[size]}`}>
        <div
          className={`${heights[size]} ${barColor} rounded-full transition-all duration-700 ease-out`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export default function Card({ children, className = '', hover = false, padding = 'md' }) {
  const padMap = { none: '', sm: 'p-4', md: 'p-5', lg: 'p-6', xl: 'p-8' };
  return (
    <div className={`bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] ${hover ? 'hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 cursor-pointer' : ''} ${padMap[padding]} ${className}`}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = '' }) {
  return <div className={`flex items-center justify-between mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = '' }) {
  return <h3 className={`text-base font-semibold text-slate-900 dark:text-white ${className}`}>{children}</h3>;
}

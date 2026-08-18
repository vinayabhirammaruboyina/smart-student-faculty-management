import { forwardRef } from 'react';

const Input = forwardRef(function Input({ label, error, helpText, icon: Icon, iconRight: IconRight, className = '', ...props }, ref) {
  return (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">{label}</label>}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon size={16} className="text-slate-400" />
          </div>
        )}
        <input
          ref={ref}
          className={`
            w-full py-2.5 border rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white
            placeholder-slate-400 dark:placeholder-slate-500 text-sm transition-all duration-150
            border-slate-200 dark:border-slate-700
            focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? 'border-red-400 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${Icon ? 'pl-10' : 'pl-3'}
            ${IconRight ? 'pr-10' : 'pr-3'}
            ${className}
          `}
          {...props}
        />
        {IconRight && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {IconRight}
          </div>
        )}
      </div>
      {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
      {helpText && !error && <p className="mt-1 text-xs text-slate-500">{helpText}</p>}
    </div>
  );
});

export default Input;

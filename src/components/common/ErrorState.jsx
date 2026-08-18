import { AlertCircle } from 'lucide-react';
import Button from '../ui/Button';

export default function ErrorState({ title = 'Something went wrong', description = 'We couldn\'t load this information. Please try again.', onRetry }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4">
        <AlertCircle size={32} className="text-red-500" />
      </div>
      <h3 className="text-base font-semibold text-slate-700 dark:text-slate-300 mb-1">{title}</h3>
      <p className="text-sm text-slate-500 dark:text-slate-400 mb-5 max-w-sm">{description}</p>
      {onRetry && <Button onClick={onRetry} size="sm">Try Again</Button>}
    </div>
  );
}

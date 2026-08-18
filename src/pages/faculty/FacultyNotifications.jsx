import { useState } from 'react';
import { Bell, CheckCheck } from 'lucide-react';
import Button from '../../components/ui/Button';
import { timeAgo } from '../../utils/helpers';
import { mockFacultyNotifications } from '../../data/notifications';

const TYPE_ICONS = { warning: '⚠️', success: '✅', info: '💬' };

export default function FacultyNotifications() {
  const [notifs, setNotifs] = useState(mockFacultyNotifications);
  const markAll = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h2>
          <p className="text-sm text-slate-400">{notifs.filter(n => !n.read).length} unread</p>
        </div>
        <Button variant="secondary" size="sm" icon={CheckCheck} onClick={markAll}>Mark all read</Button>
      </div>
      <div className="space-y-3">
        {notifs.map((n) => (
          <div
            key={n.id}
            onClick={() => setNotifs(prev => prev.map(x => x.id === n.id ? { ...x, read: true } : x))}
            className={`flex gap-4 p-4 rounded-xl border cursor-pointer transition-all ${
              !n.read 
                ? 'bg-emerald-50/50 dark:bg-emerald-900/10 border-emerald-100 dark:border-emerald-900' 
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'
            }`}
          >
            <span className="text-2xl shrink-0">{TYPE_ICONS[n.type]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <p className={`text-sm font-semibold ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{n.title}</p>
                {!n.read && <div className="w-2 h-2 bg-emerald-500 rounded-full shrink-0 mt-1.5" />}
              </div>
              <p className="text-sm text-slate-500 mt-1">{n.message}</p>
              <p className="text-xs text-slate-400 mt-2">{timeAgo(n.timestamp)}</p>
            </div>
          </div>
        ))}
        {notifs.length === 0 && (
          <div className="text-center py-16 text-slate-400">
            <Bell size={40} className="mx-auto mb-3 opacity-30" />
            <p>No notifications</p>
          </div>
        )}
      </div>
    </div>
  );
}

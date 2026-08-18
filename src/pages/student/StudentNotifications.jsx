import { useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Tabs from '../../components/ui/Tabs';
import { useNotifications } from '../../context/NotificationContext';
import { timeAgo } from '../../utils/helpers';

const TYPE_ICONS = { warning: '⚠️', success: '✅', info: '💬', error: '❌' };
const CAT_BADGE = { attendance: 'warning', assignments: 'info', leave: 'success', grades: 'primary', announcements: 'default' };

export default function StudentNotifications() {
  const { notifications, markAsRead, markAllAsRead, deleteNotification } = useNotifications();
  const [activeTab, setActiveTab] = useState('all');
  const categories = ['all', 'attendance', 'assignments', 'leave', 'grades', 'announcements'];
  const tabs = categories.map(c => ({ id: c, label: c.charAt(0).toUpperCase() + c.slice(1), count: c === 'all' ? notifications.filter(n => !n.read).length || undefined : undefined }));
  const filtered = activeTab === 'all' ? notifications : notifications.filter(n => n.category === activeTab);

  return (
    <div className="space-y-6 max-w-3xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Notifications</h2><p className="text-sm text-slate-400">{notifications.filter(n => !n.read).length} unread notifications</p></div>
        <Button variant="secondary" size="sm" icon={CheckCheck} onClick={markAllAsRead}>Mark all read</Button>
      </div>
      <div className="overflow-x-auto"><Tabs tabs={tabs} defaultTab="all" onChange={setActiveTab} /></div>
      <div className="space-y-3">
        {filtered.map((n) => (
          <div key={n.id} className={`flex gap-4 p-4 rounded-xl border transition-all cursor-pointer group ${!n.read ? 'bg-indigo-50/60 dark:bg-indigo-900/10 border-indigo-100 dark:border-indigo-900' : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700'}`} onClick={() => markAsRead(n.id)}>
            <span className="text-2xl shrink-0 mt-0.5">{TYPE_ICONS[n.type]}</span>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div><p className={`text-sm font-semibold ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-700 dark:text-slate-300'}`}>{n.title}</p><Badge variant={CAT_BADGE[n.category] || 'default'} size="sm" className="mt-1">{n.category}</Badge></div>
                <div className="flex items-center gap-1 shrink-0">
                  {!n.read && <div className="w-2 h-2 bg-indigo-500 rounded-full" />}
                  <button onClick={(e) => { e.stopPropagation(); deleteNotification(n.id); }} className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-red-100 dark:hover:bg-red-900/30 text-red-400 transition-all"><Trash2 size={14} /></button>
                </div>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1.5">{n.message}</p>
              <p className="text-xs text-slate-400 mt-2">{timeAgo(n.timestamp)}</p>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-slate-400"><Bell size={40} className="mx-auto mb-3 opacity-30" /><p className="font-medium">No notifications here</p></div>}
      </div>
    </div>
  );
}

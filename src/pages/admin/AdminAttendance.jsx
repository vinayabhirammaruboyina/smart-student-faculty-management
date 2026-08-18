import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { adminAnalyticsData } from '../../data/users';
import { AlertTriangle, Users, BookOpen, Clock } from 'lucide-react';

export default function AdminAttendance() {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Overall Average', value: '81%', icon: Users, colorClass: 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/20' },
    { label: 'Below Minimum (75%)', value: '3 Departments', icon: AlertTriangle, colorClass: 'text-red-500 bg-red-50 dark:bg-red-900/20' },
    { label: 'Classes Conducted', value: '254', icon: BookOpen, colorClass: 'text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/20' }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Attendance Analytics</h2>
        <p className="text-sm text-slate-400">Track and monitor student presence statistics institution-wide.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${s.colorClass}`}>
                <Icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
                <p className="text-xs text-slate-400">{s.label}</p>
              </div>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Monthly Attendance Trend</CardTitle></CardHeader>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminAnalyticsData.attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="overall" name="Overall Presence" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <CardHeader><CardTitle>Department Attendance Rates</CardTitle></CardHeader>
          <div className="space-y-4">
            {adminAnalyticsData.departmentAttendance.map((dept) => (
              <div key={dept.department}>
                <div className="flex justify-between text-xs mb-1.5 text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-350">Department: {dept.department}</span>
                  <span className={dept.attendance >= 80 ? 'text-emerald-500 font-bold' : 'text-amber-500 font-bold'}>{dept.attendance}%</span>
                </div>
                <ProgressBar value={dept.attendance} color="auto" size="md" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Alert List: Low Attendance</CardTitle></CardHeader>
        <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-900 rounded-xl p-4 flex gap-3 text-sm text-amber-800 dark:text-amber-300">
          <AlertTriangle size={20} className="shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Important Notice</p>
            <p className="mt-1">Students under 75% attendance are automatically flagged. Faculty coordinators for <strong>Information Technology (IT)</strong> and <strong>Database Management (DB703)</strong> should be notified to verify records.</p>
          </div>
        </div>
      </Card>
    </div>
  );
}

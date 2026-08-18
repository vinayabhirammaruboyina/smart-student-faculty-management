import { useState, useEffect } from 'react';
import { Users, Calendar, ClipboardList, FileText, ArrowUpRight } from 'lucide-react';
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useCountUp } from '../../hooks/useCountUp';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { SkeletonCard } from '../../components/common/SkeletonLoader';
import { mockFacultyLeaveRequests } from '../../data/leave';
import { todaySchedule } from '../../data/timetable';
import { useNavigate } from 'react-router-dom';

const getGreeting = () => {
  const h = new Date().getHours();
  if (h < 12) return 'Good Morning';
  if (h < 17) return 'Good Afternoon';
  return 'Good Evening';
};

export default function FacultyDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const pendingLeave = mockFacultyLeaveRequests.filter(l => l.status === 'pending');
  const studentsCount = useCountUp(124, 1200, !loading);
  const classesCount = useCountUp(5, 800, !loading);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const pieData = [
    { name: 'Submitted', value: 36, color: '#10b981' }, // emerald
    { name: 'Pending', value: 6, color: '#f59e0b' }    // amber
  ];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-16 w-72 rounded-xl" />
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Students', value: studentsCount, icon: Users, color: 'indigo', to: '/faculty/students' },
    { label: 'Classes Today', value: classesCount, icon: Calendar, color: 'blue', to: '/faculty/classes' },
    { label: 'Pending Reviews', value: 12, icon: ClipboardList, color: 'amber', to: '/faculty/submissions' },
    { label: 'Leave Requests', value: pendingLeave.length, icon: FileText, color: 'red', to: '/faculty/leave' },
  ];

  const colorMap = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400',
    red: 'bg-red-50 dark:bg-red-900/20 text-red-500 dark:text-red-400'
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            {getGreeting()}, Professor {user?.name?.split(' ').slice(-1)[0]} 👋
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's your academic overview for today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/faculty/attendance')}>Take Attendance</Button>
          <Button size="sm" onClick={() => navigate('/faculty/qr-attendance')}>Generate QR</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} hover onClick={() => navigate(s.to)} className="cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[s.color]}`}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-slate-300 dark:text-slate-600" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Today's schedule */}
        <Card>
          <CardHeader>
            <CardTitle>Today's Schedule</CardTitle>
            <Badge variant="primary">{todaySchedule.length} classes</Badge>
          </CardHeader>
          <div className="space-y-3">
            {todaySchedule.slice(0, 4).map((cls, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-xl border ${cls.status === 'current' ? 'border-indigo-300 bg-indigo-50/50 dark:bg-indigo-900/10 dark:border-indigo-850' : 'border-slate-100 dark:border-slate-700'}`}>
                <div className="shrink-0 text-right min-w-[70px]">
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{cls.time.split(' - ')[0]}</p>
                  <p className="text-xs text-slate-400">{cls.time.split(' - ')[1]}</p>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{cls.subject}</p>
                  <p className="text-xs text-slate-400">{cls.room} · {cls.code}</p>
                </div>
                <Button size="xs" variant="secondary" onClick={() => navigate('/faculty/attendance')}>Mark</Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Submissions chart */}
        <Card>
          <CardHeader>
            <CardTitle>Assignment Submissions</CardTitle>
            <Button size="xs" variant="ghost" onClick={() => navigate('/faculty/submissions')}>View All</Button>
          </CardHeader>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">
                  {pieData.map((entry, index) => <Cell key={index} fill={entry.color} />)}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-2 text-center">
            <p className="text-2xl font-bold text-slate-900 dark:text-white">36 / 42</p>
            <p className="text-sm text-slate-400">students submitted</p>
          </div>
        </Card>
      </div>

      {/* Leave request previews */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Leave Requests</CardTitle>
          <Button size="xs" variant="ghost" onClick={() => navigate('/faculty/leave')}>View all</Button>
        </CardHeader>
        <div className="space-y-3">
          {pendingLeave.map((req) => (
            <div key={req.id} className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700">
              <Avatar name={req.studentName} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-800 dark:text-white">{req.studentName}</p>
                <p className="text-xs text-slate-400">{req.type} · {req.fromDate} to {req.toDate}</p>
              </div>
              <Badge variant="warning">Pending</Badge>
              <Button size="xs" onClick={() => navigate('/faculty/leave')}>Review</Button>
            </div>
          ))}
          {pendingLeave.length === 0 && (
            <p className="text-sm text-slate-450 text-center py-4">No pending leave requests</p>
          )}
        </div>
      </Card>
    </div>
  );
}

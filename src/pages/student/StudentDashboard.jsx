import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, ClipboardCheck, FileText, Bell, TrendingUp, ArrowUpRight, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useCountUp } from '../../hooks/useCountUp';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import ProgressBar from '../../components/ui/ProgressBar';
import { SkeletonCard } from '../../components/common/SkeletonLoader';
import { studentAttendanceData, studentGradesData } from '../../data/students';
import { mockAssignments } from '../../data/assignments';
import { todaySchedule } from '../../data/timetable';
import { mockNotifications } from '../../data/notifications';
import { timeAgo } from '../../utils/helpers';

const getGreeting = () => { const h = new Date().getHours(); if (h < 12) return 'Good Morning'; if (h < 17) return 'Good Afternoon'; return 'Good Evening'; };
const SCHEDULE_STYLES = { completed: 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-700 opacity-70', current: 'bg-indigo-50 dark:bg-indigo-900/20 border-indigo-300 dark:border-indigo-700 shadow-sm', upcoming: 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700' };
const NOTIF_ICONS = { warning: '⚠️', success: '✅', info: '💬', error: '❌' };

export default function StudentDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const attendance = studentAttendanceData['STU001'];
  const grades = studentGradesData['STU001'];
  const pendingAssignments = mockAssignments.filter(a => a.status === 'pending');
  const overdueAssignments = mockAssignments.filter(a => a.status === 'overdue');
  const submittedAssignments = mockAssignments.filter(a => a.status === 'submitted');
  const unreadNotifications = mockNotifications.filter(n => !n.read);
  const attendanceCount = useCountUp(attendance.overall, 1200, !loading);
  const gpaRaw = useCountUp(Math.round(grades.currentGpa * 10), 1200, !loading);

  useEffect(() => { const t = setTimeout(() => setLoading(false), 900); return () => clearTimeout(t); }, []);

  const colorMap = { indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400', blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400', emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400', amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-600 dark:text-amber-400' };

  const statCards = [
    { title: 'Overall Attendance', value: `${attendanceCount}%`, subtext: `${attendance.present} present · ${attendance.absent} absent`, icon: ClipboardCheck, color: 'indigo', to: '/student/attendance' },
    { title: 'Assignments', value: mockAssignments.length, subtext: `${pendingAssignments.length} pending · ${overdueAssignments.length} overdue`, icon: BookOpen, color: 'blue', to: '/student/assignments' },
    { title: 'Current GPA', value: (gpaRaw / 10).toFixed(1), subtext: 'Semester VII performance', icon: TrendingUp, color: 'emerald', to: '/student/grades' },
    { title: 'Notifications', value: unreadNotifications.length, subtext: 'unread messages', icon: Bell, color: 'amber', to: '/student/notifications' },
  ];

  if (loading) return <div className="space-y-6"><div className="skeleton h-16 w-72 rounded-xl" /><div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}</div></div>;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">{getGreeting()}, {user?.name?.split(' ')[0]} 👋</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Here's what's happening with your academics today.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => navigate('/student/timetable')}>Timetable</Button>
          <Button size="sm" icon={FileText} onClick={() => navigate('/student/leave')}>Apply Leave</Button>
        </div>
      </div>

      {attendance.overall < 75 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-500 mt-0.5 shrink-0" size={20} />
          <div>
            <p className="font-semibold text-red-800 dark:text-red-300">⚠️ Attendance Alert</p>
            <p className="text-sm text-red-600 dark:text-red-400">Your attendance is below the required 75%. Please attend upcoming classes regularly.</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((card) => { const Icon = card.icon; return (
          <Card key={card.title} hover onClick={() => navigate(card.to)} className="cursor-pointer">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[card.color]}`}><Icon size={20} /></div>
              <ArrowUpRight size={16} className="text-slate-300" />
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white mb-1">{card.value}</p>
            <p className="text-sm font-medium text-slate-600 dark:text-slate-300">{card.title}</p>
            <p className="text-xs text-slate-400 mt-0.5">{card.subtext}</p>
          </Card>
        ); })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1">
          <CardHeader><CardTitle>Today's Classes</CardTitle><Button variant="ghost" size="xs" onClick={() => navigate('/student/timetable')}>View all</Button></CardHeader>
          <div className="space-y-3">
            {todaySchedule.map((cls, i) => (
              <div key={i} className={`flex gap-3 p-3 rounded-xl border transition-all ${SCHEDULE_STYLES[cls.status]}`}>
                <div className="shrink-0 text-right min-w-[70px]"><p className="text-xs font-semibold text-slate-600 dark:text-slate-300">{cls.time.split(' - ')[0]}</p><p className="text-xs text-slate-400">{cls.time.split(' - ')[1]}</p></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{cls.subject}</p><p className="text-xs text-slate-400 truncate">{cls.faculty} · {cls.room}</p></div>
                {cls.status === 'current' && <span className="shrink-0 w-2 h-2 bg-indigo-500 rounded-full mt-1.5 animate-pulse" />}
                {cls.status === 'completed' && <CheckCircle2 size={14} className="text-emerald-500 shrink-0 mt-0.5" />}
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Subject-wise Attendance</CardTitle><Badge variant={attendance.overall >= 75 ? 'success' : 'danger'}>{attendance.overall}% Overall</Badge></CardHeader>
          <div className="space-y-3">
            {attendance.subjects.map((sub) => (
              <div key={sub.code}>
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="font-medium text-slate-700 dark:text-slate-300 truncate max-w-[200px]">{sub.subject}</span>
                  <span className={`font-semibold ${sub.percentage >= 75 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500'}`}>{sub.percentage}%</span>
                </div>
                <ProgressBar value={sub.percentage} color="auto" size="md" />
              </div>
            ))}
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle>Upcoming Assignments</CardTitle><Button variant="ghost" size="xs" onClick={() => navigate('/student/assignments')}>View all</Button></CardHeader>
          <div className="space-y-3">
            {[...pendingAssignments, ...overdueAssignments].slice(0, 4).map((a) => (
              <div key={a.id} className="flex items-start gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
                <div className="w-9 h-9 bg-indigo-50 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center shrink-0"><BookOpen size={16} className="text-indigo-600" /></div>
                <div className="flex-1 min-w-0"><p className="text-sm font-semibold text-slate-800 dark:text-white">{a.title}</p><p className="text-xs text-slate-400">{a.subject} · Due {a.dueDate}</p></div>
                <Badge variant={a.status === 'overdue' ? 'danger' : 'warning'}>{a.status}</Badge>
              </div>
            ))}
            {pendingAssignments.length === 0 && overdueAssignments.length === 0 && <div className="text-center py-8"><CheckCircle2 size={32} className="mx-auto mb-2 text-emerald-400" /><p className="text-sm text-slate-400">All caught up!</p></div>}
          </div>
        </Card>

        <Card>
          <CardHeader><CardTitle>Notifications</CardTitle><Button variant="ghost" size="xs" onClick={() => navigate('/student/notifications')}>See all</Button></CardHeader>
          <div className="space-y-3">
            {mockNotifications.slice(0, 5).map((n) => (
              <div key={n.id} className={`flex gap-2.5 p-2.5 rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors ${!n.read ? 'bg-indigo-50/50 dark:bg-indigo-900/10' : ''}`}>
                <span className="text-lg shrink-0">{NOTIF_ICONS[n.type]}</span>
                <div className="flex-1 min-w-0"><p className={`text-xs font-semibold truncate ${!n.read ? 'text-slate-900 dark:text-white' : 'text-slate-600 dark:text-slate-300'}`}>{n.title}</p><p className="text-xs text-slate-400 truncate">{n.message.slice(0, 60)}...</p></div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader><CardTitle>Academic Performance Trend</CardTitle><Badge variant="primary">GPA: {grades.currentGpa}</Badge></CardHeader>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={grades.semesterTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="semester" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[7, 10]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Line type="monotone" dataKey="gpa" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

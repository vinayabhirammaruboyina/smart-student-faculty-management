import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, BookOpen, ShieldAlert, Award, ArrowUpRight, Plus, Megaphone } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import { useCountUp } from '../../hooks/useCountUp';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { SkeletonCard } from '../../components/common/SkeletonLoader';
import { adminAnalyticsData } from '../../data/users';
import { mockLeaveApplications } from '../../data/leave';
import toast from 'react-hot-toast';

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMsg, setBroadcastMsg] = useState('');

  const studentCount = useCountUp(adminAnalyticsData.totalStudents, 1200, !loading);
  const facultyCount = useCountUp(adminAnalyticsData.totalFaculty, 1000, !loading);
  const deptCount = useCountUp(adminAnalyticsData.departments, 800, !loading);
  const activeClasses = useCountUp(adminAnalyticsData.activeClasses, 800, !loading);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(t);
  }, []);

  const handleBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMsg) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('System broadcast sent successfully to all users!');
    setShowBroadcastModal(false);
    setBroadcastTitle('');
    setBroadcastMsg('');
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="skeleton h-16 w-80 rounded-xl" />
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );
  }

  const statCards = [
    { label: 'Total Students', value: studentCount, icon: Users, color: 'indigo', to: '/admin/students' },
    { label: 'Total Faculty', value: facultyCount, icon: Award, color: 'emerald', to: '/admin/faculty' },
    { label: 'Departments', value: deptCount, icon: BookOpen, color: 'blue', to: '/admin/departments' },
    { label: 'Active Classes', value: activeClasses, icon: ShieldAlert, color: 'amber', to: '/admin/timetable' },
  ];

  const colorMap = {
    indigo: 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-650 dark:text-indigo-400',
    emerald: 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-650 dark:text-emerald-400',
    blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-650 dark:text-blue-400',
    amber: 'bg-amber-50 dark:bg-amber-900/20 text-amber-650 dark:text-amber-400',
  };

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="flex items-start justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Admin Command Center 🛠️</h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">Manage institutional data and overall platform health.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" icon={Megaphone} onClick={() => setShowBroadcastModal(true)}>Send Broadcast</Button>
          <Button size="sm" icon={Plus} onClick={() => navigate('/admin/users')}>Add User</Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        {statCards.map((s) => {
          const Icon = s.icon;
          return (
            <Card key={s.label} hover onClick={() => navigate(s.to)} className="cursor-pointer">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorMap[s.color]}`}>
                  <Icon size={20} />
                </div>
                <ArrowUpRight size={16} className="text-slate-350" />
              </div>
              <p className="text-2xl font-bold text-slate-900 dark:text-white">{s.value}</p>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">{s.label}</p>
            </Card>
          );
        })}
      </div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance trend */}
        <Card>
          <CardHeader>
            <CardTitle>Institutional Attendance Trend (%)</CardTitle>
            <Badge variant="primary">Target: 85%</Badge>
          </CardHeader>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={adminAnalyticsData.attendanceTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="overall" name="Attendance" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                <Bar dataKey="target" name="Target" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Growth trend */}
        <Card>
          <CardHeader>
            <CardTitle>Student Growth Trend</CardTitle>
          </CardHeader>
          <div className="h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={adminAnalyticsData.studentGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis domain={[2000, 2600]} tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2.5} dot={{ fill: '#10b981' }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent leave applications queue */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Leave Applications</CardTitle>
          <Button size="xs" variant="ghost" onClick={() => navigate('/admin/leave')}>View all applications</Button>
        </CardHeader>
        <div className="space-y-3">
          {mockLeaveApplications.slice(0, 3).map((l) => (
            <div key={l.id} className="flex items-center justify-between p-3 rounded-xl border border-slate-100 dark:border-slate-700">
              <div className="flex items-center gap-3">
                <Avatar name={l.studentName} size="sm" />
                <div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{l.studentName}</p>
                  <p className="text-xs text-slate-450">{l.type} · {l.fromDate} to {l.toDate} ({l.days} days)</p>
                </div>
              </div>
              <Badge variant={l.status === 'approved' ? 'success' : l.status === 'pending' ? 'warning' : 'danger'}>
                {l.status}
              </Badge>
            </div>
          ))}
        </div>
      </Card>

      {/* Broadcast dialog */}
      {showBroadcastModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xl overflow-hidden p-6 space-y-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Send System Broadcast</h3>
            <p className="text-sm text-slate-500">This announcement will be pushed to the notification feeds of all student and faculty portal users.</p>
            <form onSubmit={handleBroadcast} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Title</label>
                <input type="text" value={broadcastTitle} onChange={(e) => setBroadcastTitle(e.target.value)} placeholder="e.g. Server Maintenance Notice" className="input-base" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-500 mb-1">Message</label>
                <textarea rows={3} value={broadcastMsg} onChange={(e) => setBroadcastMsg(e.target.value)} placeholder="Type announcement detail..." className="input-base" />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <Button variant="secondary" type="button" onClick={() => setShowBroadcastModal(false)}>Cancel</Button>
                <Button type="submit">Broadcast Alert</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

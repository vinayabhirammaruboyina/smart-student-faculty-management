import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import ProgressBar from '../../components/ui/ProgressBar';
import { studentAttendanceData } from '../../data/students';
import { AlertTriangle, CheckCircle } from 'lucide-react';

export default function StudentAttendance() {
  const data = studentAttendanceData['STU-001'];
  return (
    <div className="space-y-6 max-w-5xl">
      <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Attendance Overview</h2><p className="text-sm text-slate-400">Semester VII · Academic Year 2026–27</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="text-center">
          <div className="relative w-28 h-28 mx-auto mb-3">
            <svg className="w-28 h-28 -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e2e8f0" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke={data.overall >= 75 ? '#22c55e' : '#ef4444'} strokeWidth="10" strokeDasharray={`${data.overall * 2.513} 251.3`} strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center"><span className="text-2xl font-bold text-slate-900 dark:text-white">{data.overall}%</span><span className="text-xs text-slate-400">Overall</span></div>
          </div>
          <Badge variant={data.overall >= 75 ? 'success' : 'danger'} dot>{data.overall >= 75 ? 'Healthy' : 'Below Threshold'}</Badge>
        </Card>
        <Card className="flex flex-col items-center justify-center text-center"><CheckCircle size={32} className="text-emerald-500 mb-2" /><p className="text-3xl font-bold text-slate-900 dark:text-white">{data.present}</p><p className="text-sm text-slate-400">Classes Attended</p></Card>
        <Card className="flex flex-col items-center justify-center text-center"><AlertTriangle size={32} className="text-red-400 mb-2" /><p className="text-3xl font-bold text-slate-900 dark:text-white">{data.absent}</p><p className="text-sm text-slate-400">Classes Missed</p></Card>
      </div>
      {data.overall < 75 && (
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 flex items-start gap-3">
          <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
          <p className="text-sm text-red-700 dark:text-red-300">Your attendance is below the required <strong>75%</strong>. Attend more classes to meet the requirement.</p>
        </div>
      )}
      <Card>
        <CardHeader><CardTitle>Subject-wise Attendance</CardTitle></CardHeader>
        <div className="space-y-4">
          {data.subjects.map((sub) => (
            <div key={sub.code}>
              <div className="flex justify-between items-center mb-2">
                <div><p className="text-sm font-medium text-slate-700 dark:text-slate-300">{sub.subject}</p><p className="text-xs text-slate-400">{sub.present}/{sub.total} classes attended</p></div>
                <Badge variant={sub.percentage >= 85 ? 'success' : sub.percentage >= 75 ? 'warning' : 'danger'}>{sub.percentage}%</Badge>
              </div>
              <ProgressBar value={sub.percentage} color="auto" size="md" />
            </div>
          ))}
        </div>
      </Card>
      <Card>
        <CardHeader><CardTitle>Monthly Attendance Trend</CardTitle></CardHeader>
        <div className="h-52">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis domain={[60, 100]} tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: '10px', border: '1px solid #e2e8f0', fontSize: 13 }} formatter={(v) => [`${v}%`, 'Attendance']} />
              <Bar dataKey="percentage" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

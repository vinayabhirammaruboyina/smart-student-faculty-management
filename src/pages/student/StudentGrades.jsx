import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import { studentGradesData } from '../../data/students';
import { TrendingUp } from 'lucide-react';

const GRADE_BADGE = { 'A+': 'success', A: 'success', 'A-': 'success', 'B+': 'info', B: 'info', 'B-': 'primary', 'C+': 'warning', C: 'warning', D: 'danger', F: 'danger' };

export default function StudentGrades() {
  const data = studentGradesData['STU001'];
  const marksData = data.subjects.map(s => ({ name: s.code, internal: s.internal, assignment: s.assignment, attendance: s.attendance }));

  return (
    <div className="space-y-6 max-w-5xl">
      <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Academic Performance</h2><p className="text-sm text-slate-400">Semester VII grades and performance metrics</p></div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white border-0 text-center">
          <p className="text-5xl font-bold mb-1">{data.currentGpa}</p><p className="text-indigo-200 text-sm">Current GPA</p><p className="text-indigo-300 text-xs mt-1">Scale of 10.0</p>
        </Card>
        <Card className="text-center"><TrendingUp size={28} className="text-emerald-500 mx-auto mb-2" /><p className="text-2xl font-bold text-slate-900 dark:text-white">A</p><p className="text-sm text-slate-400">Average Grade</p></Card>
        <Card className="text-center"><p className="text-2xl font-bold text-slate-900 dark:text-white">17</p><p className="text-sm text-slate-400">Credits Earned</p></Card>
      </div>
      <Card padding="none">
        <div className="p-5 border-b border-slate-100 dark:border-slate-700"><h3 className="text-base font-semibold text-slate-900 dark:text-white">Subject-wise Performance</h3></div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead><tr className="bg-slate-50 dark:bg-slate-900/50">{['Subject', 'Internal (30)', 'Assignment (20)', 'Attendance (10)', 'Total (70)', 'Grade'].map(h => (<th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>))}</tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {data.subjects.map((sub) => (
                <tr key={sub.code} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3"><p className="text-sm font-medium text-slate-800 dark:text-white">{sub.subject}</p><p className="text-xs text-slate-400">{sub.code}</p></td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{sub.internal}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{sub.assignment}</td>
                  <td className="px-4 py-3 text-sm text-slate-600 dark:text-slate-300">{sub.attendance}</td>
                  <td className="px-4 py-3"><span className="text-sm font-bold text-slate-800 dark:text-white">{sub.total}</span><span className="text-xs text-slate-400">/{sub.max}</span></td>
                  <td className="px-4 py-3"><Badge variant={GRADE_BADGE[sub.grade] || 'default'}>{sub.grade}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Marks Breakdown</CardTitle></CardHeader>
          <div className="h-48"><ResponsiveContainer width="100%" height="100%"><BarChart data={marksData}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} /><YAxis tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} /><Bar dataKey="internal" name="Internal" fill="#6366f1" stackId="a" radius={[3,3,0,0]} /><Bar dataKey="assignment" name="Assignment" fill="#22c55e" stackId="a" /><Bar dataKey="attendance" name="Attendance" fill="#f59e0b" stackId="a" /></BarChart></ResponsiveContainer></div>
        </Card>
        <Card>
          <CardHeader><CardTitle>GPA Trend</CardTitle></CardHeader>
          <div className="h-48"><ResponsiveContainer width="100%" height="100%"><LineChart data={data.semesterTrend}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" /><XAxis dataKey="semester" tick={{ fontSize: 10, fill: '#94a3b8' }} axisLine={false} tickLine={false} /><YAxis domain={[7, 10]} tick={{ fontSize: 11, fill: '#94a3b8' }} axisLine={false} tickLine={false} /><Tooltip contentStyle={{ borderRadius: '10px', fontSize: 12 }} /><Line type="monotone" dataKey="gpa" stroke="#6366f1" strokeWidth={2.5} dot={{ fill: '#6366f1', r: 4 }} /></LineChart></ResponsiveContainer></div>
        </Card>
      </div>
    </div>
  );
}

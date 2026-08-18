import { useState } from 'react';
import { Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Avatar from '../../components/ui/Avatar';
import ProgressBar from '../../components/ui/ProgressBar';
import Input from '../../components/ui/Input';
import { mockStudents } from '../../data/students';

export default function FacultyStudents() {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');

  const filtered = mockStudents
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.enrollmentNo.includes(search))
    .sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'attendance') return b.attendance - a.attendance;
      if (sortBy === 'gpa') return b.gpa - a.gpa;
      return 0;
    });

  const getPerf = (s) => {
    if (s.attendance >= 80 && s.gpa >= 8) return { label: 'Excellent', variant: 'success' };
    if (s.attendance >= 75 && s.gpa >= 7) return { label: 'Good', variant: 'primary' };
    if (s.attendance < 75) return { label: 'At Risk', variant: 'danger' };
    return { label: 'Average', variant: 'warning' };
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Roster</h2>
          <p className="text-sm text-slate-400">{mockStudents.length} students in your classes</p>
        </div>
        <div className="flex gap-2">
          {['name', 'attendance', 'gpa'].map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 rounded-lg text-sm capitalize transition-all ${
                sortBy === s
                  ? 'bg-indigo-600 text-white'
                  : 'bg-white dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
      
      <Input placeholder="Search students by name or enrollment no..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => {
          const perf = getPerf(s);
          return (
            <Card key={s.id}>
              <div className="flex items-start gap-3">
                <Avatar name={s.name} size="md" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-slate-900 dark:text-white">{s.name}</p>
                      <p className="text-xs text-slate-400">{s.enrollmentNo}</p>
                    </div>
                    <Badge variant={perf.variant}>{perf.label}</Badge>
                  </div>
                  <div className="mt-3 space-y-2">
                    <div>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500">Attendance</span>
                        <span className={s.attendance >= 75 ? 'text-emerald-600 font-semibold' : 'text-red-500 font-semibold'}>{s.attendance}%</span>
                      </div>
                      <ProgressBar value={s.attendance} color="auto" size="sm" />
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Assignments: {s.assignmentsCompleted}/{s.totalAssignments}</span>
                      <span className="font-semibold text-slate-500 font-mono">GPA: {s.gpa}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

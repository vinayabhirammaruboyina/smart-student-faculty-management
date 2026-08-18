import { useState } from 'react';
import { Search, BookOpen, Clock, Users, ArrowUpRight } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import { mockAssignments } from '../../data/assignments';
import { formatDate } from '../../utils/helpers';

export default function AdminAssignments() {
  const [search, setSearch] = useState('');
  
  const filtered = mockAssignments.filter(a => 
    a.title.toLowerCase().includes(search.toLowerCase()) || 
    a.subject.toLowerCase().includes(search.toLowerCase()) ||
    a.faculty.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Assignments Monitor</h2>
        <p className="text-sm text-slate-400">Track homework tasks, submission performance and grades across subjects.</p>
      </div>

      <Card>
        <Input placeholder="Search assignments by title, subject or lecturer..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((a) => (
          <Card key={a.id} className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen size={18} className="text-indigo-650" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-white leading-tight truncate max-w-[200px]">{a.title}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{a.subjectCode} · {a.subject}</p>
                  </div>
                </div>
                <Badge variant={a.status === 'submitted' ? 'success' : a.status === 'pending' ? 'warning' : 'danger'}>
                  {a.status}
                </Badge>
              </div>

              <p className="text-sm text-slate-500 dark:text-slate-400 mt-3 line-clamp-2">{a.description}</p>
              
              <div className="space-y-2 mt-4 text-xs text-slate-500">
                <p className="flex items-center gap-1.5"><Clock size={13} /> Due Date: <strong>{formatDate(a.dueDate)}</strong></p>
                <p className="flex items-center gap-1.5"><Users size={13} /> Coordinator: <strong>{a.faculty}</strong></p>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700 mt-4 text-xs">
              <span className="text-slate-450 font-medium">Max Score: {a.maxMarks} Marks</span>
              {a.obtainedMarks !== null && (
                <span className="text-emerald-500 font-bold">Obtained: {a.obtainedMarks}/{a.maxMarks}</span>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

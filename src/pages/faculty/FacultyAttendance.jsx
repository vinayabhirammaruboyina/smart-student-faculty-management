import { useState } from 'react';
import { Search, CheckCircle, XCircle, Save, CheckCheck } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Avatar from '../../components/ui/Avatar';
import { mockStudents } from '../../data/students';
import toast from 'react-hot-toast';

export default function FacultyAttendance() {
  const [subject, setSubject] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [search, setSearch] = useState('');
  const [attendance, setAttendance] = useState({});
  const [saving, setSaving] = useState(false);

  const subjects = [
    { value: 'WE701', label: 'Web Engineering (WE701)' },
    { value: 'ST704', label: 'Software Testing (ST704)' }
  ];
  
  const filtered = mockStudents.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.enrollmentNo.includes(search)
  );
  
  const presentCount = Object.values(attendance).filter(v => v === 'present').length;
  const absentCount = Object.values(attendance).filter(v => v === 'absent').length;

  const markAll = (status) => {
    const updated = {};
    mockStudents.forEach(s => { updated[s.id] = status; });
    setAttendance(updated);
  };

  const handleSave = async () => {
    if (!subject) {
      toast.error('Please select a subject first');
      return;
    }
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success(`Attendance saved! ${presentCount} present, ${absentCount} absent`);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Mark Attendance</h2>
        <p className="text-sm text-slate-400">Take attendance for today's class</p>
      </div>
      
      <Card>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Select label="Subject" options={subjects} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Select subject" />
          <Input label="Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <div className="flex items-end">
            <Button variant="secondary" fullWidth icon={CheckCheck} onClick={() => markAll('present')}>
              Mark All Present
            </Button>
          </div>
        </div>
      </Card>
      
      <div className="grid grid-cols-3 gap-4">
        <Card className="text-center">
          <p className="text-2xl font-bold text-slate-900 dark:text-white">{mockStudents.length}</p>
          <p className="text-sm text-slate-400">Total</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-emerald-600">{presentCount}</p>
          <p className="text-sm text-slate-400">Present</p>
        </Card>
        <Card className="text-center">
          <p className="text-2xl font-bold text-red-500">{absentCount}</p>
          <p className="text-sm text-slate-400">Absent</p>
        </Card>
      </div>
      
      <Card padding="none">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <Input placeholder="Search students..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
        </div>
        <div className="divide-y divide-slate-100 dark:divide-slate-700">
          {filtered.map((student) => {
            const status = attendance[student.id];
            return (
              <div key={student.id} className="flex items-center gap-4 px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <Avatar name={student.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 dark:text-white">{student.name}</p>
                  <p className="text-xs text-slate-400">{student.enrollmentNo}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setAttendance(p => ({ ...p, [student.id]: 'present' }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      status === 'present'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-emerald-50'
                    }`}
                  >
                    <CheckCircle size={14} /> P
                  </button>
                  <button
                    onClick={() => setAttendance(p => ({ ...p, [student.id]: 'absent' }))}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                      status === 'absent'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-500 hover:bg-red-50'
                    }`}
                  >
                    <XCircle size={14} /> A
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
          <Button icon={Save} loading={saving} onClick={handleSave}>Save Attendance</Button>
        </div>
      </Card>
    </div>
  );
}

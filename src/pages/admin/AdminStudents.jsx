import { useState } from 'react';
import { Search, Eye, GraduationCap, Edit3 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import ProgressBar from '../../components/ui/ProgressBar';
import { mockStudents } from '../../data/students';
import toast from 'react-hot-toast';

export default function AdminStudents() {
  const [students, setStudents] = useState(mockStudents);
  const [search, setSearch] = useState('');
  const [semFilter, setSemFilter] = useState('all');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState({ gpa: '', attendance: '', status: 'active' });
  const [updating, setUpdating] = useState(false);

  const filtered = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.enrollmentNo.includes(search);
    const matchesSem = semFilter === 'all' || s.semester === semFilter;
    return matchesSearch && matchesSem;
  });

  const handleUpdate = async (e) => {
    e.preventDefault();
    setUpdating(true);
    await new Promise(r => setTimeout(r, 800));
    setStudents(prev => prev.map(s => s.id === selectedStudent.id ? { 
      ...s, 
      gpa: parseFloat(form.gpa) || s.gpa, 
      attendance: parseInt(form.attendance) || s.attendance,
      status: form.status
    } : s));
    setUpdating(false);
    setShowEditModal(false);
    toast.success('Student records updated!');
  };

  const semesters = [
    { value: 'all', label: 'All Semesters' },
    { value: 'I', label: 'Sem I' },
    { value: 'III', label: 'Sem III' },
    { value: 'V', label: 'Sem V' },
    { value: 'VII', label: 'Sem VII' }
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Student Roster</h2>
        <p className="text-sm text-slate-400">View and update academic status of all students.</p>
      </div>

      <Card>
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Input placeholder="Search students by name or enrollment number..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
          </div>
          <div className="w-full sm:w-48">
            <Select options={semesters} value={semFilter} onChange={(e) => setSemFilter(e.target.value)} />
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <Card key={s.id}>
            <div className="flex items-start gap-4">
              <Avatar name={s.name} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-white">{s.name}</h3>
                    <p className="text-xs text-slate-400 font-mono">{s.enrollmentNo}</p>
                  </div>
                  <Badge variant={s.status === 'active' ? 'success' : 'danger'}>{s.status}</Badge>
                </div>
                <div className="mt-3 space-y-2">
                  <div>
                    <div className="flex justify-between text-xs mb-1 text-slate-500">
                      <span>Overall Attendance</span>
                      <span className={s.attendance >= 75 ? 'text-emerald-500 font-bold' : 'text-red-500 font-bold'}>{s.attendance}%</span>
                    </div>
                    <ProgressBar value={s.attendance} color="auto" size="sm" />
                  </div>
                  <div className="flex justify-between items-center text-xs text-slate-500">
                    <span>GPA: <strong className="text-slate-800 dark:text-white font-mono">{s.gpa}</strong></span>
                    <span>Department: {s.department}</span>
                  </div>
                </div>
                <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-100 dark:border-slate-700">
                  <Button size="xs" variant="secondary" icon={Eye} onClick={() => {
                    setSelectedStudent(s);
                    setShowDetailModal(true);
                  }}>Details</Button>
                  <Button size="xs" variant="secondary" icon={Edit3} onClick={() => {
                    setSelectedStudent(s);
                    setForm({ gpa: s.gpa.toString(), attendance: s.attendance.toString(), status: s.status });
                    setShowEditModal(true);
                  }}>Record Edit</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Details Modal */}
      <Modal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} title="Student Profile Overview" size="md">
        {selectedStudent && (
          <div className="space-y-4">
            <div className="flex items-center gap-4 border-b border-slate-100 dark:border-slate-700 pb-4">
              <Avatar name={selectedStudent.name} size="lg" />
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">{selectedStudent.name}</h4>
                <p className="text-xs text-slate-400">Enrollment: {selectedStudent.enrollmentNo}</p>
                <p className="text-xs text-slate-400">Joined on: {selectedStudent.joinDate}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-slate-450">Department</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5">{selectedStudent.department}</p></div>
              <div><p className="text-slate-450">Semester</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5">Sem {selectedStudent.semester}</p></div>
              <div><p className="text-slate-450">CGPA</p><p className="font-semibold text-slate-850 dark:text-white mt-0.5 font-mono">{selectedStudent.gpa} / 10.0</p></div>
              <div><p className="text-slate-450">Attendance</p><p className="font-semibold text-slate-850 dark:text-white mt-0.5">{selectedStudent.attendance}%</p></div>
              <div><p className="text-slate-450">Phone</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5">{selectedStudent.phone}</p></div>
              <div><p className="text-slate-450">Email</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5 truncate">{selectedStudent.email}</p></div>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-3 text-xs text-slate-400 flex items-center gap-2">
              <GraduationCap size={16} className="text-indigo-500 shrink-0" />
              <span>Full authorization history logs are stored in the institution main database.</span>
            </div>
          </div>
        )}
      </Modal>

      {/* Edit Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Update Academic Records" size="md">
        <form onSubmit={handleUpdate} className="space-y-4">
          <Input label="Cumulative GPA" type="number" step="0.1" min="0" max="10" value={form.gpa} onChange={(e) => setForm(p => ({ ...p, gpa: e.target.value }))} />
          <Input label="Class Attendance (%)" type="number" min="0" max="100" value={form.attendance} onChange={(e) => setForm(p => ({ ...p, attendance: e.target.value }))} />
          <Select label="Enrollment Status" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))} />
          
          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button type="submit" loading={updating}>Save Changes</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

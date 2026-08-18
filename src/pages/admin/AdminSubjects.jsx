import { useState } from 'react';
import { Search, Plus, BookOpen, Users, Award, Edit3 } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
import { mockSubjects } from '../../data/users';
import { mockFaculty } from '../../data/faculty';
import toast from 'react-hot-toast';

export default function AdminSubjects() {
  const [subjects, setSubjects] = useState(mockSubjects);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSub, setSelectedSub] = useState(null);
  
  const [form, setForm] = useState({ name: '', code: '', semester: 'VII', credits: '4', faculty: 'Dr. Priya Sharma', type: 'core' });
  const [loading, setLoading] = useState(false);

  const filtered = subjects.filter(s => 
    s.name.toLowerCase().includes(search.toLowerCase()) || 
    s.code.toLowerCase().includes(search.toLowerCase()) ||
    s.faculty.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.code) {
      toast.error('Name and Code are required');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSubjects(prev => [
      {
        id: 'SUB' + Date.now().toString().slice(-3),
        name: form.name,
        code: form.code.toUpperCase(),
        department: 'Computer Applications',
        semester: form.semester,
        credits: parseInt(form.credits) || 3,
        faculty: form.faculty,
        type: form.type
      },
      ...prev
    ]);
    setLoading(false);
    setShowAddModal(false);
    setForm({ name: '', code: '', semester: 'VII', credits: '4', faculty: 'Dr. Priya Sharma', type: 'core' });
    toast.success('Subject added successfully!');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setSubjects(prev => prev.map(s => s.id === selectedSub.id ? { 
      ...s, 
      name: form.name, 
      code: form.code.toUpperCase(),
      semester: form.semester,
      credits: parseInt(form.credits) || s.credits,
      faculty: form.faculty,
      type: form.type
    } : s));
    setLoading(false);
    setShowEditModal(false);
    toast.success('Subject updated!');
  };

  const facultyOptions = mockFaculty.map(f => ({ value: f.name, label: f.name }));

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Curriculum Subjects</h2>
          <p className="text-sm text-slate-400">Manage subject lists, credit definitions, and lecturer mapping.</p>
        </div>
        <Button icon={Plus} onClick={() => {
          setForm({ name: '', code: '', semester: 'VII', credits: '4', faculty: mockFaculty[0]?.name || 'Dr. Priya Sharma', type: 'core' });
          setShowAddModal(true);
        }}>Add Subject</Button>
      </div>

      <Card>
        <Input placeholder="Search subjects by name, code or faculty..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((s) => (
          <Card key={s.id} className="flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center shrink-0">
                    <BookOpen size={18} className="text-indigo-650" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-white leading-tight">{s.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{s.code} · Sem {s.semester}</p>
                  </div>
                </div>
                <Badge variant={s.type === 'core' ? 'primary' : 'secondary'}>{s.type}</Badge>
              </div>

              <div className="space-y-2 mt-4 text-sm text-slate-600 dark:text-slate-400">
                <p className="flex items-center gap-1.5 text-xs"><Users size={14} /> Assigned Faculty: <strong className="text-slate-800 dark:text-white">{s.faculty}</strong></p>
                <p className="flex items-center gap-1.5 text-xs"><Award size={14} /> Credits Weight: <strong className="text-slate-800 dark:text-white">{s.credits} Credits</strong></p>
              </div>
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-700 mt-4">
              <Button size="xs" variant="secondary" icon={Edit3} onClick={() => {
                setSelectedSub(s);
                setForm({ name: s.name, code: s.code, semester: s.semester, credits: s.credits.toString(), faculty: s.faculty, type: s.type });
                setShowEditModal(true);
              }}>Edit Details</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Subject Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Course Subject" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Subject Name *" placeholder="Software Engineering" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Subject Code *" placeholder="SE706" value={form.code} onChange={(e) => setForm(p => ({ ...p, code: e.target.value }))} />
          
          <div className="grid grid-cols-2 gap-3">
            <Select label="Semester" options={[{ value: 'I', label: 'Sem I' }, { value: 'III', label: 'Sem III' }, { value: 'V', label: 'Sem V' }, { value: 'VII', label: 'Sem VII' }]} value={form.semester} onChange={(e) => setForm(p => ({ ...p, semester: e.target.value }))} />
            <Input label="Credits" type="number" value={form.credits} onChange={(e) => setForm(p => ({ ...p, credits: e.target.value }))} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select label="Faculty Coordinator" options={facultyOptions} value={form.faculty} onChange={(e) => setForm(p => ({ ...p, faculty: e.target.value }))} />
            <Select label="Subject Type" options={[{ value: 'core', label: 'Core Course' }, { value: 'elective', label: 'Elective Course' }]} value={form.type} onChange={(e) => setForm(p => ({ ...p, type: e.target.value }))} />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Save Subject</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Subject Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Modify Subject Details" size="md">
        <form onSubmit={handleEdit} className="space-y-4">
          <Input label="Subject Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Subject Code" value={form.code} onChange={(e) => setForm(p => ({ ...p, code: e.target.value }))} />
          
          <div className="grid grid-cols-2 gap-3">
            <Select label="Semester" options={[{ value: 'I', label: 'Sem I' }, { value: 'III', label: 'Sem III' }, { value: 'V', label: 'Sem V' }, { value: 'VII', label: 'Sem VII' }]} value={form.semester} onChange={(e) => setForm(p => ({ ...p, semester: e.target.value }))} />
            <Input label="Credits" type="number" value={form.credits} onChange={(e) => setForm(p => ({ ...p, credits: e.target.value }))} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Select label="Faculty Coordinator" options={facultyOptions} value={form.faculty} onChange={(e) => setForm(p => ({ ...p, faculty: e.target.value }))} />
            <Select label="Subject Type" options={[{ value: 'core', label: 'Core Course' }, { value: 'elective', label: 'Elective Course' }]} value={form.type} onChange={(e) => setForm(p => ({ ...p, type: e.target.value }))} />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Update Subject</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

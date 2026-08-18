import { useState } from 'react';
import { Search, Plus, Building, BookOpen, Users, Award } from 'lucide-react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Modal from '../../components/ui/Modal';
import { mockDepartments } from '../../data/users';
import toast from 'react-hot-toast';

export default function AdminDepartments() {
  const [departments, setDepartments] = useState(mockDepartments);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ name: '', code: '', hod: '', totalStudents: '', totalFaculty: '', totalSubjects: '' });
  const [loading, setLoading] = useState(false);

  const filtered = departments.filter(d => 
    d.name.toLowerCase().includes(search.toLowerCase()) || 
    d.code.toLowerCase().includes(search.toLowerCase()) || 
    d.hod.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.code || !form.hod) {
      toast.error('Name, Code and HOD are required');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setDepartments(prev => [
      {
        id: 'DEPT' + Date.now().toString().slice(-3),
        name: form.name,
        code: form.code.toUpperCase(),
        hod: form.hod,
        totalStudents: parseInt(form.totalStudents) || 0,
        totalFaculty: parseInt(form.totalFaculty) || 0,
        totalSubjects: parseInt(form.totalSubjects) || 0
      },
      ...prev
    ]);
    setLoading(false);
    setShowAddModal(false);
    setForm({ name: '', code: '', hod: '', totalStudents: '', totalFaculty: '', totalSubjects: '' });
    toast.success('Department created successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Departments</h2>
          <p className="text-sm text-slate-400">Manage academic departments, heads of department, and courses.</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>Add Department</Button>
      </div>

      <Card>
        <Input placeholder="Search departments by name, code or HOD..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((d) => (
          <Card key={d.id}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center shrink-0">
                <Building size={24} className="text-indigo-650" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-slate-950 dark:text-white truncate">{d.name}</h3>
                    <p className="text-xs text-indigo-500 font-bold">{d.code}</p>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-4 text-xs text-slate-500 dark:text-slate-400">
                  <p className="flex items-center gap-1.5"><Award size={14} /> HOD: <strong className="text-slate-800 dark:text-white">{d.hod}</strong></p>
                  <p className="flex items-center gap-1.5"><Users size={14} /> Students: <strong className="text-slate-800 dark:text-white">{d.totalStudents}</strong></p>
                  <p className="flex items-center gap-1.5"><Users size={14} /> Faculty: <strong className="text-slate-800 dark:text-white">{d.totalFaculty}</strong></p>
                  <p className="flex items-center gap-1.5"><BookOpen size={14} /> Subjects: <strong className="text-slate-800 dark:text-white">{d.totalSubjects}</strong></p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Department Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Create Department" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Department Name *" placeholder="Data Science" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Code / Short Name *" placeholder="DS" value={form.code} onChange={(e) => setForm(p => ({ ...p, code: e.target.value }))} />
          <Input label="Head of Department (HOD) *" placeholder="Dr. Rajesh Gupta" value={form.hod} onChange={(e) => setForm(p => ({ ...p, hod: e.target.value }))} />
          
          <div className="grid grid-cols-3 gap-2">
            <Input label="Students" type="number" placeholder="100" value={form.totalStudents} onChange={(e) => setForm(p => ({ ...p, totalStudents: e.target.value }))} />
            <Input label="Faculty" type="number" placeholder="8" value={form.totalFaculty} onChange={(e) => setForm(p => ({ ...p, totalFaculty: e.target.value }))} />
            <Input label="Subjects" type="number" placeholder="12" value={form.totalSubjects} onChange={(e) => setForm(p => ({ ...p, totalSubjects: e.target.value }))} />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Save Department</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

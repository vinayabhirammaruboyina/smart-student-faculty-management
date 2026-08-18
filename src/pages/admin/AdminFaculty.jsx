import { useState } from 'react';
import { Search, Plus, Eye, Edit3, Mail, Phone, BookOpen } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import { mockFaculty } from '../../data/faculty';
import toast from 'react-hot-toast';

export default function AdminFaculty() {
  const [faculty, setFaculty] = useState(mockFaculty);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedFac, setSelectedFac] = useState(null);
  
  const [form, setForm] = useState({ name: '', email: '', designation: 'Assistant Professor', status: 'active', subjects: '' });
  const [loading, setLoading] = useState(false);

  const filtered = faculty.filter(f => 
    f.name.toLowerCase().includes(search.toLowerCase()) || 
    f.employeeId.includes(search) || 
    f.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast.error('Name and Email are required');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setFaculty(prev => [
      {
        id: 'FAC' + Date.now().toString().slice(-3),
        employeeId: 'EMP' + Date.now().toString().slice(-4),
        name: form.name,
        email: form.email,
        phone: '+91 98765 00000',
        department: 'Computer Applications',
        designation: form.designation,
        subjects: form.subjects ? form.subjects.split(',').map(s => s.trim()) : [],
        totalStudents: 0,
        classesToday: 0,
        status: form.status
      },
      ...prev
    ]);
    setLoading(false);
    setShowAddModal(false);
    setForm({ name: '', email: '', designation: 'Assistant Professor', status: 'active', subjects: '' });
    toast.success('Faculty member added!');
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setFaculty(prev => prev.map(f => f.id === selectedFac.id ? { 
      ...f, 
      name: form.name, 
      email: form.email,
      designation: form.designation,
      status: form.status,
      subjects: form.subjects ? form.subjects.split(',').map(s => s.trim()) : []
    } : f));
    setLoading(false);
    setShowEditModal(false);
    toast.success('Faculty profile updated!');
  };

  const designations = [
    { value: 'Professor', label: 'Professor' },
    { value: 'Associate Professor', label: 'Associate Professor' },
    { value: 'Assistant Professor', label: 'Assistant Professor' },
    { value: 'Lecturer', label: 'Lecturer' }
  ];

  return (
    <div className="space-y-6 max-w-6xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Faculty Directory</h2>
          <p className="text-sm text-slate-400">Manage academic positions and class assignments.</p>
        </div>
        <Button icon={Plus} onClick={() => {
          setForm({ name: '', email: '', designation: 'Assistant Professor', status: 'active', subjects: '' });
          setShowAddModal(true);
        }}>Add Faculty</Button>
      </div>

      <Card>
        <Input placeholder="Search faculty by name, ID or email..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((f) => (
          <Card key={f.id} className="flex flex-col justify-between">
            <div>
              <div className="flex items-start gap-3 mb-4">
                <Avatar name={f.name} size="md" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 dark:text-white truncate">{f.name}</h3>
                  <p className="text-xs text-slate-400">{f.designation}</p>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{f.employeeId}</p>
                </div>
              </div>
              
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400 mb-4">
                <p className="flex items-center gap-2 text-xs truncate"><Mail size={13} className="text-slate-450 shrink-0" />{f.email}</p>
                <p className="flex items-center gap-2 text-xs"><Phone size={13} className="text-slate-450 shrink-0" />{f.phone}</p>
                <div className="flex items-start gap-2 text-xs">
                  <BookOpen size={13} className="text-slate-455 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-medium text-slate-500">Subjects: </span>
                    <span className="text-slate-800 dark:text-slate-200">{f.subjects.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-700 mt-2">
              <Badge variant={f.status === 'active' ? 'success' : 'danger'}>{f.status}</Badge>
              <Button size="xs" variant="secondary" icon={Edit3} onClick={() => {
                setSelectedFac(f);
                setForm({ name: f.name, email: f.email, designation: f.designation, status: f.status, subjects: f.subjects.join(', ') });
                setShowEditModal(true);
              }}>Edit Profile</Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Add Faculty Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Add Faculty Member" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Name *" placeholder="Dr. Vinay Sharma" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Email Address *" type="email" placeholder="faculty@pica.edu" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
          
          <div className="grid grid-cols-2 gap-3">
            <Select label="Designation" options={designations} value={form.designation} onChange={(e) => setForm(p => ({ ...p, designation: e.target.value }))} />
            <Select label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))} />
          </div>

          <Input label="Assigned Subjects (comma separated)" placeholder="Web Engineering, Software Testing" value={form.subjects} onChange={(e) => setForm(p => ({ ...p, subjects: e.target.value }))} />

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Save Faculty</Button>
          </div>
        </form>
      </Modal>

      {/* Edit Faculty Modal */}
      <Modal isOpen={showEditModal} onClose={() => setShowEditModal(false)} title="Edit Faculty Profile" size="md">
        <form onSubmit={handleEdit} className="space-y-4">
          <Input label="Name" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} />
          <Input label="Email Address" type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} />
          
          <div className="grid grid-cols-2 gap-3">
            <Select label="Designation" options={designations} value={form.designation} onChange={(e) => setForm(p => ({ ...p, designation: e.target.value }))} />
            <Select label="Status" options={[{ value: 'active', label: 'Active' }, { value: 'inactive', label: 'Inactive' }]} value={form.status} onChange={(e) => setForm(p => ({ ...p, status: e.target.value }))} />
          </div>

          <Input label="Assigned Subjects (comma separated)" value={form.subjects} onChange={(e) => setForm(p => ({ ...p, subjects: e.target.value }))} />

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowEditModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Update Profile</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

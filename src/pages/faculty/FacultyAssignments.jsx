import { useState } from 'react';
import { Plus, BookOpen, Users, Clock, Eye } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Tabs from '../../components/ui/Tabs';
import { mockFacultyAssignments } from '../../data/assignments';
import { formatDate } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

export default function FacultyAssignments() {
  const navigate = useNavigate();
  const [showCreate, setShowCreate] = useState(false);
  const [assignments, setAssignments] = useState(mockFacultyAssignments);
  const [activeTab, setActiveTab] = useState('published');
  const [form, setForm] = useState({ title: '', subject: '', description: '', instructions: '', dueDate: '', maxMarks: '' });
  const [creating, setCreating] = useState(false);

  const subjects = [
    { value: 'WE701', label: 'Web Engineering' },
    { value: 'ST704', label: 'Software Testing' }
  ];

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!form.title || !form.subject) { toast.error('Fill required fields'); return; }
    setCreating(true);
    await new Promise(r => setTimeout(r, 800));
    setAssignments(prev => [
      {
        id: 'FASN' + Date.now(),
        title: form.title,
        subject: form.subject,
        totalStudents: 42,
        submitted: 0,
        pending: 42,
        dueDate: form.dueDate,
        status: 'published',
        averageScore: null,
        maxMarks: parseInt(form.maxMarks) || 20
      },
      ...prev
    ]);
    setCreating(false);
    setShowCreate(false);
    setForm({ title: '', subject: '', description: '', instructions: '', dueDate: '', maxMarks: '' });
    toast.success('Assignment published successfully!');
  };

  const tabs = [
    { id: 'published', label: 'Published', count: assignments.filter(a => a.status === 'published').length },
    { id: 'draft', label: 'Drafts', count: 0 }
  ];

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Assignments</h2>
          <p className="text-sm text-slate-400">Create and manage assignments for your classes</p>
        </div>
        <Button icon={Plus} onClick={() => setShowCreate(true)}>Create Assignment</Button>
      </div>
      
      <Tabs tabs={tabs} defaultTab="published" onChange={setActiveTab} />
      
      <div className="space-y-4">
        {assignments.filter(a => a.status === activeTab || (activeTab === 'published' && a.status === 'published')).map((a) => (
          <Card key={a.id}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center shrink-0">
                <BookOpen size={18} className="text-indigo-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-slate-900 dark:text-white">{a.title}</p>
                <p className="text-sm text-slate-400">{a.subject} · Max Marks: {a.maxMarks}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-slate-500">
                  <span className="flex items-center gap-1"><Clock size={11} />Due: {formatDate(a.dueDate)}</span>
                  <span className="flex items-center gap-1"><Users size={11} />{a.submitted}/{a.totalStudents} submitted</span>
                </div>
              </div>
              <Button size="sm" icon={Eye} variant="secondary" onClick={() => navigate('/faculty/submissions')}>Review</Button>
            </div>
          </Card>
        ))}
        {assignments.filter(a => a.status === activeTab).length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <BookOpen size={36} className="mx-auto mb-3 opacity-30" />
            <p>No assignments found in this category</p>
          </div>
        )}
      </div>

      <Modal isOpen={showCreate} onClose={() => setShowCreate(false)} title="Create Assignment" size="lg"
        footer={<><Button variant="secondary" onClick={() => setShowCreate(false)}>Cancel</Button><Button loading={creating} onClick={handleCreate}>Publish Assignment</Button></>}
      >
        <form className="space-y-4" onSubmit={handleCreate}>
          <Input label="Assignment Title *" placeholder="e.g., Build a REST API" value={form.title} onChange={(e) => setForm(p => ({...p, title: e.target.value}))} />
          <Select label="Subject *" options={subjects} value={form.subject} onChange={(e) => setForm(p => ({...p, subject: e.target.value}))} />
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label>
            <textarea rows={3} placeholder="Describe the assignment..." value={form.description} onChange={(e) => setForm(p => ({...p, description: e.target.value}))} className="input-base" />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Instructions</label>
            <textarea rows={4} placeholder="Step-by-step instructions..." value={form.instructions} onChange={(e) => setForm(p => ({...p, instructions: e.target.value}))} className="input-base" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Input label="Due Date" type="date" value={form.dueDate} onChange={(e) => setForm(p => ({...p, dueDate: e.target.value}))} />
            <Input label="Maximum Marks" type="number" placeholder="25" value={form.maxMarks} onChange={(e) => setForm(p => ({...p, maxMarks: e.target.value}))} />
          </div>
        </form>
      </Modal>
    </div>
  );
}

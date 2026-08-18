import { useState } from 'react';
import { Megaphone, Plus, Bell, Trash2 } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Modal from '../../components/ui/Modal';
import { mockAdminNotifications } from '../../data/notifications';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState(mockAdminNotifications);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ title: '', category: 'system', message: '', type: 'info' });
  const [loading, setLoading] = useState(false);

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!form.title || !form.message) {
      toast.error('Title and message are required');
      return;
    }
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setNotifications(prev => [
      {
        id: Date.now(),
        title: form.title,
        category: form.category,
        message: form.message,
        type: form.type,
        timestamp: new Date().toISOString(),
        read: false
      },
      ...prev
    ]);
    setLoading(false);
    setShowAddModal(false);
    setForm({ title: '', category: 'system', message: '', type: 'info' });
    toast.success('System broadcast notice published!');
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success('Notification removed');
  };

  const catOptions = [
    { value: 'system', label: 'System Alert' },
    { value: 'announcements', label: 'Announcement' },
    { value: 'emergency', label: 'Emergency Notice' }
  ];

  const typeOptions = [
    { value: 'info', label: 'Information (Blue)' },
    { value: 'warning', label: 'Warning (Amber)' },
    { value: 'success', label: 'Success (Green)' }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Broadcast Announcements</h2>
          <p className="text-sm text-slate-400">Send system messages, warnings or exam schedules to all users.</p>
        </div>
        <Button icon={Plus} onClick={() => setShowAddModal(true)}>New Broadcast</Button>
      </div>

      <div className="space-y-4">
        {notifications.map((n) => (
          <Card key={n.id} className="relative group">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center shrink-0">
                <Megaphone size={18} className="text-indigo-650" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-900 dark:text-white text-sm">{n.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="primary" size="sm">{n.category}</Badge>
                      <span className="text-xs text-slate-400">{formatDate(n.timestamp)}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(n.id)}
                    className="p-1 rounded text-red-400 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">{n.message}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Broadcast Modal */}
      <Modal isOpen={showAddModal} onClose={() => setShowAddModal(false)} title="Publish Broadcast Notice" size="md">
        <form onSubmit={handleAdd} className="space-y-4">
          <Input label="Title *" placeholder="e.g. End Semester Exam Fee submission date extended" value={form.title} onChange={(e) => setForm(p => ({ ...p, title: e.target.value }))} />
          
          <div className="grid grid-cols-2 gap-3">
            <Select label="Category" options={catOptions} value={form.category} onChange={(e) => setForm(p => ({ ...p, category: e.target.value }))} />
            <Select label="Visual Alert Type" options={typeOptions} value={form.type} onChange={(e) => setForm(p => ({ ...p, type: e.target.value }))} />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Announcement Details *</label>
            <textarea rows={4} placeholder="Type detailed message here..." value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} className="input-base" />
          </div>

          <div className="flex justify-end gap-2 pt-3">
            <Button variant="secondary" type="button" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button type="submit" loading={loading}>Broadcast Notice</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

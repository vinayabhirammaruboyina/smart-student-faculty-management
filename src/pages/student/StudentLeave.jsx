import { useState } from 'react';
import { Plus, FileText, Upload, X } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import { mockLeaveApplications } from '../../data/leave';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const LEAVE_TYPES = [{ value: 'Medical Leave', label: 'Medical Leave' }, { value: 'Personal Leave', label: 'Personal Leave' }, { value: 'Family Emergency', label: 'Family Emergency' }, { value: 'Other', label: 'Other' }];
const STATUS_BADGE = { pending: 'warning', approved: 'success', rejected: 'danger' };

export default function StudentLeave() {
  const [showForm, setShowForm] = useState(false);
  const [applications, setApplications] = useState(mockLeaveApplications);
  const [form, setForm] = useState({ type: '', fromDate: '', toDate: '', reason: '', description: '', document: null });
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => { const e = {}; if (!form.type) e.type = 'Required'; if (!form.fromDate) e.fromDate = 'Required'; if (!form.toDate) e.toDate = 'Required'; if (!form.reason) e.reason = 'Required'; setErrors(e); return Object.keys(e).length === 0; };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    await new Promise(r => setTimeout(r, 1000));
    const days = Math.max(1, Math.ceil((new Date(form.toDate) - new Date(form.fromDate)) / (1000 * 60 * 60 * 24)) + 1);
    setApplications(prev => [{ id: `LVE${Date.now()}`, studentId: 'STU-001', studentName: 'Vinay Abhiram', type: form.type, fromDate: form.fromDate, toDate: form.toDate, days, reason: form.reason, description: form.description, status: 'pending', approvedBy: null, appliedOn: new Date().toISOString().split('T')[0], document: form.document?.name || null }, ...prev]);
    setSubmitting(false); setShowForm(false); setForm({ type: '', fromDate: '', toDate: '', reason: '', description: '', document: null });
    toast.success('Leave application submitted successfully!');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Leave Applications</h2><p className="text-sm text-slate-400">Apply and track your leave requests</p></div>
        <Button icon={Plus} onClick={() => setShowForm(true)}>Apply for Leave</Button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[{ label: 'Pending', count: applications.filter(a => a.status === 'pending').length, colorClass: 'text-amber-600 dark:text-amber-400' }, { label: 'Approved', count: applications.filter(a => a.status === 'approved').length, colorClass: 'text-emerald-600 dark:text-emerald-400' }, { label: 'Rejected', count: applications.filter(a => a.status === 'rejected').length, colorClass: 'text-red-600 dark:text-red-400' }].map((s) => (
          <Card key={s.label} className="text-center"><p className={`text-2xl font-bold ${s.colorClass}`}>{s.count}</p><p className="text-sm text-slate-400">{s.label}</p></Card>
        ))}
      </div>
      <div className="space-y-4">
        {applications.map((app) => (
          <Card key={app.id}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-slate-100 dark:bg-slate-700 rounded-xl flex items-center justify-center shrink-0"><FileText size={18} className="text-slate-500" /></div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">{app.type}</p>
                  <p className="text-sm text-slate-500 mt-0.5">{formatDate(app.fromDate)} → {formatDate(app.toDate)} · {app.days} day{app.days > 1 ? 's' : ''}</p>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">{app.reason}</p>
                  <p className="text-xs text-slate-400 mt-1">Applied: {formatDate(app.appliedOn)}</p>
                </div>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge variant={STATUS_BADGE[app.status]}>{app.status.charAt(0).toUpperCase() + app.status.slice(1)}</Badge>
                {app.approvedBy && <p className="text-xs text-slate-400">By: {app.approvedBy}</p>}
              </div>
            </div>
          </Card>
        ))}
      </div>
      <Modal isOpen={showForm} onClose={() => setShowForm(false)} title="Apply for Leave" size="md"
        footer={<><Button variant="secondary" onClick={() => setShowForm(false)}>Cancel</Button><Button loading={submitting} onClick={handleSubmit}>Submit Application</Button></>}
      >
        <form className="space-y-4">
          <Select label="Leave Type" options={LEAVE_TYPES} value={form.type} onChange={(e) => setForm(p => ({...p, type: e.target.value}))} error={errors.type} />
          <div className="grid grid-cols-2 gap-3">
            <Input label="From Date" type="date" value={form.fromDate} onChange={(e) => setForm(p => ({...p, fromDate: e.target.value}))} error={errors.fromDate} />
            <Input label="To Date" type="date" value={form.toDate} onChange={(e) => setForm(p => ({...p, toDate: e.target.value}))} error={errors.toDate} />
          </div>
          <Input label="Reason" placeholder="e.g., Medical appointment" value={form.reason} onChange={(e) => setForm(p => ({...p, reason: e.target.value}))} error={errors.reason} />
          <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Description</label><textarea rows={3} placeholder="Briefly explain your reason..." value={form.description} onChange={(e) => setForm(p => ({...p, description: e.target.value}))} className="input-base" /></div>
          <div><label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Medical Document (optional)</label>
            <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-5 text-center cursor-pointer hover:border-indigo-300 transition-colors" onClick={() => document.getElementById('leave-doc')?.click()}>
              <Upload size={24} className="mx-auto mb-2 text-slate-300" />
              {form.document ? <span className="text-sm font-medium text-indigo-600">{form.document.name}</span> : <p className="text-sm text-slate-400">Click to upload medical certificate</p>}
              <input id="leave-doc" type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setForm(p => ({...p, document: e.target.files[0]}))} />
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}

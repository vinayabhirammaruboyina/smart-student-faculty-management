import { useState } from 'react';
import { FileText, Check, X, Eye, Search } from 'lucide-react';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import Modal from '../../components/ui/Modal';
import Input from '../../components/ui/Input';
import ConfirmDialog from '../../components/ui/ConfirmDialog';
import { mockLeaveApplications } from '../../data/leave';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const STATUS_BADGE = { pending: 'warning', approved: 'success', rejected: 'danger' };

export default function AdminLeave() {
  const [requests, setRequests] = useState(mockLeaveApplications);
  const [search, setSearch] = useState('');
  const [viewDoc, setViewDoc] = useState(null);
  const [confirmData, setConfirmData] = useState(null);
  const [processing, setProcessing] = useState(false);

  const filtered = requests.filter(r => 
    r.studentName.toLowerCase().includes(search.toLowerCase()) || 
    r.type.toLowerCase().includes(search.toLowerCase()) || 
    r.reason.toLowerCase().includes(search.toLowerCase())
  );

  const handleAction = async (id, action) => {
    setProcessing(true);
    await new Promise(r => setTimeout(r, 800));
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: action, approvedBy: 'System Administrator' } : r));
    setProcessing(false);
    setConfirmData(null);
    toast.success(`Leave request ${action} successfully!`);
  };

  const stats = [
    { label: 'Pending', count: requests.filter(r => r.status === 'pending').length, colorClass: 'text-amber-600 dark:text-amber-400' },
    { label: 'Approved', count: requests.filter(r => r.status === 'approved').length, colorClass: 'text-emerald-600 dark:text-emerald-400' },
    { label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length, colorClass: 'text-red-650 dark:text-red-400' }
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Leave Applications Registry</h2>
        <p className="text-sm text-slate-400">Monitor and manage all leave requests in the system.</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {stats.map((s) => (
          <Card key={s.label} className="text-center">
            <p className={`text-2xl font-bold ${s.colorClass}`}>{s.count}</p>
            <p className="text-sm text-slate-400">{s.label}</p>
          </Card>
        ))}
      </div>

      <Card>
        <Input placeholder="Search applications by student name or reason..." value={search} onChange={(e) => setSearch(e.target.value)} icon={Search} />
      </Card>

      <div className="space-y-4">
        {filtered.map((req) => (
          <Card key={req.id}>
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <Avatar name={req.studentName} size="md" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between flex-wrap gap-2">
                  <div>
                    <p className="font-semibold text-slate-900 dark:text-white">{req.studentName}</p>
                    <p className="text-xs text-slate-400">ID: {req.studentId}</p>
                  </div>
                  <Badge variant={STATUS_BADGE[req.status]}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</Badge>
                </div>
                <div className="mt-2 space-y-1">
                  <p className="text-sm text-slate-650 dark:text-slate-305"><strong>{req.type}</strong> · {formatDate(req.fromDate)} — {formatDate(req.toDate)} ({req.days} day{req.days > 1 ? 's' : ''})</p>
                  <p className="text-sm text-slate-500">{req.description}</p>
                  <p className="text-xs text-slate-400 font-medium">Applied on: {formatDate(req.appliedOn)}</p>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {req.document && (
                    <Button size="xs" variant="secondary" icon={Eye} onClick={() => setViewDoc(req)}>View Certificate</Button>
                  )}
                  {req.status === 'pending' && (
                    <>
                      <Button size="xs" variant="success" icon={Check} onClick={() => setConfirmData({ id: req.id, action: 'approved', name: req.studentName })}>Approve</Button>
                      <Button size="xs" variant="danger" icon={X} onClick={() => setConfirmData({ id: req.id, action: 'rejected', name: req.studentName })}>Reject</Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Document View Modal */}
      <Modal isOpen={!!viewDoc} onClose={() => setViewDoc(null)} title="Attachment Document" size="md">
        <div className="text-center py-8">
          <div className="mx-auto w-24 h-24 bg-red-50 dark:bg-red-900/20 rounded-2xl flex items-center justify-center mb-4">
            <FileText size={40} className="text-red-500" />
          </div>
          <p className="font-semibold text-slate-800 dark:text-white">{viewDoc?.document}</p>
          <p className="text-sm text-slate-400 mt-2">Leave attachments are simulated. No live files are stored currently.</p>
        </div>
      </Modal>

      {/* Confirm Action Dialog */}
      <ConfirmDialog
        isOpen={!!confirmData}
        onClose={() => setConfirmData(null)}
        onConfirm={() => handleAction(confirmData?.id, confirmData?.action)}
        title={`${confirmData?.action === 'approved' ? 'Approve' : 'Reject'} Leave Request?`}
        message={`Confirm if you want to ${confirmData?.action === 'approved' ? 'approve' : 'reject'} this request for student ${confirmData?.name}.`}
        confirmLabel={confirmData?.action === 'approved' ? 'Approve' : 'Reject'}
        variant={confirmData?.action === 'approved' ? 'warning' : 'danger'}
        loading={processing}
      />
    </div>
  );
}

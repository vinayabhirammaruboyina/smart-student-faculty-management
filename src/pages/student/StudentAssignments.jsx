import { useState } from 'react';
import { BookOpen, Upload, Eye, Clock, CheckCircle, X } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Tabs from '../../components/ui/Tabs';
import ProgressBar from '../../components/ui/ProgressBar';
import FileUploadProgress from '../../components/modules/FileUploadProgress';
import { mockAssignments } from '../../data/assignments';
import { formatDate } from '../../utils/helpers';
import toast from 'react-hot-toast';

const STATUS_BADGE = { pending: 'warning', submitted: 'success', overdue: 'danger' };

export default function StudentAssignments() {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadDone, setUploadDone] = useState(false);
  const [assignments, setAssignments] = useState(mockAssignments);

  const tabs = [
    { id: 'all', label: 'All', count: assignments.length },
    { id: 'pending', label: 'Pending', count: assignments.filter(a => a.status === 'pending').length },
    { id: 'submitted', label: 'Submitted', count: assignments.filter(a => a.status === 'submitted').length },
    { id: 'overdue', label: 'Overdue', count: assignments.filter(a => a.status === 'overdue').length },
  ];

  const filtered = activeTab === 'all' ? assignments : assignments.filter(a => a.status === activeTab);

  const handleSubmission = (id, meta) => {
    setAssignments(prev => prev.map(a => a.id === id ? { ...a, status: 'submitted', submittedAt: new Date().toISOString() } : a));
    setUploadDone(true);
    toast.success('Assignment submitted successfully!');
  };

  const closeModal = () => { setSelectedAssignment(null); setUploadProgress(0); setUploading(false); setUploadDone(false); };

  return (
    <div className="space-y-6 max-w-5xl">
      <div><h2 className="text-xl font-bold text-slate-900 dark:text-white">Assignments</h2><p className="text-sm text-slate-400">Manage and submit your assignments</p></div>
      <Tabs tabs={tabs} defaultTab="all" onChange={setActiveTab} />
      <div className="space-y-4">
        {filtered.map((a) => (
          <Card key={a.id} className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/[0.08] shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-200 hover:shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-start gap-4">
              <div className="w-10 h-10 bg-indigo-50 dark:bg-indigo-900/20 rounded-xl flex items-center justify-center shrink-0"><BookOpen size={18} className="text-indigo-600" /></div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 flex-wrap">
                  <div><p className="font-semibold text-slate-900 dark:text-white">{a.title}</p><p className="text-sm text-slate-400">{a.subject} · {a.faculty}</p></div>
                  <Badge variant={STATUS_BADGE[a.status]}>{a.status}</Badge>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400 mt-2 line-clamp-2">{a.description}</p>
                <div className="flex flex-wrap gap-4 mt-3">
                  <span className="flex items-center gap-1.5 text-xs text-slate-500"><Clock size={13} /> Due: <strong>{formatDate(a.dueDate)}</strong></span>
                  <span className="text-xs text-slate-500">Max Marks: <strong>{a.maxMarks}</strong></span>
                  {a.obtainedMarks !== null && <span className="text-xs text-emerald-600 font-semibold">Score: {a.obtainedMarks}/{a.maxMarks}</span>}
                </div>
              </div>
              <div className="flex gap-2 shrink-0">
                <Button variant="secondary" size="sm" icon={Eye} onClick={() => { setSelectedAssignment(a); setUploadDone(false); }}>View</Button>
                {a.status === 'pending' && <Button size="sm" icon={Upload} onClick={() => { setSelectedAssignment(a); setUploadDone(false); }}>Submit</Button>}
              </div>
            </div>
          </Card>
        ))}
        {filtered.length === 0 && <div className="text-center py-16 text-slate-400"><BookOpen size={40} className="mx-auto mb-3 opacity-30" /><p className="font-medium">No assignments found</p></div>}
      </div>

      <Modal isOpen={!!selectedAssignment} onClose={closeModal} title={selectedAssignment?.title} size="lg">
        {selectedAssignment && (
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div><p className="text-slate-400">Subject</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5">{selectedAssignment.subject}</p></div>
              <div><p className="text-slate-400">Faculty</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5">{selectedAssignment.faculty}</p></div>
              <div><p className="text-slate-400">Due Date</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5">{formatDate(selectedAssignment.dueDate)}</p></div>
              <div><p className="text-slate-400">Max Marks</p><p className="font-semibold text-slate-800 dark:text-white mt-0.5">{selectedAssignment.maxMarks}</p></div>
            </div>
            <div><p className="text-sm text-slate-400 mb-1">Description</p><p className="text-sm text-slate-700 dark:text-slate-300">{selectedAssignment.description}</p></div>
            <div><p className="text-sm text-slate-400 mb-1">Instructions</p><pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap bg-slate-50 dark:bg-[#111827] rounded-lg p-3 border border-slate-200 dark:border-white/[0.08]">{selectedAssignment.instructions}</pre></div>
            {selectedAssignment.status === 'submitted' && (
              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4">
                <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-300">✓ Already Submitted</p>
                {selectedAssignment.obtainedMarks !== null && <p className="text-sm font-bold text-emerald-700 dark:text-emerald-300 mt-1">Score: {selectedAssignment.obtainedMarks}/{selectedAssignment.maxMarks}</p>}
                {selectedAssignment.feedback && <p className="text-xs text-emerald-600 mt-1 italic">"{selectedAssignment.feedback}"</p>}
              </div>
            )}
            {selectedAssignment.status !== 'submitted' && (
              <div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">Submit Assignment</p>
                {!uploadDone ? (
                  <FileUploadProgress acceptedTypes=".pdf,.zip" maxSizeMB={10} onUploadComplete={(meta) => handleSubmission(selectedAssignment.id, meta)} />
                ) : (
                  <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-xl p-4 text-center">
                    <CheckCircle size={36} className="text-emerald-500 mx-auto mb-2" />
                    <p className="font-semibold text-emerald-800 dark:text-emerald-300">Submitted Successfully!</p>
                    <p className="text-xs text-emerald-600 mt-1">{new Date().toLocaleString()}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </Modal>
    </div>
  );
}

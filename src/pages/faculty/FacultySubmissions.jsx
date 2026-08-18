import { useState } from 'react';
import { Eye, Star, FileText } from 'lucide-react';
import Card, { CardHeader, CardTitle } from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import Avatar from '../../components/ui/Avatar';
import { mockSubmissions, mockFacultyAssignments } from '../../data/assignments';
import { formatDateTime } from '../../utils/helpers';
import toast from 'react-hot-toast';

const STATUS_BADGE = { pending: 'warning', reviewed: 'success' };

export default function FacultySubmissions() {
  const [selected, setSelected] = useState(null);
  const [submissions, setSubmissions] = useState(mockSubmissions);
  const [marks, setMarks] = useState('');
  const [feedback, setFeedback] = useState('');
  const [grading, setGrading] = useState(false);
  const assignment = mockFacultyAssignments[0];

  const handleGrade = async () => {
    if (!marks) { toast.error('Enter marks'); return; }
    setGrading(true);
    await new Promise(r => setTimeout(r, 800));
    setSubmissions(prev => prev.map(s => s.id === selected.id ? { ...s, status: 'reviewed', marks: parseInt(marks), feedback } : s));
    setGrading(false);
    setSelected(null);
    setMarks('');
    setFeedback('');
    toast.success('Grade saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Submission Review</h2>
        <p className="text-sm text-slate-400">Review and grade student submissions</p>
      </div>
      
      <Card>
        <CardHeader>
          <div>
            <CardTitle>{assignment.title}</CardTitle>
            <p className="text-sm text-slate-400 mt-0.5">{assignment.subject} · Max Marks: {assignment.maxMarks}</p>
          </div>
          <div className="flex gap-4 text-sm">
            <span className="text-emerald-600 font-semibold">{submissions.filter(s => s.status === 'reviewed').length} graded</span>
            <span className="text-amber-600 font-semibold">{submissions.filter(s => s.status === 'pending').length} pending</span>
          </div>
        </CardHeader>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                {['Student', 'Submission', 'Submitted At', 'Status', 'Marks', 'Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {submissions.map((sub) => (
                <tr key={sub.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={sub.studentName} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{sub.studentName}</p>
                        <p className="text-xs text-slate-400">{sub.enrollmentNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 text-sm text-indigo-600 dark:text-indigo-400">
                      <FileText size={13} />{sub.filename}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-500">{formatDateTime(sub.submittedAt)}</td>
                  <td className="px-4 py-3"><Badge variant={STATUS_BADGE[sub.status]}>{sub.status}</Badge></td>
                  <td className="px-4 py-3">
                    {sub.marks !== null ? <span className="font-bold text-slate-800 dark:text-white">{sub.marks}/{assignment.maxMarks}</span> : <span className="text-slate-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <Button size="xs" icon={Eye} onClick={() => { setSelected(sub); setMarks(sub.marks?.toString() || ''); setFeedback(sub.feedback || ''); }}>Review</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal isOpen={!!selected} onClose={() => setSelected(null)} title={`Review: ${selected?.studentName}`} size="md"
        footer={<><Button variant="secondary" onClick={() => setSelected(null)}>Close</Button><Button loading={grading} icon={Star} onClick={handleGrade}>Save Grade</Button></>}
      >
        {selected && (
          <div className="space-y-5">
            <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 mb-2">
                <FileText size={16} />
                <span className="text-sm font-medium">{selected.filename}</span>
              </div>
              <p className="text-xs text-slate-400">Submitted: {formatDateTime(selected.submittedAt)}</p>
              <div className="mt-3 flex items-center justify-center h-32 bg-slate-100 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-400">📄 File preview not available in demo mode</p>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Marks (out of {assignment.maxMarks})</label>
              <input type="number" min="0" max={assignment.maxMarks} value={marks} onChange={(e) => setMarks(e.target.value)} placeholder="Enter marks" className="input-base" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">Feedback</label>
              <textarea rows={3} value={feedback} onChange={(e) => setFeedback(e.target.value)} placeholder="Write feedback for the student..." className="input-base" />
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

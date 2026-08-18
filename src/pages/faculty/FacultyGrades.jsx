import { useState } from 'react';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Avatar from '../../components/ui/Avatar';
import { mockStudents } from '../../data/students';
import { Save } from 'lucide-react';
import toast from 'react-hot-toast';

export default function FacultyGrades() {
  const [grades, setGrades] = useState({});
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800));
    setSaving(false);
    toast.success('Grades saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Grade Management</h2>
          <p className="text-sm text-slate-400">Enter and manage internal marks for students</p>
        </div>
        <Button icon={Save} loading={saving} onClick={handleSave}>Save Grades</Button>
      </div>
      
      <Card padding="none">
        <div className="p-4 border-b border-slate-100 dark:border-slate-700">
          <h3 className="font-semibold text-slate-800 dark:text-white">Web Engineering — Internal Assessment</h3>
          <p className="text-sm text-slate-400">Semester VII · BCA Section A</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900/50">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Student</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Internal (30)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Assignment (20)</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {mockStudents.slice(0, 8).map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <Avatar name={s.name} size="sm" />
                      <div>
                        <p className="text-sm font-medium text-slate-800 dark:text-white">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.enrollmentNo}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      placeholder="—"
                      value={grades[s.id + '_internal'] || ''}
                      onChange={(e) => setGrades(p => ({...p, [s.id + '_internal']: e.target.value}))}
                      className="w-16 px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded-lg text-center bg-white dark:bg-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      max="20"
                      placeholder="—"
                      value={grades[s.id + '_assign'] || ''}
                      onChange={(e) => setGrades(p => ({...p, [s.id + '_assign']: e.target.value}))}
                      className="w-16 px-2 py-1 text-sm border border-slate-200 dark:border-slate-600 rounded-lg text-center bg-white dark:bg-slate-800 focus:outline-none focus:border-indigo-500"
                    />
                  </td>
                  <td className="px-4 py-3">
                    <span className="font-semibold text-slate-800 dark:text-white">
                      {(parseInt(grades[s.id + '_internal'] || 0) + parseInt(grades[s.id + '_assign'] || 0)) || '—'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

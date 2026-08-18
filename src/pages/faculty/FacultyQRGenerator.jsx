import { useState } from 'react';
import { QrCode } from 'lucide-react';
import QRGeneratorWidget from '../../components/modules/QRGeneratorWidget';
import { mockSubjects } from '../../data/users';

export default function FacultyQRGenerator() {
  const [selectedSubject, setSelectedSubject] = useState(mockSubjects[0]);

  return (
    <div className="page-enter p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">QR Attendance Generator</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Generate timed QR codes for student attendance verification</p>
      </div>

      {/* Subject Selector */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/[0.08] rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.02)]">
        <label className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-2 block">Select Subject</label>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {mockSubjects.filter(s => s.faculty === 'Dr. Priya Sharma').map(subject => (
            <button
              key={subject.id}
              onClick={() => setSelectedSubject(subject)}
              className={`px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                selectedSubject?.id === subject.id
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-white/[0.05] text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/[0.08]'
              }`}
            >
              {subject.name}
            </button>
          ))}
        </div>
      </div>

      {/* QR Generator Widget */}
      <div className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/[0.08] rounded-xl p-6 shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.02)]">
        <QRGeneratorWidget
          subject={selectedSubject}
          room="A-204"
        />
      </div>
    </div>
  );
}

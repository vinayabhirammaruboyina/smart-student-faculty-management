import { useState } from 'react';
import { QrCode, CheckCircle2, Clock, MapPin } from 'lucide-react';
import QRScannerModal from '../../components/modules/QRScannerModal';
import { todaySchedule } from '../../data/timetable';

export default function StudentQRScanner() {
  const [scannerOpen, setScannerOpen] = useState(false);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [markedClasses, setMarkedClasses] = useState([]);

  const handleScanSuccess = (result) => {
    if (selectedSubject) {
      setMarkedClasses(prev => [...prev, selectedSubject.code]);
    }
    setTimeout(() => setScannerOpen(false), 2000);
  };

  return (
    <div className="page-enter p-4 md:p-6 space-y-6">
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">QR Attendance</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Scan QR codes to mark your attendance for today's classes</p>
      </div>

      <div className="grid gap-3">
        {todaySchedule.map((slot) => {
          const isMarked = markedClasses.includes(slot.code);
          return (
            <div
              key={slot.code + slot.time}
              className="bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/[0.08] rounded-xl p-4 shadow-[0_1px_3px_0_rgba(0,0,0,0.05),0_1px_2px_0_rgba(0,0,0,0.02)] transition-all duration-200"
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-900 dark:text-slate-50 text-sm">{slot.subject}</h3>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/[0.05] text-slate-500 dark:text-slate-400">{slot.code}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1"><Clock size={12} />{slot.time}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} />{slot.room}</span>
                    <span>{slot.faculty}</span>
                  </div>
                </div>
                {isMarked ? (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 text-sm font-medium">
                    <CheckCircle2 size={14} />
                    Marked
                  </div>
                ) : slot.status === 'completed' ? (
                  <span className="text-xs text-slate-400 dark:text-slate-500 px-3 py-1.5">Class ended</span>
                ) : (
                  <button
                    onClick={() => { setSelectedSubject(slot); setScannerOpen(true); }}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium transition-all duration-200 shadow-sm"
                  >
                    <QrCode size={14} />
                    Scan QR
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <QRScannerModal
        isOpen={scannerOpen}
        onClose={() => setScannerOpen(false)}
        onScanSuccess={handleScanSuccess}
        subject={selectedSubject}
      />
    </div>
  );
}

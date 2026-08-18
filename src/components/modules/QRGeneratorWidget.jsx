import { useState, useEffect, useCallback, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { RefreshCw, Clock, Users, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';

const TOTAL_STUDENTS = 42;
const EXPIRY_SECONDS = 15;

export default function QRGeneratorWidget({ subject, room = 'A-204', onSessionComplete }) {
  const [isActive, setIsActive] = useState(false);
  const [seconds, setSeconds] = useState(EXPIRY_SECONDS);
  const [isExpired, setIsExpired] = useState(false);
  const [scannedCount, setScannedCount] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [scanLog, setScanLog] = useState([]);
  const intervalRef = useRef(null);
  const scanIntervalRef = useRef(null);

  const studentNames = [
    'VinayAbhiram M.', 'Rahul P.', 'Arjun S.', 'Priya N.', 'Sneha J.',
    'Kiran K.', 'Meera D.', 'Rohan S.', 'Anjali M.', 'Dev P.',
    'Riya S.', 'Aditya K.', 'Neha V.', 'Sahil G.', 'Pooja T.',
  ];

  const generateSession = useCallback(() => {
    const ts = Math.floor(Date.now() / 1000);
    const code = subject?.code || 'WE701';
    return `SESSION_ID:${code}_ROOM_${room.replace('-', '')}_TS${ts}`;
  }, [subject, room]);

  const startSession = useCallback(() => {
    setSessionId(generateSession());
    setSeconds(EXPIRY_SECONDS);
    setIsExpired(false);
    setIsActive(true);
    setScannedCount(0);
    setScanLog([]);
  }, [generateSession]);

  const refreshToken = useCallback(() => {
    setSessionId(generateSession());
    setSeconds(EXPIRY_SECONDS);
    setIsExpired(false);
    toast.success('Fresh QR token generated');
  }, [generateSession]);

  // Countdown timer
  useEffect(() => {
    if (!isActive || isExpired) return;
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          setIsExpired(true);
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [isActive, isExpired, sessionId]);

  // Simulate student scans
  useEffect(() => {
    if (!isActive || isExpired) return;
    scanIntervalRef.current = setInterval(() => {
      setScannedCount(prev => {
        if (prev >= TOTAL_STUDENTS) {
          clearInterval(scanIntervalRef.current);
          return prev;
        }
        const newCount = prev + 1;
        const name = studentNames[Math.min(newCount - 1, studentNames.length - 1)];
        setScanLog(log => [{ name, time: new Date().toLocaleTimeString(), id: newCount }, ...log].slice(0, 10));
        return newCount;
      });
    }, 800 + Math.random() * 1200);
    return () => clearInterval(scanIntervalRef.current);
  }, [isActive, isExpired, sessionId]);

  const progress = seconds / EXPIRY_SECONDS;
  const circumference = 2 * Math.PI * 54; // radius = 54
  const strokeDashoffset = circumference * (1 - progress);

  if (!isActive) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-20 h-20 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center mb-6">
          <Users className="w-10 h-10 text-indigo-500" />
        </div>
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-50 mb-2">
          Generate QR Attendance
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-xs mb-6">
          Generate a timed QR code for {subject?.name || 'your class'}. Students scan to mark attendance.
        </p>
        <button
          onClick={startSession}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm"
        >
          Start QR Session
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* QR Code with Countdown Ring */}
      <div className="flex flex-col items-center">
        <div className="relative">
          {/* Circular countdown ring */}
          <svg className="w-40 h-40 -rotate-90" viewBox="0 0 120 120">
            <circle cx="60" cy="60" r="54" fill="none" stroke="currentColor"
              className="text-slate-200 dark:text-white/[0.05]" strokeWidth="4" />
            <motion.circle
              cx="60" cy="60" r="54" fill="none"
              stroke={isExpired ? '#F43F5E' : seconds <= 5 ? '#F59E0B' : '#4F46E5'}
              strokeWidth="4" strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{ strokeDashoffset }}
              transition={{ duration: 0.5 }}
            />
          </svg>

          {/* QR Code centered in ring */}
          <div className="absolute inset-0 flex items-center justify-center">
            {isExpired ? (
              <div className="flex flex-col items-center">
                <AlertTriangle className="w-8 h-8 text-rose-500 mb-1" />
                <span className="text-xs text-rose-500 font-medium">Expired</span>
              </div>
            ) : (
              <QRCodeSVG
                value={sessionId}
                size={88}
                level="M"
                bgColor="transparent"
                fgColor={document.documentElement.classList.contains('dark') ? '#F8FAFC' : '#0F172A'}
              />
            )}
          </div>
        </div>

        {/* Timer display */}
        <div className="mt-4 flex items-center gap-2">
          <Clock size={14} className={isExpired ? 'text-rose-500' : 'text-slate-400'} />
          <span className={`text-2xl font-bold tabular-nums ${
            isExpired ? 'text-rose-500' : seconds <= 5 ? 'text-amber-500' : 'text-slate-900 dark:text-slate-50'
          }`}>
            {isExpired ? '0:00' : `0:${seconds.toString().padStart(2, '0')}`}
          </span>
        </div>

        {/* Status badge */}
        <div className={`mt-2 px-3 py-1 rounded-full text-xs font-medium ${
          isExpired
            ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/30 dark:text-rose-400'
            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400'
        }`}>
          {isExpired ? 'Token Expired' : '● Active'}
        </div>
      </div>

      {/* Refresh button */}
      {isExpired && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center"
        >
          <button
            onClick={refreshToken}
            className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition-all duration-200 shadow-sm"
          >
            <RefreshCw size={16} />
            Generate Fresh Token
          </button>
        </motion.div>
      )}

      {/* Scan tracker */}
      <div className="bg-slate-50 dark:bg-white/[0.03] rounded-xl p-4 border border-slate-200 dark:border-white/[0.08]">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Student Scans</span>
          <span className="text-sm font-bold text-slate-900 dark:text-slate-50 tabular-nums">
            {scannedCount}/{TOTAL_STUDENTS} Marked
          </span>
        </div>
        <div className="w-full h-2 bg-slate-200 dark:bg-white/[0.05] rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-emerald-500 rounded-full"
            animate={{ width: `${(scannedCount / TOTAL_STUDENTS) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        {/* Live scan feed */}
        {scanLog.length > 0 && (
          <div className="mt-3 space-y-1 max-h-32 overflow-y-auto">
            {scanLog.slice(0, 5).map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex items-center justify-between text-xs py-1"
              >
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={12} className="text-emerald-500" />
                  <span className="text-slate-600 dark:text-slate-400">{entry.name}</span>
                </div>
                <span className="text-slate-400 dark:text-slate-500 tabular-nums">{entry.time}</span>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

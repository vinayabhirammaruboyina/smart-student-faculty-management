import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Zap, ZapOff, Camera, CheckCircle2, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function QRScannerModal({ isOpen, onClose, onScanSuccess, subject }) {
  const [scanning, setScanning] = useState(true);
  const [flashOn, setFlashOn] = useState(false);
  const [scanResult, setScanResult] = useState(null); // null | 'scanning' | 'success' | 'error'
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!isOpen) {
      setScanning(true);
      setScanResult(null);
      setProgress(0);
      return;
    }

    // Simulate scanning progress
    const scanTimer = setTimeout(() => {
      setScanResult('success');
      setScanning(false);
      // Play success sound simulation
      try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioCtx.createOscillator();
        const gainNode = audioCtx.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        oscillator.frequency.value = 880;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.1;
        oscillator.start();
        setTimeout(() => { oscillator.stop(); audioCtx.close(); }, 150);
      } catch (e) { /* Audio not supported */ }

      toast.success('QR Code scanned successfully!');
      onScanSuccess?.({
        sessionId: `SESSION_${subject?.code || 'WE701'}_ROOM_A204_TS${Date.now()}`,
        timestamp: new Date().toISOString(),
        method: 'QR_SCAN',
      });
    }, 3000 + Math.random() * 2000); // 3-5 second random scan time

    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 95) return prev;
        return prev + Math.random() * 15;
      });
    }, 300);

    return () => {
      clearTimeout(scanTimer);
      clearInterval(progressInterval);
    };
  }, [isOpen, onScanSuccess, subject]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

        {/* Modal */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-md bg-white dark:bg-[#111827] rounded-2xl overflow-hidden shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-slate-200 dark:border-white/[0.08]"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200 dark:border-white/[0.08]">
            <div className="flex items-center gap-2">
              <Camera className="w-5 h-5 text-indigo-500" />
              <h3 className="text-base font-semibold text-slate-900 dark:text-slate-50">
                Scan QR Code
              </h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFlashOn(!flashOn)}
                className={`p-2 rounded-xl transition-all duration-200 ${
                  flashOn
                    ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-400'
                    : 'bg-slate-100 text-slate-400 dark:bg-white/[0.05] dark:text-slate-500'
                }`}
              >
                {flashOn ? <Zap size={16} /> : <ZapOff size={16} />}
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-100 text-slate-400 hover:bg-slate-200 dark:bg-white/[0.05] dark:text-slate-500 dark:hover:bg-white/[0.1] transition-all duration-200"
              >
                <X size={16} />
              </button>
            </div>
          </div>

          {/* Scanner Viewport */}
          <div className="relative aspect-square bg-slate-900 overflow-hidden">
            {/* Simulated camera feed */}
            <div className={`absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 ${
              flashOn ? 'brightness-125' : ''
            }`}>
              {/* Subtle noise texture */}
              <div className="absolute inset-0 opacity-20" style={{
                backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 50%)',
              }} />
            </div>

            {scanResult === 'success' ? (
              /* Success State */
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', damping: 15, stiffness: 200 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Green ring reveal */}
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.4 }}
                  className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.3, type: 'spring', damping: 12 }}
                    className="w-16 h-16 rounded-full bg-emerald-500 flex items-center justify-center"
                  >
                    <CheckCircle2 className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
                <motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="mt-4 text-white font-semibold text-lg"
                >
                  Attendance Verified!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="mt-1 text-slate-400 text-sm"
                >
                  {subject?.name || 'Web Engineering'} • {new Date().toLocaleTimeString()}
                </motion.p>
              </motion.div>
            ) : (
              /* Scanning State */
              <>
                {/* Corner guides */}
                <div className="absolute inset-12">
                  {/* Top-left */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-indigo-400 rounded-tl-lg" />
                  {/* Top-right */}
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-indigo-400 rounded-tr-lg" />
                  {/* Bottom-left */}
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-indigo-400 rounded-bl-lg" />
                  {/* Bottom-right */}
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-indigo-400 rounded-br-lg" />
                </div>

                {/* Scanning line animation */}
                <div className="absolute inset-12">
                  <div
                    className="absolute left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400 to-transparent animate-scan"
                    style={{ boxShadow: '0 0 15px 3px rgba(99, 102, 241, 0.3)' }}
                  />
                </div>

                {/* Target reticle */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 border border-indigo-300/50 rounded-sm rotate-45" />
                </div>

                {/* Scanning indicator */}
                <div className="absolute bottom-6 left-0 right-0 flex flex-col items-center">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Scanning for QR code...
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-4 border-t border-slate-200 dark:border-white/[0.08]">
            {scanResult === 'success' ? (
              <button
                onClick={onClose}
                className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white font-medium rounded-xl transition-all duration-200"
              >
                Done
              </button>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Detecting...</span>
                  <span>{Math.min(Math.round(progress), 95)}%</span>
                </div>
                <div className="w-full h-1.5 bg-slate-200 dark:bg-white/[0.05] rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500 rounded-full"
                    animate={{ width: `${Math.min(progress, 95)}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-xs text-center text-slate-500 dark:text-slate-400">
                  Point your camera at the QR code displayed by your instructor
                </p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

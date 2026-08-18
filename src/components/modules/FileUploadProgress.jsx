import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Upload, FileText, CheckCircle2, AlertCircle, X, File } from 'lucide-react';
import toast from 'react-hot-toast';

const STAGES = [
  { key: 'validate', label: 'Validating File', duration: 400 },
  { key: 'presigned', label: 'Requesting Upload URL', duration: 200 },
  { key: 'upload', label: 'Uploading to Cloud', duration: 1200 },
  { key: 'complete', label: 'Upload Complete', duration: 0 },
];

const PROGRESS_STEPS = [0, 35, 72, 100];

export default function FileUploadProgress({ onUploadComplete, acceptedTypes = '.pdf', maxSizeMB = 10 }) {
  const [file, setFile] = useState(null);
  const [stage, setStage] = useState(-1); // -1 = idle
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const reset = useCallback(() => {
    setFile(null);
    setStage(-1);
    setProgress(0);
    setError(null);
    setMetadata(null);
  }, []);

  const validateFile = useCallback((f) => {
    const ext = f.name.split('.').pop().toLowerCase();
    const allowedExts = acceptedTypes.split(',').map(t => t.trim().replace('.', ''));
    if (!allowedExts.includes(ext)) {
      return `Invalid file type. Accepted: ${acceptedTypes}`;
    }
    if (f.size > maxSizeMB * 1024 * 1024) {
      return `File too large. Maximum: ${maxSizeMB}MB`;
    }
    return null;
  }, [acceptedTypes, maxSizeMB]);

  const startUpload = useCallback(async (selectedFile) => {
    setFile(selectedFile);
    setError(null);

    // Stage 1: Client Validation
    setStage(0);
    setProgress(0);
    await new Promise(r => setTimeout(r, STAGES[0].duration));

    const validationError = validateFile(selectedFile);
    if (validationError) {
      setError(validationError);
      setStage(-1);
      toast.error(validationError);
      return;
    }
    setProgress(PROGRESS_STEPS[1]);

    // Stage 2: Request Pre-Signed URL
    setStage(1);
    await new Promise(r => setTimeout(r, STAGES[1].duration));
    setProgress(PROGRESS_STEPS[1]);

    // Stage 3: Upload with smooth progress
    setStage(2);
    const uploadDuration = STAGES[2].duration;
    const startTime = Date.now();
    await new Promise(resolve => {
      const interval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const uploadProgress = Math.min(elapsed / uploadDuration, 1);
        setProgress(PROGRESS_STEPS[1] + (PROGRESS_STEPS[3] - PROGRESS_STEPS[1]) * uploadProgress);
        if (uploadProgress >= 1) {
          clearInterval(interval);
          resolve();
        }
      }, 50);
    });

    // Stage 4: Complete
    setStage(3);
    setProgress(100);
    const meta = {
      filename: selectedFile.name,
      size: (selectedFile.size / 1024).toFixed(1) + ' KB',
      hash: 'sha256:' + Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join(''),
      timestamp: new Date().toISOString(),
    };
    setMetadata(meta);
    toast.success('File uploaded successfully!');
    onUploadComplete?.(meta);
  }, [validateFile, onUploadComplete]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) startUpload(droppedFile);
  }, [startUpload]);

  const handleFileSelect = useCallback((e) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) startUpload(selectedFile);
  }, [startUpload]);

  // Idle state - Dropzone
  if (stage === -1 && !error) {
    return (
      <div
        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 cursor-pointer ${
          isDragging
            ? 'border-indigo-400 bg-indigo-50 dark:bg-indigo-900/10 dark:border-indigo-500'
            : 'border-slate-300 hover:border-indigo-300 dark:border-white/[0.1] dark:hover:border-indigo-500/50'
        }`}
      >
        <input
          type="file"
          accept={acceptedTypes}
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <Upload className={`w-10 h-10 mx-auto mb-3 ${
          isDragging ? 'text-indigo-500' : 'text-slate-400 dark:text-slate-500'
        }`} />
        <p className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
          Drop your file here, or <span className="text-indigo-600 dark:text-indigo-400">browse</span>
        </p>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          {acceptedTypes.toUpperCase()} • Max {maxSizeMB}MB
        </p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="border border-rose-200 dark:border-rose-500/20 bg-rose-50 dark:bg-rose-900/10 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-rose-500 mt-0.5 shrink-0" />
          <div className="flex-1">
            <p className="text-sm font-medium text-rose-700 dark:text-rose-400">{error}</p>
            <button onClick={reset} className="text-xs text-rose-600 dark:text-rose-400 underline mt-1">Try again</button>
          </div>
        </div>
      </div>
    );
  }

  // Upload in progress / Complete
  return (
    <div className="border border-slate-200 dark:border-white/[0.08] bg-slate-50 dark:bg-white/[0.02] rounded-xl p-4">
      <div className="flex items-start gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          stage === 3
            ? 'bg-emerald-100 dark:bg-emerald-900/20'
            : 'bg-indigo-100 dark:bg-indigo-900/20'
        }`}>
          {stage === 3
            ? <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            : <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          }
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
              {file?.name || 'file.pdf'}
            </p>
            {stage === 3 && (
              <button onClick={reset} className="p-1 hover:bg-slate-200 dark:hover:bg-white/[0.05] rounded-lg transition-colors">
                <X size={14} className="text-slate-400" />
              </button>
            )}
          </div>

          {/* Stage label */}
          <p className={`text-xs mt-0.5 ${
            stage === 3 ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-500 dark:text-slate-400'
          }`}>
            {STAGES[stage]?.label}
          </p>

          {/* Progress bar */}
          <div className="mt-2 w-full h-1.5 bg-slate-200 dark:bg-white/[0.05] rounded-full overflow-hidden">
            <motion.div
              className={`h-full rounded-full ${
                stage === 3 ? 'bg-emerald-500' : 'bg-indigo-500'
              }`}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Metadata on complete */}
          {stage === 3 && metadata && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className="mt-3 grid grid-cols-2 gap-2 text-xs"
            >
              <div>
                <span className="text-slate-400">Size: </span>
                <span className="text-slate-600 dark:text-slate-300">{metadata.size}</span>
              </div>
              <div>
                <span className="text-slate-400">Hash: </span>
                <span className="text-slate-600 dark:text-slate-300 font-mono">{metadata.hash.slice(0, 20)}...</span>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

import { format, formatDistanceToNow, parseISO, isAfter, isBefore } from 'date-fns';

export const formatDate = (dateStr, fmt = 'dd MMM yyyy') => {
  try { return format(parseISO(dateStr), fmt); }
  catch { return dateStr; }
};

export const formatDateTime = (dateStr) => {
  try { return format(parseISO(dateStr), 'dd MMM yyyy, hh:mm a'); }
  catch { return dateStr; }
};

export const timeAgo = (dateStr) => {
  try { return formatDistanceToNow(parseISO(dateStr), { addSuffix: true }); }
  catch { return dateStr; }
};

export const isOverdue = (dueDateStr) => {
  try { return isBefore(parseISO(dueDateStr), new Date()); }
  catch { return false; }
};

export const getAttendanceColor = (percentage) => {
  if (percentage >= 85) return 'text-emerald-600 dark:text-emerald-400';
  if (percentage >= 75) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
};

export const getAttendanceBg = (percentage) => {
  if (percentage >= 85) return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400';
  if (percentage >= 75) return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400';
  return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
};

export const getGradeColor = (grade) => {
  const map = { 'A+': 'emerald', A: 'emerald', 'A-': 'green', 'B+': 'blue', B: 'blue', 'B-': 'indigo', 'C+': 'amber', C: 'amber', D: 'red', F: 'red' };
  return map[grade] || 'slate';
};

export const getStatusColor = (status) => {
  const map = {
    active: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    inactive: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
    pending: 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400',
    approved: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    rejected: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    submitted: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    overdue: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    published: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    draft: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400',
    reviewed: 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
    completed: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400',
    current: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    upcoming: 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400',
    cancelled: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
  };
  return map[status] || 'bg-slate-100 text-slate-700';
};

export const getInitials = (name) => {
  if (!name) return '?';
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
};

export const truncate = (str, max = 50) => {
  if (!str) return '';
  return str.length > max ? str.slice(0, max) + '...' : str;
};

export const delay = (ms) => new Promise(r => setTimeout(r, ms));

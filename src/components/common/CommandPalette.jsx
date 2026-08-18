import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight, LayoutDashboard, Calendar, ClipboardCheck,
  BookOpen, FileText, BarChart3, Bell, User, Settings, Users,
  Building, QrCode, GraduationCap, TrendingUp, Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockSubjects } from '../../data/users';
import { mockAssignments } from '../../data/assignments';
import { mockFaculty } from '../../data/faculty';
import { mockStudents } from '../../data/students';

const iconMap = {
  LayoutDashboard, Calendar, ClipboardCheck, BookOpen, FileText,
  BarChart3, Bell, User, Settings, Users, Building, QrCode,
  GraduationCap, TrendingUp, Layers
};

function getNavigationItems(role) {
  const routes = {
    student: [
      { label: 'Dashboard', path: '/student/dashboard', icon: 'LayoutDashboard' },
      { label: 'Timetable', path: '/student/timetable', icon: 'Calendar' },
      { label: 'Attendance', path: '/student/attendance', icon: 'ClipboardCheck' },
      { label: 'QR Scanner', path: '/student/qr-scan', icon: 'QrCode' },
      { label: 'Assignments', path: '/student/assignments', icon: 'BookOpen' },
      { label: 'Leave Applications', path: '/student/leave', icon: 'FileText' },
      { label: 'Grades', path: '/student/grades', icon: 'BarChart3' },
      { label: 'Notifications', path: '/student/notifications', icon: 'Bell' },
      { label: 'Profile', path: '/student/profile', icon: 'User' },
      { label: 'Settings', path: '/student/settings', icon: 'Settings' },
    ],
    faculty: [
      { label: 'Dashboard', path: '/faculty/dashboard', icon: 'LayoutDashboard' },
      { label: 'My Classes', path: '/faculty/classes', icon: 'Calendar' },
      { label: 'Attendance', path: '/faculty/attendance', icon: 'ClipboardCheck' },
      { label: 'QR Attendance', path: '/faculty/qr-attendance', icon: 'QrCode' },
      { label: 'Assignments', path: '/faculty/assignments', icon: 'BookOpen' },
      { label: 'Submissions', path: '/faculty/submissions', icon: 'Layers' },
      { label: 'Grades', path: '/faculty/grades', icon: 'BarChart3' },
      { label: 'Leave Requests', path: '/faculty/leave', icon: 'FileText' },
      { label: 'Students', path: '/faculty/students', icon: 'Users' },
      { label: 'Notifications', path: '/faculty/notifications', icon: 'Bell' },
      { label: 'Profile', path: '/faculty/profile', icon: 'User' },
      { label: 'Settings', path: '/faculty/settings', icon: 'Settings' },
    ],
    admin: [
      { label: 'Dashboard', path: '/admin/dashboard', icon: 'LayoutDashboard' },
      { label: 'User Management', path: '/admin/users', icon: 'Users' },
      { label: 'Students', path: '/admin/students', icon: 'GraduationCap' },
      { label: 'Faculty', path: '/admin/faculty', icon: 'Users' },
      { label: 'Departments', path: '/admin/departments', icon: 'Building' },
      { label: 'Subjects', path: '/admin/subjects', icon: 'BookOpen' },
      { label: 'Timetable', path: '/admin/timetable', icon: 'Calendar' },
      { label: 'Attendance', path: '/admin/attendance', icon: 'ClipboardCheck' },
      { label: 'Assignments', path: '/admin/assignments', icon: 'BookOpen' },
      { label: 'Leave Management', path: '/admin/leave', icon: 'FileText' },
      { label: 'Notifications', path: '/admin/notifications', icon: 'Bell' },
      { label: 'Analytics', path: '/admin/analytics', icon: 'TrendingUp' },
      { label: 'Settings', path: '/admin/settings', icon: 'Settings' },
    ],
  };
  return routes[role] || routes.student;
}

export default function CommandPalette({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();
  const inputRef = useRef(null);
  const resultsRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const groups = useMemo(() => {
    const q = query.toLowerCase().trim();
    const results = [];

    // Navigation
    const navItems = getNavigationItems(user?.role).filter(
      item => !q || item.label.toLowerCase().includes(q)
    );
    if (navItems.length > 0) {
      results.push({ title: 'Navigation', items: navItems.map(item => ({
        id: `nav-${item.path}`,
        label: item.label,
        sublabel: item.path,
        icon: item.icon,
        action: () => { navigate(item.path); onClose(); },
      }))});
    }

    // Assignments
    const filteredAssignments = (mockAssignments || []).filter(
      a => !q || a.title.toLowerCase().includes(q) || a.subject.toLowerCase().includes(q)
    ).slice(0, 5);
    if (filteredAssignments.length > 0) {
      results.push({ title: 'Assignments', items: filteredAssignments.map(a => ({
        id: `asn-${a.id}`,
        label: a.title,
        sublabel: `${a.subject} • ${a.status}`,
        icon: 'BookOpen',
        action: () => { navigate(`/${user?.role}/assignments`); onClose(); },
      }))});
    }

    // Faculty
    if (user?.role !== 'student') {
      const filteredFaculty = (mockFaculty || []).filter(
        f => !q || f.name.toLowerCase().includes(q) || f.subjects?.some(s => s.toLowerCase().includes(q))
      ).slice(0, 5);
      if (filteredFaculty.length > 0) {
        results.push({ title: 'Faculty', items: filteredFaculty.map(f => ({
          id: `fac-${f.id}`,
          label: f.name,
          sublabel: f.subjects?.join(', ') || f.designation,
          icon: 'User',
          action: () => { navigate(`/${user?.role}/faculty`); onClose(); },
        }))});
      }
    }

    // Students
    const filteredStudents = (mockStudents || []).filter(
      s => !q || s.name.toLowerCase().includes(q) || s.enrollmentNo.toLowerCase().includes(q)
    ).slice(0, 5);
    if (filteredStudents.length > 0) {
      results.push({ title: 'Students', items: filteredStudents.map(s => ({
        id: `stu-${s.id}`,
        label: s.name,
        sublabel: `${s.enrollmentNo} • GPA ${s.gpa}`,
        icon: 'GraduationCap',
        action: () => { navigate(`/${user?.role === 'student' ? 'student/profile' : user?.role + '/students'}`); onClose(); },
      }))});
    }

    // Subjects
    const filteredSubjects = (mockSubjects || []).filter(
      s => !q || s.name.toLowerCase().includes(q) || s.code.toLowerCase().includes(q)
    ).slice(0, 5);
    if (filteredSubjects.length > 0) {
      results.push({ title: 'Subjects', items: filteredSubjects.map(s => ({
        id: `sub-${s.id}`,
        label: s.name,
        sublabel: `${s.code} • ${s.credits} credits • ${s.faculty}`,
        icon: 'BookOpen',
        action: () => { navigate(`/${user?.role === 'admin' ? 'admin/subjects' : user?.role + '/dashboard'}`); onClose(); },
      }))});
    }

    return results;
  }, [query, user, navigate, onClose]);

  const flatItems = groups.flatMap(g => g.items);

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => Math.min(prev + 1, flatItems.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => Math.max(prev - 1, 0));
    } else if (e.key === 'Enter' && flatItems[selectedIndex]) {
      e.preventDefault();
      flatItems[selectedIndex].action();
    } else if (e.key === 'Escape') {
      onClose();
    }
  }, [flatItems, selectedIndex, onClose]);

  // Scroll selected item into view
  useEffect(() => {
    const el = resultsRef.current?.querySelector(`[data-index="${selectedIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [selectedIndex]);

  if (!isOpen) return null;

  let itemIndex = 0;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[60]">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        <div className="flex items-start justify-center pt-[15vh] px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
            className="w-full max-w-xl bg-white dark:bg-[#111827] rounded-2xl shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] border border-slate-200 dark:border-white/[0.08] overflow-hidden"
            onKeyDown={handleKeyDown}
          >
            {/* Search input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-slate-200 dark:border-white/[0.08]">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
                placeholder="Search pages, assignments, faculty, students..."
                className="flex-1 bg-transparent text-sm text-slate-900 dark:text-slate-50 placeholder-slate-400 focus:outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-0.5 px-1.5 py-0.5 bg-slate-100 dark:bg-white/[0.05] rounded text-[10px] text-slate-400 border border-slate-200 dark:border-white/[0.08]">
                ESC
              </kbd>
            </div>

            {/* Results */}
            <div ref={resultsRef} className="max-h-[50vh] overflow-y-auto p-2">
              {flatItems.length === 0 ? (
                <div className="py-12 text-center">
                  <Search size={32} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                  <p className="text-sm text-slate-400">No results found</p>
                </div>
              ) : (
                groups.map((group) => (
                  <div key={group.title} className="mb-2">
                    <p className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      {group.title}
                    </p>
                    {group.items.map((item) => {
                      const currentIndex = itemIndex++;
                      const Icon = iconMap[item.icon] || Layers;
                      const isSelected = currentIndex === selectedIndex;
                      return (
                        <button
                          key={item.id}
                          data-index={currentIndex}
                          onClick={item.action}
                          onMouseEnter={() => setSelectedIndex(currentIndex)}
                          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-colors duration-100 ${
                            isSelected
                              ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                              : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.03]'
                          }`}
                        >
                          <Icon size={16} className={isSelected ? 'text-indigo-500' : 'text-slate-400'} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.label}</p>
                            {item.sublabel && (
                              <p className="text-xs text-slate-400 dark:text-slate-500 truncate">{item.sublabel}</p>
                            )}
                          </div>
                          {isSelected && <ArrowRight size={14} className="text-indigo-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="px-4 py-2.5 border-t border-slate-200 dark:border-white/[0.08] flex items-center gap-4 text-[11px] text-slate-400">
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-white/[0.05] rounded border border-slate-200 dark:border-white/[0.08]">↑↓</kbd> Navigate</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-white/[0.05] rounded border border-slate-200 dark:border-white/[0.08]">↵</kbd> Select</span>
              <span className="flex items-center gap-1"><kbd className="px-1 py-0.5 bg-slate-100 dark:bg-white/[0.05] rounded border border-slate-200 dark:border-white/[0.08]">esc</kbd> Close</span>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  );
}

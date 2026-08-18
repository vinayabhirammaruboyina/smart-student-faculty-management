import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Calendar, ClipboardCheck, BookOpen, FileText,
  BarChart3, Bell, User, Settings, LogOut, ChevronLeft, ChevronRight,
  GraduationCap, Users, Building, BookOpenCheck, Database, PieChart,
  QrCode, ClipboardList, UserCheck, Menu, X, TrendingUp, Layers
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Avatar from '../ui/Avatar';
import toast from 'react-hot-toast';

const navConfig = {
  student: [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/timetable', icon: Calendar, label: 'Timetable' },
    { to: '/student/attendance', icon: ClipboardCheck, label: 'Attendance' },
    { to: '/student/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/student/leave', icon: FileText, label: 'Leave Applications' },
    { to: '/student/grades', icon: BarChart3, label: 'Grades' },
    { to: '/student/notifications', icon: Bell, label: 'Notifications' },
    { divider: true },
    { to: '/student/profile', icon: User, label: 'Profile' },
    { to: '/student/settings', icon: Settings, label: 'Settings' },
  ],
  faculty: [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/faculty/classes', icon: Calendar, label: 'My Classes' },
    { to: '/faculty/attendance', icon: ClipboardCheck, label: 'Attendance' },
    { to: '/faculty/qr-attendance', icon: QrCode, label: 'QR Attendance' },
    { to: '/faculty/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/faculty/submissions', icon: ClipboardList, label: 'Submissions' },
    { to: '/faculty/grades', icon: BarChart3, label: 'Grades' },
    { to: '/faculty/leave', icon: FileText, label: 'Leave Requests' },
    { to: '/faculty/students', icon: Users, label: 'Students' },
    { to: '/faculty/notifications', icon: Bell, label: 'Notifications' },
    { divider: true },
    { to: '/faculty/profile', icon: User, label: 'Profile' },
    { to: '/faculty/settings', icon: Settings, label: 'Settings' },
  ],
  admin: [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/users', icon: Users, label: 'User Management' },
    { to: '/admin/students', icon: GraduationCap, label: 'Students' },
    { to: '/admin/faculty', icon: UserCheck, label: 'Faculty' },
    { to: '/admin/departments', icon: Building, label: 'Departments' },
    { to: '/admin/subjects', icon: BookOpenCheck, label: 'Subjects' },
    { to: '/admin/timetable', icon: Calendar, label: 'Timetable' },
    { to: '/admin/attendance', icon: ClipboardCheck, label: 'Attendance' },
    { to: '/admin/assignments', icon: BookOpen, label: 'Assignments' },
    { to: '/admin/leave', icon: FileText, label: 'Leave Management' },
    { to: '/admin/notifications', icon: Bell, label: 'Notifications' },
    { to: '/admin/analytics', icon: TrendingUp, label: 'Analytics' },
    { divider: true },
    { to: '/admin/settings', icon: Settings, label: 'Settings' },
  ],
};

const roleColors = {
  student: { bg: 'bg-indigo-600', text: 'text-indigo-600 dark:text-indigo-400', badge: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-300' },
  faculty: { bg: 'bg-emerald-600', text: 'text-emerald-600 dark:text-emerald-400', badge: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/50 dark:text-emerald-300' },
  admin: { bg: 'bg-purple-600', text: 'text-purple-600 dark:text-purple-400', badge: 'bg-purple-100 text-purple-700 dark:bg-purple-900/50 dark:text-purple-300' },
};

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const links = navConfig[user?.role] || [];
  const colors = roleColors[user?.role] || roleColors.student;

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-slate-100 dark:border-white/[0.08] shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className={`w-8 h-8 ${colors.bg} rounded-xl flex items-center justify-center shrink-0 shadow-sm`}>
          <GraduationCap size={18} className="text-white" />
        </div>
        {!collapsed && (
          <div className="overflow-hidden">
            <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">Smart SMS</p>
            <p className="text-xs text-slate-400 dark:text-slate-500 leading-tight">PICA</p>
          </div>
        )}
      </div>

      {/* Role badge */}
      {!collapsed && (
        <div className="px-4 pt-4">
          <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold ${colors.badge}`}>
            {user?.role?.charAt(0).toUpperCase() + user?.role?.slice(1)} Portal
          </span>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-0.5">
        {links.map((link, i) => {
          if (link.divider) return <div key={i} className="my-3 border-t border-slate-100 dark:border-white/[0.08]" />;
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onMobileClose}
              className={({ isActive }) => `
                flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 group
                ${isActive
                  ? `${colors.badge} font-semibold bg-indigo-900/20 text-indigo-300`
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.06] hover:text-slate-900 dark:hover:text-white'
                }
                ${collapsed ? 'justify-center' : 'gap-3'}
              `}
              title={collapsed ? link.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* User + Logout */}
      <div className="px-3 pb-4 pt-2 border-t border-slate-100 dark:border-white/[0.08] space-y-1">
        {!collapsed ? (
          <div className="flex items-center gap-3 px-2 py-2 rounded-xl">
            <Avatar name={user?.name} size="sm" />
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold text-slate-800 dark:text-white truncate">{user?.name}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center"><Avatar name={user?.name} size="sm" /></div>
        )}
        <button
          onClick={handleLogout}
          className={`flex items-center rounded-xl px-3 py-2 text-sm text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 dark:hover:text-red-400 transition-all duration-200 w-full ${collapsed ? 'justify-center' : 'gap-3'}`}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden lg:flex flex-col fixed left-0 top-0 h-full bg-white dark:bg-[#111827] border-r border-slate-100 dark:border-white/[0.08] z-30
          transition-all duration-200 ease-in-out
          ${collapsed ? 'w-16' : 'w-60'}
        `}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-[#111827] border border-slate-200 dark:border-white/[0.08] rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="relative w-72 bg-white dark:bg-[#111827] h-full shadow-2xl flex flex-col transition-all duration-200">
            <button onClick={onMobileClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]">
              <X size={20} className="text-slate-500" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, BookOpen, FileText, TrendingUp, Calendar, Settings,
  HelpCircle, LogOut, Users, ClipboardCheck, Layers, BarChart3,
  GraduationCap, Building, DollarSign, X, ChevronLeft, ChevronRight, Bolt
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

export default function Sidebar({ collapsed, onToggle, mobileOpen, onMobileClose }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const role = user?.role || 'student';

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  // Student Menu Config
  const studentLinks = [
    { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/student/timetable', icon: BookOpen, label: 'Courses' },
    { to: '/student/assignments', icon: FileText, label: 'Assignments' },
    { to: '/student/grades', icon: TrendingUp, label: 'Grades' },
    { to: '/student/timetable', icon: Calendar, label: 'Schedule' },
    { to: '/student/settings', icon: Settings, label: 'Settings' },
  ];

  // Faculty Menu Config
  const facultyLinks = [
    { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/faculty/classes', icon: BookOpen, label: 'My Courses' },
    { to: '/faculty/students', icon: Users, label: 'Students' },
    { to: '/faculty/submissions', icon: ClipboardCheck, label: 'Grading' },
    { to: '/faculty/dashboard', icon: Layers, label: 'Research' },
    { to: '/faculty/settings', icon: Settings, label: 'Settings' },
  ];

  // Admin Menu Config
  const adminLinks = [
    { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
    { to: '/admin/timetable', icon: GraduationCap, label: 'Academic' },
    { to: '/admin/dashboard', icon: DollarSign, label: 'Finance' },
    { to: '/admin/users', icon: Users, label: 'Staff' },
  ];

  const getSidebarTheme = () => {
    switch (role) {
      case 'admin':
        return {
          title: 'Admin Portal',
          subtitle: 'Precision Mode Active',
          links: adminLinks,
          btnText: 'Command Center',
          btnIcon: Bolt,
          btnAction: () => navigate('/admin/dashboard'),
          activeClass: 'text-indigo-650 dark:text-primary bg-indigo-50 dark:bg-primary-container/15 border-l-4 border-indigo-600 dark:border-primary',
          inactiveClass: 'text-slate-600 dark:text-on-surface-variant hover:text-slate-900 dark:hover:text-on-surface hover:bg-slate-50 dark:hover:bg-white/5',
          bgClass: 'bg-white dark:bg-surface-container-lowest border-slate-200 dark:border-outline-variant',
          supportLabel: 'Support',
          logoutLabel: 'Sign Out'
        };
      case 'faculty':
        return {
          title: 'Smart SMS',
          subtitle: 'Faculty Portal',
          links: facultyLinks,
          btnText: 'Command Center',
          btnIcon: Bolt,
          btnAction: () => navigate('/faculty/dashboard'),
          activeClass: 'bg-[#151f2e] text-primary border-l-4 border-primary dark:text-primary',
          inactiveClass: 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface',
          bgClass: 'bg-surface-container-low dark:bg-surface-container-low border-outline-variant',
          supportLabel: 'Help',
          logoutLabel: 'Logout'
        };
      case 'student':
      default:
        return {
          title: 'Smart SMS',
          subtitle: 'Student Portal',
          links: studentLinks,
          btnText: 'Quick Actions',
          btnIcon: Bolt,
          btnAction: () => navigate('/student/dashboard'),
          activeClass: 'bg-[#151f2e] text-primary border-l-4 border-primary dark:text-primary',
          inactiveClass: 'text-on-surface-variant hover:bg-surface-container-highest hover:text-on-surface',
          bgClass: 'bg-surface-container-low dark:bg-surface-container-low border-outline-variant',
          supportLabel: 'Help',
          logoutLabel: 'Logout'
        };
    }
  };

  const theme = getSidebarTheme();

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Title Header */}
      <div className={`px-6 py-6 border-b border-slate-200 dark:border-outline-variant shrink-0 ${collapsed ? 'items-center text-center px-2' : ''}`}>
        {!collapsed ? (
          <>
            <h2 className="text-xl font-semibold tracking-tight text-slate-800 dark:text-on-surface">
              {theme.title}
            </h2>
            <p className="text-[10px] font-medium text-slate-500 dark:text-on-surface-variant uppercase tracking-widest mt-1">
              {theme.subtitle}
            </p>
          </>
        ) : (
          <span className="font-bold text-primary text-lg">SMS</span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {theme.links.map((link) => {
          const Icon = link.icon;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={onMobileClose}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-all duration-150 rounded-r
                ${isActive ? theme.activeClass : theme.inactiveClass}
                ${collapsed ? 'justify-center rounded-md px-2' : ''}
              `}
              title={collapsed ? link.label : undefined}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto px-4 pb-6 space-y-3">
        {/* Action Button */}
        {!collapsed && (
          <button
            onClick={theme.btnAction}
            className={`w-full py-2 flex items-center justify-center gap-2 rounded text-sm font-medium transition-all shadow-[0_4px_12px_rgba(0,0,0,0.3)]
              ${role === 'student'
                ? 'bg-primary text-on-primary-container hover:opacity-90'
                : 'bg-primary-container text-on-primary-container hover:bg-opacity-90'
              }
            `}
          >
            <theme.btnIcon size={16} />
            <span>{theme.btnText}</span>
          </button>
        )}

        {/* Support & Logout links */}
        <div className="space-y-1 pt-3 border-t border-slate-200 dark:border-outline-variant">
          <NavLink
            to={role === 'admin' ? '/admin/settings' : `/${role}/settings`}
            onClick={onMobileClose}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded transition-all ${theme.inactiveClass} ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? theme.supportLabel : undefined}
          >
            <HelpCircle size={18} className="shrink-0" />
            {!collapsed && <span>{theme.supportLabel}</span>}
          </NavLink>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-4 py-2 text-sm font-medium rounded transition-all text-error hover:bg-error/10 w-full ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? theme.logoutLabel : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>{theme.logoutLabel}</span>}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`
          hidden md:flex flex-col fixed left-0 top-0 h-screen border-r z-40
          transition-all duration-200 ease-in-out ${theme.bgClass}
          ${collapsed ? 'w-16' : 'w-64'}
        `}
      >
        <SidebarContent />
        {/* Collapse toggle */}
        <button
          onClick={onToggle}
          className="absolute -right-3 top-20 w-6 h-6 bg-white dark:bg-surface-container border border-slate-200 dark:border-outline-variant rounded-full flex items-center justify-center shadow-sm hover:shadow-md transition-all duration-200 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
        >
          {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
        </button>
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className={`relative w-64 h-full flex flex-col transition-all duration-200 ${theme.bgClass} border-r`}>
            <button onClick={onMobileClose} className="absolute top-4 right-4 p-1.5 rounded hover:bg-surface-container-high">
              <X size={20} className="text-slate-500" />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

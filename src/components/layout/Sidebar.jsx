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
  const studentSections = [
    {
      title: 'Main',
      links: [
        { to: '/student/dashboard', icon: LayoutDashboard, label: 'Dashboard' }
      ]
    },
    {
      title: 'Academic',
      links: [
        { to: '/student/timetable', icon: BookOpen, label: 'Courses' },
        { to: '/student/assignments', icon: FileText, label: 'Assignments' },
        { to: '/student/grades', icon: TrendingUp, label: 'Grades' },
        { to: '/student/timetable-schedule', icon: Calendar, label: 'Schedule' }
      ]
    },
    {
      title: 'Account',
      links: [
        { to: '/student/settings', icon: Settings, label: 'Settings' }
      ]
    }
  ];

  // Faculty Menu Config
  const facultySections = [
    {
      title: 'Main',
      links: [
        { to: '/faculty/dashboard', icon: LayoutDashboard, label: 'Dashboard' }
      ]
    },
    {
      title: 'Academic',
      links: [
        { to: '/faculty/classes', icon: BookOpen, label: 'My Courses' },
        { to: '/faculty/dashboard-research', icon: Layers, label: 'Research' }
      ]
    },
    {
      title: 'Classroom',
      links: [
        { to: '/faculty/students', icon: Users, label: 'Students' },
        { to: '/faculty/submissions', icon: ClipboardCheck, label: 'Grading' }
      ]
    },
    {
      title: 'Account',
      links: [
        { to: '/faculty/settings', icon: Settings, label: 'Settings' }
      ]
    }
  ];

  // Admin Menu Config
  const adminSections = [
    {
      title: 'Main',
      links: [
        { to: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
        { to: '/admin/analytics', icon: BarChart3, label: 'Analytics' }
      ]
    },
    {
      title: 'Users',
      links: [
        { to: '/admin/users', icon: Users, label: 'Staff' }
      ]
    },
    {
      title: 'Academics',
      links: [
        { to: '/admin/timetable', icon: GraduationCap, label: 'Academic' }
      ]
    },
    {
      title: 'System',
      links: [
        { to: '/admin/dashboard-finance', icon: DollarSign, label: 'Finance' }
      ]
    }
  ];

  const getSidebarTheme = () => {
    switch (role) {
      case 'admin':
        return {
          title: 'Admin Portal',
          subtitle: 'Precision Mode',
          sections: adminSections,
          btnText: '⚙ Command Center',
          btnAction: () => navigate('/admin/dashboard'),
        };
      case 'faculty':
        return {
          title: 'Smart SMS',
          subtitle: 'Faculty Portal',
          sections: facultySections,
          btnText: '⚙ Command Center',
          btnAction: () => navigate('/faculty/dashboard'),
        };
      case 'student':
      default:
        return {
          title: 'Smart SMS',
          subtitle: 'Student Portal',
          sections: studentSections,
          btnText: '⚡ Quick Actions',
          btnAction: () => navigate('/student/dashboard'),
        };
    }
  };

  const theme = getSidebarTheme();
  const activeClass = 'border-l-2 border-indigo-500 bg-[#151D33] text-white font-semibold';
  const inactiveClass = 'text-slate-400 hover:text-slate-200 hover:bg-[#0D1426] border-l-2 border-transparent';

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-[#070B13]">
      {/* Title Header */}
      <div className={`px-6 py-4 shrink-0 flex flex-col justify-center border-b border-[#141C2E] h-14 ${collapsed ? 'items-center px-2' : ''}`}>
        {!collapsed ? (
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold tracking-tight text-white truncate">
              {theme.title}
            </h2>
          </div>
        ) : (
          <span className="font-bold text-white text-lg">SMS</span>
        )}
      </div>

      {/* Nav Links */}
      <nav className="flex-1 overflow-y-auto py-4 space-y-1 scrollbar-hide">
        {theme.sections.map((section, idx) => (
          <div key={idx} className="mb-4">
            {!collapsed && (
              <div className="text-[10px] font-mono tracking-widest text-[#5C6E91] uppercase px-4 mb-2 mt-4">
                {section.title}
              </div>
            )}
            {section.links.map((link) => {
              const Icon = link.icon;
              return (
                <NavLink
                  key={`${link.to}-${link.label}`}
                  to={link.to}
                  onClick={onMobileClose}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-2 text-sm transition-all duration-150
                    ${isActive ? activeClass : inactiveClass}
                    ${collapsed ? 'justify-center px-2' : ''}
                  `}
                  title={collapsed ? link.label : undefined}
                >
                  <Icon size={18} className="shrink-0" />
                  {!collapsed && <span>{link.label}</span>}
                </NavLink>
              );
            })}
          </div>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto p-4 space-y-3 bg-[#070B13] border-t border-[#141C2E]">
        {/* Action Button */}
        {!collapsed && (
          <button
            onClick={theme.btnAction}
            className="w-full py-2 flex items-center justify-center gap-2 rounded-md text-sm font-semibold transition-all shadow-md bg-[#263159] hover:bg-[#313E6E] text-white"
          >
            <span>{theme.btnText}</span>
          </button>
        )}

        {/* Support & Logout links */}
        <div className="space-y-1 pt-2">
          <NavLink
            to={role === 'admin' ? '/admin/settings' : `/${role}/settings`}
            onClick={onMobileClose}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all text-slate-400 hover:text-slate-200 hover:bg-[#0D1426] ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? 'Support' : undefined}
          >
            <HelpCircle size={18} className="shrink-0" />
            {!collapsed && <span>Support</span>}
          </NavLink>
          <button
            onClick={handleLogout}
            className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-all text-[#E58C8A] hover:bg-[#E58C8A]/10 w-full ${collapsed ? 'justify-center px-2' : ''}`}
            title={collapsed ? 'Logout' : undefined}
          >
            <LogOut size={18} className="shrink-0" />
            {!collapsed && <span>Logout</span>}
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
          hidden md:flex flex-col relative h-full shrink-0 z-20 border-r border-[#141C2E] bg-[#070B13]
          transition-all duration-200 ease-in-out
          ${collapsed ? 'w-16' : 'w-56'}
        `}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onMobileClose} />
          <aside className="relative w-56 h-full flex flex-col transition-transform duration-300 bg-[#070B13] border-r border-[#141C2E]">
            <button onClick={onMobileClose} className="absolute top-3 right-3 p-1.5 rounded-md hover:bg-[#151D33] text-slate-400">
              <X size={20} />
            </button>
            <SidebarContent />
          </aside>
        </div>
      )}
    </>
  );
}

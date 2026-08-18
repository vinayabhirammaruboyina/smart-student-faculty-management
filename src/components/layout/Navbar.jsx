import { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Bell, Sun, Moon, Search, Menu, ChevronDown, User, Settings, LogOut, ArrowRightLeft } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNotifications } from '../../context/NotificationContext';
import Avatar from '../ui/Avatar';
import toast from 'react-hot-toast';
import CommandPalette from '../common/CommandPalette';

const SWITCHABLE_ACCOUNTS = [
  { role: 'student', name: 'VinayAbhiram M.', label: 'Student Portal' },
  { role: 'faculty', name: 'Dr. Priya Sharma', label: 'Faculty Portal' },
  { role: 'admin', name: 'Rajesh Mehta', label: 'Admin Portal' },
];

const breadcrumbMap = {
  '/student/dashboard': 'Dashboard',
  '/student/timetable': 'Timetable',
  '/student/attendance': 'Attendance',
  '/student/assignments': 'Assignments',
  '/student/leave': 'Leave Applications',
  '/student/grades': 'Grades',
  '/student/notifications': 'Notifications',
  '/student/profile': 'Profile',
  '/student/settings': 'Settings',
  '/faculty/dashboard': 'Dashboard',
  '/faculty/classes': 'My Classes',
  '/faculty/attendance': 'Attendance',
  '/faculty/qr-attendance': 'QR Attendance',
  '/faculty/assignments': 'Assignments',
  '/faculty/submissions': 'Submissions',
  '/faculty/grades': 'Grades',
  '/faculty/leave': 'Leave Requests',
  '/faculty/students': 'Students',
  '/faculty/notifications': 'Notifications',
  '/faculty/profile': 'Profile',
  '/faculty/settings': 'Settings',
  '/admin/dashboard': 'Dashboard',
  '/admin/users': 'User Management',
  '/admin/students': 'Students',
  '/admin/faculty': 'Faculty',
  '/admin/departments': 'Departments',
  '/admin/subjects': 'Subjects',
  '/admin/timetable': 'Timetable',
  '/admin/attendance': 'Attendance',
  '/admin/assignments': 'Assignments',
  '/admin/leave': 'Leave Management',
  '/admin/notifications': 'Notifications',
  '/admin/analytics': 'Analytics',
  '/admin/settings': 'Settings',
};

export default function Navbar({ onMenuClick }) {
  const { user, logout, switchRole } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { unreadCount } = useNotifications();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [roleSwitcherOpen, setRoleSwitcherOpen] = useState(false);
  const profileRef = useRef(null);
  const roleSwitcherRef = useRef(null);

  const pageTitle = breadcrumbMap[location.pathname] || 'Page';

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
      if (roleSwitcherRef.current && !roleSwitcherRef.current.contains(e.target)) {
        setRoleSwitcherOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <>
      <header className="fixed top-0 right-0 left-0 lg:left-60 h-16 bg-white/70 dark:bg-[rgba(17,24,39,0.75)] backdrop-blur-[16px] border-b border-slate-100 dark:border-white/[0.08] z-20 flex items-center px-4 gap-3 transition-all duration-200">
        {/* Mobile menu button */}
        <button onClick={onMenuClick} className="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-500 transition-all duration-200">
          <Menu size={20} />
        </button>

        {/* Page title */}
        <div className="flex-1 min-w-0">
          <h1 className="text-base font-semibold text-slate-900 dark:text-white truncate">{pageTitle}</h1>
          <p className="text-xs text-slate-400 hidden sm:block">Parul Institute of Computer Applications</p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-[#111827] text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-white/[0.06] transition-all duration-200 text-sm"
          >
            <Search size={14} />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden md:inline px-1.5 py-0.5 bg-white dark:bg-[#111827] rounded text-xs border border-slate-200 dark:border-white/[0.08]">⌘K</kbd>
          </button>

          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-500 dark:text-slate-400 transition-all duration-200"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Role Switcher */}
          <div className="relative" ref={roleSwitcherRef}>
            <button
              onClick={() => setRoleSwitcherOpen(!roleSwitcherOpen)}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-500 dark:text-slate-400 transition-all duration-200"
              title="Switch Role"
            >
              <ArrowRightLeft size={18} />
            </button>
            {roleSwitcherOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#111827] rounded-xl border border-slate-200 dark:border-white/[0.08] shadow-[0_20px_25px_-5px_rgba(0,0,0,0.1),0_10px_10px_-5px_rgba(0,0,0,0.04)] overflow-hidden z-50 animate-fade-in">
                <div className="px-3 py-2 border-b border-slate-100 dark:border-white/[0.08]">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Switch Portal</p>
                </div>
                <div className="py-1">
                  {SWITCHABLE_ACCOUNTS.map((account) => (
                    <button
                      key={account.role}
                      onClick={() => {
                        if (switchRole) switchRole(account.role);
                        setRoleSwitcherOpen(false);
                        navigate(`/${account.role}/dashboard`);
                        toast.success(`Switched to ${account.label}`);
                      }}
                      className={`flex items-center gap-3 px-3 py-2.5 w-full text-left transition-all duration-200 ${
                        user?.role === account.role
                          ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.04]'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                        account.role === 'student' ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400' :
                        account.role === 'faculty' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                      }`}>
                        {account.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{account.label}</p>
                        <p className="text-xs text-slate-400">{account.name}</p>
                      </div>
                      {user?.role === account.role && (
                        <div className="ml-auto w-2 h-2 rounded-full bg-indigo-500" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => { setNotifOpen(!notifOpen); navigate(`/${user?.role}/notifications`); }}
              className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-500 dark:text-slate-400 transition-all duration-200 relative"
            >
              <Bell size={18} />
              {unreadCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                  {unreadCount > 9 ? '9+' : unreadCount}
                </span>
              )}
            </button>
          </div>

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-all duration-200"
            >
              <Avatar name={user?.name} size="sm" />
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-slate-800 dark:text-white leading-tight max-w-[120px] truncate">{user?.name?.split(' ')[0]}</p>
                <p className="text-xs text-slate-400 capitalize leading-tight">{user?.role}</p>
              </div>
              <ChevronDown size={14} className="text-slate-400 hidden md:block" />
            </button>
            {profileOpen && (
              <div className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-[#111827] rounded-xl border border-slate-100 dark:border-white/[0.08] shadow-lg overflow-hidden z-50 animate-fade-in">
                <div className="px-4 py-3 border-b border-slate-100 dark:border-white/[0.08]">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{user?.name}</p>
                  <p className="text-xs text-slate-400">{user?.email}</p>
                </div>
                <div className="py-1">
                  <button onClick={() => { navigate(`/${user?.role}/profile`); setProfileOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.06] w-full transition-all duration-200">
                    <User size={15} /> Profile
                  </button>
                  <button onClick={() => { navigate(`/${user?.role}/settings`); setProfileOpen(false); }} className="flex items-center gap-3 px-4 py-2 text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/[0.06] w-full transition-all duration-200">
                    <Settings size={15} /> Settings
                  </button>
                  <div className="my-1 border-t border-slate-100 dark:border-white/[0.08]" />
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 w-full transition-all duration-200">
                    <LogOut size={15} /> Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Command Palette */}
      <CommandPalette isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
